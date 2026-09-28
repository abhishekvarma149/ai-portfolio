import { useState } from "react";
import { FaCopy, FaCheck, FaCode } from "react-icons/fa";

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  // Split content into code blocks and normal text segments
  const parts = parseMarkdownBlocks(content);

  return (
    <div className="markdown-content">
      {parts.map((part, index) => {
        if (part.type === "code") {
          return (
            <CodeBlock
              key={index}
              language={part.language}
              code={part.code}
            />
          );
        }

        return <FormattedText key={index} text={part.text} />;
      })}
    </div>
  );
}

function CodeBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-container">
      <div className="code-block-header">
        <span className="code-block-lang">
          <FaCode style={{ marginRight: 6 }} />
          {language || "code"}
        </span>
        <button
          className="code-copy-btn"
          onClick={handleCopy}
          title="Copy code"
        >
          {copied ? (
            <>
              <FaCheck style={{ color: "#10b981", marginRight: 5 }} /> Copied!
            </>
          ) : (
            <>
              <FaCopy style={{ marginRight: 5 }} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="code-block-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function FormattedText({ text }) {
  if (!text) return null;

  // Split by line breaks
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} className="md-spacer" />;
        }

        // Bullet point
        if (trimmed.startsWith("•") || trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          const bulletText = trimmed.replace(/^[•\-\*]\s*/, "");
          return (
            <li key={idx} className="md-bullet-item">
              {renderInlineStyles(bulletText)}
            </li>
          );
        }

        // Headings
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={idx} className="md-h3">
              {renderInlineStyles(trimmed.replace(/^###\s*/, ""))}
            </h4>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={idx} className="md-h2">
              {renderInlineStyles(trimmed.replace(/^##\s*/, ""))}
            </h3>
          );
        }
        if (trimmed.startsWith("# ")) {
          return (
            <h2 key={idx} className="md-h1">
              {renderInlineStyles(trimmed.replace(/^#\s*/, ""))}
            </h2>
          );
        }

        return (
          <p key={idx} className="md-paragraph">
            {renderInlineStyles(line)}
          </p>
        );
      })}
    </>
  );
}

function renderInlineStyles(text) {
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="md-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer"
          className="md-link"
        >
          {linkMatch[1]}
        </a>
      );
    }

    return part;
  });
}

function parseMarkdownBlocks(text) {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const result = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push({
        type: "text",
        text: text.slice(lastIndex, match.index),
      });
    }

    result.push({
      type: "code",
      language: match[1] || "plaintext",
      code: match[2].trim(),
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    result.push({
      type: "text",
      text: text.slice(lastIndex),
    });
  }

  return result;
}
