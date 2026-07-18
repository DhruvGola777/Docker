# Docker Learning Project 🐳

Welcome to my Docker learning repository! This project documents my journey learning how to containerize applications using Docker and Docker Compose.

This repository is split into two distinct learning phases:

## 1. The `docker` Folder (The Basics)
This folder contains a simple, standalone Node.js Express server. It serves as an introduction to basic Dockerfiles.

**Concepts Learned:**
- **`Dockerfile`**: Writing instructions to package a Node.js app into an image.
- **Base Images**: Using `FROM node`.
- **Building Images**: Using `docker build` to create a runnable image.
- **Running Containers**: Using `docker run` to start the isolated application.

## 2. The `dockerCompose` Folder (Full-Stack Application)
This folder contains a complete, multi-container architecture. It runs a React frontend, a Node.js backend API, and a PostgreSQL database. It is a fully functional "Notes App".

**Concepts Learned:**
- **Microservices**: Separating the frontend and backend into two distinct containers.
- **Docker Compose**: Using a `docker-compose.yml` file to orchestrate multiple containers at once.
- **Container Networking**: Allowing the Node server to talk to the Postgres database simply by using the service name `db` (no IP addresses required!).
- **Docker Volumes**: Persisting the PostgreSQL database data to the host machine so notes are not lost when containers are destroyed.
- **Port Mapping**: Mapping internal container ports to localhost so the React app and API can be accessed from a web browser.

## How to Run the Full-Stack App

If you want to run the Notes App on your own machine, you do **not** need to install Node.js, React, or PostgreSQL! All you need is Docker.

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Clone this repository to your computer.
3. Open a terminal and navigate to the `dockerCompose` folder:
   ```bash
   cd dockerCompose
   ```
4. Start the application:
   ```bash
   docker compose up -d --build
   ```
5. Open your browser and go to `http://localhost:5173` to view the Notes App!

## Docker Hub Images
The images for the Notes App have been successfully published to Docker Hub. If you just want to run the app without building from source, you can use the `docker-compose.yml` file and point the image tags to:
- `dhruvgola/notes-server`
- `dhruvgola/notes-client`
