interface BasicInfoProps {
  person1: any
  person2: any
  errors: any
  setFormData: (data: any) => void
}

export default function BasicInfoStep({ person1, person2, errors, setFormData }: BasicInfoProps) {
  const GENDER_OPTIONS = ['男', '女', '其他']
  const AGE_RANGES = ['18-24', '25-30', '31-35', '36-40', '40以上']

  return (
    <>
      {/* 第一个人的基本信息 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ta的基本信息</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="名字"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 ${
              errors.person1Name ? 'border-red-500' : ''
            }`}
            value={person1.name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              person1: { ...prev.person1, name: e.target.value }
            }))}
          />
          {errors.person1Name && (
            <p className="text-red-500 text-sm mt-1">{errors.person1Name}</p>
          )}
          
          <div className="flex gap-2">
            {GENDER_OPTIONS.map(gender => (
              <button
                key={gender}
                type="button"
                className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                  person1.gender === gender
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                }`}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  person1: { ...prev.person1, gender }
                }))}
              >
                {gender}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {AGE_RANGES.map(range => (
              <button
                key={range}
                type="button"
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  person1.ageRange === range
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                }`}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  person1: { ...prev.person1, ageRange: range }
                }))}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 第二个人的基本信息 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">你的基本信息</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="名字"
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 ${
              errors.person2Name ? 'border-red-500' : ''
            }`}
            value={person2.name}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              person2: { ...prev.person2, name: e.target.value }
            }))}
          />
          
          <div className="flex gap-2">
            {GENDER_OPTIONS.map(gender => (
              <button
                key={gender}
                type="button"
                className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                  person2.gender === gender
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                }`}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  person2: { ...prev.person2, gender }
                }))}
              >
                {gender}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {AGE_RANGES.map(range => (
              <button
                key={range}
                type="button"
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  person2.ageRange === range
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-gray-300 text-gray-700 hover:bg-purple-50'
                }`}
                onClick={() => setFormData(prev => ({
                  ...prev,
                  person2: { ...prev.person2, ageRange: range }
                }))}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
} 