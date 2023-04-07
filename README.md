# manager-project-backend
## Getting Started

Configure .env variables:
```text
DATABASE_URL="<drive>://<user>:<password>@<ip>:<port>/<database>?schema=<schema>"
JWT_SECRET=<secret_id>
SECRET=<secret_for_social_media>
TOKEN_EXPIRES="60m"
```
Where:
* secret_id: Generate your own md5 id.
* secret_for_social_media: Generate the same id registered at the frontend for Social Media Login.

Then run the development server:
```bash
npm run prisma migrate dev
npm run dev
# or
yarn prisma migrate dev
yarn dev
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
