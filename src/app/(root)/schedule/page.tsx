"use client";

import LoaderUI from "@/components/ui/LoaderUI";
import { useUserRole } from "@/hooks/UseUserRole";
import { useRouter } from "next/navigation";
import InterviewScheduleUI from "./InteriewScheduleUI";

function SchedulePage() {
  const router = useRouter();

  const { isInterviewer, isLoading } = useUserRole();

  if (isLoading) return <LoaderUI />;
  if (!isInterviewer) return router.push("/");

  return <InterviewScheduleUI />;
}
export default SchedulePage;