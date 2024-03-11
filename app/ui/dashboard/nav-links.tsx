'use client' // in next, 這意味這個元件只會在客戶端(瀏覽器)運行，而不會在伺服器渲染
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link'
// 為了改善路由體驗 next自動按路由拆分應用程式，這與傳統SPA不同，傳統SPA在初始載入石就載入所有應用程式代馬
// 另外 next 會預載當前窗口的元件(link)，所以當使用者按下連結石，目標頁面早已經在後台載入，這就是next能做到即時轉換的原因 
import { usePathname } from 'next/navigation';
import clsx from 'clsx'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname() // usePathname() 會返回當前路由
  console.log('pathname', pathname);
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
           <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              }, 
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
