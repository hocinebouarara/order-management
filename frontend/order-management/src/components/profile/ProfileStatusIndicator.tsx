import React from "react";
import { Check, AlertTriangle } from "lucide-react";
import { cn } from "../../lib/utils";

interface ProfileStatusIndicatorProps {
  isComplete: boolean;
  className?: string;
}

const ProfileStatusIndicator: React.FC<ProfileStatusIndicatorProps> = ({
  isComplete,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium",
        isComplete
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200",
        className
      )}
    >
      {isComplete ? (
        <>
          <Check className="h-4 w-4" />
          <span>Profile Completed</span>
        </>
      ) : (
        <>
          <AlertTriangle className="h-4 w-4" />
          <span>Profile Incomplete</span>
        </>
      )}
    </div>
  );
};

export default ProfileStatusIndicator;
