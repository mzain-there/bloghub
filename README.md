# BlogHub

A modern blog platform built with React and Vite. BlogHub lets users sign up, write and manage their own blog posts, explore community content, and send feedback — with a personal, real-time dashboard showing only your own stats and analytics.

---

## Features

### Public Site
- **Home** — Hero section, featured blogs, categories, trending posts, and newsletter signup
- **Blogs** — Browse, search, filter, and sort all posts (yours + sample API posts)
- **Blog Details** — Full article view with short description subtitle, author info, likes, views, and related posts
- **About** — Team profiles with social links, core values, platform stats, and mission/vision
- **Contact** — Feedback form powered by EmailJS with character counter, feedback type dropdown, and inline success screen
- **Dark / Light mode** — Theme toggle across the entire app

### Blog Engagement
- Views increment each time any user opens a blog post
- Likes are tracked per user — each account can like a blog once
- Like counts are shared across all users in real time via `localStorage`

### Authentication
- Sign up with full name, username, email, and optional profile picture
- Duplicate emails and usernames blocked (case-insensitive)
- Login with email and password
- Session persisted in `localStorage`
- On logout, session and saved account info are fully cleared — no auto-login on next visit
- Protected routes for the main site and dashboard

### Blog Management
- Create blog posts with: Title, Short Description, Content, Category, Tags, Cover Image
- Short description appears on blog cards and as a subtitle on the detail page
- Cover image upload (max 5MB) with live preview
- Edit and delete your own posts only
- Tags placeholder matches real category names (lifestyle, travel, wellness, career, etc.)

### Personal Dashboard (Per-User)
Each logged-in user sees only their own data:

| No blogs yet | After adding blogs |
|---|---|
| Empty state with "Write Your First Blog" prompt | Live stats: My Blogs, Total Views, Total Likes, Categories Used |
| No charts displayed | Blog Growth, Category Distribution, Monthly Activity, Views & Likes charts |
| Manage Blogs shows empty state | Manage Blogs lists only your posts |

Stats and charts update in real time as you create, edit, or delete blogs — no page refresh needed.

### Contact Form (EmailJS)
- Fields: Your Name, Your Email, Feedback Type (dropdown), Your Feedback
- Feedback types: Bug Report, Feature Request, General Feedback, Question, Suggestion
- 500-character counter on the message field (turns yellow at 400, red at 500)
- Animated sending state with spinner on the submit button
- Inline success screen after send: "✅ Thank you for your feedback! We'll get back to you soon."
- "Email Us" card opens Gmail compose window directly in a new tab

### About Page
- Hero with tagline
- Live platform stats (articles, readers, growth, categories)
- Mission and Vision cards
- Core Values section (Clarity First, Community Driven, Radical Transparency, Continuous Growth)
- Team cards with social links (Twitter, GitHub, LinkedIn) and click-to-expand modal

### Settings
- Update profile (name, email, profile picture)
- Change password
- Toggle theme
- Delete account (removes user data and all their blogs)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | React Icons |
| Notifications | React Toastify |
| Email | EmailJS (`@emailjs/browser`) |
| External Data | DummyJSON API (sample blog posts) |
| Persistence | Browser `localStorage` |

---

## Project Structure

