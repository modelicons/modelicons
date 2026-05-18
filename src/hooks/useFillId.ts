import { useId, useMemo } from 'react';

const kebab = (s: string) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const useFillId = (namespace: string) => {
  const uniqueId = useId();
  return useMemo(() => {
    const id = `llmicons-${kebab(namespace)}-${uniqueId}`;
    return { fill: `url(#${id})`, id };
  }, [namespace, uniqueId]);
};

export const useFillIds = (namespace: string, length: number) => {
  const uniqueId = useId();
  return useMemo(() => {
    const ns = kebab(namespace);
    return Array.from({ length }, (_, i) => {
      const id = `llmicons-${ns}-${i}-${uniqueId}`;
      return { fill: `url(#${id})`, id };
    });
  }, [namespace, length, uniqueId]);
};
