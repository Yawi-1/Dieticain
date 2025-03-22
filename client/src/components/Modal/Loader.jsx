import React from 'react'

const Loader = () => {
  return (
    <div className="fixed z-50 inset-0 bg-white/80 flex items-center justify-center rounded-2xl">
    <div className="flex flex-col items-center gap-4">
      {/* Gradient spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
        <div className="absolute inset-0 rounded-full animate-spin border-4 border-emerald-600 border-t-transparent"></div>
      </div>
  
      {/* Typing animation */}
      <div className="flex items-center gap-1.5 text-gray-600 font-medium">
        <span className="animate-bounce">L</span>
        <span className="animate-bounce delay-100">o</span>
        <span className="animate-bounce delay-200">a</span>
        <span className="animate-bounce delay-300">d</span>
        <span className="animate-bounce delay-400">i</span>
        <span className="animate-bounce delay-500">n</span>
        <span className="animate-bounce delay-600">g</span>
        <span className="animate-bounce delay-700">.</span>
        <span className="animate-bounce delay-800">.</span>
        <span className="animate-bounce delay-900">.</span>
      </div>
    </div>
  </div>
  )
}

export default Loader