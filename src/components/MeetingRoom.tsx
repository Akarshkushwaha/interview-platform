import {
  CallControls,
  CallParticipantsList,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LayoutListIcon, LoaderIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import EndCallButton from "./EndCallButton";
import CodeEditor from "./CodeEditor";
import { cn } from "@/lib/utils";
import useIsMobile from "@/hooks/useIsMobile";

function MeetingRoom() {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const isMobile = useIsMobile();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-[calc(100vh-4rem-1px)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="size-10 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse font-medium">Entering Meeting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem-1px)] bg-background overflow-hidden font-sans relative">
      {/* MAIN CONTENT: FULL SCREEN CODE EDITOR */}
      <div className="absolute inset-0 z-0">
        <CodeEditor />
      </div>

      {/* VIDEO OVERLAY (BOTTOM-RIGHT) */}
      <div
        className={cn(
          "absolute transition-all duration-300 z-30 shadow-2xl",
          isMobile
            ? "top-4 right-4 w-32 h-44"
            : "bottom-24 right-6 w-64 h-40"
        )}
      >
        <div className="size-full rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 relative group">
          {layout === "grid" ? (
            <PaginatedGridLayout />
          ) : (
            <SpeakerLayout />
          )}

          {/* PARTICIPANTS LIST OVERLAY (NESTED) */}
          {showParticipants && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md z-50">
              <CallParticipantsList onClose={() => setShowParticipants(false)} />
            </div>
          )}
        </div>
      </div>

      {/* FLOATING CONTROLS DOCK (BOTTOM-CENTER) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto px-4">
        <div className="flex items-center gap-2 bg-zinc-900/90 backdrop-blur-2xl border border-white/10 p-1.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-1 sm:gap-2">
            <CallControls onLeave={() => router.push("/")} />
          </div>

          <div className="hidden sm:block h-6 w-px bg-white/10 mx-1" />

          <div className="flex items-center gap-1 sm:gap-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9 rounded-xl hover:bg-white/10 transition-colors text-white">
                  <LayoutListIcon className="size-4 sm:size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900/95 backdrop-blur-lg border-white/10 text-white">
                <DropdownMenuItem onClick={() => setLayout("grid")} className="gap-2 cursor-pointer focus:bg-white/10">
                  <LayoutListIcon className="size-4 uppercase" />
                  Grid View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLayout("speaker")} className="gap-2 cursor-pointer focus:bg-white/10">
                  <UsersIcon className="size-4" />
                  Speaker View
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "size-9 rounded-xl transition-all",
                showParticipants ? "bg-primary/20 text-primary border border-primary/30" : "hover:bg-white/10 text-white"
              )}
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <UsersIcon className="size-4 sm:size-5" />
            </Button>

            <div className="ml-1 sm:ml-2">
              <EndCallButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MeetingRoom;