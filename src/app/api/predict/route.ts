import { NextRequest, NextResponse } from 'next/server'

// 完整的星座匹配规则表
const zodiacCompatibility = {
  '白羊座': {
    '白羊座': 85, '金牛座': 65, '双子座': 92, '巨蟹座': 68,
    '狮子座': 95, '处女座': 62, '天秤座': 88, '天蝎座': 70,
    '射手座': 98, '摩羯座': 60, '水瓶座': 90, '双鱼座': 75
  },
  '金牛座': {
    '白羊座': 65, '金牛座': 88, '双子座': 70, '巨蟹座': 95,
    '狮子座': 72, '处女座': 96, '天秤座': 82, '天蝎座': 98,
    '射手座': 65, '摩羯座': 92, '水瓶座': 68, '双鱼座': 90
  },
  '双子座': {
    '白羊座': 92, '金牛座': 70, '双子座': 85, '巨蟹座': 75,
    '狮子座': 92, '处女座': 78, '天秤座': 95, '天蝎座': 72,
    '射手座': 90, '摩羯座': 68, '水瓶座': 96, '双鱼座': 75
  },
  '巨蟹座': {
    '白羊座': 68, '金牛座': 95, '双子座': 75, '巨蟹座': 88,
    '狮子座': 75, '处女座': 90, '天秤座': 72, '天蝎座': 95,
    '射手座': 65, '摩羯座': 85, '水瓶座': 70, '双鱼座': 98
  },
  '狮子座': {
    '白羊座': 95, '金牛座': 72, '双子座': 92, '巨蟹座': 75,
    
    '狮子座': 90, '处女座': 75, '天秤座': 92, '天蝎座': 78,
    '射手座': 96, '摩羯座': 70, '水瓶座': 88, '双鱼座': 82
  },
  '处女座': {
    '白羊座': 62, '金牛座': 96, '双子座': 78, '巨蟹座': 90,
    '狮子座': 75, '处女座': 85, '天秤座': 78, '天蝎座': 92,
    '射手座': 70, '摩羯座': 95, '水瓶座': 75, '双鱼座': 85
  },
  '天秤座': {
    '白羊座': 88, '金牛座': 82, '双子座': 95, '巨蟹座': 72,
    '狮子座': 92, '处女座': 78, '天秤座': 85, '天蝎座': 85,
    '射手座': 92, '摩羯座': 75, '水瓶座': 95, '双鱼座': 82
  },
  '天蝎座': {
    '白羊座': 70, '金牛座': 98, '双子座': 72, '巨蟹座': 95,
    '狮子座': 78, '处女座': 92, '天秤座': 85, '天蝎座': 90,
    '射手座': 75, '摩羯座': 88, '水瓶座': 72, '双鱼座': 96
  },
  '射手座': {
    '白羊座': 98, '金牛座': 65, '双子座': 90, '巨蟹座': 65,
    '狮子座': 96, '处女座': 70, '天秤座': 92, '天蝎座': 75,
    '射手座': 92, '摩羯座': 68, '水瓶座': 90, '双鱼座': 75
  },
  '摩羯座': {
    '白羊座': 60, '金牛座': 92, '双子座': 68, '巨蟹座': 85,
    '狮子座': 70, '处女座': 95, '天秤座': 75, '天蝎座': 88,
    '射手座': 68, '摩羯座': 90, '水瓶座': 78, '双鱼座': 85
  },
  '水瓶座': {
    '白羊座': 90, '金牛座': 68, '双子座': 96, '巨蟹座': 70,
    '狮子座': 88, '处女座': 75, '天秤座': 95, '天蝎座': 72,
    '射手座': 90, '摩羯座': 78, '水瓶座': 85, '双鱼座': 78
  },
  '双鱼座': {
    '白羊座': 75, '金牛座': 90, '双子座': 75, '巨蟹座': 98,
    '狮子座': 82, '处女座': 85, '天秤座': 82, '天蝎座': 96,
    '射手座': 75, '摩羯座': 85, '水瓶座': 78, '双鱼座': 92
  }
}

function getCompatibilityScore(zodiac1: string, zodiac2: string): number {
  return zodiacCompatibility[zodiac1]?.[zodiac2] || 75
}

// 更丰富的匹配消息
function getCompatibilityMessage(score: number): string {
  if (score >= 95) return '天作之合！你们的星座相性简直完美！💫✨'
  if (score >= 90) return '非常般配！你们的星座能擦出绚丽的火花！💖✨'
  if (score >= 85) return '很合适！你们的星座相性非常好！💝'
  if (score >= 80) return '相当不错！你们的星座有很好的互补性！💕'
  if (score >= 75) return '还不错哦！你们的星座可以互相理解！💫'
  if (score >= 70) return '可以发展！虽然有些挑战，但值得努力！🌟'
  if (score >= 65) return '需要更多包容，但也有独特的吸引力！✨'
  return '星座相性有点考验，但真爱可以超越一���！💝'
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // 验证数据
    if (!data?.person1?.zodiac || !data?.person2?.zodiac) {
      return new NextResponse(
        JSON.stringify({ success: false, error: '请选择双方的星座' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }

    // 计算匹配分数
    const score = getCompatibilityScore(data.person1.zodiac, data.person2.zodiac)

    // 生成结果
    const result = {
      score,
      message: getCompatibilityMessage(score),
      details: {
        person1: {
          name: data.person1.name || '神秘人1',
          zodiac: data.person1.zodiac
        },
        person2: {
          name: data.person2.name || '神秘人2',
          zodiac: data.person2.zodiac
        }
      }
    }

    // 返回结果
    return new NextResponse(
      JSON.stringify({ success: true, result }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

  } catch (error) {
    console.error('API Error:', error)
    return new NextResponse(
      JSON.stringify({ success: false, error: '预测失败，请重试' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
