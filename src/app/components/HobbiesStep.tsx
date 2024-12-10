'use client'

import { FC } from 'react'

type Person = {
  name: string;
  zodiac: string;
  hobbies: string[];
}

type FormData = {
  person1: Person;
  person2: Person;
}

interface HobbiesStepProps {
  person1: Person;
  person2: Person;
  errors: any;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const HOBBY_OPTIONS = {
  运动类: ['健身', '跑步', '游泳', '球类运动', '瑜伽'],
  文化类: ['读书', '写作', '音乐', '电影', '摄影'],
  休闲类: ['旅行', '美食', '游戏', '手工', '园艺']
}

const HobbiesStep: FC<HobbiesStepProps> = ({ person1, person2, errors, setFormData }) => {
  const handleHobbyToggle = (person: 'person1' | 'person2', hobby: string) => {
    setFormData((prev: FormData) => {
      const currentHobbies = prev[person].hobbies
      const newHobbies = currentHobbies.includes(hobby)
        ? currentHobbies.filter(h => h !== hobby)
        : [...currentHobbies, hobby]
      
      return {
        ...prev,
        [person]: {
          ...prev[person],
          hobbies: newHobbies
        }
      }
    })
  }

  return (
    <>
      {/* 第一个人的兴趣爱好 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ta的兴趣爱好</h2>
        <div className="space-y-6">
          {Object.entries(HOBBY_OPTIONS).map(([category, hobbies]) => (
            <div key={category}>
              <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {hobbies.map(hobby => (
                  <button
                    key={hobby}
                    type="button"
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      person1.hobbies.includes(hobby)
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                    }`}
                    onClick={() => handleHobbyToggle('person1', hobby)}
                  >
                    {hobby}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {errors.person1Hobbies && (
          <p className="text-red-500 text-sm mt-2">{errors.person1Hobbies}</p>
        )}
      </div>

      {/* 第二个人的兴趣爱好 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">你的兴趣爱好</h2>
        <div className="space-y-6">
          {Object.entries(HOBBY_OPTIONS).map(([category, hobbies]) => (
            <div key={category}>
              <h3 className="font-medium text-gray-700 mb-2">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {hobbies.map(hobby => (
                  <button
                    key={hobby}
                    type="button"
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      person2.hobbies.includes(hobby)
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                    }`}
                    onClick={() => handleHobbyToggle('person2', hobby)}
                  >
                    {hobby}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {errors.person2Hobbies && (
          <p className="text-red-500 text-sm mt-2">{errors.person2Hobbies}</p>
        )}
      </div>
    </>
  )
}

export default HobbiesStep 