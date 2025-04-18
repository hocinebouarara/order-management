export function ConfirmationRateCard() {
  const confirmationRate = 82;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-full">
      <div className="relative h-36 w-36 flex items-center justify-center">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          <circle
            className="text-muted-foreground/20"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary"
            strokeWidth="10"
            strokeDasharray={250}
            strokeDashoffset={250 - (250 * confirmationRate) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="40"
            cx="50"
            cy="50"
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-3xl font-bold">{confirmationRate}%</div>
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">Based on last 7 days</p>
        <p className="text-sm">12,480 total orders processed</p>
        <p className="text-sm">8,200 orders confirmed</p>
      </div>
    </div>
  );
}
