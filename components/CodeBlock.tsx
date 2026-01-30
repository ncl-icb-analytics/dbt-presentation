import { highlightCode } from "@/lib/shiki";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

export default async function CodeBlock({
  code,
  lang = "sql",
  filename,
}: CodeBlockProps) {
  const html = await highlightCode(code.trim(), lang);

  return (
    <div className="code-wrapper">
      {filename && <div className="code-filename">{filename}</div>}
      <div
        className="code-block-inner"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
