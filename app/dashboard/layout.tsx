// nextjs 中，可以使用特殊檔 layout.tsx 創建在多個頁面間共用的 UI

import SideNav from '@/app/ui/dashboard/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      {/* 這樣設定後 /dashboard 裡面的 pages 就會自動 nested in */}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}

// 另外使用 next layout 的額外優點，是在導航食，只會部分渲染，只渲染 pages, 而不會渲染 layout