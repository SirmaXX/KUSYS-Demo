# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Build the React app for production
RUN npm run build

# Set the command to start the server
CMD ["npm", "start"]