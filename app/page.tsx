import { fetchMovies } from "../lib/tmdb";
import MovieGrid from "../components/MovieGrid";

export default async function HomePage() {
  const movies = await fetchMovies();

  return <MovieGrid movies={movies} />;
}
