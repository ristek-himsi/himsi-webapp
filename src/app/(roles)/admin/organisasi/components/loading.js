export default function Loading() {
  return (
    <div className="bg-slate-50 py-6 px-4 sm:px-6 min-h-screen">
      <div className="w-full max-w-md sm:max-w-4xl mx-auto bg-white rounded-md shadow-md p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="h-8 w-64 bg-slate-200 animate-pulse rounded-md"></div>
          <div className="h-10 w-full sm:w-36 bg-slate-200 animate-pulse rounded-md"></div>
        </div>

        {/* Tablet/Laptop: Table Layout */}
        <div className="hidden sm:block overflow-x-auto">
          <div role="table" aria-describedby="organization-structure-table" className="w-full border-collapse">
            <div role="rowgroup" className="bg-slate-100">
              <div role="row" className="grid grid-cols-7 gap-6 px-4 py-3">
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Tahun Akademik
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Ketua
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Wakil Ketua
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Sekretaris
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Bendahara
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Status Aktif
                </div>
                <div role="columnheader" className="text-left text-sm font-semibold text-slate-800 min-w-[120px]">
                  Aksi
                </div>
              </div>
            </div>
            <div role="rowgroup">
              {/* Generate 3 skeleton rows */}
              {[...Array(3)].map((_, i) => (
                <div key={i} role="row" className="grid grid-cols-7 gap-6 px-4 py-3 border-b border-slate-200 odd:bg-white even:bg-slate-50">
                  <div role="cell" className="min-w-[120px]">
                    <div className="h-6 bg-slate-200 animate-pulse rounded w-20"></div>
                  </div>
                  <div role="cell" className="min-w-[120px]">
                    <div className="h-6 bg-slate-200 animate-pulse rounded w-28"></div>
                  </div>
                  <div role="cell" className="min-w-[120px]">
                    <div className="h-6 bg-slate-200 animate-pulse rounded w-28"></div>
                  </div>
                  <div role="cell" className="min-w-[120px]">
                    <div className="h-6 bg-slate-200 animate-pulse rounded w-28"></div>
                  </div>
                  <div role="cell" className="min-w-[120px]">
                    <div className="h-6 bg-slate-200 animate-pulse rounded w-28"></div>
                  </div>
                  <div role="cell" className="min-w-[120px]">
                    <div className="h-6 bg-slate-200 animate-pulse rounded-full w-16"></div>
                  </div>
                  <div role="cell" className="flex space-x-3 min-w-[120px]">
                    <div className="h-10 w-16 bg-slate-200 animate-pulse rounded-md"></div>
                    <div className="h-10 w-16 bg-slate-200 animate-pulse rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Card Layout */}
        <div className="sm:hidden space-y-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white shadow-sm p-4 rounded-md">
              <div className="h-5 w-48 bg-slate-200 animate-pulse rounded mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 w-36 bg-slate-200 animate-pulse rounded"></div>
                <div className="h-4 w-40 bg-slate-200 animate-pulse rounded"></div>
                <div className="h-4 w-32 bg-slate-200 animate-pulse rounded"></div>
                <div className="h-4 w-36 bg-slate-200 animate-pulse rounded"></div>
                <div className="h-4 w-20 bg-slate-200 animate-pulse rounded-full"></div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col space-y-3">
                <div className="h-10 w-full bg-slate-200 animate-pulse rounded-md"></div>
                <div className="h-10 w-full bg-slate-200 animate-pulse rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
