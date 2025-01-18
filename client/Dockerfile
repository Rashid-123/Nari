# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Debug: List contents of /app
RUN ls -la /app

# Build the app using Vite
RUN npm run build

# Debug: Verify the dist directory exists
RUN ls -la /app/dist

# Production stage
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy the build output from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
