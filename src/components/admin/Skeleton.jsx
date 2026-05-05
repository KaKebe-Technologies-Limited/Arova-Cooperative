const Shimmer = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export const SkeletonTable = ({ rows = 5, cols = 4 }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="px-6 py-4">
                <Shimmer className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols }).map((__, c) => (
                <td key={c} className="px-6 py-4">
                  <Shimmer className={`h-4 ${c === 0 ? "w-48" : "w-24"}`} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-3">
    <div className="flex items-center gap-3">
      <Shimmer className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Shimmer className="h-4 w-3/4" />
        <Shimmer className="h-3 w-1/2" />
      </div>
    </div>
    <Shimmer className="h-3 w-full" />
    <Shimmer className="h-3 w-5/6" />
    <Shimmer className="h-3 w-4/6" />
    <div className="flex justify-end gap-2 pt-2">
      <Shimmer className="h-8 w-8 rounded-lg" />
      <Shimmer className="h-8 w-8 rounded-lg" />
    </div>
  </div>
);

export const SkeletonCards = ({ count = 3 }) => (
  <div className="space-y-4">
    <Shimmer className="h-10 w-44" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  </div>
);

export const SkeletonList = ({ rows = 4 }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
    <Shimmer className="h-4 w-64 mb-6" />
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Shimmer className="h-10 w-10 rounded-lg flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <Shimmer className="h-4 w-1/3" />
            <Shimmer className="h-3 w-1/2" />
          </div>
        </div>
        <Shimmer className="h-8 w-8 rounded-lg" />
      </div>
    ))}
  </div>
);

export const SkeletonDashboard = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-3">
          <Shimmer className="h-10 w-10 rounded-lg" />
          <Shimmer className="h-7 w-16" />
          <Shimmer className="h-4 w-24" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <Shimmer className="h-5 w-32" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Shimmer className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-4 w-32" />
              <Shimmer className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
        <Shimmer className="h-5 w-32" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Shimmer className="h-12 w-12 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Shimmer className="h-4 w-48" />
              <Shimmer className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
