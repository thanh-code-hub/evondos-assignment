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

## Objective:
Develop a simple web application for managing patient records in a healthcare organization.
The application should allow users to view, add, edit, and delete patient records.
A patient record should include the patient's name, date of birth, medical condition in a free text form, and the date of the next appointment.
The application should also include a search functionality to filter patient records by name or other fields.
- Requirements:
  - Use React and TypeScript to build the application frontend. If needed, you can use frameworks or components of your choice for a simple backend implementation.
  - Create a responsive and visually appealing user interface using HTML and CSS with a framework of your choice.
  - Use an SQL database to store patient information.
  - Consider accessibility best practices, ensuring also the application is user-friendly and intuitive.
  - Write some automated tests for key components and functionalities using a testing framework. No 100% coverage is expected, just a few examples is enough.

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
 