# 🎬 Movie Explorer App

## 🌍 Live Deployment

👉 https://movie-explorer-app-git-main-jcs-projects-db783351.vercel.app

---

## 📌 Project Overview

Movie Explorer is a full-stack Movie Search and Rating application built with **Next.js 15 (App Router)** and deployed on **Vercel**.

The application integrates with the **TMDB API** and allows users to search, view, and rate movies using a guest session.

---

## 🚀 Features

### 🔍 Movie Search
- Debounced search input
- Pagination support
- Error handling with user feedback

### ⭐ Movie Rating
- 5-star rating system
- Ratings sent to TMDB API
- Updates rated list dynamically

### 👤 Guest Session Authentication
- Automatically creates guest session
- Stores session in localStorage
- Persists user ratings across refresh

### 📂 Rated Movies Tab
- Fetches rated movies for current guest session
- Displays user-rated movies separately

### 🎨 Movie Details Page
- Poster
- Overview
- Release date
- Average rating (color-coded badge)

### 🎭 Genre API Integration
- Fetches genre list from TMDB
- Context-based state management

---

## 🛠 Tech Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Ant Design**
- **TMDB API**
- **Vercel (Deployment)**
- **ESLint**

---

## 🔐 Environment Variables

This project requires a TMDB API key.
