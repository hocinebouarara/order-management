import React from "react";
import { Check, AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";

interface ProfileStatusIndicatorProps {
  isComplete: boolean;
  percentage: number; // Add a percentage prop
  className?: string;
}

const ProfileStatusIndicator: React.FC<ProfileStatusIndicatorProps> = ({
  isComplete,
  percentage,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 px-4 py-3 rounded-md text-sm font-medium animate-scale-in transition-all duration-500",
        isComplete
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {isComplete ? (
          <>
            <Check className="h-4 w-4 animate-scale-in" />
            <span>Profile Completed</span>
          </>
        ) : (
          <>
            <AlertTriangle className="h-4 w-4 animate-scale-in" />
            <span>Profile Incomplete</span>
          </>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-500",
            isComplete ? "bg-green-500" : "bg-amber-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProfileStatusIndicator;
