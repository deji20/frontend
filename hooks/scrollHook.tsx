import { useEffect } from "react";

interface ScrollEvent{
  absolute: {x: number, y: number}
}

export default function UseScroll(onScroll: (event: ScrollEvent) => void){
  
  useEffect(() => {
    const Scroll = (e: any) => {
      const event: ScrollEvent = {
        absolute: {x: e.target.documentElement.scrollTop, y: e.target.documentElement.scrollLeft}
      } 
      onScroll(event);
    };
    window.addEventListener("scroll", Scroll);
    return () => window.removeEventListener("scroll", Scroll);
  }, []);
}