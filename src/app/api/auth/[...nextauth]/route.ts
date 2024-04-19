import NextAuth, { NextAuthOptions } from "next-auth"

export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) 
    {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    }
  },
  providers: [
    {
      id: "identity-server4",
      name: "IdentityServer4",
      type: "oauth",
      wellKnown: `http://localhost:5026/.well-known/openid-configuration`,
      authorization: { params: { scope: "openid email roles profile" } },
      checks: ["pkce", "state"],
      clientId: "client-next",
      clientSecret: "client2123",
      issuer: "http://localhost:5026",
      userinfo: "http://localhost:5026/connect/userinfo",
      profile(profile: any, token: any) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: null,
          access_token: token.access_token,
          role: profile.role
        }
      }
    },
  ],
  session: { strategy: "jwt" },
  jwt: {
    maxAge: 60 * 60 * 24 * 30
  }
};

const handler = NextAuth(nextAuthOptions)


export { handler as GET, handler as POST }