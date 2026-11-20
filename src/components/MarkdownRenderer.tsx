
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none
                    prose-headings:font-semibold
                    prose-p:leading-7
                    prose-li:my-1
                    prose-strong:font-semibold">

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const isBlock = Boolean(match);

            return isBlock ? (
              <SyntaxHighlighter
                style={oneDark}
                language={match![1]}
                PreTag="div"
                className="rounded-lg my-4!"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="bg-muted px-1.5 py-0.5 rounded text-sm"
                {...props}
              >
                {children}
              </code>
            );
          },

          table({ children }) {
            return (
              <div className="overflow-x-auto my-4">
                <table className="w-full border-collapse border border-border">
                  {children}
                </table>
              </div>
            );
          },

          th({ children }) {
            return (
              <th className="border border-border bg-muted p-2 text-left">
                {children}
              </th>
            );
          },

          td({ children }) {
            return (
              <td className="border border-border p-2">
                {children}
              </td>
            );
          },

          ul({ children }) {
            return (
              <ul className="list-disc pl-6 space-y-1">
                {children}
              </ul>
            );
          },

          ol({ children }) {
            return (
              <ol className="list-decimal pl-6 space-y-1">
                {children}
              </ol>
            );
          },

          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                {children}
              </blockquote>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
