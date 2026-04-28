import React, { createContext, useContext, useState, useEffect } from 'react';

type Currency = 'FC' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRate: number; // 1 USD = X FC
  formatPrice: (priceInFc: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('app_currency');
    return (saved as Currency) || 'FC';
  });

  const exchangeRate = 2800; // Example rate: 1$ = 2800 Fc

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('app_currency', c);
  };

  const formatPrice = (priceInFc: number) => {
    if (currency === 'USD') {
      const priceInUsd = priceInFc / exchangeRate;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(priceInUsd);
    }
    
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
    }).format(priceInFc) + ' Fc';
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRate, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
