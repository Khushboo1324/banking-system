import api from './axiosInstance';

export const createAccount = (userId, data) =>
  api.post(`/accounts?userId=${userId}`, data);

export const getBalance = (accountId) =>
  api.get(`/accounts/${accountId}/balance`);

// Rehydrate account by fetching its balance (used after login to restore session)
export const getAccountById = async (accountId) => {
  const res = await api.get(`/accounts/${accountId}/balance`);
  return { balance: res.data.balance };
};

// deposit expects { amount, accountId } per backend TransactionRequestDto validation
export const deposit = (accountId, data) =>
  api.post(`/accounts/${accountId}/deposit`, { amount: data.amount, accountId });

// withdraw expects { amount, accountId } per backend TransactionRequestDto validation
export const withdraw = (accountId, data) =>
  api.post(`/accounts/${accountId}/withdraw`, { amount: data.amount, accountId });
