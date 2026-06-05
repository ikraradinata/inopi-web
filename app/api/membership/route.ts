import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  console.log('Membership application:', body)
  return NextResponse.json({ success: true, message: 'Pendaftaran diterima' })
}
