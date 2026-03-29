import { QuickActionType } from "@/constants";
import { Card } from "./ui/card";

function ActionCard({ action, onClick }: { action: QuickActionType; onClick: () => void }) {
  return (
    <Card
      className="group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl cursor-pointer bg-card"
      onClick={onClick}
    >
      {/* ACTION GRADIENT */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-100 group-hover:opacity-60 transition-opacity`}
      />

      {/* ACTION CONTENT WRAPPER */}
      <div className="relative p-6 size-full">
        <div className="space-y-4">
          {/* ACTION ICON */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${
              action.color === "primary" ? "bg-primary/20 text-primary" : 
              action.color === "purple-500" ? "bg-purple-500/20 text-purple-500" :
              action.color === "blue-500" ? "bg-blue-500/20 text-blue-500" :
              action.color === "orange-500" ? "bg-orange-500/20 text-orange-500" : ""
            }`}
          >
            <action.icon className="h-6 w-6" />
          </div>

          {/* ACTION DETAILS */}
          <div className="space-y-1">
            <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
              {action.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
              {action.description}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ActionCard;