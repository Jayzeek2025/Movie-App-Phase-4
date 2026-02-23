🎬 Movie Explorer App

A full-stack Movie Search and Rating application built with Next.js 15 (App Router) and deployed on Vercel.

🚀 Live Deployment

🔗 Vercel Deployment:

movie-explorer-app-git-main-jcs-projects-db783351.vercel.app

📌 Project Overview

Movie Explorer allows users to:

🔍 Search movies using TMDB API
⭐ Rate movies using a guest session
📂 View rated movies in a separate tab
🎨 View movie details including:

Poster

Overview

Release date

Average rating (color-coded badge)

📄 Paginate search results

This project demonstrates:

API route handling in Next.js App Router
Server-side data fetching
Environment variable configuration
Guest session authentication
Deployment to Vercel

🛠 Tech Stack

Next.js 15 (App Router)
TypeScript
Ant Design (UI components)
TMDB API
Vercel (Deployment)
ESLint

🧩 Features Implemented
✅ Search Functionality

Debounced search input
Pagination support
Error handling with user feedback

✅ Guest Session Authentication

Automatically creates guest session
Stores session in localStorage
Persists user ratings

✅ Movie Rating

5-star rating system
Sends rating to TMDB API
Updates Rated tab dynamically

✅ Rated Movies Tab

Fetches rated movies for current guest session
Displays user-rated movies separately

✅ Genre API Integration

Fetches genre list from TMDB
Context-based state management

✅ Production Ready

Lint checks passed
TypeScript validation passed
Successfully deployed on Vercel
