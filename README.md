# BlogHub

A modern full-stack blog platform built with React and Vite. BlogHub lets users sign up, write and manage their own blog posts, and explore community content — with a **personal, real-time dashboard** that shows only your own stats and analytics.

## Features

### Public Site
- **Home** — Hero section, featured blogs, categories, trending posts, and newsletter signup
- **Blogs** — Browse, search, filter, and sort all posts (yours + sample API posts)
- **Blog Details** — Read full articles with author info, likes, and views
- **About & Contact** — Team info and contact form
- **Dark / Light mode** — Theme toggle across the entire app

### Blog Engagement
- **Views** increment each time any user opens a blog post
- **Likes** are tracked per user — each account can like a blog once (including your own posts)
- Like counts are shared across all users in real time (stored in `localStorage`)
- Multiple users liking the same blog accumulates the total count

### Authentication
- Sign up with profile picture upload
- **Duplicate emails blocked** — the same email cannot register twice (case-insensitive)
- Login with email and password
- Quick account switching on the login page
- Session persisted in `localStorage`
- Protected routes for the main site and dashboard

### Personal Dashboard (Per-User)
Each logged-in user sees **only their own data**:

| When you have **no blogs** | When you **add blogs** |
|---|---|
| Empty dashboard with a "Write Your First Blog" prompt | Live stats: My Blogs, Total Views, Total Likes, Categories Used |
| No charts displayed | Blog Growth, Category Distribution, Monthly Activity, Views & Likes charts |
| Manage Blogs shows an empty state | Manage Blogs lists only your posts |

Stats and charts update **in real time** as you create, edit, or delete blogs — no page refresh needed.

### Blog Management
- Create and edit blog posts with cover image upload
- Tag and categorize posts
- Delete your own blogs
- Categories management (shared across the app)

### Settings
- Update profile (name, email)
- Change password
- Toggle theme
- Delete account (removes your user data **and** all your blogs)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS (utility classes) |
| Animations | Framer Motion |
| Icons | React Icons |
| Notifications | React Toastify |
| External Data | DummyJSON API (sample blog posts) |
| Persistence | Browser `localStorage` |

## Project Structure

```
blog-website/
├── src/
│   ├── components/
│   │   ├── blog/          # BlogCard, CategoryPills, LikeButton
│   │   ├── common/        # Navbar, Footer, EmptyState, etc.
│   │   └── dashboard/     # Sidebar, StatCard, AnalyticsChart, etc.
│   ├── context/
│   │   ├── AuthContext.jsx    # Users, login, signup, session
│   │   ├── BlogContext.jsx    # Blogs, categories, per-user stats
│   │   └── ThemeContext.jsx   # Dark/light theme
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── pages/
│   │   ├── Home/, Blogs/, BlogDetails/, About/, Contact/
│   │   ├── Login/, Signup/
│   │   ├── admin/             # DashboardHome, BlogManage, BlogForm
│   │   └── Settings/
│   ├── services/api.js        # DummyJSON integration
│   └── utils/helpers.js
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

```bash
cd blog-website
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

## How Per-User Dashboard Works

1. **Sign up / Log in** — A unique `userId` is assigned to your account.
2. **Create a blog** — Each new post is saved with your `userId` in `localStorage`.
3. **Dashboard filters** — Stats, charts, and the blog table only include posts where `blog.userId === currentUser.id`.
4. **Switch accounts** — Log in as a different user to see a completely separate dashboard.
5. **Delete account** — All blogs linked to your `userId` are removed automatically.

### localStorage Keys

| Key | Purpose |
|---|---|
| `bloghub_users` | All registered user accounts |
| `bloghub_session` | Current logged-in user |
| `bloghub_blogs` | All user-created blog posts (each tagged with `userId`) |
| `bloghub_engagement` | Views and likes for API sample posts |
| `bloghub_categories` | Shared category list |
| `bloghub_accounts` | Saved accounts for quick login switch |

## Routes

| Path | Access | Description |
|---|---|---|
| `/` | Authenticated | Home page |
| `/blogs` | Authenticated | Browse all blogs |
| `/blogs/:id` | Authenticated | Blog detail |
| `/about`, `/contact` | Authenticated | Info pages |
| `/login`, `/signup` | Public | Authentication |
| `/dashboard` | Authenticated | Personal stats dashboard |
| `/dashboard/blogs` | Authenticated | Manage your blogs |
| `/dashboard/blogs/add` | Authenticated | Create a blog |
| `/dashboard/blogs/edit/:id` | Authenticated | Edit your blog |
| `/dashboard/categories` | Authenticated | Manage categories |
| `/dashboard/settings` | Authenticated | Account settings |

## Sample Workflow

1. **Sign up** as a new user → Dashboard is empty.
2. Click **Write Your First Blog** → Fill in the form and publish.
3. Return to **Dashboard** → Stats and charts appear with your blog data.
4. **Log out** and sign up as another user → Empty dashboard again.
5. Each user's blogs and analytics stay completely separate.

## Notes

- Sample posts from the DummyJSON API appear on the public **Blogs** page but are **not** included in your personal dashboard.
- Data is stored in the browser's `localStorage`, so it persists across sessions on the same device but is not synced to a server.
- This is a frontend demo project — passwords are stored in plain text in `localStorage` and should not be used in production without a proper backend.

## License

This project is for educational and demonstration purposes.
