# Use an official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install all the depedencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the typescript code
RUN yarn build

# Copy dist directory to working directory
COPY dist /app/dist

# Expose port 8080
EXPOSE 8080

# Set the command to run your application
CMD ["yarn", "start"]