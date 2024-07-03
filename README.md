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
