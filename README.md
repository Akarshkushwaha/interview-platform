# 🚀 CodeSync — Pro Interview IDE Platform

**🔗 Live Demo:** [https://interview-platform-bitv-9bjps380h-akarshs-projects-79cac0bf.vercel.app/](https://interview-platform-bitv-9bjps380h-akarshs-projects-79cac0bf.vercel.app/)

CodeSync is a high-performance, immersive interview platform designed for modern tech teams. It features a full-scale Monaco Editor (VS Code core) with integrated real-time video, audio, and code synchronization.

![CodeSync Dashboard](https://raw.githubusercontent.com/Akarshkushwaha/interview-platform/main/public/og-image.png)

## ✨ Key Features

- **💻 Advanced Interview IDE:** Full-screen Monaco Editor experience with participant video overlay.
- **🎥 Immersive Video & Audio:** High-quality, real-time communication powered by **Stream SDK**.
- **📅 Smart Scheduling:** Professional dashboard for managing and tracking upcoming interviews.
- **📝 Real-time Sync:** Ultra-fast data synchronization backed by **Convex**.
- **👤 Secure Authentication:** Enterprise-grade security via **Clerk**.
- **🧩 Custom Components:** Built with **shadcn/ui** and **Tailwind CSS** for a premium look and feel.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Database & Real-time:** [Convex](https://www.convex.dev/)
- **Authentication:** [Clerk](https://clerk.com/)
- **Video & Audio:** [GetStream](https://getstream.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Akarshkushwaha/interview-platform.git
cd interview-platform
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file and add your keys:
```text
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=
CONVEX_DEPLOYMENT=
```

### 4. Run the development environment
```bash
# Terminal 1: Convex Dev Server
npx convex dev

# Terminal 2: Next.js App
npm run dev
```

---

## 🌍 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Connect your GitHub repository.
2. Add your environment variables.
3. Use `npm run build` as the build command.
4. Deploy!

---

## 📜 License
This project is licensed under the MIT License.
