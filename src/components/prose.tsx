"use client";

import { Check, Copy } from "lucide-react";
import React, { type HTMLAttributes, type ReactNode, useState } from "react";
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockGroup,
} from "@/components/prompt-kit/code-block";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProseProps = HTMLAttributes<HTMLElement> & {
  html: string;
};

const copiedtimeout = 2000;

function CustomCodeBlock({
  language,
  children,
  filename,
}: {
  language?: string;
  children: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), copiedtimeout);
  };

  return (
    <div className="my-6">
      <CodeBlock>
        <CodeBlockGroup className="border-border border-b py-2 pr-2 pl-4">
          <div className="flex items-center gap-2">
            {language && (
              <div className="rounded bg-primary/10 px-2 py-1 font-medium text-primary text-xs">
                {language}
              </div>
            )}
            {filename && (
              <span className="text-muted-foreground text-sm">{filename}</span>
            )}
          </div>
          <Button
            className="h-8 w-8"
            onClick={handleCopy}
            size="icon"
            variant="ghost"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </CodeBlockGroup>
        <CodeBlockCode
          code={children}
          language={language || "text"}
          theme="dracula"
        />
      </CodeBlock>
    </div>
  );
}

function Blockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-6 rounded-r-lg border-border border-l-4 bg-muted/20 py-4 pl-6">
      <div className="text-muted-foreground italic">{children}</div>
    </blockquote>
  );
}

function ImageBlock({
  src,
  alt,
  children,
}: {
  src?: string;
  alt?: string;
  children?: ReactNode;
}) {
  return (
    <div className="my-8 flex">
      <div className="overflow-hidden">
        <img
          alt={alt}
          className="h-auto max-w-full"
          height={100}
          src={src}
          width={100}
        />
        {children && (
          <div className="border-border/50 border-t px-4 py-3 text-muted-foreground text-sm">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

function parseHtml(html: string): ReactNode[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const walk = (node: Node, index: number): ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      const children = Array.from(node.childNodes).map((child, i) =>
        walk(child, i)
      );

      switch (tagName) {
        case "pre": {
          const codeElement = element.querySelector("code");
          const language = codeElement?.className.match(/language-(\w+)/)?.[1];
          const filename = element.querySelector("filename")?.textContent;
          const code = codeElement?.textContent || "";
          return (
            <CustomCodeBlock
              filename={filename}
              key={`code-${index}`}
              language={language}
            >
              {code}
            </CustomCodeBlock>
          );
        }

        case "blockquote":
          return <Blockquote key={`quote-${index}`}>{children}</Blockquote>;

        case "img":
          return (
            <ImageBlock
              alt={element.getAttribute("alt") || undefined}
              key={`img-${index}`}
              src={element.getAttribute("src") || undefined}
            />
          );

        case "figure": {
          const img = element.querySelector("img");
          const caption = element.querySelector("figcaption");
          return (
            <ImageBlock
              alt={img?.getAttribute("alt") || undefined}
              key={`figure-${index}`}
              src={img?.getAttribute("src") || undefined}
            >
              {caption?.textContent}
            </ImageBlock>
          );
        }

        default:
          return React.createElement(
            tagName,
            {
              key: `${tagName}-${index}`,
              className: element.className,
              ...Object.fromEntries(
                Array.from(element.attributes).map((attr) => [
                  attr.name,
                  attr.value,
                ])
              ),
            },
            children
          );
      }
    }

    return null;
  };

  return Array.from(doc.body.childNodes).map((node, index) =>
    walk(node, index)
  );
}

export function Prose({ children, html, className }: ProseProps) {
  if (!html) {
    return <>{children}</>;
  }

  try {
    const parsedContent = parseHtml(html);
    return (
      <article
        className={cn(
          "prose dark:prose-invert max-w-none prose-img:rounded-lg prose-blockquote:border-l-border prose-pre:bg-muted prose-h1:font-medium prose-h2:font-medium prose-h3:font-medium prose-a:text-foreground prose-blockquote:text-muted-foreground prose-code:text-foreground prose-em:text-foreground prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-muted-foreground prose-strong:text-foreground prose-p:leading-relaxed prose-a:underline prose-a:decoration-muted-foreground/50 hover:prose-a:decoration-foreground",
          className
        )}
      >
        {parsedContent}
      </article>
    );
  } catch {
    return (
      <article
        className={cn(
          "prose dark:prose-invert max-w-none prose-img:rounded-lg prose-blockquote:border-l-border prose-pre:bg-muted prose-h1:font-medium prose-h2:font-medium prose-h3:font-medium prose-a:text-foreground prose-blockquote:text-muted-foreground prose-code:text-foreground prose-em:text-foreground prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-muted-foreground prose-strong:text-foreground prose-p:leading-relaxed prose-a:underline prose-a:decoration-muted-foreground/50 hover:prose-a:decoration-foreground",
          className
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    );
  }
}
