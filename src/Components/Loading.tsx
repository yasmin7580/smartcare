// import React from 'react';

const Loading = () => {
    return (
        <div className="mx-auto w-full max-w-7xl animate-pulse px-4 py-14" role="status" aria-label="Loading content">
            <div className="skeleton mx-auto h-10 w-52 rounded-full" />
            <div className="skeleton mx-auto mt-5 h-8 w-full max-w-md" />
            <div className="mx-auto mt-3 space-y-2">
                <div className="skeleton mx-auto h-4 w-full max-w-2xl" />
                <div className="skeleton mx-auto h-4 w-3/4 max-w-xl" />
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm">
                        <div className="skeleton h-48 w-full rounded-xl" />
                        <div className="skeleton mt-5 h-6 w-3/4" />
                        <div className="skeleton mt-3 h-4 w-full" />
                        <div className="skeleton mt-2 h-4 w-5/6" />
                        <div className="skeleton mt-6 h-10 w-full rounded-lg" />
                    </div>
                ))}
            </div>
            <span className="sr-only">Loading content...</span>
        </div>
    );
};

export default Loading;
