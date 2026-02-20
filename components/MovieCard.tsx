"use client";

import { Card, Tag } from "antd";
import { format } from "date-fns";
import { truncateText } from "../utils/truncateText";
import { Movie } from "../lib/tmdb";

const { Meta } = Card;

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={movie.title}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
        />
      }
    >
      <Meta
        title={movie.title}
        description={
          <>
            <p>{truncateText(movie.overview, 120)}</p>

            <p>
              Release:{" "}
              {movie.release_date
                ? format(new Date(movie.release_date), "PPP")
                : "N/A"}
            </p>

            <div style={{ marginTop: 8 }}>
              <Tag color="blue">Action</Tag>
              <Tag color="green">Drama</Tag>
            </div>
          </>
        }
      />
    </Card>
  );
}
