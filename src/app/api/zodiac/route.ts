import { NextResponse } from 'next/server'

// 添加类型定义
type Person = {
  name: string;
  zodiac: string;
};

type RequestData = {
  person1: Person;
  person2: Person;
};

type ZodiacScores = {
  [key: string]: {
    [key: string]: number;
  };
};

const zodiacCompatibility: ZodiacScores = {
  '白羊座': {
    '白羊座': 85,
    '金牛座': 65,
    '双子座': 90,
    '巨蟹座': 65,
    '狮子座': 95,
    '处女座': 60,
    '天秤座': 85,
    '天蝎座': 70,
    '射手座': 95,
    '摩羯座': 65,
    '水瓶座': 90,
    '双鱼座': 70
  },
  '金牛座': {
    '白羊座': 65,
    '金牛座': 90,
    '双子座': 70,
    '巨蟹座': 95,
    '狮子座': 75,
    '处女座': 95,
    '天秤座': 80,
    '天蝎座': 95,
    '射手座': 65,
    '摩羯座': 95,
    '水瓶座': 70,
    '双鱼座': 90
  }
}

export async function POST(req: Request) {
  try {
    const data: RequestData = await req.json()
    
    const score = zodiacCompatibility[data.person1.zodiac]?.[data.person2.zodiac] ?? 75
    const result = {
      score,
      message: getCompatibilityMessage(score),
      details: data
    }
    
    return NextResponse.json({ success: true, result })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
} 