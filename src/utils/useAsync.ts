/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

export type UseAsyncType<T, P extends any[]> = [
  T | undefined,
  any,
  boolean,
  (...params: P) => void,
  boolean,
  (...params: P) => void
];

export const useAsync = <T, P extends any[]>(
  asyncFunction: (...params: P) => Promise<T>,
  defaultValue?: T,
  defaultLoading: boolean = false,
): [
  T | undefined,
  any,
  boolean,
  (...params: P) => void,
  boolean,
  (...params: P) => void
] => {
  const [loading, setLoading] = useState(defaultLoading);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const [data, setData] = useState<T | undefined>(defaultValue);

  const execute = useCallback(
    async (...params: Parameters<typeof asyncFunction>) => {
      try {
        setLoading(true);
        const fetchData = await asyncFunction(...params);
        setData(fetchData);
      } catch (e) {
        console.log(e);
        setError(e);
      }
      setLoading(false);
    },
    [asyncFunction]
  );

  const refresh = useCallback(
    async (...params: Parameters<typeof asyncFunction>) => {
      try {
        setRefreshing(true);
        const fetchData = await asyncFunction(...params);
        setData(fetchData);
      } catch (e) {
        console.log(e);
        setError(e);
      }
      setRefreshing(false);
    },
    [asyncFunction]
  );

  return [data, error, loading, execute, refreshing, refresh];
};
