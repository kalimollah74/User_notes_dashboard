# Notes Dashboard

A simple full-stack web app where users can register, log in, and manage personal notes on a protected dashboard.

## Features

- User Signup & Login (JWT Authentication)
- Protected Dashboard (only logged-in users can access)
- Create, View, Search & Delete Notes
- Profile View & Update (name)
- Logout functionality
- Passwords securely hashed
- Frontend: React + CSS
- Backend: Node.js + Express + MongoDB

## Modules

User Module

- Register, Login, Profile Management

Notes Module

- Add, View, Search, Delete personal notes

## Security

- JWT-based route protection
- Auth middleware for verifying token
- Only owner can access their notes

## How to Run

Backend:
cd backend
npm install
npm run dev
