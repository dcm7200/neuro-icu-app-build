# Development Guide

This guide is for developers working on the Neuro ICU Onboarding App during the 10-day sprint.

---

## 🚀 Getting Started

### First-Time Setup

```bash
# 1. Clone the repo (if applicable)
git clone <repo-url>
cd neuro-icu-app-build

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.local.example .env.local

# 4. Add your Supabase credentials to .env.local
# (Ask your tech lead for the project URL and keys)

# 5. Run development server
npm run dev

# 6. Open http://localhost:3000 in browser
```

### Daily Workflow

```bash
# Start dev server
npm run dev

# In another terminal, run linter
npm run lint

# Build for production (test before commit)
npm run build

# Commit changes
git add .
git commit -m "Feature: [description]"
git push origin feature-branch
```

---

## 📁 Code Organization

### Pages (app/ directory)
- `app/dashboard/page.tsx` - Main dashboard after login
- `app/modules/page.tsx` - Module library view
- `app/modules/[id]/page.tsx` - Individual module learning view
- `app/progress/page.tsx` - Progress tracking dashboard
- `app/admin/page.tsx` - Admin user management
- `app/settings/page.tsx` - User settings
- `app/auth/login/page.tsx` - Login page

**Rule:** One main component per file. Keep files under 500 lines.

### Components (components/ directory)
- `Sidebar.tsx` - Left navigation menu
- `TopNav.tsx` - Top navigation bar
- `ModuleCard.tsx` - Reusable module card component
- `ProgressOverview.tsx` - Progress stats widget

**Rule:** Reusable, pure components. No page logic here.

### Utilities (lib/ directory)
- `supabase.ts` - Supabase client initialization
- `store.ts` - Global state (Zustand)

**Rule:** Only logic, no React components.

### Types (types/ directory)
- `database.ts` - TypeScript types auto-generated from Supabase schema

**Rule:** Keep types organized by domain (database, api, etc.)

---

## 🗄️ Working with the Database

### Querying Data

```typescript
import { supabase } from "@/lib/supabase";

// SELECT
const { data, error } = await supabase
  .from("curriculum_modules")
  .select("*")
  .order("order_position");

// WHERE
const { data } = await supabase
  .from("user_module_progress")
  .select("*")
  .eq("user_id", userId);

// INSERT
const { data, error } = await supabase
  .from("users")
  .insert([{ email, role, first_name, last_name }]);

// UPDATE
const { error } = await supabase
  .from("user_module_progress")
  .update({ status: "completed" })
  .eq("id", progressId);

// DELETE
const { error } = await supabase
  .from("quiz_attempts")
  .delete()
  .eq("id", attemptId);
```

### Common Patterns

**Fetch user's modules**
```typescript
const { data: modules } = await supabase
  .from("curriculum_modules")
  .select("*")
  .eq("user_id", userId);
```

**Fetch module with lessons**
```typescript
const { data: lessons } = await supabase
  .from("module_lessons")
  .select("*")
  .eq("module_id", moduleId)
  .order("order_position");
```

**Update progress**
```typescript
const { data } = await supabase
  .from("user_module_progress")
  .upsert({
    user_id: userId,
    module_id: moduleId,
    status: "in_progress",
    progress_percent: 25,
  });
```

### Adding New Tables/Columns

1. **Create migration SQL**
   ```sql
   ALTER TABLE curriculum_modules ADD COLUMN new_column_name VARCHAR(255);
   ```

2. **Run in Supabase SQL Editor**
3. **Update types/database.ts** (if not auto-generated)
4. **Commit and document the change**

---

## 🎨 Styling Guide

### Tailwind CSS
We use Tailwind utility classes exclusively. No CSS files needed.

**Good:**
```typescript
<div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>
```

**Avoid:**
```typescript
// Don't create CSS files or use inline styles
<div style={{ backgroundColor: 'white' }}>
```

### Color Palette
- **Primary:** Blue (blue-600)
- **Success:** Green (green-600)
- **Warning:** Yellow (yellow-600)
- **Error:** Red (red-600)
- **Neutral:** Gray (gray-600)

### Responsive Design
```typescript
// Mobile first, then add larger breakpoints
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

Breakpoints:
- `sm` = 640px
- `md` = 768px
- `lg` = 1024px
- `xl` = 1280px

---

## 🧠 State Management (Zustand)

### Using Global State
```typescript
import { useAuth, useUI } from "@/lib/store";

