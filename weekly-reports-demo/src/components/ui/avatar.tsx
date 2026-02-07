import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { ComponentProps } from "react";
import { cn, getInitials } from "@lib/utils";

interface AvatarProps extends ComponentProps<typeof AvatarPrimitive.Root> {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "size-6 text-[9px]",
  md: "size-8 text-[10px]",
  lg: "size-10 text-xs",
};

export function Avatar({
  name,
  src,
  size = "md",
  className,
  ...props
}: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border border-border",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={name}
          className="aspect-square h-full w-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        className="flex h-full w-full items-center justify-center bg-neutral-200 font-medium text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
        delayMs={src ? 600 : 0}
      >
        {name ? getInitials(name) : "?"}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
