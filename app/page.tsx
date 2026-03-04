"use client";

import { useEffect, useState } from "react";
import { Spin, Alert, Input, Pagination, Tabs } from "antd";
import debounce from "lodash/debounce";
import MovieGrid from "../components/MovieGrid";
import { Movie } from "../lib/tmdb";

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("batman");
  const [debouncedQuery, setDebouncedQuery] = useState("batman");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // ✅ NEW: Guest Session State
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

  // After guest session effect

  useEffect(() => {
    if (!guestSessionId) return;

    async function loadRatedMovies() {
      try {
        const res = await fetch(`/api/rated?guestSessionId=${guestSessionId}`);

        if (!res.ok) {
          throw new Error("Failed to fetch rated movies");
        }

        const data = await res.json();
        setRatedMovies(data.results);
      } catch (err) {
        console.error("Rated fetch error:", err);
      }
    }

    // Initial load
    loadRatedMovies();

    const handler = () => {
      setTimeout(() => {
        loadRatedMovies();
      }, 500);
    };

    window.addEventListener("rated-updated", handler);

    return () => {
      window.removeEventListener("rated-updated", handler);
    };
  }, [guestSessionId]);

  // ✅ NEW: Initialize Guest Session
  useEffect(() => {
    async function initGuestSession() {
      const storedSession = localStorage.getItem("guestSessionId");

      if (storedSession) {
        setGuestSessionId(storedSession);
        return;
      }

      try {
        const res = await fetch("/api/guest-session");

        if (!res.ok) {
          throw new Error("Failed to create guest session");
        }

        const data = await res.json();

        localStorage.setItem("guestSessionId", data.guest_session_id);
        setGuestSessionId(data.guest_session_id);
      } catch (err) {
        console.error("Guest session error:", err);
      }
    }

    initGuestSession();
  }, []);

  // Debounce
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 500);

    handler();

    return () => {
      handler.cancel();
    };
  }, [query]);

  // Fetch Movies
  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/movies?query=${debouncedQuery}&page=${page}`,
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
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: "50px auto" }}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <Tabs
      defaultActiveKey="search"
      items={[
        {
          key: "search",
          label: "Search",
          children: (
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
          ),
        },
        {
          key: "rated",
          label: "Rated",
          children:
            ratedMovies.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: 60 }}>
                <p style={{ fontSize: 18, color: "#888" }}>
                  No rated movies yet.
                </p>
              </div>
            ) : (
              <MovieGrid movies={ratedMovies} />
            ),
        },
      ]}
    />
  );
}
