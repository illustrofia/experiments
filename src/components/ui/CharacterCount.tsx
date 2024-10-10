import { cn } from "@/utils";
import React from "react"

const CharacterCount = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { value: string; maxLength: number }
>(({ value, maxLength, className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    >
      {value.length} / {maxLength}
    </span>
  )
})
CharacterCount.displayName = "CharacterCount"
