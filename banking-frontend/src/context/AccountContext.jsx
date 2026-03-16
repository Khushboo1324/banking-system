import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getBalance } from '../api/accountApi';
import { useAuth } from './AuthContext';

const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const { registerRehydrate, registerClearAccount } = useAuth();
  const [account, setAccount] = useState(() => {
    try {
      const saved = localStorage.getItem('account');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [accountLoading, setAccountLoading] = useState(false);

  // On mount, if we have a stored accountId, silently refresh balance from backend
  useEffect(() => {
    const accountId = localStorage.getItem('accountId');
    if (!accountId) return;

    const stored = localStorage.getItem('account');
    let parsed = null;
    try { parsed = stored ? JSON.parse(stored) : null; } catch { /* ignore */ }

    getBalance(accountId)
      .then((res) => {
        // Merge fresh balance with stored data (preserves accountType, accountNumber, etc.)
        const base = parsed ?? {};
        const updated = { ...base, accountId, balance: res.data.balance };
        localStorage.setItem('account', JSON.stringify(updated));
        setAccount(updated);
      })
      .catch((err) => {
        // 404 = account no longer exists in DB – clear it
        if (err.response?.status === 404) {
          localStorage.removeItem('account');
          localStorage.removeItem('accountId');
          setAccount(null);
        } else if (parsed) {
          // Network error – keep cached data
          setAccount(parsed);
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const saveAccount = useCallback((acc) => {
    localStorage.setItem('account', JSON.stringify(acc));
    if (acc?.accountId) {
      localStorage.setItem('accountId', acc.accountId);
    }
    setAccount(acc);
  }, []);

  // Called after login to rehydrate account from stored accountId
  const rehydrateAccount = useCallback(async () => {
    const accountId = localStorage.getItem('accountId');
    if (!accountId) return false;

    setAccountLoading(true);
    try {
      const res = await getBalance(accountId);
      // Merge with any existing stored data to preserve accountType, accountNumber, etc.
      const stored = localStorage.getItem('account');
      let parsed = null;
      try { parsed = stored ? JSON.parse(stored) : null; } catch { /* ignore */ }

      const updated = { ...(parsed ?? {}), accountId, balance: res.data.balance };
      saveAccount(updated);
      return true;
    } catch (err) {
      if (err.response?.status === 404) {
        // Account no longer exists – clear so user can create a new one
        localStorage.removeItem('account');
        localStorage.removeItem('accountId');
        setAccount(null);
      }
      return false;
    } finally {
      setAccountLoading(false);
    }
  }, [saveAccount]);

  const refreshBalance = useCallback(async () => {
    if (!account?.accountId) return;
    try {
      const res = await getBalance(account.accountId);
      const updated = { ...account, balance: res.data.balance };
      saveAccount(updated);
    } catch {
      // ignore
    }
  }, [account, saveAccount]);

  const clearAccount = useCallback(() => {
    localStorage.removeItem('account');
    localStorage.removeItem('accountId');
    setAccount(null);
  }, []);

  // Register callbacks with AuthContext so login/logout can trigger them
  useEffect(() => {
    registerRehydrate(rehydrateAccount);
  }, [registerRehydrate, rehydrateAccount]);

  useEffect(() => {
    registerClearAccount(clearAccount);
  }, [registerClearAccount, clearAccount]);

  return (
    <AccountContext.Provider
      value={{ account, accountLoading, saveAccount, rehydrateAccount, refreshBalance, clearAccount }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}
