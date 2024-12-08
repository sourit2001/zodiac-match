import { NextResponse } from 'next/server'

const zodiacCompatibility = {
  '白羊座': {
    '白羊座': 80, '金牛座': 65, '双子座': 90, '巨蟹座': 65,
    '狮子座': 95, '处女座': 60, '天秤座': 85, '天蝎座': 70,
    '射手座': 95, '摩羯座': 65, '水瓶座': 90, '双鱼座': 70
  },
  '金牛座': {
    '白羊座': 65, '金牛座': 90, '双子座': 70, '巨蟹座': 95,
    '狮子座': 75, '处女座': 95, '天秤座': 80, '天蝎座': 95,
    '射手座': 65, '摩羯座': 95, '水瓶座': 70, '双鱼座': 90
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    const score = zodiacCompatibility[data.person1.zodiac]?.[data.person2.zodiac] || 75
    const result = {
      score,
      message: score >= 90 ? '非常相配！' : 
               score >= 80 ? '很合适！' : 
               score >= 70 ? '比较般配！' : 
               '可以相处！',
      details: {
        person1: data.person1,
        person2: data.person2
      }
    }
    
    return NextResponse.json({ success: true, result })
  } catch (error) {
    return NextResponse.json({ success: false, error: '预测失败' }, { status: 500 })
  }
} 