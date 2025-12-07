# Tawann Space - Frontend

A modern blog and article management platform built with React and Tailwind CSS. This platform provides a seamless experience for reading, writing, and managing blog posts with features for both regular users and administrators.

## 🚀 Features

### For Readers
- 📖 Browse and read articles by category
- 🔍 Search functionality for finding specific content
- 💬 Comment on articles
- ❤️ Like and react to posts
- 🔗 Share articles via social media

### For Members
- 👤 User profile management
- ✍️ Comment on articles
- ❤️ Like posts
- 🔐 Secure authentication
- 🔑 Password reset functionality

### For Administrators
- 📝 Create, edit, and delete articles
- 🗂️ Category management
- 🔔 Real-time notifications for comments and likes
- 📊 Article management dashboard
- 👥 User interaction tracking
- 🎨 Rich text editor with markdown support

## 🛠️ Tech Stack

### Core
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Components & Libraries
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **React Spinners** - Loading indicators with DotLoader
- **Embla Carousel** - Smooth carousel component
- **Sonner** - Toast notifications

### Data & API
- **Axios** - HTTP client for API requests
- **JWT Decode** - JWT token handling

### Markdown & Styling
- **React Markdown** - Markdown rendering
- **Remark GFM** - GitHub Flavored Markdown support
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - Merge Tailwind classes

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── admin/          # Admin-specific components
│   │   ├── AdminNotification.jsx
│   │   ├── ArticleManagement.jsx
│   │   ├── CategoryManagement.jsx
│   │   └── ...
│   ├── auth/           # Authentication components
│   │   ├── AuthenticationRoute.jsx
│   │   └── ProtectedRoute.jsx
│   ├── form/           # Form components
│   │   ├── LoginForm.jsx
│   │   ├── SignUpForm.jsx
│   │   └── ...
│   ├── modal/          # Modal dialogs
│   ├── navbar/         # Navigation components
│   │   ├── AdminNavbar.jsx
│   │   ├── MemberNavbar.jsx
│   │   └── PublicNavbar.jsx
│   ├── post/           # Post-related components
│   │   ├── PostSection.jsx
│   │   ├── CommentBox.jsx
│   │   └── ShareBar.jsx
│   └── ui/             # UI primitives
│       ├── Loading.jsx
│       └── ...
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── ViewPostPage.jsx
│   ├── ProfilePage.jsx
│   └── ...
├── context/            # React context providers
│   └── authentication.jsx
├── lib/                # Utility libraries
├── utils/              # Helper functions
└── assets/             # Static assets
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Pimtawann/tawann-space.git
cd tawann-space
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔑 Demo Credentials

### Admin Account
For testing admin features (article management, notifications, etc.):
```
Email: admin@mail.com
Password: admin123
```

### Regular User Account
For testing member features (commenting, liking):
```
Email: user@mail.com
Password: user123
```

> ⚠️ **Note:** This is a demo project. Please be respectful and avoid deleting important content. Data may be reset periodically.

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎨 Key Features Implementation

### Authentication System
- JWT-based authentication with token management
- Protected routes for members and admins
- Role-based access control (Public/User/Admin)
- Secure login and registration flow
- Password reset functionality

### Notification System
- Real-time notification system for admins
- Notifications for comments and likes
- Mark as read functionality with database persistence
- Notification dropdown in admin navbar
- Full notification page with pagination
- Badge indicator for unread notifications

### Article Management
- Create articles with markdown support
- Rich text editor for content
- Category-based organization
- Image upload and management
- Edit and delete functionality
- Article status (published/draft)

### User Experience
- Fully responsive design for all screen sizes
- Loading states with elegant DotLoader spinner
- Toast notifications for user actions
- Smooth page transitions
- Consistent cursor states on all interactive elements

## 🔐 User Roles

1. **Public Users**
   - Browse and read articles
   - Search for content
   - View categories

2. **Members**
   - All public user features
   - Comment on articles
   - Like posts
   - Manage profile

3. **Admins**
   - All member features
   - Create, edit, delete articles
   - Manage categories
   - View notifications
   - Access admin panel

## 🌐 API Integration

The frontend connects to the backend API at:
- Production: `https://tawann-space-db-api.vercel.app`

### API Endpoints

**Authentication**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/get-user` - Get current user
- `PUT /auth/update-profile` - Update user profile
- `PUT /auth/reset-password` - Reset password

**Articles**
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get single post
- `POST /posts` - Create post (admin)
- `PUT /posts/:id` - Update post (admin)
- `DELETE /posts/:id` - Delete post (admin)

**Categories**
- `GET /auth/categories` - Get all categories
- `POST /auth/categories` - Create category (admin)
- `PUT /auth/categories/:id` - Update category (admin)
- `DELETE /auth/categories/:id` - Delete category (admin)

**Notifications**
- `GET /auth/notifications` - Get notifications (admin)
- `POST /auth/notifications/read` - Mark as read (admin)

**Comments & Interactions**
- `GET /posts/:id/comments` - Get post comments
- `POST /posts/:id/comments` - Add comment
- `POST /posts/:id/like` - Like post
- `DELETE /posts/:id/like` - Unlike post

---

Built with ❤️ using React 19 and Tailwind CSS 4
