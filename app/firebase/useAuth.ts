import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter } from "next/navigation";
import { auth } from './firebase_config';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading, router };
}