import type { StorageStatsData } from '@/components';
import { formatFileSize } from '@/utils/formatFileSize';

interface Props {
  stats: StorageStatsData;
}

export const StorageStats = ({ stats }: Props) => {
  const totalSizeFormatted = formatFileSize(stats.total_storage_used);

  return (
    <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
        Storage Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-3 md:p-4">
          <div className="text-xl md:text-2xl font-bold text-emerald-400">
            {stats.total_files}
          </div>
          <div className="text-xs md:text-sm text-emerald-300/70 font-medium">
            Total Files
          </div>
        </div>

        <div className="bg-teal-500/10 border border-teal-500/20 rounded-md p-3 md:p-4">
          <div className="text-xl md:text-2xl font-bold text-teal-400">
            {totalSizeFormatted}
          </div>
          <div className="text-xs md:text-sm text-teal-300/70 font-medium">
            Storage Used
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-md p-3 md:p-4 sm:col-span-2 lg:col-span-1 xl:col-span-2">
          <div className="text-xl md:text-2xl font-bold text-amber-400">
            {stats.duplicate_files}
          </div>
          <div className="text-xs md:text-sm text-amber-300/70 font-medium">
            Duplicates
          </div>
        </div>
      </div>
    </div>
  );
};
