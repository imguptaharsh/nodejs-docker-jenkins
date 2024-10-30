# Use an official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on, dynamically using APP_PORT if set
ARG APP_PORT=3000
ENV PORT=$APP_PORT
EXPOSE $PORT

# Command to run the application
CMD ["node", "app.js"] // Adjust if your main entry file is named differently
