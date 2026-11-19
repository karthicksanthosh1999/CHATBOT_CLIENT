
import { Sparkles } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Sparkles size={17} />
      </div>

      <div className="flex items-center gap-1 rounded-xl border bg-card px-4 py-3">
        <span className="size-2 animate-bounce rounded-full bg-primary" />
        <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
        <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
      </div>
    </div>
  );
}
