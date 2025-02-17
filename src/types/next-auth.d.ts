// // types/next-auth.d.ts

// import { Session } from 'next-auth';
// import { JWT } from 'next-auth/jwt';

// // Extend the Session interface with the additional accessToken property
// declare module 'next-auth' {
//   interface Session {
//     accessToken?: string;
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       roles?: string[];
//     }
//   }
// }

// // Extend the JWT interface with the additional roles property
// declare module 'next-auth/jwt' {
//   interface JWT {
//     roles?: string[];
//     accessToken?: string;
//   }
// }


import type { User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      sub: string;
      email_verified: boolean;
      name: string;
      preferred_username: string;
      given_name: string;
      family_name: string;
      email: string;
      id: string;
      org_name?: string;
      telephone?: string;
    };
    error: string;
    accessToken: string;
    idToken:any;
    decodedToken :string

  }

  interface User {
    sub: string;
    email_verified: boolean;
    name: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email: string;
    id: string;
  }

  interface Account {
    provider: string;
    type: string;
    id: string;
    accessToken: string;
    accessTokenExpires?: any;
    refreshToken: string;
    idToken: string;
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    id_token: string;
    'not-before-policy': number;
    session_state: string;
    scope: string;
  }
  /** The OAuth profile returned from your provider */
  interface Profile {
    sub: string;
    email_verified: boolean;
    name: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    name: string;
    email: string;
    sub: string;
    name: string;
    email: string;
    sub: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpired: number;
    refreshTokenExpired: number;
    user: User;
    error: string;
    accessToken:string;
    expiresAt:any;
  }
}