import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError,
} from "firebase/auth";
import { firebase } from "../../firebase/config";

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        path: "/",
      });
    } else {
      cookies.delete("email", {
        path: "/",
      });
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password,
      );
      const { user } = newUser;

      if (!firebase.auth.currentUser) {
        throw new Error("No current user");
      }

      updateProfile(firebase.auth.currentUser, {
        displayName: name,
      });

      await sendEmailVerification(firebase.auth.currentUser, {
        url: `${import.meta.env.WEBSITE_URL}/protected?emailVerify=true`,
      });

      return {
        id: user.uid,
        email: user.email,
      };
    } catch (e) {
      const firebaseErr = e as AuthError;

      if (firebaseErr.code === "auth/email-already-in-use") {
        throw new Error("El correo ya está en uso");
      }

      console.log(e);
      throw new Error("Auxilio! Algo salió mal");
    }
  },
});
