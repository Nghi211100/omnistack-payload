import { Portfolio } from '@/payload-types'
import { useSearchParams } from 'next/navigation'
import {  TypedLocale } from 'payload'
import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  locale: TypedLocale, 
}

export const PortfolioHooks = ({ locale }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [portfolioData,setPortfolioData] = useState<Portfolio[]>([])
  const searchParams = useSearchParams();
  
  const category  = searchParams.get('category')

  const observer = useRef<IntersectionObserver | null>(null);

  const lastPortfolioElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/portfolios?page=${page}&category=${category}&locale=${locale}`)

      const data = await response.json();

      if (data.docs) {
        setPortfolioData(prevDevice => {
          if (page === 1) {
            return data?.docs || [];
          } else {
            return [...prevDevice, ...(data?.docs || [])];
          }
        });
        // Total pages tracked through hasMore flag
        setHasMore(page < data?.totalPages);
      }
    } catch (err) {
      console.log('fetching portfolio failed');

    } finally {
      setLoading(false);
    }
  }, [page, category]);

  // Reset page to 1 when category changes
  useEffect(() => {
    setPage(1);
    setPortfolioData([]); // Clear existing data when category changes
  }, [category]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);
  return {
    loading,
    portfolioData,
    lastPortfolioElementRef
  }
}
