## Configuration with supabase

First, you have to create an account on supabase

Get the below keys: 

Project settings > API: 

Project URL="xxxxxxxxxxxxxx"
anon_public_key="xxxxxxxxxxxxxxx"


Now create a table with the following schema: 

Name  
id (int8)  null primary key
created_at timestamp now()  
name       text null  
email      text null
cnic       text null
linkedin_profile   text null
salary_expection   text null
experience         text null
availability       text null
prefrences         text null
education          text null
github_profile     text null
city               text null
field              text null
subField           text null
position           text null
cv                 text null
phone_num          text null
tags               text null    define as array
job_type           text null
projects           text null
revamp_cv          text null
country            text null


Authentication Configuration

Create 2 users with the below email addresses with any strong passwords

1.admin@esparkconsultans.com
2.hr@esparkconsultans.com



Policies Configuration

Enable the row level security

create 4 Policies 

Insert PUBLIC 
Select AUTHENTICATED
Delete AUTHENTICATED
Update AUTHENTICATED


## Getting Started 

```bash
npm i 

npm run dev

```



































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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
