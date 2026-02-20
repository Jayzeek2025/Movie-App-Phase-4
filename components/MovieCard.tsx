"use client";

import { Card, Tag, Rate } from "antd";
import { format } from "date-fns";
import { truncateText } from "../utils/truncateText";
import { Movie } from "../lib/tmdb";
import { useEffect, useState } from "react";

const { Meta } = Card;

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const [userRating, setUserRating] = useState<number>(
    movie.rating || 0
  );

  useEffect(() => {
    const session = localStorage.getItem("guestSessionId");
    if (session) {
      setGuestSessionId(session);
    }

    // If movie comes from rated endpoint, it includes rating
    if ((movie as any).rating) {
      setUserRating((movie as any).rating);
    }
  }, [movie]);

  const handleRate = async (value: number) => {
    if (!guestSessionId) return;

    try {
      const res = await fetch("/api/rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: movie.id,
          rating: value,
          guestSessionId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to rate movie");
      }

      setUserRating(value);

      // 🔥 Trigger refresh by reloading page data
      window.dispatchEvent(new Event("rated-updated"));
    } catch (error) {
      console.error("Rating error:", error);
    }
  };

  // 🎨 Rating Circle Color Logic
  const getRatingColor = (rating: number) => {
    if (rating <= 3) return "#E90000";
    if (rating <= 5) return "#E97E00";
    if (rating <= 7) return "#E9D100";
    return "#66E900";
  };

  return (
    <Card
      hoverable
      style={{ position: "relative" }}
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
      {/* 🔵 Rating Circle (TMDB Average) */}
      {movie.vote_average !== undefined && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: getRatingColor(movie.vote_average),
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
        >
          {movie.vote_average.toFixed(1)}
        </div>
      )}

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

            {/* ⭐ Star Rating */}
            <div style={{ marginTop: 10 }}>
              <Rate
                allowHalf
                value={userRating}
                onChange={handleRate}
              />
            </div>

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