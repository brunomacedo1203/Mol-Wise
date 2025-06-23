import { useEffect, useState } from 'react';
import { ChemicalCompound } from '@/features/catalog/domain/types/ChemicalCompound';

export function useCompoundData() {
  const [compounds, setCompounds] = useState<ChemicalCompound[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/inorganic-compounds.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCompounds(data);
        
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    compounds,
    isLoading,
    error,
  };
}
