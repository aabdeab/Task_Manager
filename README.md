# Task Manager Frontend

A modern, responsive task management application built with React and Material-UI. This application allows users to manage projects and tasks with features like user authentication, project creation, task assignment, and real-time updates.

## 📋 Features

- **User Authentication**: Secure login and registration system
- **Project Management**: Create, view, and manage multiple projects
- **Task Management**: Add, edit, and track tasks within projects
- **Private Routes**: Protected pages requiring authentication
- **Responsive Design**: Mobile-friendly interface using Material-UI
- **Form Validation**: Client-side validation with React Hook Form
- **Toast Notifications**: User-friendly feedback using React Toastify

## 🛠️ Technologies Used

### Core
- **React 19.2.0** - JavaScript library for building user interfaces
- **Vite 7.2.4** - Next-generation frontend build tool
- **React Router DOM 7.11.0** - Declarative routing for React applications

### UI Framework
- **Material-UI (MUI) 7.3.6** - React component library for Material Design
- **@mui/icons-material** - Material Design icons
- **@emotion/react & @emotion/styled** - CSS-in-JS styling solution

### State & Forms
- **React Hook Form 7.69.0** - Performant forms with easy validation
- **Context API** - Built-in React state management for authentication

### HTTP & API
- **Axios 1.13.2** - Promise-based HTTP client

### Utilities
- **Day.js 1.11.19** - Lightweight date manipulation library
- **React Toastify 11.0.5** - Toast notifications

### Development Tools
- **ESLint** - Code linting and quality checks
- **Vite Plugin React** - Fast Refresh and JSX support

## 📁 Project Structure

```
Frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── ProjectCard.jsx
│   │   └── TaskItem.jsx
│   ├── context/        # React Context providers
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── ProjectDetails.jsx
│   │   └── Register.jsx
│   ├── services/       # API service layers
│   │   ├── authService.js
│   │   ├── projectService.js
│   │   └── taskService.js
│   ├── utils/          # Utility functions
│   │   ├── axiosConfig.js
│   │   └── constants.js
│   ├── App.css         # Global styles
│   ├── App.jsx         # Main app component
│   ├── index.css       # Root styles
│   └── main.jsx        # Application entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
└── eslint.config.js    # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16.x or higher)
- **npm** (version 7.x or higher) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or if you're using yarn:
   ```bash
   yarn install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory and add your API endpoint:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

#### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

#### Production Build

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

#### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

#### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 🔧 Configuration

### API Configuration

The API base URL is configured in [src/utils/axiosConfig.js](src/utils/axiosConfig.js). Update this file to point to your backend server.

### Vite Configuration

Build and development settings can be modified in [vite.config.js](vite.config.js).

### ESLint Configuration

Code quality rules are defined in [eslint.config.js](eslint.config.js).

## 📱 Available Routes

- `/login` - User login page
- `/register` - User registration page
- `/dashboard` - Main dashboard (protected)
- `/projects/:id` - Project details page (protected)

## 🔐 Authentication

The application uses JWT-based authentication. The authentication context is managed through React Context API and provides:
- User login/logout functionality
- Protected route access
- Persistent authentication state

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

AABDANE ABDELKARIM 

## 🙏 Acknowledgments

- Material-UI for the excellent component library
- Vite for the blazing-fast build tool
- React team for the amazing framework
