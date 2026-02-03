import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    {
      message: 'Chat is under development. Please explore these sections:',
      links: [
        { label: 'Projects', href: '/#projects' },
        { label: 'About', href: '/#about' },
        { label: 'Contact', href: '/#contact' },
      ],
    },
    { status: 503 }
  );
}
