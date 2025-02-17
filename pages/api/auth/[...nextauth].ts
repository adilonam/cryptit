import NextAuth, { AuthOptions, TokenSet } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

function requestRefreshOfAccessToken(token: JWT) {
  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!,
    }),
    method: "POST",
    cache: "no-store",
  });
}

const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_ID!,
      clientSecret: process.env.KEYCLOAK_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        console.log(token)
        return token;

      }
      console.log(token);
      if (Date.now() < token.expiresAt * 1000 - 60 * 1000) {
        return token;
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token);

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          const updatedToken: JWT = {
            ...token,
            idToken: tokens.id_token,
            accessToken: tokens.access_token!,
            expiresAt: Math.floor(
              Date.now() / 1000 + (tokens.expires_in as number)
            ),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          };
          return updatedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.decodedToken = jwtDecode(token.accessToken)
      session.idToken = token.idToken;
      session.error = token.error;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export default handler;
