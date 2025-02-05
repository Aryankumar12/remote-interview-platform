import { useClerk } from "@clerk/nextjs"
import {  useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useUserRole = ()=>{
    const {user} = useClerk();
    const userData  = useQuery(api.users.getUserByClerkId, {
        clerkId: user?.id || "",
    })

    const isLoading = userData === undefined;

    return{
        isLoading,
        isInterviewer : userData?.role ==="interviewer",
        isCandidate: userData?.role === "candidate",
    }


}