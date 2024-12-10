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

// 添加匹配消息函数
function getCompatibilityMessage(score: number): string {
  if (score >= 95) return '天作之合！你们的星座相性简直完美！💫✨'
  if (score >= 90) return '非常般配！你们的星座能擦出绚丽的火花！💖✨'
  if (score >= 85) return '很合适！你们的星座相性非常好！💝'
  if (score >= 80) return '相当不错！你们的星座有很好的互补性！💕'
  if (score >= 75) return '还不错哦！你们的星座可以互相理解！💫'
  if (score >= 70) return '可以发展！虽然有些挑战，但值得努力！🌟'
  if (score >= 65) return '需要更多包容，但也有独特的吸引力！✨'
  return '星座相性有点考验，但真爱可以超越一切！💝'
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
    
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
} 