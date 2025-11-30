# FaceHook Web App

A simple social media style front end built with React. It connects to a provided backend API and implements authentication, routing, profile management, and post interactions.

## Features

- User login and registration
- JWT token and refresh token flow
- Protected routes with React Router
- Axios for API calls
- React Context API and Reducers for state
- React Hook Form for validation
- Tailwind CSS UI
- Create edit delete posts
- Like and comment on posts
- Update profile bio and profile image
- Logout and token persistence

## Tech Stack

- React
- React Router DOM
- Context API and Reducer
- Axios
- JWT with refresh token
- React Hook Form
- Tailwind CSS

## How It Works

- User logs in
- Server returns access and refresh tokens
- Axios attaches tokens to all API requests
- When access token expires refresh token is used
- Protected pages require a valid token
- Users can post edit profile like comment and update their profile

## Setup

1. Install packages  
   npm install
2. Start the app  
   npm run dev

## Note

Backend was not built in this project. All features are implemented using an external API.
