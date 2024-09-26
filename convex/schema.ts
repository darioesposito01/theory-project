import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  posts: defineTable({
    userId: v.id('users'), 
    title:v.string(),
    content: v.string(), 
    createdAt: v.number()
  })
  // Your other tables...
});
 
export default schema;