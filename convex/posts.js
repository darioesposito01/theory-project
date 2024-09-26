// convex/posts.js
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const create = mutation({
  args: { userId: v.string(), title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    const { userId, title ,content } = args;
    return ctx.db.insert('posts', { userId, title,  content, createdAt: Date.now() });
  },
});

export const list = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const { userId } = args;
    return ctx.db.query('posts')
      .filter(q => q.eq(q.field('userId'), userId))
      .order('desc')
      .collect();
  },
});

export const deletePost = mutation({
  args: { postId: v.string() },
  handler: async (ctx, args) => {
    const { postId } = args;
    await ctx.db.delete(postId);
  },
});