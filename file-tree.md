# Project Structure

## Repository Overview
```
purple-car-bolt/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page component
├── components/            # React components
│   └── ui/               # UI components from shadcn/ui
├── hooks/                # Custom React hooks
│   └── use-toast.ts     # Toast hook
├── lib/                  # Utility functions
│   └── utils.ts         # Common utilities
├── .eslintrc.json       # ESLint configuration
├── .gitignore           # Git ignore rules
├── components.json      # Shadcn/ui configuration
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Component Organization
- UI Components: Located in `components/ui/`
- Custom Hooks: Located in `hooks/`
- Utility Functions: Located in `lib/`

## Key Files
- `app/page.tsx`: Main application page
- `app/layout.tsx`: Root layout with providers
- `app/globals.css`: Global styles and Tailwind directives
- `components.json`: Shadcn/ui component configurations
- `tailwind.config.ts`: Tailwind CSS theme and plugin setup

## Documentation
- `dev-notes.md`: Development documentation
- `task-log.md`: Task tracking and progress
- `file-tree.md`: Project structure (this file) 