# Fruit Clicker Game

Welcome to the **Fruit Clicker Game**! This is a simple clicker game I built as a Telegram Mini App using React and TypeScript. The purpose of this project is to explore the capabilities of Telegram Mini Apps while having fun with a basic game.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Testing in Telegram](#testing-in-telegram)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features

- Click on fruits to earn points.
- Simple and engaging user interface.
- Built with React and TypeScript.
- Designed for Telegram Mini Apps.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Whitelistedd/tma-clicker.git
   cd fruit-clicker-game
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Application

To run the application in development mode, execute:

```bash
npm run dev
```

You should see output similar to:

```
VITE v5.2.12 ready in 237 ms

➜  Local:   http://localhost:5173/fruit-clicker-game
➜  Network: http://172.18.16.1:5173/fruit-clicker-game
```

Open the Local link in your browser (e.g., `http://localhost:5173/fruit-clicker-game`).

## Testing in Telegram

For testing your app in Telegram:

1. Open `vite.config.ts`.
2. add the `basicSsl` function to enable HTTPS:

   ```typescript
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";
   import basicSsl from "@vitejs/plugin-basic-ssl";

   export default defineConfig({
     plugins: [react(), basicSsl()],
     server: {
       https: true,
     },
   });
   ```

3. Run the development script again:

```bash
npm run dev
```

4. Use the HTTPS link generated in your terminal to test your app within Telegram.

## Scripts

You can use the following scripts to manage your application:

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Build for Production**:
  ```bash
  npm run build
  ```
- **Lint Code**:
  ```bash
  npm run lint
  ```
- **Deploy to GitHub Pages**:
  ```bash
  npm run deploy
  ```

## Contributing

Feel free to fork this repository and make changes as you see fit! Contributions, issues, and feature requests are welcome.

## License

This project is licensed under the MIT License.
