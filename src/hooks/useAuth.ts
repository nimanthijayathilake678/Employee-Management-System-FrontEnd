import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{ name: string } | null>(null);

  const login = (name: string) => setUser({ name });
  const logout = () => setUser(null);

  return { user, login, logout };
}

export default useAuth;