# Neuro ICU Onboarding App

A comprehensive, production-ready onboarding platform for Neuro ICU providers built with Next.js 14, React, TypeScript, and Supabase.

**Status:** Day 1 MVP Build (2-week sprint) | Last Updated: 2026-05-13

---

## 📋 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account (free tier OK for development)
- Vercel account (for hosting)

### Local Development

1. **Clone and install**
   ```bash
   cd neuro-icu-app-build
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **Set up Supabase database**
   - Go to Supabase console
   - SQL Editor → New Query
   - Copy content from `database.sql` and execute
   - This creates all tables, indexes, and RLS policies

4. **Run dev server**
   ```bash
   npm run dev
   ```
   App will be at http://localhost:3000

---

## 🏗️ Architecture

### Tech Stack
- **Frontend:** Next.js 14, React 19, TypeScript
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Deployment:** Vercel + Supabase

### Project Structure
```
neuro-icu-app-build/
├── app/                          # Next.js app directory
│   ├── auth/                     # Authentication pages
│   │   └── login/
│   ├── dashboard/                # Main dashboard
│   ├── modules/                  # Module viewing/learning
│   │   └── [id]/                 # Individual module detail
│   ├── progress/                 # Progress tracking
│   ├── admin/                    # Admin panel
│   └── settings/                 # User settings
├── components/                   # Reusable React components
│   ├── Sidebar.tsx
│   ├── TopNav.tsx
│   ├── ModuleCard.tsx
│   └── ProgressOverview.tsx
├── lib/                          # Utility functions
│   ├── supabase.ts              # Supabase client
│   └── store.ts                 # Zustand state management
├── types/                        # TypeScript definitions
│   └── database.ts              # Auto-generated DB types
├── database.sql                 # Complete database schema
├── tailwind.config.js           # Tailwind configuration
└── tsconfig.json                # TypeScript config
```

---

## 🗄️ Database Schema

The app uses a comprehensive PostgreSQL schema with:

### Core Tables
- **users** - Provider/user accounts with role-based access
- **curriculum_modules** - Course modules (Foundation, Pathophysiology, Protocols)
- **module_lessons** - Individual lessons within modules
- **clinical_protocols** - TBI, aSAH, ICP, Seizure, etc.
- **competencies** - Learning outcomes by domain
- **module_competency_map** - Links modules to competencies

### Assessment Tables
- **competency_quizzes** - Quizzes for modules
- **quiz_questions** - Individual quiz questions
- **quiz_question_options** - Multiple choice options
- **quiz_attempts** - User quiz attempts with scores

### Progress Tracking
- **user_module_progress** - Module completion status
- **user_lesson_progress** - Lesson completion tracking
- **user_competency_progress** - Competency mastery levels

### Advanced Features
- **learning_scenarios** - Clinical case studies with branching
- **skill_checklists** - Hands-on skill validation
- **audit_logs** - Admin action audit trail

See `database.sql` for complete schema with indexes and RLS policies.

---

## 🔐 Authentication & Authorization

### Role-Based Access Control
- **resident** - Can access modules, take quizzes, view own progress
- **nurse** - Enhanced clinical assessment features
- **np** - NP-specific advanced protocols
- **instructor** - Can view student progress, provide feedback
- **admin** - Full system access, user management, content management

### Row-Level Security (RLS)
- Residents only see their own progress
- Instructors see their assigned residents
- Admins see all data
- Curriculum accessible to authenticated users

---

## 🚀 Features Implemented (Day 1)

### Authentication
- ✅ Login/signup with email and password
- ✅ Role-based dashboard redirects
- ✅ Session management
- ✅ Logout functionality

### Dashboard
- ✅ Overview of all modules
- ✅ Progress tracking (% complete)
- ✅ Module categorization (Foundation, Pathophysiology, Protocol)
- ✅ Quick stats (completed, in progress, not started)

### Module Learning
- ✅ Module detail view with lessons
- ✅ Markdown lesson content
- ✅ Lesson navigation (previous/next)
- ✅ Lesson progress tracking
- ✅ Sidebar lesson index with completion indicators

### Module Library
- ✅ Browse all available modules
- ✅ Filter by category
- ✅ Module cards with status and progress bar
- ✅ Link to module detail

### Progress Tracking
- ✅ Overall completion percentage
- ✅ Module-by-module status table
- ✅ Competency proficiency levels
- ✅ Visual progress indicators

### Admin Panel
- ✅ User management interface
- ✅ Add new users with role assignment
- ✅ User list with status indicators
- ✅ Role-based admin access control

### Settings
- ✅ User profile view
- ✅ Preferences configuration
- ✅ Help/support links

---

## 🎯 Features Coming (Days 2-10)

### Week 1: Curriculum Foundation
- Quiz engine with auto-grading
- Skill checklist creation and tracking
- First 4 foundation modules with sample content
- Initial competency assessment

### Week 2: Advanced Features
- All 16 modules with protocols
- Interactive clinical scenarios with branching
- 12+ competency quizzes
- Advanced reporting and analytics
- Content management system for admins
- iOS Capacitor wrapper for TestFlight

---

## 📱 Mobile / iOS Setup (Later in Sprint)

This app will be wrapped as iOS native app using Capacitor:

```bash
# Install Capacitor (Day 8-9 of sprint)
npm install @capacitor/core @capacitor/cli

