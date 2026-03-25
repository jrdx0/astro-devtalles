interface User {
  email: string;
  name: string;
  photoURL: string;
  emailVerified: boolean;
}

declare namespace App {
  interface Locals {
    isLoggedIn: boolean;
    user: User | null;
  }
}
