import fs from "fs/promises";
import path from "path";
import * as pdf from "pdf-parse";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

type CliOptions = {
  inputDir: string;
  output: string;
  chunkSize: number;
  chunkOverlap: number;
  mode: "supabase" | "jsonl" | "both";
  batchSize: number;
};

type ParsedArgs = CliOptions & { help?: boolean };

const DEFAULT_INPUT_DIR = path.join(process.cwd(), "data", "pdfs");
const DEFAULT_OUTPUT = path.join(process.cwd(), "data", "chunks.jsonl");
const DEFAULT_MODE: CliOptions["mode"] = "supabase";
const DEFAULT_BATCH_SIZE = 50;

const usage = `Usage:
  npx tsx scripts/ingest.ts --input <dir> --output <file> [--chunkSize 1200] [--chunkOverlap 200] [--mode supabase|jsonl|both] [--batchSize 50]

Defaults:
  --input        ${DEFAULT_INPUT_DIR}
  --output       ${DEFAULT_OUTPUT}
  --chunkSize    1200
  --chunkOverlap 200
  --mode         ${DEFAULT_MODE}
  --batchSize    ${DEFAULT_BATCH_SIZE}
`;

function parseArgs(argv: string[]): ParsedArgs {
  const args = [...argv];
  const options: ParsedArgs = {
    inputDir: DEFAULT_INPUT_DIR,
    output: DEFAULT_OUTPUT,
    chunkSize: 1200,
    chunkOverlap: 200,
    mode: DEFAULT_MODE,
    batchSize: DEFAULT_BATCH_SIZE,
  };

  while (args.length) {
    const current = args.shift();
    if (!current) continue;

    if (current === "--help" || current === "-h") {
      options.help = true;
      continue;
    }

    if (current === "--input" || current === "-i") {
      const value = args.shift();
      if (value) options.inputDir = value;
      continue;
    }

    if (current === "--output" || current === "-o") {
      const value = args.shift();
      if (value) options.output = value;
      continue;
    }

    if (current === "--chunkSize") {
      const value = Number(args.shift());
      if (!Number.isNaN(value) && value > 0) options.chunkSize = value;
      continue;
    }

    if (current === "--chunkOverlap") {
      const value = Number(args.shift());
      if (!Number.isNaN(value) && value >= 0) options.chunkOverlap = value;
      continue;
    }

    if (current === "--mode") {
      const value = args.shift();
      if (value === "supabase" || value === "jsonl" || value === "both") {
        options.mode = value;
      }
      continue;
    }

    if (current === "--batchSize") {
      const value = Number(args.shift());
      if (!Number.isNaN(value) && value > 0) options.batchSize = value;
      continue;
    }
  }

  return options;
}

async function collectPdfFiles(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectPdfFiles(fullPath)));
    } else if (
      entry.isFile() &&
      (entry.name.toLowerCase().endsWith(".pdf") ||
        entry.name.toLowerCase().endsWith(".pdf.crdownload"))
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    console.log(usage);
    return;
  }

  const inputDir = path.resolve(options.inputDir);
  const outputFile = path.resolve(options.output);

  try {
    await fs.access(inputDir);
  } catch (error) {
    console.error(`Input directory does not exist: ${inputDir}`);
    process.exit(1);
  }

  const pdfFiles = await collectPdfFiles(inputDir);
  if (!pdfFiles.length) {
    console.error(`No PDFs found in: ${inputDir}`);
    process.exit(1);
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: options.chunkSize,
    chunkOverlap: options.chunkOverlap,
  });

  const outputLines: string[] = [];
  const documents: Array<{
    text: string;
    metadata: { source: string; chunkIndex: number; fileName: string };
  }> = [];

  for (const filePath of pdfFiles) {
    const buffer = await fs.readFile(filePath);
    let parsed: { text: string };
    try {
      parsed = await pdf(buffer);
    } catch (error) {
      console.error(`Failed to parse PDF: ${filePath}`);
      console.error(error);
      continue;
    }

    const source = path.relative(process.cwd(), filePath);
    const docs = await splitter.createDocuments([parsed.text], [{ source }]);

    docs.forEach((doc, index) => {
      const fileName = path.basename(filePath);
      documents.push({
        text: doc.pageContent,
        metadata: { source, chunkIndex: index, fileName },
      });
      if (options.mode === "jsonl" || options.mode === "both") {
        outputLines.push(
          JSON.stringify({
            id: `${source}#${index}`,
            source,
            chunkIndex: index,
            text: doc.pageContent,
          })
        );
      }
    });
  }

  if (!documents.length) {
    console.error("No chunks generated from the provided PDFs.");
    process.exit(1);
  }

  if (options.mode === "jsonl" || options.mode === "both") {
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, outputLines.join("\n") + "\n", "utf-8");
    console.log(`Wrote ${outputLines.length} chunks to ${outputFile}`);
  }

  if (options.mode === "supabase" || options.mode === "both") {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error(
        "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for supabase mode."
      );
      process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
      apiKey: process.env.OPENAI_API_KEY,
    });

    for (let i = 0; i < documents.length; i += options.batchSize) {
      const batch = documents.slice(i, i + options.batchSize);
      const vectors = await embeddings.embedDocuments(
        batch.map((doc) => doc.text)
      );

      const rows = batch.map((doc, index) => ({
        content: doc.text,
        metadata: doc.metadata,
        embedding: vectors[index],
      }));

      const { error } = await supabase.from("documents").insert(rows);
      if (error) {
        console.error("Supabase insert error:", error);
        process.exit(1);
      }

      console.log(
        `Inserted ${rows.length} documents (${i + rows.length}/${documents.length})`
      );
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
