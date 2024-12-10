'use client'

import { FC } from 'react'

type Person = {
  name: string;
  zodiac: string;
  hobbies: string[];
  lifestyle: {
    [key: string]: string;
  };
}

type FormData = {
  person1: Person;
  person2: Person;
}

interface LifestyleStepProps {
  person1: Person;
  person2: Person;
  errors: any;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const LIFESTYLE_OPTIONS = {
  作息时间: ['早起型', '夜猫子', '规律作息'],
  饮食习惯: ['无特殊习惯', '素食', '喜辣', '清淡'],
  消费观: ['节约型', '享受型', '平衡型']
}

const LifestyleStep: FC<LifestyleStepProps> = ({ person1, person2, errors, setFormData }) => {
  const handleLifestyleChange = (person: 'person1' | 'person2', category: string, value: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      [person]: {
        ...prev[person],
        lifestyle: {
          ...prev[person].lifestyle,
          [category]: value
        }
      }
    }))
  }

  return (
    <>
      {/* 第一个人的生活习惯 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ta的生活习惯</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">作息时间</h3>
            <div className="grid grid-cols-3 gap-2">
              {LIFESTYLE_OPTIONS.作息时间.map(option => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    person1.lifestyle.schedule === option
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                  }`}
                  onClick={() => handleLifestyleChange('person1', 'schedule', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">饮食习惯</h3>
            <div className="grid grid-cols-2 gap-2">
              {LIFESTYLE_OPTIONS.饮食习惯.map(option => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    person1.lifestyle.diet === option
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                  }`}
                  onClick={() => handleLifestyleChange('person1', 'diet', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">消费观</h3>
            <div className="grid grid-cols-3 gap-2">
              {LIFESTYLE_OPTIONS.消费观.map(option => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    person1.lifestyle.spending === option
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                  }`}
                  onClick={() => handleLifestyleChange('person1', 'spending', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 第二个人的生活习惯 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">你的生活习惯</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">作息时间</h3>
            <div className="grid grid-cols-3 gap-2">
              {LIFESTYLE_OPTIONS.作息时间.map(option => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    person2.lifestyle.schedule === option
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                  }`}
                  onClick={() => handleLifestyleChange('person2', 'schedule', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">饮食习惯</h3>
            <div className="grid grid-cols-2 gap-2">
              {LIFESTYLE_OPTIONS.饮食习惯.map(option => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    person2.lifestyle.diet === option
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                  }`}
                  onClick={() => handleLifestyleChange('person2', 'diet', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">消费观</h3>
            <div className="grid grid-cols-3 gap-2">
              {LIFESTYLE_OPTIONS.消费观.map(option => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    person2.lifestyle.spending === option
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                  }`}
                  onClick={() => handleLifestyleChange('person2', 'spending', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LifestyleStep 