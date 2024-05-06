import { NextResponse } from "next/server";
import { config } from 'dotenv';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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


        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: file.name,
                Body: Buffer.from(await file.arrayBuffer()),
            })
        );

        const imageUrl = `https://${process.env.BUCKET_NAME}.${process.env.END_POINT.replace(/^https?:\/\//, '')}/${file.name}`;

        return NextResponse.json({ Message: "Success", imageUrl }, { status: 201 });
    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ Message: "Failed" }, { status: 500 });
    }
};

