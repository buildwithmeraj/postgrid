# PostGrid — Modern Blogging Platform

PostGrid is a full-stack blogging platform where writers can publish articles, explore categories, and track engagement. Powered by **Next.js**, **NextAuth**, **MongoDB**, and **DaisyUI** for a polished, responsive user experience.

---

### Live Site: [https://postgrid-blog.vercel.app/](https://postgrid-blog.vercel.app/)

### Backend Repository: [https://github.com/buildwithmeraj/postgrid-backend](https://github.com/buildwithmeraj/postgrid-backend)

---

## 🚀 Features

- Authentication (Email/Password + Google Sign-in)
- Create, edit, delete blog posts
- Category-based browsing
- View count tracking for posts
- Responsive UI using **DaisyUI** + theming
- Protected routes with NextAuth
- Secure API communication with Axios interceptors

---

## 📦 Tech Stack

| Layer          | Technology                                           |
| -------------- | ---------------------------------------------------- |
| Frontend       | Next.js 14 (App Router), React, DaisyUI, TailwindCSS |
| Authentication | Next-Auth                                            |
| Backend API    | MongoDB, Node.js/Express                             |
| State/Data     | Axios + React Hooks                                  |
| Deployment     | Vercel                                               |

---

## 🔧 Setup & Installation

### ✅ Prerequisites

- Node.js **18+**
- MongoDB (Local or Cloud Atlas)
- Google OAuth credentials (optional)
- A properly configured `.env.local`

---

### 📥 Clone & Install

```bash
git clone https://github.com/yourname/postgrid.git
cd postgrid
npm install
```

### 🛠 Environment Variables

Create .env.local in the root:

```bash
SITE_NAME="PostGrid"
PAGE_TITLE="- PostGrid"

NEXTAUTH_URL="http://localhost:3000"

NEXT_PUBLIC_SERVER_URL="http://localhost:5000"
BACKEND_URL="http://localhost:5000"

MONGODB_URI="your_mongodb_connection_string_here"
NEXTAUTH_SECRET="your_generated_secret_here"

AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"

NEXT_PUBLIC_IMGBB_API_KEY="your_imgbb_key"
```

(Replace all placeholder values!)

### ▶️ Run the App

```bash
npm run dev
```

Visit: http://localhost:3000

### 🧭 Route Summary

| Route                | Type    | Description                  |
| -------------------- | ------- | ---------------------------- |
| `/`                  | Public  | Homepage with featured posts |
| `/login`             | Public  | User login                   |
| `/register`          | Public  | Create an account            |
| `/posts`             | Public  | All posts (recent first)     |
| `/posts/[id]`        | Public  | Single post — counts views   |
| `/categories`        | Public  | List of all categories       |
| `/categories/[slug]` | Public  | Posts by category            |
| `/add-post`          | Private | Publish new blog post        |
| `/edit-post/[id]`    | Private | Edit owned post              |
| `/my-posts`          | Private | Manage user’s posts          |
| `/profile`           | Private | Profile & settings           |
| `/privacy`           | Public  | Privacy policy page          |

🔒 Private pages require authentication via NextAuth.

### 📜 Scripts

| Command         | Purpose              |
| --------------- | -------------------- |
| `npm run dev`   | Start dev server     |
| `npm run build` | Build Next.js app    |
| `npm run start` | Run production build |

### 🏁 Deployment

Fully optimized for Vercel deployment.
Just run:

```bash
vercel
```
