import { useEffect, useState } from 'react';
useEffect

export default function useScript(url:string, functionName?: string): [boolean, any]{
  const [loaded, isLoaded] = useState<boolean>(false)
  const [script, setScript] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.onload = () => {
      isLoaded(true);
      window[(functionName as any)] && setScript(window[(functionName as any)])
    }
    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
  return [loaded, script];
};