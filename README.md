# GitHub Repository Discoverer

A beautiful, intuitive application to explore GitHub users and their repositories with advanced filtering capabilities.

<img width="1658" alt="image" src="https://github.com/user-attachments/assets/acd06c13-0e82-446f-a169-90ff7541c3c6" />

## Project Overview

GitHub Repository Discoverer is a React application that allows users to:

- Search for GitHub users by username
- View detailed user profiles
- Browse through all public repositories of a user
- Filter repositories by name/description and programming language
- View repository details like stars, forks, and last update time

The application is built with a focus on user experience, smooth animations, and responsive design following Apple's design principles.

## Technologies Used

- React with TypeScript
- React Router for navigation
- TanStack Query for data fetching
- Tailwind CSS for styling
- Shadcn UI for component library
- Sonner for toast notifications
- GitHub REST API

## Running the Project

To run the project locally:

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Features

- **User Search:** Find any GitHub user by username
- **Repository Filtering:** Filter repositories by name, description, or programming language
- **Responsive Design:** Works beautifully on all device sizes
- **Smooth Animations:** Apple-inspired animations and transitions
- **Error Handling:** Graceful error handling with user-friendly messages
- **URL Sharing:** Share search results via URL

## Future Improvements

- Implement pagination for users with many repositories
- Add sorting options (by stars, last updated, etc.)
- Add dark mode toggle
- Add GitHub authentication to increase API rate limits
- Implement GraphQL version using GitHub's v4 API
- Add repository comparison feature
- Add Storybook for component documentation
- Add comprehensive test suite

## API Usage

The application uses the GitHub REST API to fetch data:

- User data: `https://api.github.com/users/{username}`
- Repository data: `https://api.github.com/users/{username}/repos`

No authentication is required, but API rate limits apply.

## Created For

This project was created as a coding challenge for MVST GmbH.
Thanks for the opportunity!
