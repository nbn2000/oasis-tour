import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import PackagesPanel from 'components/PackagesPanel';
import LoginForm from 'components/LoginForm';

const AdminPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoadingAuth(false);
    });
    return () => unsub();
  }, []);

  if (loadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-accent-1 border-t-transparent shadow-lg"></div>
          {/* Text */}
          <p className="mt-4 animate-pulse text-lg font-medium text-gray-600">Avtorizatsiya tekshirilmoqda…</p>
        </div>
      </div>
    );
  }

  return user ? <PackagesPanel onSignOut={() => signOut(auth)} /> : <LoginForm />;
};

export default AdminPage;
