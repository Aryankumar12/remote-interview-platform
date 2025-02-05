import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const updateInterviewStatus =mutation({
    args:{
        id:v.id("interviews"),
        status: v.string(),
    },
    handler: async(ctx, args_0) =>{
        return await ctx.db.patch(args_0.id, {
            status: args_0.status,
            ...(args_0.status ==="completed" ? {endTime: Date.now()}: {}),
        })
    },
})


export const getAllInterviews = query({
    handler: async(ctx)=>{
        const identity  = ctx.auth.getUserIdentity();
        if(!identity) throw new Error ("Unauthorized")

        const interviews = await ctx.db.query("interviews").collect();

        return interviews;
    }
})

export const getMyInterviews = query({
    handler: async (ctx) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) return [];
  
      const interviews = await ctx.db
        .query("interviews")
        .withIndex("by_candidate_id", (q) => q.eq("candidateId", identity.subject))
        .collect();
  
      return interviews!;
    },
  });

  export const createInterview = mutation({
    args: {
      title: v.string(),
      description: v.optional(v.string()),
      startTime: v.number(),
      status: v.string(),
      streamCallId: v.string(),
      candidateId: v.string(),
      interviewerIds: v.array(v.string()),
    },
    handler: async (ctx, args) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Unauthorized");
  
      return await ctx.db.insert("interviews", {
        ...args,
      });
    },
  });

  export const getInterviewByStreamCallId = query({
    args: { streamCallId: v.string() },
    handler: async (ctx, args) => {
      return await ctx.db
        .query("interviews")
        .withIndex("by_stream_call_id", (q) => q.eq("streamCallId", args.streamCallId))
        .first();
    },
  });