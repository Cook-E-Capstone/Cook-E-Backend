# Cook-E: Healthy cooking made easy

Cook-E is a mobile application that aims to simplify cooking by providing users with recipes based on the ingredients they have on hand and their health condition persona. With the current trend towards healthy eating, many people want to cook their meals at home using fresh ingredients.

## Tech Stack

- [Express](https://expressjs.com)
- [MySQL](https://www.mysql.com)
- [Prisma](https://www.prisma.io/)

### Documentation

[Documentation](https://documenter.getpostman.com/view/27869532/2s93sgYBDB)

## Setup and Installation

1. Clone repository

```
git clone "https://github.com/Cook-E-Capstone/Cook-E-Backend.git"
```

2. Install dependencies
npm
```
npm i
```

yarn
```
yarn
```

## Development Guide

### Non docker

1. Create environment variables

```
Create `.env` file containing required environment variables
```

2. Run app in development environment

npm
```
npm dev
```

yarn
```
yarn dev
```

## Database

### Table: User

| Column    | Attribute    |
| --------- | ------------ |
| id        | VARCHAR(191) |
| email     | VARCHAR(191) |
| name      | VARCHAR(191) |
| password  | VARCHAR(191) |
| createdAt | DATETIME(3)  |
| updatedAt | DATETIME(3)  |

### Table: Community

| Column    | Attribute    |
| --------- | ------------ |
| id        | VARCHAR(191) |
| title     | VARCHAR(191) |
| content   | VARCHAR(191) |
| pathfile  | VARCHAR(191) |
| userID    | VARCHAR(191) |
| createdAt | DATETIME(3)  |
| updatedAt | DATETIME(3)  |
