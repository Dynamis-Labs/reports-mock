import { type HTMLAttributes } from "react";
import { cn } from "@lib/utils";

export function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius-md)] bg-neutral-100 dark:bg-neutral-800",
        className,
      )}
      {...props}
    />
  );
}
