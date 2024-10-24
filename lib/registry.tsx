'use client';

import { useEffect, useState } from 'react';

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [windowInitialized, setWindowInitialized] = useState(false);

  useEffect(() => {
    setWindowInitialized(() => true);
  }, []);

  if (!windowInitialized) return null;
  if (typeof window !== 'undefined') return <>{children}</>;
}
