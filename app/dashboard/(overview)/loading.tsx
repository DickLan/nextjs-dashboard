// 如果用 (overview) 資料夾裝著，這loading畫面就只會作用在 /dashboard 這個路徑，而不會作用在 /dashboard/子路徑
// 方便收斂影響範圍
import DashboardSkeleton from '@/app/ui/skeletons';
export default function Loading() {
  return <DashboardSkeleton />;
}
