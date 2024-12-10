import React from 'react'

// 添加类型定义
type Person = {
  name: string;
  zodiac: string;
}

type FormData = {
  person1: Person;
  person2: Person;
}

interface BasicInfoStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: any;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, setFormData, errors }) => {
  const { person1, person2 } = formData;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">姓名 1</label>
        <input
          type="text"
          className={`mt-1 block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 ${
            errors?.person1?.name ? 'border-red-500' : 'border-gray-300'
          }`}
          value={person1.name}
          onChange={(e) => setFormData((prev: FormData) => ({
            ...prev,
            person1: { ...prev.person1, name: e.target.value }
          }))}
        />
        {/* ... 其他代码保持不变 ... */}
      </div>
    </div>
  )
}

export default BasicInfoStep 