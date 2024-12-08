import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          💘 AI 恋爱契合度预测
        </h1>
        <p className="text-white mb-8">
          基于AI的智能算法,预测你们的恋爱契合度
        </p>
        <Link 
          href="/predict" 
          className="bg-white text-purple-600 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300"
        >
          开始预测
        </Link>
      </div>
    </main>
  )
}
