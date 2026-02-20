import { Row, Col } from "antd";
import { Movie } from "../lib/tmdb";
import MovieCard from "./MovieCard";

interface Props {
  movies: Movie[];
}

export default function MovieGrid({ movies }: Props) {
  return (
    <Row gutter={[24, 24]}>
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}
