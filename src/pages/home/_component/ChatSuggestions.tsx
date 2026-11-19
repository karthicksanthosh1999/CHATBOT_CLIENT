
import {
  Code2,
  BookOpen,
  Lightbulb,
  FileText,
} from "lucide-react";

import { Card } from "../../../components/ui/card";

const suggestions = [
  {
    title: "Write code",
    description: "Build and debug applications",
    icon: Code2,
    prompt: "Help me write a React component",
  },
  {
    title: "Learn something",
    description: "Explore new concepts",
    icon: BookOpen,
    prompt: "Teach me about artificial intelligence",
  },
  {
    title: "Get ideas",
    description: "Brainstorm creative solutions",
    icon: Lightbulb,
    prompt: "Give me some project ideas",
  },
  {
    title: "Analyze documents",
    description: "Understand your documents",
    icon: FileText,
    prompt: "Explain how document analysis works",
  },
];

interface Props {
  onSelect: (prompt: string) => void;
}

export default function ChatSuggestions({ onSelect }: Props) {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
      {suggestions.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            onClick={() => onSelect(item.prompt)}
            className="cursor-pointer gap-2 rounded-xl p-5 shadow-none transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-secondary/40"
          >
            <Icon className="size-6 text-primary" />

            <h3 className="font-semibold">{item.title}</h3>

            <p className="text-sm text-muted-foreground">
              {item.description}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
