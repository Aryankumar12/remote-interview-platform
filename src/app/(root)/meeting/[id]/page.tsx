"use client";

import { Button } from "@/components/ui/button";
import LoaderUI from "@/components/ui/LoaderUI";
import MeetingRoom from "@/components/ui/MeetingRoom";
import MeetingSetup from "@/components/ui/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

function MeetingPage() {
  const { id } = useParams();
  const { isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(id);
  const router = useRouter();
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) return <LoaderUI />;

  if (!call) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background/95">
        <div className="text-center">
          <p className="text-4xl font-semibold text-muted-foreground">
            📅 Meeting not found
          </p>
          <p className="text-lg text-muted-foreground mt-4">
            We couldn't find the meeting you were looking for. It might have
            been canceled or the link could be incorrect.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => router.push("/")}
              size="lg"
              className="bg-primary text-black hover:bg-primary/80"
            >
              Create a New Meeting
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? (
          <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
        ) : (
          <MeetingRoom />
        )}
      </StreamTheme>
    </StreamCall>
  );
}
export default MeetingPage;
