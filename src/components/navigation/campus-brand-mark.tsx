interface CampusBrandMarkProps {
  className?: string;
}

export function CampusBrandMark({ className = "size-20 lg:size-28" }: CampusBrandMarkProps) {
  return (
    <svg
      role="img"
      aria-label="CampusOS Emblem"
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        rx="22"
        className="stroke-emerald-500/30 fill-emerald-950/40"
        strokeWidth="3"
      />
      <path
        d="M50 24L78 38L50 52L22 38L50 24Z"
        className="fill-emerald-400/80 stroke-emerald-300"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 45V61C32 67 40 73 50 73C60 73 68 67 68 61V45"
        className="stroke-emerald-400 fill-none"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M78 38V56"
        className="stroke-emerald-300 fill-none"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="78" cy="58" r="3" className="fill-emerald-300" />
    </svg>
  );
}
