import { useTheme } from '../../context/ThemeContext';

const SkeletonLoader = ({ type = 'card', count = 1 }) => {
  const { isDark } = useTheme();
  const skClass = isDark ? 'skeleton' : 'skeleton-light';

  const CardSkeleton = () => (
    <div className={`rounded-xl overflow-hidden ${isDark ? 'bg-dark-700' : 'bg-white'} border ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
      <div className={`h-48 ${skClass}`} />
      <div className="p-5 space-y-3">
        <div className={`h-4 w-20 rounded ${skClass}`} />
        <div className={`h-6 w-full rounded ${skClass}`} />
        <div className={`h-4 w-3/4 rounded ${skClass}`} />
        <div className="flex items-center gap-3 pt-2">
          <div className={`w-8 h-8 rounded-full ${skClass}`} />
          <div className={`h-3 w-24 rounded ${skClass}`} />
        </div>
      </div>
    </div>
  );

  const TableRowSkeleton = () => (
    <div className={`flex items-center gap-4 p-4 border-b ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
      <div className={`w-12 h-12 rounded-lg ${skClass}`} />
      <div className="flex-1 space-y-2">
        <div className={`h-4 w-1/3 rounded ${skClass}`} />
        <div className={`h-3 w-1/5 rounded ${skClass}`} />
      </div>
      <div className={`h-8 w-20 rounded ${skClass}`} />
    </div>
  );

  const StatSkeleton = () => (
    <div className={`rounded-xl p-6 ${isDark ? 'bg-dark-700' : 'bg-white'} border ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
      <div className={`w-12 h-12 rounded-lg mb-4 ${skClass}`} />
      <div className={`h-8 w-20 rounded mb-2 ${skClass}`} />
      <div className={`h-4 w-28 rounded ${skClass}`} />
    </div>
  );

  const DetailSkeleton = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className={`h-[400px] w-full rounded-2xl ${skClass}`} />
      <div className={`h-10 w-3/4 rounded ${skClass}`} />
      <div className="flex gap-4">
        <div className={`w-10 h-10 rounded-full ${skClass}`} />
        <div className="space-y-2">
          <div className={`h-4 w-32 rounded ${skClass}`} />
          <div className={`h-3 w-24 rounded ${skClass}`} />
        </div>
      </div>
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`h-4 rounded ${skClass}`} style={{ width: `${90 - i * 8}%` }} />
        ))}
      </div>
    </div>
  );

  const skeletons = { card: CardSkeleton, table: TableRowSkeleton, stat: StatSkeleton, detail: DetailSkeleton };
  const Component = skeletons[type] || CardSkeleton;

  return (
    <>
      {[...Array(count)].map((_, i) => <Component key={i} />)}
    </>
  );
};

export default SkeletonLoader;
