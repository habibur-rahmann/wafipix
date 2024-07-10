"use client";

import { useEffect, useState } from "react";

export const useCursorClient = () => {
  const [cursorClient, setWindowClientProperty] = useState<{
    clientX: number;
    clientY: number;
    screenX: number;
    screenY: number;
  }>({ clientX: 0, clientY: 0, screenX: 0, screenY: 0 });
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setWindowClientProperty((prev) => {
        return {
          ...prev,
          clientX: e.clientX,
          clientY: e.clientY,
          screenX: e.screenX,
          screenY: e.screenY,
        };
      });
    });

    return () => {
      window.removeEventListener("mousemove", (e) => {});
    };
  }, []);

  return {
    ...cursorClient,
  };
};

export const useScrollClient = () => {
  const [scrollClient, setScrollClientProperty] = useState<{
    scrollX: number;
    scrollY: number;
  }>({ scrollX: 0, scrollY: 0 });

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScrollClientProperty((prev) => {
        return {
          ...prev,
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        };
      });
    });

    return () => {
      window.removeEventListener("mousemove", (e) => {});
    };
  }, []);

  return {
    ...scrollClient,
  };
};
