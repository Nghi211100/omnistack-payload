import React from 'react'

const Loading = ({ length }: { length: number }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6 xl:grid-cols-3'>
            {Array.from({ length: length }).map((_, index) => (
                <div className="dark:border-[#1e4976] overflow-hidden rounded-xl dark:border shadow-lg dark:shadow-[inset_0px_-1px_1px_#132f4c] h-full animate-pulse" key={`${index}-loading`}>
                    {/* Image/Illustration area with purple background */}
                    <div className="flex-shrink-0 h-48 w-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
                        {/* Placeholder shapes for illustration elements */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Laptop placeholder */}
                            <div className="w-20 h-16 bg-white/30 rounded-lg blur-sm" />

                            {/* Left side elements */}
                            <div className="absolute left-8 top-8">
                                <div className="w-12 h-12 bg-blue-400/40 rounded-full blur-sm" />
                                <div className="w-8 h-8 bg-pink-300/40 rounded-full blur-sm mt-4 ml-2" />
                            </div>

                            {/* Right side elements */}
                            <div className="absolute right-8 top-8">
                                <div className="w-10 h-10 bg-green-400/40 rounded-full blur-sm" />
                                <div className="w-16 h-12 bg-blue-300/40 rounded-lg blur-sm mt-4" />
                            </div>
                        </div>

                        {/* Shimmer effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                    </div>

                    {/* Content area */}
                    <div className="flex flex-1 flex-col justify-between bg-white dark:bg-[#001e3c] p-6">
                        <div className="flex-1 space-y-3">
                            {/* Category placeholder */}
                            <div className="h-4 w-32 bg-blue-200 dark:bg-blue-900/50 rounded" />

                            {/* Title placeholder */}
                            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />

                            {/* Description placeholders */}
                            <div className="space-y-2 mt-4">
                                <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
                                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
                                <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-800 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Loading