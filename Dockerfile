FROM node:latest

# Change the working directory on the Docker image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the /app directory
COPY /movie-reviews/package.json /movie-reviews/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of project files into this image
COPY /movie-reviews/. .

# Expose application port
EXPOSE 80

# Start the application
CMD ["node", "index.js"]