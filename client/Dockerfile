# Stage 1: Build the application using Vite
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build  # This will generate the "dist" directory

# Stage 2: Serve the built application using Nginx
FROM nginx:alpine

# Ensure the target directory exists in the nginx container
RUN mkdir -p /usr/share/nginx/html

# Copy the dist directory to the Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to access the app
EXPOSE 80

# Start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
