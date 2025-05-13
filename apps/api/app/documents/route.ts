import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { dummyDocuments } from '../../dummy_data/documents';

export function GET(request: NextRequest) {
    return NextResponse.json(dummyDocuments, {
        headers: {'Content-Type': 'application/json'}, 
        status: 200 
    });
}

export async function POST(request: NextRequest) {
    const document = await request.json();
    const newDocument = {
        id: dummyDocuments.length + 1,
        title: document.title,
        author: document.author,
        createdAt: new Date().toISOString(),
        content: document.content,
    };
    dummyDocuments.push(newDocument);
    return NextResponse.json(newDocument, {
        headers: {'Content-Type': 'application/json'}, 
        status: 201 
    });
}