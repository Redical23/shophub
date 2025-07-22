'use client';

import { usePathname } from 'next/navigation';
import { useModelContext } from './context/Context';
import Models from './componets/Models';
import dynamic from 'next/dynamic';

const LAHEAD = dynamic(() => import('./slidebar/LAHEAD'), { ssr: false });

export default function ClientRootLayout({ children }) {
  const { isModelOpen } = useModelContext();
  const pathname = usePathname();

  const shouldShowLAHEAD =
    pathname !== '/' &&
    pathname !== '/pruser/setting' &&
    pathname !== '/pruser/editprofile' &&
    pathname !== '/Login' &&
    pathname !== '/Register' &&
    pathname !== '/contact' &&
    pathname !== '/about' &&
    pathname !== '/privacypolicy' &&
    pathname !== '/termsofservice';

  return (
    <>
      {shouldShowLAHEAD && <LAHEAD />}
      <div className="min-h-screen body">
        {isModelOpen && <Models />}
        {children}
      </div>
    </>
  );
}
