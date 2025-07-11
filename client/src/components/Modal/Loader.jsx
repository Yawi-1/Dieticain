import React from 'react'

const Loader = ({ type = "spinner" }) => {
  if (type === "skeleton") {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "service-skeleton") {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="w-full h-64 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "blog-skeleton") {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-3 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "table-skeleton") {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="p-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center space-x-4 py-4 border-b last:border-b-0">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed z-100 inset-0 bg-white/80 flex items-center justify-center rounded-2xl">
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