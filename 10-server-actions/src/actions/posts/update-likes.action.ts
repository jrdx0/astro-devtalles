import { actions, defineAction } from "astro:actions";
import { z } from "astro:content";
import { db, Posts, eq } from "astro:db";

export const updatePostLikes = defineAction({
    input: z.object({
        postId: z.string(),
        increment: z.number()
    }),
    handler: async ({ postId, increment }) => {
        // const posts = await db.select()
        // .from(Posts)
        // .where(eq(Posts.id, postId));

        const {data, error} = await actions.getPostLikes(postId);

        if (error) {
            console.log(error);
            throw new Error('Algo salió mal');
        }

        const { likes, exists } = data;

        if (!exists) {
            const newPost = {
                id: postId,
                title: 'Post not found',
                likes: 0
            };

            await db.insert(Posts).values(newPost);
        }

        await db.update(Posts)
            .set({
                likes: likes + increment
            })
            .where(eq(Posts.id, postId));
        
        return true;
    }
})