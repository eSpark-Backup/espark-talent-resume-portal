# Configuration with Supabase

First, you need to create an account on Supabase.

## Getting Started

1. **Create Supabase Project**

   Get the following keys from your Supabase project settings:

   - Project settings > API:
     - `Project URL="xxxxxxxxxxxxxx"`
     - `anon_public_key="xxxxxxxxxxxxxxx"`

2. **Create Table Schema**

   Create a table with the following schema:

   | Name              | Type      | Constraints             |
   |-------------------|-----------|-------------------------|
   | id                | int8      | null primary key        |
   | created_at        | timestamp | default now()           |
   | name              | text      | null                    |
   | email             | text      | null                    |
   | cnic              | text      | null                    |
   | linkedin_profile  | text      | null                    |
   | salary_expection  | text      | null                    |
   | experience        | text      | null                    |
   | availability      | text      | null                    |
   | prefrences        | text      | null                    |
   | education         | text      | null                    |
   | github_profile    | text      | null                    |
   | city              | text      | null                    |
   | field             | text      | null                    |
   | subField          | text      | null                    |
   | position          | text      | null                    |
   | cv                | text      | null                    |
   | phone_num         | text      | null                    |
   | tags              | text[]    | null                    |
   | job_type          | text      | null                    |
   | projects          | text      | null                    |
   | revamp_cv         | text      | null                    |
   | country           | text      | null                    |

## Authentication Configuration

Create two users with the following email addresses and any strong passwords:

1. admin@esparkconsultants.com
2. hr@esparkconsultants.com

## Policies Configuration

Enable row level security and create four policies:

1. Insert: PUBLIC
2. Select: AUTHENTICATED
3. Delete: AUTHENTICATED
4. Update: AUTHENTICATED

## Running the Project

To get started with the project, run the following commands:

```bash
npm i
npm run dev
