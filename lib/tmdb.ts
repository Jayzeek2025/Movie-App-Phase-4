export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  genre_ids?: number[];
  vote_average?: number;
}

const BASE_URL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  "Content-Type": "application/json",
};

export async function fetchMovies(query: string, page: number) {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    {
      headers,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  return res.json();
}

//
// 🔹 NEW: Create Guest Session
//
export async function createGuestSession() {
  const res = await fetch(
    `${BASE_URL}/authentication/guest_session/new`,
    {
      headers,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create guest session");
  }

  return res.json();
}

//
// 🔹 NEW: Rate Movie
//
export async function rateMovie(
  movieId: number,
  rating: number,
  guestSessionId: string
) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ value: rating }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to rate movie");
  }

  return res.json();
}

//
// 🔹 NEW: Fetch Rated Movies
//
export async function fetchRatedMovies(
  guestSessionId: string,
  page: number
) {
  const res = await fetch(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?page=${page}`,
    {
      headers,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch rated movies");
  }

  return res.json();
}

//
// 🔹 NEW: Fetch Genres
//
export async function fetchGenres() {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list`,
    {
      headers,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  return res.json();
}