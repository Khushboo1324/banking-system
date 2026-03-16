import { useAuth } from '../context/AuthContext';
import { useAccount } from '../context/AccountContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Shield, CreditCard, Wallet, LogOut } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const { account, clearAccount } = useAccount();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearAccount();
    navigate('/login');
  };

  const userFields = [
    { icon: User, label: 'Full Name', value: user?.name },
    { icon: Mail, label: 'Email Address', value: user?.email },
    { icon: Shield, label: 'Role', value: user?.role },
    { icon: User, label: 'User ID', value: user?.id, mono: true },
  ];

  const accountFields = account
    ? [
        { icon: CreditCard, label: 'Account Type', value: account.accountType },
        { icon: Wallet, label: 'Balance', value: `$${(account.balance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}` },
        { icon: CreditCard, label: 'Account Number', value: account.accountNumber, mono: true },
        { icon: CreditCard, label: 'Account ID', value: account.accountId, mono: true },
      ]
    : [];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5">Your personal and account details</p>
      </div>

      {/* Avatar card */}
      <div className="card flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center shrink-0">
          <span className="text-primary-700 font-bold text-2xl">
            {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
          </span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">{user?.name ?? '—'}</h2>
          <p className="text-slate-500 text-sm">{user?.email ?? '—'}</p>
          <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full capitalize">
            {user?.role?.toLowerCase() ?? 'user'}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="ml-auto btn-danger flex items-center gap-2 text-sm"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Personal info */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">
          Personal Information
        </h3>
        <div className="space-y-3">
          {userFields.map(({ icon: Icon, label, value, mono }) => (
            <div key={label} className="card flex items-center gap-4 py-4">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-slate-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-400">{label}</p>
                <p
                  className={`text-sm font-semibold text-slate-800 break-all ${
                    mono ? 'font-mono' : ''
                  }`}
                >
                  {value ?? '—'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account info */}
      {account && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">
            Account Information
          </h3>
          <div className="space-y-3">
            {accountFields.map(({ icon: Icon, label, value, mono }) => (
              <div key={label} className="card flex items-center gap-4 py-4">
                <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p
                    className={`text-sm font-semibold text-slate-800 break-all ${
                      mono ? 'font-mono' : ''
                    }`}
                  >
                    {value ?? '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
