<div align="center">

# BlogHub

**A modern, full-featured blog platform built with React & Vite**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=flat&logo=react-router)](https://reactrouter.com)
[![EmailJS](https://img.shields.io/badge/EmailJS-integrated-orange?style=flat)](https://emailjs.com)
[![License](https://img.shields.io/badge/license-Educational-green?style=flat)](#license)

[Live Demo](https://github.com/mzain-there/bloghub) · [Report a Bug](https://github.com/mzain-there/bloghub/issues) · [Request a Feature](https://github.com/mzain-there/bloghub/issues)

</div>

---

## Overview

BlogHub is a full-featured blog platform where users can sign up, publish and manage their own blog posts, and explore content from the community. Every user gets a **personal real-time dashboard** with analytics, charts, and stats scoped entirely to their own content.

---

## Screenshots

> Dashboard · Blog Feed · Contact Page · About Page

---

## Features

### Public Site

| Section | Description |
|---|---|
| **Home** | Hero section, featured blogs, category grid, trending posts, newsletter signup |
| **Blogs** | Browse, search, filter by category, sort by latest / oldest / popular |
| **Blog Detail** | Full article with short description subtitle, author info, views, likes, related posts |
| **About** | Platform stats, mission & vision, core values, team profiles with social links |
| **Contact** | EmailJS-powered feedback form with dropdown, character counter, success screen |
| **Dark / Light Mode** | Persistent theme toggle across the entire app |

---

### Authentication

- Sign up with full name, username, email, and optional profile picture
- Duplicate emails and usernames are blocked (case-insensitive check)
- Login with email and password
- Session persisted in `localStorage` — stays logged in across browser refreshes
- **On logout**, session is fully cleared — no saved account info, no auto-login
- Protected routes redirect unauthenticated users to `/login`

---

### Blog Management

- Create posts with: **Title**, **Short Description**, **Content**, **Category**, **Tags**, **Cover Image**
- Short description renders on blog cards and as a subtitle on the detail page
- Cover image upload up to 5MB with live preview in the form
- Tags placeholder shows real category names as hints
- Edit and delete only your own posts

---

### Personal Dashboard

Each user sees **only their own data** — completely isolated from other accounts.

| State | What you see |
|---|---|
| No blogs published | Empty state with "Write Your First Blog" prompt |
| Blogs published | Live stats + 4 analytics charts |

**Stat Cards**
- My Blogs (with monthly growth %)
- Total Views
- Total Likes
- Categories Used

**Analytics Charts**
- **Blog Growth Over Time** — Cumulative horizontal bar chart, shows only months up to today (no future months)
- **Category Distribution** — Percentage breakdown by category with colored bars
- **Monthly Writing Activity** — Vertical bar chart, shows only months up to today
- **Views & Likes Overview** — Per-post engagement bars

All stats and charts update **in real time** as you add, edit, or delete blogs.

---

### Contact Form (EmailJS)

| Feature | Detail |
|---|---|
| Fields | Your Name, Your Email, Feedback Type, Your Feedback |
| Feedback Types | Bug Report, Feature Request, General Feedback, Question, Suggestion |
| Character counter | 0–500 on the message field, turns yellow at 400, red at 500 |
| Send button | Animated spinner + "Sending…" state while in flight |
| Success screen | Replaces the form with ✅ "Thank you for your feedback! We'll get back to you soon." |
| Email Us card | Opens Gmail compose window directly in a new tab — no browser permission needed |
| Info cards | Colorful gradient cards (Email Us, Call Us, Our Office, Support Hours) |

---

### About Page

- Hero with tagline — "Built for Writers. Loved by Readers."
- Platform stats bar (articles published, active readers, monthly growth, categories)
- Mission & Vision cards
- Core Values section (Clarity First, Community Driven, Radical Transparency, Continuous Growth)
- Team cards with social links (Twitter, GitHub, LinkedIn) + click-to-expand detail modal

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | 19 |
| Build Tool | Vite | 8 |
| Routing | React Router | v7 |
| Styling | Tailwind CSS | utility-first |
| Animations | Framer Motion | 12 |
| Icons | React Icons | 5 |
| Notifications | React Toastify | 11 |
| Email | @emailjs/browser | 4 |
| HTTP Client | Axios | 1 |
| External Data | DummyJSON API | — |
| Persistence | Browser localStorage | — |

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
│   │   │   ├── BlogCard.jsx          # Card with short description preview
│   │   │   └── CategoryPills.jsx
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx            # Links + social icons (GitHub, LinkedIn, YouTube)
│   │   │   ├── Breadcrumb.jsx
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── LikeButton.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   └── SkeletonLoader.jsx
│   │   └── dashboard/
│   │       ├── AnalyticsChart.jsx    # 4 chart types, future months hidden
│   │       ├── BlogTable.jsx
│   │       ├── ProfileModal.jsx
│   │       ├── Sidebar.jsx           # All nav items use exact active matching
│   │       ├── StatCard.jsx          # Per-user stats with colored icon badges
│   │       ├── TopNavbar.jsx
│   │       └── WelcomeCard.jsx
│   ├── context/
│   │   ├── AuthContext.jsx           # Auth, session mgmt, no persistent saved accounts
│   │   ├── BlogContext.jsx           # Blogs, categories, per-user stats
│   │   └── ThemeContext.jsx          # Dark / light theme
│   ├── data/
│   │   ├── categories.js             # 10 default categories with icons + colors
│   │   └── teamMembers.js            # Team data with social links
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useScrollTop.js
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   └── PublicLayout.jsx
│   ├── pages/
│   │   ├── Home/                     # Hero, featured, categories, trending, newsletter
│   │   ├── Blogs/                    # Browse + filter + sort
│   │   ├── BlogDetails/              # Full article + short description subtitle
│   │   ├── About/                    # Rebuilt — stats, values, team
│   │   ├── Contact/                  # EmailJS form + colorful info cards + FAQ
│   │   ├── Login/                    # Email + password, no persistent saved accounts
│   │   ├── Signup/
│   │   ├── Profile/
│   │   ├── Settings/
│   │   └── admin/
│   │       ├── BlogForm.jsx          # Create/edit with shortDescription + tags hints
│   │       ├── BlogManage.jsx        # Per-user blog table
│   │       ├── CategoryManage.jsx
│   │       └── DashboardHome.jsx     # Stats + charts
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
# Clone the repository
git clone https://github.com/mzain-there/bloghub.git

# Navigate into the project
cd bloghub/blog-website

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open the URL shown in the terminal — usually `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

---

## EmailJS Configuration

The contact form sends emails without a backend using [EmailJS](https://emailjs.com).

### Credentials (set in `Contact.jsx`)

```js
const EMAILJS_SERVICE_ID  = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY  = 'your_public_key';
```

### Template Variables

| Variable | Value |
|---|---|
| `{{from_name}}` | Sender's full name |
| `{{from_email}}` | Sender's email address |
| `{{feedback_type}}` | Selected option from dropdown |
| `{{message}}` | Feedback message (max 500 chars) |

**Recommended template subject:**
```
New {{feedback_type}} from {{from_name}}
```

Set **Reply To** to `{{from_email}}` so you can reply directly to the sender from Gmail.

---

## Routes

| Path | Access | Page |
|---|---|---|
| `/` | Auth required | Home |
| `/blogs` | Auth required | Blog feed |
| `/blogs/:id` | Auth required | Blog detail |
| `/about` | Auth required | About |
| `/contact` | Auth required | Contact / feedback |
| `/login` | Public | Login |
| `/signup` | Public | Sign up |
| `/dashboard` | Auth required | Personal dashboard |
| `/dashboard/blogs` | Auth required | Manage your blogs |
| `/dashboard/blogs/add` | Auth required | Create blog |
| `/dashboard/blogs/edit/:id` | Auth required | Edit blog |
| `/dashboard/categories` | Auth required | Manage categories |
| `/dashboard/settings` | Auth required | Account settings |

---

## localStorage Keys

| Key | Purpose |
|---|---|
| `bloghub_users` | All registered user accounts |
| `bloghub_session` | Active user session |
| `bloghub_blogs` | User-created posts (each tagged with `userId`) |
| `bloghub_engagement` | Views and likes for DummyJSON API posts |
| `bloghub_categories` | Shared category list |

> `bloghub_accounts` (saved accounts) was removed. Account info is session-only and cleared on logout.

---

## How Per-User Dashboard Works

1. **Sign up / Login** — a unique `userId` is assigned to your account
2. **Create a blog** — saved to `localStorage` with your `userId`
3. **Dashboard filters** — all stats and charts only include `blog.userId === currentUser.id`
4. **Switch accounts** — log in as a different user to see a completely separate dashboard
5. **Delete account** — removes your user record and all your blog posts automatically

---

## Notes

- DummyJSON API posts appear on the public Blogs feed but are **not** counted in personal dashboard stats
- All data lives in `localStorage` — it persists on the same device but is not synced to a server
- Passwords are stored in plain text — this is a **frontend demo project** and is not intended for production use without a proper backend

---

## Author

**M Zain**

[![GitHub](https://img.shields.io/badge/GitHub-mzain--there-181717?style=flat&logo=github)](https://github.com/mzain-there)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-m--zain--there7989-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/m-zain-there7989)
[![YouTube](https://img.shields.io/badge/YouTube-Channel-FF0000?style=flat&logo=youtube)](https://www.youtube.com/channel/UCWCgkd4-Ju5Wg2pzbLsWZoQ)

---

## License

This project is for educational and demonstration purposes only.
