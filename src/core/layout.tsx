/* eslint-disable no-unused-vars */

import { SidebarProvider } from '@/components/ui/sidebar';
import { IAuthResponse } from '@/services/auth-services';
import { AppSidebar } from '@/views/sidebar';
import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useLocalStorage } from 'usehooks-ts';

export default function Layout() {
  const [user, setUser, removeUser] = useLocalStorage<null | IAuthResponse>(
    'user',
    null
  );

  useEffect(() => {
    if (!user) {
      removeUser();
      window.location.href = '/sign-in';
      window.location.reload();
    }
  }, []);

  return (
    <div>
      <SidebarProvider>
        <div className="grid grid-cols-[300px,1fr]">
          <AppSidebar />
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
}
