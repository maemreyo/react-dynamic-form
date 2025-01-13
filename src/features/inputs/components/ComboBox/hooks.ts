import debounce from 'lodash/debounce';
import { useState, useCallback, useRef } from 'react';
import { SearchParams, SearchResponse, Item } from './types';

export const useSearch = (
  searchApi: (params: SearchParams) => Promise<SearchResponse<any>>,
  transformResponse: (item: any) => Item,
  debounceTime: number = 300
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = useCallback(
    async (query: string, page: number = 0) => {
      try {
        // Cancel previous request if exists
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();

        setIsLoading(true);
        setError(null);

        const response = await searchApi({
          query,
        });

        const transformedItems = response.data.map(transformResponse);

        setSearchResults(
          page === 0
            ? transformedItems
            : (prev) => [...prev, ...transformedItems]
        );
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError('Failed to fetch search results');
          setSearchResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [searchApi, transformResponse]
  );

  const debouncedSearch = useCallback(
    debounce((query: string) => handleSearch(query), debounceTime),
    [handleSearch, debounceTime]
  );

  return {
    searchTerm,
    setSearchTerm,
    isLoading,
    error,
    searchResults,
    debouncedSearch,
    handleSearch,
  };
};
