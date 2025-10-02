FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000

# Expose NestJS default port
EXPOSE 3000

# Run NestJS in watch mode (hot reload)
CMD ["npm", "run", "dev"]
