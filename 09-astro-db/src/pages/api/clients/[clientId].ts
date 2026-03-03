import type { APIRoute } from 'astro';
import { db, Clients, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const clientId = params.clientId ?? '';

    const [client] = await db.select().from(Clients)
        .where(eq(Clients.id, +clientId));

    if (client) {
        return new Response(JSON.stringify(client), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });    
    }

    return new Response(JSON.stringify(
        { msg: `Client with id ${clientId} not found` }
    ), {
        status: 404,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


export const PATCH: APIRoute = async ({ request, params }) => {
    const clientId = params.clientId ?? '';

    try {
        const { id, ...body } = await request.json();

        const res = await db.update(Clients)
            .set(body)
            .where(eq(Clients.id, +clientId));

        const [updatedClient] = await db.select()
            .from(Clients)
            .where(eq(Clients.id, +clientId));

        return new Response(JSON.stringify(updatedClient), {
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

export const DELETE: APIRoute = async ({ params }) => {
    const clientId = params.clientId ?? '';

    const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, +clientId));

    if (rowsAffected > 0) {
        return new Response(JSON.stringify({ msg: 'Deleted' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });    
    }

    return new Response(JSON.stringify({ msg: `Client with id ${clientId} not found` }), {
        status: 404,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};