import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { SearchHistory, Product } from '../../types';
import { STORAGE_KEYS } from '../../constants';
import { getStorageItem, setStorageItem, generateId } from '../../utils';
import { mockApi } from '../../services';
import { POPULAR_KEYWORDS } from '../../constants';

interface SearchContextValue {
  query: string;
  results: Product[];
  isSearching: boolean;
  history: SearchHistory[];
  popularKeywords: string[];
  setQuery: (q: string) => void;
  search: (q: string) => Promise<void>;
  addToHistory: (q: string) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [history, setHistory] = useState<SearchHistory[]>(() =>
    getStorageItem<SearchHistory[]>(STORAGE_KEYS.searchHistory, [])
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.searchHistory, history);
  }, [history]);

  const setQuery = useCallback((q: string) => {
    setQueryState(q);
  }, []);

  const search = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    const { products } = await mockApi.search(q);
    setResults(products);
    setIsSearching(false);
  }, []);

  const addToHistory = useCallback((q: string) => {
    if (!q.trim()) return;
    setHistory(prev => {
      const filtered = prev.filter(h => h.query.toLowerCase() !== q.toLowerCase());
      return [
        { id: generateId(), query: q, timestamp: new Date().toISOString() },
        ...filtered,
      ].slice(0, 10);
    });
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  const removeFromHistory = useCallback((id: string) => {
    setHistory(prev => prev.filter(h => h.id !== id));
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query,
        results,
        isSearching,
        history,
        popularKeywords: POPULAR_KEYWORDS,
        setQuery,
        search,
        addToHistory,
        clearHistory,
        removeFromHistory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextValue => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
};
