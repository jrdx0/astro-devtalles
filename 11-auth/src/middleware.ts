import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ["/protected"];
const notAuthRoutes = ["/login", "/register"];

export const onRequest = defineMiddleware(({ url, redirect, locals }, next) => {
  const isLoggedIn = !!firebase.auth.currentUser;
  const user = firebase.auth.currentUser;

  if (user) {
    locals.user = {
      photoURL: user.photoURL ?? "",
      email: user.email ?? "",
      name: user.displayName ?? "",
      emailVerified: user.emailVerified,
    };
  }

  if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
    return redirect("/");
  }

  if (isLoggedIn && notAuthRoutes.includes(url.pathname)) {
    return redirect("/");
  }

  locals.isLoggedIn = isLoggedIn;

  return next();
});
