import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email } = await req.json()
  console.log('Newsletter subscriber:', email)
  return NextResponse.json({ success: true })
}
