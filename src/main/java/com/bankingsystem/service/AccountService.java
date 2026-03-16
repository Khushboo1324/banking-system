package com.bankingsystem.service;

import com.bankingsystem.exception.AccountNotFoundException;
import com.bankingsystem.exception.InsufficientBalanceException;
import com.bankingsystem.model.Account;
import com.bankingsystem.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(Account account) {
        account.setBalance(0.0);
        return accountRepository.save(account);
    }
    public Double getBalance(String accountId) {
        return getAccountById(accountId).getBalance();
    }

    public Account deposit(String accountId, Double amount) {
        Account account = getAccountById(accountId);
        account.setBalance(account.getBalance() + amount);
        return accountRepository.save(account);
    }

    public Account withdraw(String accountId, Double amount) {
        Account account = getAccountById(accountId);

        if (account.getBalance() < amount) {
            throw new InsufficientBalanceException("Insufficient balance");
        }

        account.setBalance(account.getBalance() - amount);
        return accountRepository.save(account);
    }
    @Cacheable(value = "accounts", key = "#accountId")
    public Account getAccountById(String accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() ->
                        new AccountNotFoundException("Account not found"));
    }
    @CacheEvict(value = "accounts", key = "#account.id")
    public Account save(Account account) {
        return accountRepository.save(account);
    }
}
