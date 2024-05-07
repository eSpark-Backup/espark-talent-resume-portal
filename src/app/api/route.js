import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";
import { config } from 'dotenv';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';

config();

const s3Client = new S3Client({
    endpoint: process.env.END_POINT,
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.B2_APPLICATION_KEY_ID,
        secretAccessKey: process.env.B2_APPLICATION_KEY,
    },
});

export async function POST(req) {
    try {
        const formData = await req?.formData();

        const file = formData.get("file");

        console.log(file, "file");

        const buffer = await file.arrayBuffer()

        // Generate UUID for the file name
        const uuid = uuidv4();

        // Get the file extension
        const fileExtension = path.extname(file.name);

        // Construct the key with UUID and file extension
        const key = `${uuid}${fileExtension}`;


        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: key,
                Body: buffer,
            })
        );

        return NextResponse.json({ Message: "Success", fileKey:key }, { status: 201 });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ Message: "Failed" }, { status: 500 });
    }
};



export const GET = async (req) => {
     const url = new URL(req.url);
     const searchParams =  new URLSearchParams(url.searchParams)
     const resume = searchParams.get("resume")


    const data = await s3Client.send(
        new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: resume,
        })
    );

    const file = data?.Body
    const fileName = resume;

    return new Response(
        file,
        {
            status: 200,
            headers: new Headers({
                // this optional header triggers a download in the browser
                "content-disposition": `attachment; filename=${fileName}`,
                "content-type": "application/zip",
            })
        })
}


