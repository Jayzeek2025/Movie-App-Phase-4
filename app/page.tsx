"use client";

import { useEffect, useState } from "react";
import { Spin, Alert, Input, Pagination } from "antd";
import { debounce } from "lodash";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../lib/tmdb";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("batman");
  const [debouncedQuery, setDebouncedQuery] = useState("batman");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Debounce
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(query);
      setPage(1); // reset to page 1 when search changes
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [query]);

  // Fetch
  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/movies?query=${debouncedQuery}&page=${page}`
        );

        if (!res.ok) {
          throw new Error("Server error while fetching movies.");
        }

        const data = await res.json();

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError("Failed to load movies. Please check your connection.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [debouncedQuery, page]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: "50px auto" }}>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <>
      <div style={{ maxWidth: 400, marginBottom: 30 }}>
        <Input
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {movies.length === 0 ? (
  <div style={{ textAlign: "center", marginTop: 60 }}>
    <p style={{ fontSize: 18, color: "#888" }}>
      No movies found.
    </p>
  </div>
) : (
  <MovieGrid movies={movies} />
)}
      {totalPages > 1 && (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Pagination
            current={page}
            total={totalPages * 10}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </>
  );
}