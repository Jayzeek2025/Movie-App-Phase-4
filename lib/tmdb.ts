export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average?: number;
  genre_ids?: number[];
  rating?: number;
}

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

//
// 🔹 Search Movies
//
export async function fetchMovies(query: string, page: number) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}

//
// 🔹 Create Guest Session
//
export async function createGuestSession() {
  const res = await fetch(
    `${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to create guest session");
  return res.json();
}

//
// 🔹 Rate Movie
//
export async function rateMovie(
  movieId: number,
  rating: number,
  guestSessionId: string,
) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: rating }),
    },
  );

  if (!res.ok) throw new Error("Failed to rate movie");
  return res.json();
}

//
// 🔹 Fetch Rated Movies
//
export async function fetchRatedMovies(guestSessionId: string, page: number) {
  const res = await fetch(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}&page=${page}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch rated movies");
  return res.json();
}

//
// 🔹 Fetch Genres
//
export async function fetchGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch genres");
  return res.json();
}
