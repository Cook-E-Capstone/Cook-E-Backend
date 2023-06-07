# Use an official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy all of the application code to the working directory
COPY . .

# Install all the dependencies
RUN yarn install

# Generate the Prisma Client
RUN npx prisma generate

# Build the TypeScript code
RUN yarn build

# Expose port 8080
EXPOSE 8080

# Start the application
CMD [ "yarn", "start" ]