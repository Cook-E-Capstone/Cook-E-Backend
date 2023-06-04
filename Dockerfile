# Specify the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 8080

# Start the application
CMD ["yarn", "dev"]
