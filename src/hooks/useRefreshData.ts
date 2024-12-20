import { useState } from 'react';
import { refreshDataSource } from '../lib/api/refresh';
import { useStoreData } from './useStoreData';

export function useRefreshData() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { mutate } = useStoreData();

  const refresh = async () => {
    try {
      setIsRefreshing(true);
      
      // Refresh data source
      const success = await refreshDataSource();
      
      if (success) {
        // Force immediate revalidation
        await mutate(undefined, { 
          revalidate: true,
          rollbackOnError: true
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error during refresh:', error);
      return false;
    } finally {
      setIsRefreshing(false);
    }
  };

  return {
    refresh,
    isRefreshing
  };
}