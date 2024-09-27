// convex/profiles.js
import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const update = mutation({
  args: {
    name: v.string(),
    image: v.optional(v.string()),
    userId: v.id('users')
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error('Non autorizzato');
    }
    
    const userId = args.userId
    console.log('id utente user id'+ userId)

    //Trova l'utente nella tabella users
    const user = await ctx.db.query('users').filter(q => q.eq(q.field('_id'), userId)).first();
    
    if (!user) {
      throw new Error('Utente non trovato');
    }

    //Aggiorna i dati dell'utente
    await ctx.db.patch(user._id, {
      name: args.name,
      image: args.image,
    });

    return { success: true };
  },
});