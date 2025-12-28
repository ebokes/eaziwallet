https://eaziwallet.netlify.app

# EaziWallet - Modern Fintech Application

EaziWallet is a premium fintech application built for seamless financial management. It provides users with a comprehensive dashboard, transaction history, card management, and advanced spending analytics.

## 🚀 Features

- **Intuitive Dashboard**: Real-time balance overview with quick actions for top-up, withdrawal, and transfers.
- **Advanced Spending Analytics**: Interactive bar and pie charts to visualize weekly spending and category breakdowns.
- **Transaction History**: Fully searchable and groupable transaction list with date-based categorization (Today, Yesterday, Older).
- **Secure Authentication**: Complete auth flow including Sign Up, Login, and OTP verification with robust validation.
- **Card Management**: Easily view and manage wallet cards with detailed information.
- **Responsive Design**: A mobile-first approach that scales beautifully to tablet and desktop views.
- **Dark Mode Support**: Built with theme awareness for comfortable use in any lighting.

## 📸 Screenshots

### Login

![Login](https://drive.google.com/file/d/1r5V2QYRgE60eWNDzUrJBj3xznEruNSA2/view?usp=drive_link)

### Dashboard

![Dashboard](https://drive.google.com/file/d/1gC7Owr5gRVEzfMplbyE8GUSWAhD9Thgr/view?usp=drive_link)

### History

![History](https://drive.google.com/file/d/1ha3zoLmxxoXgHzP8zcwlfGBYWBkX4_a7/view?usp=drive_link)

### Cards

![Cards](https://drive.google.com/file/d/15OXJ13Ldq6ADCjMDyCE6zzNrH_JTuZxI/view?usp=drive_link)

### Spending Analytics

![Analytics](https://drive.google.com/file/d/14WCnbl7hMGnADOZWwRpowkLcJfSUe3KH/view?usp=drive_link)

## 🛠️ Technical Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **State & Form Management**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Icons**: [Lucide React](https://lucide.dev/) & remixicon

## ⚙️ Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd eaziwallet-v1
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:

   ```bash
   npm run build
   ```

5. **Run tests**:
   ```bash
   npm test
   ```

## 🧠 Design Decisions & Trade-offs

- **Architecture**: Utilizes a strictly component-based architecture for maximum modularity and reusability. Each component is self-contained, with logic, and tests colocated within its file or folder.
- **Mobile-First Layout**: Given the nature of fintech apps, I prioritized a mobile experience. The navigation switches from a Bottom Nav (mobile) to a Sidebar (desktop).
- **Client-Side Validation**: Implemented Zod schemas for immediate feedback, reducing server load and improving user experience.
- **Lazy Loading**: All main routes are lazy-loaded to optimize the critical rendering path and reduce initial load times.
- **Test Strategy**: Employs a **colocation strategy** where test files (`.test.tsx`, `.test.ts`) are placed directly next to the source files they verify, ensuring high visibility and easier maintenance.
- **Trade-off - Component Library**: Opted for custom components over a heavy library like MUI to maintain strict adherence to the premium design system and keep the bundle size low.

## 📂 Architecture & Folder Structure

```text
src/
├── components/      # Shared UI blocks
│   ├── auth/        # Authentication-specific components
│   ├── common/      # Reusable primitives (Button, Input, etc.)
│   └── dashboard/   # Dashboard-related UI elements
├── pages/           # Page-level components organized by feature
├── routes/          # Centralized routing configuration
├── hooks/           # Custom React hooks (e.g., useCopy)
├── schemas/         # Zod validation schemas
├── assets/          # Global images and design tokens
├── constants/       # Global constants and mock data
└── utils/           # Shared utility functions
```

## 🔄 Porting to Another Framework

The application logic is heavily decoupled from the UI:

- **State Logic**: Most state management is handled through React hooks. Porting to **Vue** would involve converting these hooks to Composables.
- **Validation**: Zod is framework-agnostic, so the schemas can be reused 100% in any JavaScript framework.
- **Routing**: Moving to **Next.js** would involve moving files into the `app/` directory and replacing `react-router-dom` links with `next/link`.

## 🚧 Challenges Faced & Solutions

### 1. Complex Data Transformation for Grouped Lists

**Challenge**: Transforming a flat array of transactions into a grouped object keyed by relative dates (Today, Yesterday, and Older) presented logic hurdles. Initial implementations struggled with inconsistent date formats and timezone offsets.
**Solution**: I implemented a robust `groupTransactionsByDate` utility that leverages ISO date comparison. By normalizing the "Today" and "Yesterday" references at the start of the function, the logic accurately buckets transactions regardless of the user's local timezone, which is critical for a financial application.

### 2. Synchronizing Layout States with Dynamic Navigation

**Challenge**: The application uses a dual-navigation strategy: a `BottomNav` for mobile and a `Sidebar` for desktop. A major challenge was ensuring that sub-pages (like Transfer or Analytics) correctly hid these global navigation elements to maximize screen real estate, without breaking the nested route structure.
**Solution**: I implemented a centralized `Layout` component that monitors the current `location.pathname` against a `SHOW_NAV_PATHS` configuration. Combined with a custom `UiContext`, this allows the application to dynamically adjust layout padding and visibility of nav elements based on the depth of the user's navigation stack.

### 3. Integrating Zod Schemas with Custom Form Controls

**Challenge**: Binding custom UI components like the `PhoneInput` and a "Terms & Conditions" checkbox to `react-hook-form` while using strict Zod literals (e.g., `z.literal(true)`) was tricky. Simple boolean toggles often failed validation because they were passing values that technically met type requirements but failed the literal logic of the schema.
**Solution**: I refined the component interfaces to pass value events that strictly match the Zod schema's expectations. I also adjusted the form validation mode to `onSubmit` for better UX, ensuring that users aren't bombarded with error messages until they've actually attempted to proceed.

---

Developed with ❤️ by Chibuokem Egbuchulam.
