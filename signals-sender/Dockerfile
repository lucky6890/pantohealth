###### Prod Env

# # Stage 1: Build the application
# FROM node:22 AS builder

# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # Stage 2: Create the production image
# FROM node:22 AS runner

# WORKDIR /app

# # Copy only necessary files from the builder stage
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist

# EXPOSE 3000

# CMD ["node", "dist/main.js"]


###### Dev Env
FROM node:22

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]