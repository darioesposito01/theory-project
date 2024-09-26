import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server"; 
import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Password],
});


export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});




export const deleteAccount = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const { userId } = args;

    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Non autorizzato');
    }
    

    // Trova l'utente nella tabella users
    const user = await ctx.db.query('users').filter(q => q.eq(q.field('_id'), userId)).first();
    
    if (!user) {
      throw new Error('Utente non trovato');
    }

    // Elimina tutti i post dell'utente
    const userPosts = await ctx.db.query('posts').filter(q => q.eq(q.field('userId'), userId)).collect();
    for (const post of userPosts) {
      await ctx.db.delete(post._id);
    }

    // Elimina l'account dell'utente dalla tabella users
    await ctx.db.delete(user._id);

    // Elimina l'account dalla tabella authAccounts
    const authAccount = await ctx.db
      .query('authAccounts')
      .filter(q => q.eq(q.field('userId'), userId))
      .first();
    
    if (authAccount) {
      await ctx.db.delete(authAccount._id);
    } else {
      console.warn(`AuthAccount non trovato per l'utente ${userId}`);
    }

    return { success: true };
  },
});