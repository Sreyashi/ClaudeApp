import { createContext, useContext, useState, type ReactNode } from 'react';

export type Role = 'CXO' | 'CFO';

export interface User {
  name: string;
  email: string;
  role: Role;
}

interface AuthContextValue {
  user: User | null;
  loginWithSSO: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const MOCK_USERS: Record<Role, User> = {
  CXO: { name: 'Jordan Lee', email: 'jordan.lee@company.com', role: 'CXO' },
  CFO: { name: 'Avery Chen', email: 'avery.chen@company.com', role: 'CFO' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function loginWithSSO(role: Role) {
    // Simulated SSO handshake. Swap for a real OIDC/SAML redirect flow later.
    setUser(MOCK_USERS[role]);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginWithSSO, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
