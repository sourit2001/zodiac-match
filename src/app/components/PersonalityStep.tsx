'use client'

import { FC } from 'react'

interface PersonalityStepProps {
  person1: any
  person2: any
  errors: any
  setFormData: (data: any) => void
}

const PERSONALITY_OPTIONS = {
  外向性: ['活泼开朗', '善于社交', '喜欢独处', '安静内敛'],
  性格倾向: ['理性', '感性', '务实', '浪漫'],
  生活态度: ['计划型', '随性型', '冒险型', '稳健型']
}

const PersonalityStep: FC<PersonalityStepProps> = ({ person1, person2, errors, setFormData }) => {
  const handlePersonalityToggle = (person: 'person1' | 'person2', trait: string) => {
    setFormData(prev => {
      const currentTraits = prev[person].personality
      const newTraits = currentTraits.includes(trait)
        ? currentTraits.filter(t => t !== trait)
        : [...currentTraits, trait]
      
      return {
        ...prev,
        [person]: {
          ...prev[person],
          personality: newTraits
        }
      }
    })
  }

  return (
    <>
      {/* 第一个人的性格特征 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ta的性格特征</h2>
        <div className="space-y-6">
          {Object.entries(PERSONALITY_OPTIONS).map(([category, traits]) => (
            <div key={category}>
              <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {traits.map(trait => (
                  <button
                    key={trait}
                    type="button"
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      person1.personality.includes(trait)
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                    }`}
                    onClick={() => handlePersonalityToggle('person1', trait)}
                  >
                    {trait}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {errors.person1Personality && (
          <p className="text-red-500 text-sm mt-2">{errors.person1Personality}</p>
        )}
      </div>

      {/* 第二个人的性格特征 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">你的性格特征</h2>
        <div className="space-y-6">
          {Object.entries(PERSONALITY_OPTIONS).map(([category, traits]) => (
            <div key={category}>
              <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {traits.map(trait => (
                  <button
                    key={trait}
                    type="button"
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      person2.personality.includes(trait)
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                    }`}
                    onClick={() => handlePersonalityToggle('person2', trait)}
                  >
                    {trait}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {errors.person2Personality && (
          <p className="text-red-500 text-sm mt-2">{errors.person2Personality}</p>
        )}
      </div>
    </>
  )
}

export default PersonalityStep 