export default function MyComponent() {
  const { user, setUser } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useUI();

  return <div>{user?.email}</div>;
}
```

### Adding New State
Edit `lib/store.ts`:
```typescript
interface MyNewState {
  value: string;
  setValue: (value: string) => void;
}

export const useMyNewStore = create<MyNewState>((set) => ({
  value: "",
  setValue: (value) => set({ value }),
}));
```

---

## 🔄 Authentication Flow

### Login
1. User enters email/password
2. Supabase Auth validates credentials
3. User session created
4. User record fetched from `users` table
5. Redirect to dashboard

### Session Check
```typescript
useEffect(() => {
  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth/login");
    }
  };

  checkSession();
}, [router]);
```

### Logout
```typescript
await supabase.auth.signOut();
router.push("/auth/login");
```

---

## 📋 Common Tasks

### Add a New Page
1. Create file in `app/your-page/page.tsx`
2. Mark as `"use client"` if it uses hooks
3. Import dependencies
4. Export default component
5. Add link in Sidebar.tsx

### Add Navigation Link
Edit `components/Sidebar.tsx` in `navItems` array:
```typescript
const navItems = [
  { href: "/your-page", icon: SomeIcon, label: "Your Page" },
];
```

### Create a New Component
1. New file in `components/YourComponent.tsx`
2. Make it reusable (don't hardcode data)
3. Accept props for customization
4. Export as named export

Example:
```typescript
interface YourComponentProps {
  title: string;
  data: any[];
}

export default function YourComponent({ title, data }: YourComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      {/* Content */}
    </div>
  );
}
```

### Add a Quiz Question
```typescript
// 1. Insert quiz record
const { data: quiz } = await supabase
  .from("competency_quizzes")
  .insert({ module_id: moduleId, title: "Quiz 1", passing_score_percent: 80 })
  .select()
  .single();

// 2. Insert questions
const { data: question } = await supabase
  .from("quiz_questions")
  .insert({
    quiz_id: quiz.id,
    question_text: "What is...",
    question_type: "multiple_choice",
    order_position: 1,
  })
  .select()
  .single();

// 3. Insert options
await supabase.from("quiz_question_options").insert([
  { question_id: question.id, option_text: "Option A", is_correct: true, order_position: 1 },
  { question_id: question.id, option_text: "Option B", is_correct: false, order_position: 2 },
]);
```

---

## 🐛 Debugging

### Browser DevTools
- Network tab: Check API requests
- Console: JavaScript errors
- Sources: Set breakpoints
- Application: Check localStorage/cookies

### Supabase Console
- Data Browser: View/edit database tables
- SQL Editor: Run queries
- Auth: View user accounts
- Logs: Check error logs

### Common Issues

**"Failed to fetch data"**
- Check network tab for 401/403 errors
- Verify authentication token is valid
- Check RLS policies in Supabase

**"User not authenticated"**
- Clear browser cookies
- Try logging in again
- Check session storage

**"Database constraint error"**
- Check unique constraints
- Verify foreign key references exist
- Look at database schema in Supabase

---

## 📦 Build & Deploy

### Test Build Locally
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
# Assuming you have Vercel CLI installed
vercel

# or via GitHub (auto-deploy on push)
git push origin main
```

### Environment Variables in Vercel
1. Go to Project Settings → Environment Variables
2. Add same variables from .env.local
3. Re-deploy after adding variables

---

## ✅ Code Review Checklist

Before committing, ensure:
- [ ] Code is properly formatted (Tailwind classes organized)
- [ ] TypeScript types are correct
- [ ] No console.log() statements (except for debugging)
- [ ] Components are reusable, not hardcoded
- [ ] Page loads without errors in browser
- [ ] Mobile responsive (tested on mobile view)
- [ ] Database queries use proper error handling
- [ ] No secrets in code (use environment variables)
- [ ] Commit message is descriptive

---

## 📚 Resources

- **Next.js:** https://nextjs.org/docs
- **Supabase:** https://supabase.com/docs
- **Tailwind:** https://tailwindcss.com/docs
- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org/docs

---

## 🆘 Getting Help

1. **Check error message** - Read the full error in console
2. **Search docs** - Most questions are answered in docs
3. **Ask tech lead** - For blockers or architecture questions
4. **Slack/Discord** - Team chat for quick questions

---

_Last updated: 2026-05-13 | Sage 🦉_
