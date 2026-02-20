"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
}

interface GenreContextType {
  genres: Genre[];
}

const GenreContext = createContext<GenreContextType>({
  genres: [],
});

export const useGenres = () => useContext(GenreContext);

export function GenreProvider({ children }: { children: React.ReactNode }) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function loadGenres() {
      try {
        const res = await fetch("/api/genres");

        if (!res.ok) {
          throw new Error("Failed to fetch genres");
        }

        const data = await res.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Genre fetch error:", error);
      }
    }

    loadGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres }}>
      {children}
    </GenreContext.Provider>
  );
}