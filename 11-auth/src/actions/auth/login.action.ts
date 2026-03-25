import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import {signInWithEmailAndPassword, type AuthError} from "firebase/auth";
import { firebase } from "../../firebase/config";

export const login = defineAction({
  accept: 'form',
  input: z.object({
    email: z.email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set('email', email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: '/'
      });
    } else {
      cookies.delete('email', {
        path: '/'
      });
    }

    try {
      const { user } = await signInWithEmailAndPassword(firebase.auth, email, password);
      return user;
    } catch (e) {
      const firebaseErr = e as AuthError;

      console.log(firebaseErr);
      throw new Error(firebaseErr.message);
    }
  }
});
