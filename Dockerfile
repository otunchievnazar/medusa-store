# Development Dockerfile for Medusa
FROM node:20-alpine

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory
WORKDIR /server

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install all dependencies using pnpm
RUN pnpm install

# Copy source code
COPY . .

# Expose the port Medusa runs on
EXPOSE 9000

# Start with migrations and then the development server
CMD ["./start.sh"]

