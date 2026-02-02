const PaymentSkeleton = () => {

  return (
    Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="rounded p-3 sm:p-6 border border-white/10 bg-white/[0.02] animate-pulse mb-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-40 bg-white/10 rounded" />
        <div className="h-6 w-6 bg-white/10 rounded-full" />
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-white/10 rounded" />
        ))}
      </div>
    </div>
    ))
  );
};

export default PaymentSkeleton;
