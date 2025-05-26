# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the app (if needed)
RUN npm run build

# Expose port (adjust as needed)
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
