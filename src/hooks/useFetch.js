import { useState, useEffect, useCallback, useRef } from "react";
import { apiClient } from "../services/api";

export function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(options.initialData ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const execute = useCallback(async (overrideEndpoint) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      setError(null);
      const result = await apiClient.get(overrideEndpoint || endpoint, {
        signal: controller.signal,
      });
      if (!controller.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      if (err.name === "AbortError" || controller.signal.aborted) return;
      setError(err.message || "Error al cargar datos");
      console.error(`useFetch error [${endpoint}]:`, err);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [endpoint]);

  useEffect(() => {
    execute();
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [execute]);

  return { data, loading, error, refetch: execute };
}
