import { useAuth, type Role } from '../auth/AuthContext';

export default function Login() {
  const { loginWithSSO } = useAuth();

  const roles: { role: Role; label: string; desc: string }[] = [
    { role: 'CXO', label: 'Sign in as CXO', desc: 'View project predictions and agent performance' },
    { role: 'CFO', label: 'Sign in as CFO', desc: 'Review delays, ask questions, approve/reject budgets' },
  ];

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>CXO AI Perf Dashboard</h1>
        <p className="subtitle">Sign in with your company SSO to continue</p>
        <div className="role-buttons">
          {roles.map(({ role, label, desc }) => (
            <button key={role} className="sso-button" onClick={() => loginWithSSO(role)}>
              <span className="sso-label">{label}</span>
              <span className="sso-desc">{desc}</span>
            </button>
          ))}
        </div>
        <p className="sso-note">Simulated SSO for demo purposes. Replace with your IdP (Okta/Azure AD/Auth0) integration.</p>
      </div>
    </div>
  );
}
