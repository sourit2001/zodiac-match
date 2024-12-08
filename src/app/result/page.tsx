'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface PredictionResult {
  score: number
  message: string
  details: {
    person1: {
      name: string
      zodiac: string
    }
    person2: {
      name: string
      zodiac: string
    }
  }
}

export default function Result() {
  const router = useRouter()
  const [result, setResult] = useState<PredictionResult | null>(null)

  useEffect(() => {
    try {
      console.log('正在加载结果...')
      const storedResult = localStorage.getItem('predictionResult')
      console.log('存储的结果:', storedResult)

      if (!storedResult) {
        console.log('没有找到结果，返回预测页面')
        router.push('/predict')
        return
      }

      const parsedResult = JSON.parse(storedResult)
      console.log('解析的结果:', parsedResult)
      setResult(parsedResult)
    } catch (error) {
      console.error('加载结果时出错:', error)
      router.push('/predict')
    }
  }, [router])

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">预测结果</h1>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900">
              {result.details.person1.name} ({result.details.person1.zodiac})
              <span className="mx-2">💕</span>
              {result.details.person2.name} ({result.details.person2.zodiac})
            </p>
          </div>

          <div className="bg-purple-50 rounded-lg p-6">
            <div className="text-center mb-4">
              <span className="text-3xl font-bold text-gray-900">{result.score}</span>
              <span className="text-xl text-gray-900">分</span>
            </div>
            <p className="text-center text-lg text-gray-900">{result.message}</p>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  )
}
