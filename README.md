# React CRUD Todo Manager

A modern, responsive Todo management application built with React, TypeScript, and Tailwind CSS. Features full CRUD operations with a beautiful, intuitive user interface.

## Features

- ✅ **Create** - Add new todos with validation
- 📖 **Read** - View all todos with search functionality
- ✏️ **Update** - Edit todo titles and mark as completed
- 🗑️ **Delete** - Remove todos with confirmation
- 🔍 **Search** - Find todos by ID
- 📊 **Statistics** - View total, completed, and pending todos
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Real-time Updates** - Instant UI updates after operations
- 🚀 **Performance** - Optimized with React hooks and efficient state management

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Linting**: ESLint

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react_crud
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
   
   **Note**: You'll need to set up a backend API or use a mock service. The app expects these endpoints:
   - `GET /current` - Fetch all todos
   - `POST /current` - Create a new todo
   - `PUT /current/:id` - Update a todo
   - `DELETE /current/:id` - Delete a todo

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Project Structure

```
src/
├── api/           # API functions for CRUD operations
├── components/    # React components
│   ├── common/    # Shared components (Loading, Error, etc.)
│   └── todos/     # Todo-specific components
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── main.tsx       # Application entry point
```

## API Endpoints

The application expects a RESTful API with the following structure:

### Get All Todos
```http
GET /current
```

### Create Todo
```http
POST /current
Content-Type: application/json

{
  "title": "Todo title",
  "isCompleted": false
}
```

### Update Todo
```http
PUT /current/:id
Content-Type: application/json

{
  "title": "Updated title",
  "isCompleted": true
}
```

### Delete Todo
```http
DELETE /current/:id
```

## Features in Detail

### Create Todo
- Form validation (minimum 3 characters)
- Real-time character count
- Loading states with spinner
- Error handling

### Edit Todo
- Inline editing with save/cancel options
- Validation to prevent empty titles
- Optimistic updates for better UX

### Delete Todo
- Confirmation dialog to prevent accidental deletion
- Loading states during deletion

### Search
- Search todos by ID
- Clear search functionality
- Real-time filtering

### Responsive Design
- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly interactions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Troubleshooting

### Common Issues

1. **"Missing ENV: VITE_API_URL is not defined"**
   - Create a `.env` file with `VITE_API_URL` set to your API endpoint

2. **Build errors**
   - Ensure you're using Node.js 18+ and the latest pnpm version
   - Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`

3. **Styling issues**
   - Make sure Tailwind CSS is properly imported in `src/main.css`

### Getting Help

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your environment variables are set correctly
3. Ensure your backend API is running and accessible
4. Check that all dependencies are properly installed
