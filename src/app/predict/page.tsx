'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Person {
  name: string
  gender: string
  zodiac: string
}

interface FormData {
  person1: Person
  person2: Person
}

export default function Predict() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const [formData, setFormData] = useState<FormData>({
    person1: {
      name: '',
      gender: '',
      zodiac: '',
    },
    person2: {
      name: '',
      gender: '',
      zodiac: '',
    }
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const zodiacSigns = [
    '白羊座', '金牛座', '双子座', '巨蟹座', 
    '狮子座', '处女座', '天秤座', '天蝎座',
    '射手座', '摩羯座', '水瓶座', '双鱼座'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLoading) return
    
    try {
      setIsLoading(true)
      setErrors({})

      // 验证表单数据
      if (!formData.person1.name || !formData.person1.zodiac ||
          !formData.person2.name || !formData.person2.zodiac) {
        setErrors({ submit: '请填写完整信息' })
        return
      }

      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        cache: 'no-store'
      })

      const data = await response.json()

      if (data.success && data.result) {
        // 存储结果并跳转
        localStorage.setItem('predictionResult', JSON.stringify(data.result))
        // 使用 setTimeout 确保数据保存完成
        setTimeout(() => {
          window.location.href = '/result'
        }, 100)
      } else {
        setErrors({ submit: data.error || '预测失败，请重试' })
      }
    } catch (error) {
      console.error('预测错误:', error)
      setErrors({ submit: '预测失败，请重试' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (person: 'person1' | 'person2', field: keyof Person, value: string) => {
    setFormData(prev => ({
      ...prev,
      [person]: {
        ...prev[person],
        [field]: value
      }
    }))
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-purple-600 mb-8">星座缘分测试</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 第一个人的信息 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-purple-600">第一个人</h2>
            <div>
              <label className="block text-sm font-medium text-blue-900">姓名</label>
              <input
                type="text"
                value={formData.person1.name}
                onChange={(e) => handleInputChange('person1', 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                style={{ color: '#1e3a8a' }}required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900">性别</label>
              <select
                value={formData.person1.gender}
                onChange={(e) => handleInputChange('person1', 'gender', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                style={{ color: '#1e3a8a' }}required
              >
                <option value="">请选择</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900">星座</label>
              <select
                value={formData.person1.zodiac}
                onChange={(e) => handleInputChange('person1', 'zodiac', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                style={{ color: '#1e3a8a' }}required
              >
                <option value="">请选择</option>
                {zodiacSigns.map(sign => (
                  <option key={sign} value={sign}>{sign}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 第二个人的信息 */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-purple-600">第二个人</h2>
            <div>
              <label className="block text-sm font-medium text-blue-900">姓名</label>
              <input
                type="text"
                value={formData.person2.name}
                onChange={(e) => handleInputChange('person2', 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                style={{ color: '#1e3a8a' }}required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900">性别</label>
              <select
                value={formData.person2.gender}
                onChange={(e) => handleInputChange('person2', 'gender', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                style={{ color: '#1e3a8a' }}required
              >
                <option value="">请选择</option>
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900">星座</label>
              <select
                value={formData.person2.zodiac}
                onChange={(e) => handleInputChange('person2', 'zodiac', e.target.value)}
                className="mt-1 block w-full rounded-md border-blue-900 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                style={{ color: '#1e3a8a' }}required
              >
                <option value="">请选择</option>
                {zodiacSigns.map(sign => (
                  <option key={sign} value={sign}>{sign}</option>
                ))}
              </select>
            </div>
          </div>

          {errors.submit && (
            <div className="text-red-500 text-center">{errors.submit}</div>
          )}

          <div className="flex justify-center gap-8">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-1/3 px-6 py-4 text-center text-purple-600 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition duration-300"
            >
              返回
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-1/3 px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '预测中...' : '开始预测'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