# Initialize iOS project
npx cap init "NeuroICU" "com.neuro-icu.onboarding"

# Add iOS platform
npx cap add ios

# Build and deploy to TestFlight
npm run build
npx cap copy
npx cap open ios
```

Then use Xcode to sign, build, and deploy to TestFlight.

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/neuro-icu-app-build.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to vercel.com
   - "New Project" → Select your GitHub repo
   - Set environment variables (from .env.local)
   - Deploy

3. **Live URL**
   - Will be auto-generated: `https://neuro-icu-app.vercel.app`
   - Custom domain can be added in Vercel settings

### Supabase Setup

1. **Create Supabase Project**
   - Go to supabase.com
   - Create new project
   - Copy URL and keys to .env.local

2. **Run Database Migration**
   - SQL Editor → New Query
   - Paste `database.sql` content
   - Click "Run"

3. **Enable Row-Level Security**
   - Already configured in database.sql
   - Verify in Authentication → Policies

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication**
- [ ] Login with valid credentials
- [ ] Redirect to dashboard on success
- [ ] Show error on invalid credentials
- [ ] Logout returns to login page

**Dashboard**
- [ ] Modules display with correct categories
- [ ] Progress cards show accurate percentages
- [ ] Module cards are clickable

**Module Learning**
- [ ] Module detail loads correctly
- [ ] Lessons display in sidebar
- [ ] Markdown renders properly
- [ ] Navigation between lessons works
- [ ] Completion percentage updates

**Admin**
- [ ] Only admins can access /admin
- [ ] User list displays all users
- [ ] Can add new users
- [ ] User roles are assigned correctly

### Unit Tests (TODO - Sprint Day 5)
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

---

## 🔍 Troubleshooting

### "Failed to connect to Supabase"
- ✅ Check NEXT_PUBLIC_SUPABASE_URL in .env.local
- ✅ Check NEXT_PUBLIC_SUPABASE_ANON_KEY is valid
- ✅ Verify Supabase project is running

### "User not found in database"
- ✅ Ensure database schema is created (run database.sql)
- ✅ Check that user record exists in `users` table
- ✅ Verify RLS policies are enabled

### "Module not loading"
- ✅ Check that modules exist in `curriculum_modules` table
- ✅ Verify module lessons are in `module_lessons` table
- ✅ Check browser console for errors

### "Admin page shows 403 error"
- ✅ Verify user role is "admin" in users table
- ✅ Check RLS policies for admin access
- ✅ Clear browser cookies and log in again

---

## 📊 Data Seeding

Sample data is pre-populated in database.sql:
- 4 Foundation modules
- 5 sample competencies
- Admin user (email: admin@neuro-icu.local)

To add more:
```sql
INSERT INTO curriculum_modules (name, description, category, order_position, estimated_hours)
VALUES ('Your Module', 'Description', 'Foundation', 5, 2.0);
```

---

## 🛠️ Development Workflow

### Add a New Module
1. Insert into `curriculum_modules`
2. Add lessons to `module_lessons`
3. Map competencies in `module_competency_map`
4. Add quiz questions to `competency_quizzes`

### Add a Quiz
1. Create quiz record in `competency_quizzes`
2. Add questions to `quiz_questions`
3. Add options to `quiz_question_options`

### Create a Component
1. New file in `components/`
2. Export as named export
3. Import and use in pages

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

## 📝 Project Timeline

| Day | Focus | Deliverable |
|-----|-------|-------------|
| 1 (May 13) | Core MVP, auth, dashboard | ✅ This build |
| 2 | Foundation modules + quizzes | 4 modules live |
| 3 | Quiz engine + progress | Auto-grading working |
| 4 | Pathophysiology modules | 4 modules live |
| 5 | Protocol modules start | 4-8 modules live |
| 6 | Protocol completion | All 8 protocol modules |
| 7 | Scenarios + advanced features | Branching logic |
| 8 | iOS Capacitor wrap | TestFlight ready |
| 9 | Testing + iteration | Bug fixes, polish |
| 10 | Launch prep + training | Live on Vercel + TestFlight |

---

## 📞 Support

- **Questions?** Check the documentation files in `neuro-icu-app/`
- **Bugs?** File an issue on GitHub
- **Deployment?** Contact your DevOps or system administrator

---

## 📄 License

Internal use only. Do not distribute without permission.

---

_Built with ❤️ for the Neuro ICU Team_  
_Sage 🦉 | May 13, 2026_
