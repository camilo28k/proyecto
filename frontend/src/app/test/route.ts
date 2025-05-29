// frontend/src/app/test/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    console.log('¡API Route /api/test GET ha sido alcanzada!');
    return NextResponse.json({ message: 'Hello from /api/test GET!' }, { status: 200 });
}