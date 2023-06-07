# Use an official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the all of the application code to the working directory
COPY . .

# Install all the depedencies
RUN yarn install

# Build the typescript code
RUN yarn build

# Copy the all of the application code to the working directory
COPY . .

# Expose port 8080
EXPOSE 8080

# Set the command to run your application
CMD ["yarn", "start"]