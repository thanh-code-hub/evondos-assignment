This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## REQUIREMENT ANALYSIS
- Allow users to view, add, edit, and delete patient records
  - different views and functionalities => use routes
- A patient record should include the patient's name, date of birth, medical condition in a free text form, and the date of the next appointment.
  - => Data object can be translated to form value
- search functionality to filter patient records by name or other fields
  - => filter from either frontend or backend, depends on the size of database and use case
- Backend can Node or Django
- Responsive UI
  - Tailwind CSS
 