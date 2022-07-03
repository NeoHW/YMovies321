import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { AuthContext } from '../types/context';

export default function Settings() {
  const router = useRouter();
  const { user, login }: AuthContext = useAuthContext();

  useEffect(() => {
    const loginWithGoogle = async () => {
      try {
        await login({ popup: true });
        router.push('/new');
      } catch (error) {
        console.error(error);
      }
    };
    if (user === null) loginWithGoogle();
  }, [user, login, router]);

  return <>Settings</>;
}
