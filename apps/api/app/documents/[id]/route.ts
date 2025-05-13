import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { dummyDocuments } from "../../../dummy_data/documents";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Query the post by id.

    const { id } = await params;
    return NextResponse.json(
        dummyDocuments.find((document) => document.id === parseInt(id)),
        {
            headers: { "Content-Type": "application/json" },
            status: 200,
        })
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Modify the title of the post.

    const { id } = await params;
    const body = await request.json();
    const { title } = body;

    const index = dummyDocuments.findIndex(document => document.id === parseInt(id));
    dummyDocuments[index].title = title;
    return NextResponse.json(dummyDocuments[index]);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Delete the post.

    const { id } = await params;
    const index = dummyDocuments.findIndex(document => document.id === parseInt(id));
    dummyDocuments.splice(index, 1);
    return NextResponse.json(dummyDocuments[index]);
}
