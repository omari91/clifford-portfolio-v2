import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

type MatchResult = {
  id: string;
  content: string;
  metadata: {
    source?: string;
    chunkIndex?: number;
    fileName?: string;
  };
  similarity: number;
};

export async function queryResearch(query: string): Promise<MatchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set for queryResearch."
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: process.env.OPENAI_API_KEY,
  });

  const queryEmbedding = await embeddings.embedQuery(query);
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_count: 5,
  });

  if (error) {
    throw new Error(`Supabase RPC error: ${error.message}`);
  }

  return (data ?? []) as MatchResult[];
}
