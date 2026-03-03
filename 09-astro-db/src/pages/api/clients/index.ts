import type { APIRoute } from 'astro';
import { Clients, db } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async () => {
    const clients = await db.select().from(Clients);

    return new Response(JSON.stringify(clients), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const { id, ...body } = await request.json();

        const { lastInsertRowid } = await db.insert(Clients).values(body);

        return new Response(JSON.stringify({
            id: +lastInsertRowid!.toString(),
            ...body
        }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (e: unknown) {
        return new Response(JSON.stringify({ error: (e as Error).toString() }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};