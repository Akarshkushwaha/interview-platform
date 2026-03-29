import useMeetingActions from "@/hooks/useMeetingActions";
import { Doc } from "../../convex/_generated/dataModel";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalendarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type Interview = Doc<"interviews">;

function MeetingCard({ interview }: { interview: Interview }) {
  const { joinMeeting } = useMeetingActions();

  const status = getMeetingStatus(interview);
  const formattedDate = format(new Date(interview.startTime), "EEEE, MMMM d · h:mm a");

  return (
    <Card className="hover:shadow-md transition-all border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            <CalendarIcon className="h-4 w-4" />
            {formattedDate}
          </div>

          <Badge
            variant={
              status === "live" ? "default" : status === "upcoming" ? "outline" : "secondary"
            }
            className={cn(
              "px-3 py-1 uppercase tracking-wider text-[10px] font-bold",
              status === "live" && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse",
              status === "upcoming" && "bg-blue-500/10 text-blue-500 border-blue-500/20",
              status === "completed" && "bg-gray-500/10 text-gray-500 border-gray-500/20"
            )}
          >
            {status === "live" ? "Live Now" : status === "upcoming" ? "Upcoming" : "Completed"}
          </Badge>
        </div>

        <CardTitle className="text-xl font-bold">{interview.title}</CardTitle>

        {interview.description && (
          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {interview.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {status === "live" && (
          <Button className="w-full shadow-lg shadow-emerald-500/20 group" onClick={() => joinMeeting(interview.streamCallId)}>
            Join Interview
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Button>
        )}

        {status === "upcoming" && (
          <Button variant="outline" className="w-full cursor-not-allowed bg-muted/30" disabled>
            Meeting not started
          </Button>
        )}

        {status === "completed" && (
          <Button variant="secondary" className="w-full" disabled>
            View Recording
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
export default MeetingCard;