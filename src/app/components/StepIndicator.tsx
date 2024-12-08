export default function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ['基本信息', '性格特征', '兴趣爱好', '生活习惯']
  
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`text-sm ${
              currentStep >= index + 1 ? 'text-purple-600' : 'text-gray-400'
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
    </div>
  )
} 