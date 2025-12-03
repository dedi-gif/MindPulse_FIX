import { cn } from "@/lib/utils";

export const Logo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("size-6", className)}
    {...props}
  >
    <title>MindPulse Logo</title>
    <path d="M7 12h2l2-5 2 10 2-5h2" />
    <circle cx="12" cy="12" r="10" />
  </svg>
);
