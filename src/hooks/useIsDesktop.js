import { useEffect, useState } from 'react';

const QUERY = '(min-width: 1024px)';

// Desktop screens use the side-by-side layouts from the Desktop mockups;
// below 1024px we keep the original mobile layouts unchanged.
export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const onChange = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}
