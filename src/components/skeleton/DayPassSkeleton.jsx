const DayPassSkeleton = () => {

  return (
    Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="max-w-md w-full mx-auto max-sm:text-xs mb-4">
        <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl shadow-md backdrop-blur-md animate-pulse">

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-9 w-9 bg-white/10 rounded-full" />
            <div className="h-5 w-40 bg-white/10 rounded" />
          </div>

          {/* Fields */}
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-5 w-5 bg-white/10 rounded-full" />
                <div className="h-4 w-full bg-white/10 rounded" />
              </div>
            ))}
          </div>

          {/* Pending payment message skeleton */}
          <div className="mt-4 h-10 w-full bg-white/10 rounded" />
        </div>
      </div>
    ))

  );
};

export default DayPassSkeleton;
