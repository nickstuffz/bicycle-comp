# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the TypeScript project
RUN tsc --noEmitOnError

# Expose the port your app runs on
EXPOSE 8080

# Define the command to run your app
CMD ["npm", "start"]
