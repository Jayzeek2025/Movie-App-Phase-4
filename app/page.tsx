"use client";

import { useEffect, useState } from "react";
import { Spin, Alert } from "antd";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../lib/tmdb";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        const res = await fetch("/api/movies");

        if (!res.ok) {
          throw new Error("Server error while fetching movies.");
        }

        const data = await res.json();
        setMovies(data);
      } catch (err) {
        setError("Failed to load movies. Please check your connection.");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

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

  return <MovieGrid movies={movies} />;
}