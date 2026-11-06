
import React from 'react';

const Preloader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950">

            {/* Animated Book */}
            <div className="flex items-center justify-center !mb-6">
                <div className="relative flex h-12 w-16 [perspective:400px]">

                    <div className="h-11 w-4 origin-left animate-[flip_1.2s_ease-in-out_infinite] rounded-l-sm border-2 border-white bg-violet-600"></div>

                    <div className="h-11 w-4 origin-left animate-[flip_1.2s_ease-in-out_0.2s_infinite] border-2 border-white bg-violet-500"></div>

                    <div className="h-11 w-4 origin-left animate-[flip_1.2s_ease-in-out_0.4s_infinite] rounded-r-sm border-2 border-white bg-violet-400"></div>

                </div>
            </div>

            {/* Bookstore Name */}
            <h2 className="!mb-2 text-2xl font-bold tracking-wide text-white">
                BookStore
            </h2>

            <p className="!mb-6 text-sm text-gray-500">
                Preparing your reading experience...
            </p>

            {/* Loading Bar */}
            <div className="h-1 w-36 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-2/5 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-violet-600"></div>
            </div>

            <style>
                {`
                    @keyframes flip {
                        0%, 100% { transform: rotateY(0deg); }
                        50% { transform: rotateY(-160deg); }
                    }

                    @keyframes loading {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(250%); }
                    }
                `}
            </style>

        </div>
    );
};

export default Preloader;
