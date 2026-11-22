export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="w-full animate-pulse space-y-4">
      {/* Search / Filter bar skeleton */}
      <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200">
        <div className="h-9 w-64 bg-slate-200 rounded-lg" />
        <div className="h-9 w-32 bg-slate-200 rounded-lg" />
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-11 bg-slate-100 border-b border-slate-200 flex items-center px-4 gap-4">
          {[...Array(cols)].map((_, i) => (
            <div key={i} className="h-4 bg-slate-300 rounded flex-1" />
          ))}
        </div>
        <div className="divide-y divide-slate-100 p-4 space-y-4">
          {[...Array(rows)].map((_, r) => (
            <div key={r} className="flex items-center gap-4 py-2">
              {[...Array(cols)].map((_, c) => (
                <div
                  key={c}
                  className="h-4 bg-slate-200 rounded flex-1"
                  style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse text-left">
      {/* Header skeleton */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="space-y-2">
          <div className="h-4 w-48 bg-slate-200 rounded" />
          <div className="h-8 w-80 bg-slate-300 rounded" />
          <div className="h-3 w-96 bg-slate-200 rounded" />
        </div>
        <div className="h-10 w-36 bg-slate-300 rounded-lg" />
      </div>

      {/* 4 Cards Skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-3 w-28 bg-slate-200 rounded" />
              <div className="w-9 h-9 rounded-xl bg-slate-200" />
            </div>
            <div className="h-8 w-16 bg-slate-300 rounded" />
          </div>
        ))}
      </div>

      {/* Chart skeletons */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 h-80 bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="h-5 w-48 bg-slate-200 rounded" />
          <div className="h-56 bg-slate-100 rounded-xl" />
        </div>
        <div className="lg:col-span-5 h-80 bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="h-5 w-48 bg-slate-200 rounded" />
          <div className="h-56 bg-slate-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
