# Backend Service for E-Commerce Website Final Project - Group #3

This repository contains the backend service for the E-Commerce website, developed as part of the TAP graduation software development cohort.

## Live Website
Access the live backend service at:
[https://backend-final-3.onrender.com](https://backend-final-3.onrender.com)

## Technologies Used
- **Backend Framework**: Express.js
- **Frontend Framework**: React.js (Different repo)
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment Platforms**: Render.com and Clever-Cloud
- **Collaboration Tools**: GitHub and GitHub Projects

## Installation and Setup
Follow the steps below to set up and run the project:

### Install Dependencies
```bash
npm install
```

### Database Migrations
- Run migration files:
  ```bash
  npm run migrate
  ```
- Revert a specific migration:
  ```bash
  npm run migrate:undo
  ```
- Revert all migrations:
  ```bash
  npm run migrate:undo-all
  ```

### Seed Database
Populate the database with initial data:
```bash
npm run seed
```

### Build for Production
- Remove the `dist` folder:
  ```bash
  npm run clean
  ```
- Copy production assets:
  ```bash
  npm run copy-assets
  ```
- Run ESLint for code quality checks:
  ```bash
  npm run lint
  ```
- Compile TypeScript to JavaScript:
  ```bash
  npm run tsc
  ```
- Build the `dist` folder by running all the above steps:
  ```bash
  npm run build
  ```

### Start the Server
- For production:
  ```bash
  npm run start
  ```
- For development:
  ```bash
  npm run serve
  ```

### Testing
- Run all tests every 24 hours:
  ```bash
  npm run test
  ```
- Run tests for pull requests:
  ```bash
  npm run test_pr
  ```

## API Documentation
Refer to the API documentation to explore available endpoints and their usage. Ensure you have the appropriate authentication tokens for accessing secure endpoints.

## Contributions
Team collaboration is managed through GitHub and GitHub Projects. Please follow the contribution guidelines to ensure smooth development workflows.

## Deployment
The service is deployed on:
- **Render.com**
- **Clever-Cloud**

For deployment instructions and updates, refer to the respective platform documentation.

---

For any questions or support, feel free to open an issue or contact the maintainers.


