# EstatePro - Real Estate Platform

A modern real estate platform built with React, TypeScript, and Vite. Features property listings, agent dashboard, and customer management.

## 🚀 Features

- **Property Listings**: Browse, search, and filter properties
- **Agent Dashboard**: Manage customer interactions and property listings
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Built with shadcn/ui components
- **Authentication**: Agent login system
- **Database Integration**: Supabase backend integration

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase
- **Deployment**: GitHub Pages
- **Build Tool**: Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/estate-pro-finder-main.git
cd estate-pro-finder-main
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your Supabase credentials to `.env`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start development server:
```bash
npm run dev
```

## 🚀 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. Push your code to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select "GitHub Actions" as the source
5. The workflow will automatically deploy on push to main/master

### Manual Deployment

1. Build the project:
```bash
npm run build:gh-pages
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### GitHub Repository Setup

1. Create a new repository on GitHub named `estate-pro-finder-main`
2. Initialize git and add remote:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/estate-pro-finder-main.git
git push -u origin main
```

3. Enable GitHub Pages:
   - Go to repository Settings
   - Scroll to Pages section
   - Select "GitHub Actions" as source
   - The site will be available at: `https://yourusername.github.io/estate-pro-finder-main/`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

For GitHub Pages deployment, add these as repository secrets:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📁 Project Structure

```
src/
├── components/ui/          # Reusable UI components
├── pages/                  # Page components
│   ├── Index.tsx          # Home page
│   ├── Agents.tsx         # Agent dashboard
│   ├── AgentLogin.tsx     # Agent authentication
│   └── ...
├── integrations/
│   └── supabase/          # Database integration
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:gh-pages` - Build for GitHub Pages
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages
- `npm run lint` - Run ESLint

## 🌐 Live Demo

Once deployed, your application will be available at:
`https://yourusername.github.io/estate-pro-finder-main/`

## 📧 Support

For support or questions, please open an issue on GitHub.

## 📄 License

This project is licensed under the MIT License.
