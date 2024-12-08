import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'API 正常工作' })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    return NextResponse.json({ 
      message: '收到数据',
      data: data 
    })
  } catch (error) {
    return NextResponse.json({ error: '处理失败' }, { status: 500 })
  }
} 