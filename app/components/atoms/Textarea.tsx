import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Textarea = (props: ComponentProps<"textarea">) => {
  return (
    <textarea
      {...props}
      className={cn(
        // "w-full border-4 border-solid border-purple-800 rounded-md p-2"
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-purple-800 flex min-h-[80px] w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-purple-800 focus-visible:ring-purple-800/50 focus-visible:ring-[3px]"
      )}
    />
  );
};