```
blog-website/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── blog/
│   │   │   ├── BlogCard.jsx          # Blog preview card with short description
│   │   │   └── CategoryPills.jsx
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── LikeButton.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── SkeletonLoader.jsx
│   │   └── dashboard/
│   │       ├── AnalyticsChart.jsx
│   │       ├── BlogTable.jsx
│   │       ├── ProfileModal.jsx
│   │       ├── Sidebar.jsx           # All nav items use exact matching (end=true)
│   │       ├── StatCard.jsx
│   │       ├── TopNavbar.jsx
│   │       └── WelcomeCard.jsx
│   ├── context/
│   │   ├── AuthContext.jsx           # Auth, session, no persistent saved accounts
│   │   ├── BlogContext.jsx           # Blogs, categories, per-user stats
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── categories.js             # 10 default categories with icons and colors
│   │   └── teamMembers.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useScrollTop.js
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── pages/
│   │   ├── Home/
│   │   ├── Blogs/
│   │   ├── BlogDetails/              # Renders shortDescription as subtitle
│   │   ├── About/                    # Rebuilt — no tech stack section
│   │   ├── Contact/                  # EmailJS integration
│   │   ├── Login/
│   │   ├── Signup/
│   │   ├── Profile/
│   │   ├── Settings/
│   │   └── admin/
│   │       ├── BlogForm.jsx          # Add/Edit blog with shortDescription field
│   │       ├── BlogManage.jsx
│   │       ├── CategoryManage.jsx
│   │       └── DashboardHome.jsx
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   │   └── api.js                    # DummyJSON integration
│   └── utils/
│       └── helpers.js
├── index.html
├── package.json
└── vite.config.js
```

---

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

---

## EmailJS Setup

The contact form uses [EmailJS](https://emailjs.com) to send feedback emails without a backend.

### Template Variables

Your EmailJS template (`template_tm4fumj`) must use these variables:

| Variable | Description |
|---|---|
| `{{from_name}}` | Sender's full name |
| `{{from_email}}` | Sender's email address |
| `{{feedback_type}}` | Selected feedback type (Bug Report, Feature Request, etc.) |
| `{{message}}` | Feedback message body |

### Recommended Template Format

**Subject:**
```
New {{feedback_type}} from {{from_name}}
```

**Body:**
```
Name:           {{from_name}}
Email:          {{from_email}}
Feedback Type:  {{feedback_type}}

Message:
{{message}}
```

Set **Reply To** to `{{from_email}}` so you can reply directly to the sender.

---

## Routes

| Path | Access | Description |
|---|---|---|
| `/` | Authenticated | Home page |
| `/blogs` | Authenticated | Browse all blogs |
| `/blogs/:id` | Authenticated | Blog detail with short description |
| `/about` | Authenticated | About page |
| `/contact` | Authenticated | Contact / feedback page |
| `/login` | Public | Login |
| `/signup` | Public | Sign up |
| `/dashboard` | Authenticated | Personal stats dashboard |
| `/dashboard/blogs` | Authenticated | Manage your blogs |
| `/dashboard/blogs/add` | Authenticated | Create a blog |
| `/dashboard/blogs/edit/:id` | Authenticated | Edit your blog |
| `/dashboard/categories` | Authenticated | Manage categories |
| `/dashboard/settings` | Authenticated | Account settings |

---

## localStorage Keys

| Key | Purpose |
|---|---|
| `bloghub_users` | All registered user accounts |
| `bloghub_session` | Current logged-in user session |
| `bloghub_blogs` | All user-created blog posts (tagged with `userId`) |
| `bloghub_engagement` | Views and likes for API sample posts |
| `bloghub_categories` | Shared category list |

> Note: `bloghub_accounts` (saved accounts) is no longer persisted. It is session-only and cleared on logout.

---

## How Per-User Dashboard Works

1. **Sign up / Log in** — A unique `userId` is assigned to your account.
2. **Create a blog** — Each post is saved with your `userId` in `localStorage`.
3. **Dashboard filters** — Stats, charts, and the blog table only show posts where `blog.userId === currentUser.id`.
4. **Switch accounts** — Log in as a different user to see a completely separate dashboard.
5. **Delete account** — All blogs linked to your `userId` are removed automatically.

---

## Notes

- Sample posts from the DummyJSON API appear on the public Blogs page but are **not** included in your personal dashboard stats.
- Data is stored in `localStorage` — it persists across sessions on the same device but is not synced to a server.
- Passwords are stored in plain text in `localStorage`. This is a frontend demo — do not use in production without a proper backend.

---

## License

This project is for educational and demonstration purposes.
