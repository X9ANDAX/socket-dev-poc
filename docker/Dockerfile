# Socket.dev POC Dockerfile
# This Dockerfile is intentionally insecure for testing Socket.dev detection

FROM node:18-alpine

# Socket.dev should flag:
# - Use of package manager in Dockerfile
# - Potential for malicious packages in containerized environment

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/ ./packages/

# Install dependencies (Socket.dev should scan these)
# In production, you'd run socket npm install instead of npm install
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Set environment variable (Socket.dev may flag hardcoded configs)
ENV NODE_ENV=production

# Run the application
CMD ["npm", "start"]

# Security concerns Socket.dev might detect:
# 1. No package integrity verification
# 2. No lockfile verification
# 3. Running as root user
# 4. No layer caching for security scanning
# 5. Installing devDependencies in production image

# Better Dockerfile with Socket.dev integration:
# FROM node:18-alpine
# RUN npm install -g @socketsecurity/cli
# WORKDIR /app
# COPY package*.json ./
# RUN socket npm install --production
# COPY . .
# USER node
# CMD ["npm", "start"]
