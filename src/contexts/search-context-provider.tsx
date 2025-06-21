'use client';
import { createContext, useState } from 'react';

type TSearchContextProvider = {
  children: React.ReactNode;
};
type TSearchContext = {
  searchQuery: string;
  handleChangeSearchQuery: (newValue: string) => void;
};
export const searchContext = createContext<TSearchContext | null>(null);

export default function SearchContextProvider({
  children
}: TSearchContextProvider) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };
  return (
    <searchContext.Provider value={{ searchQuery, handleChangeSearchQuery }}>
      {children}
    </searchContext.Provider>
  );
}
