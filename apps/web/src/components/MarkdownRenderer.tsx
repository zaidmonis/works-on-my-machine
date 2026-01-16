import React from "react";
import MarkdownIt from "markdown-it";
import container from "markdown-it-container";
import { getHighlighter } from "shiki";
import { usePlayground } from "../lib/playground";

const useMarkdown = (content: string) => {
  const [html, setHtml] = React.useState("<p>Loading content...</p>");

  React.useEffect(() => {
    let active = true;
    const md = new MarkdownIt({
      html: false,
      linkify: true,
      highlight: () => ""
    });

    md.use(container, "tip");
    md.use(container, "warn");
    md.use(container, "note");

    md.renderer.rules.fence = (tokens, idx) => {
      const token = tokens[idx];
      const info = token.info.trim();
      const language = info.split(/\s+/g)[0];
      const code = token.content;

      if (language === "playground") {
        return `<div class="border border-cyan-500/40 rounded p-4 bg-slate-900">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs uppercase tracking-wide text-cyan-300">Try it</span>
            <button class="playground-button text-xs text-slate-200 bg-cyan-600 px-2 py-1 rounded" data-playground="${encodeURIComponent(
              code
            )}">Load in playground</button>
          </div>
          <pre class="text-xs text-slate-200">${md.utils.escapeHtml(code)}</pre>
        </div>`;
      }

      return `<pre class="code-block" data-code="${encodeURIComponent(code)}"><code class="language-${language}">${md.utils.escapeHtml(
        code
      )}</code></pre>`;
    };

    const renderMarkdown = async () => {
      const highlighter = await getHighlighter({
        themes: ["nord"],
        langs: ["javascript", "typescript", "jsx", "tsx"]
      });

      const rendered = md.render(content);
      const wrapper = document.createElement("div");
      wrapper.innerHTML = rendered;
      const blocks = wrapper.querySelectorAll("pre.code-block");
      blocks.forEach((block) => {
        const code = decodeURIComponent(block.getAttribute("data-code") ?? "");
        const lang = block.querySelector("code")?.className.replace("language-", "") ?? "javascript";
        const htmlBlock = highlighter.codeToHtml(code, { lang, theme: "nord" });
        block.outerHTML = `<div class="relative my-4">
          <button class="copy-button absolute right-2 top-2 text-xs bg-slate-800 px-2 py-1 rounded" data-copy="${encodeURIComponent(
            code
          )}">Copy</button>
          ${htmlBlock}
        </div>`;
      });

      if (active) {
        setHtml(wrapper.innerHTML);
      }
    };

    renderMarkdown();

    return () => {
      active = false;
    };
  }, [content]);

  return html;
};

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const html = useMarkdown(content);
  const { setCode, setLanguage } = usePlayground();

  React.useEffect(() => {
    const handleCopy = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("copy-button")) {
        const code = decodeURIComponent(target.getAttribute("data-copy") ?? "");
        navigator.clipboard.writeText(code);
        target.textContent = "Copied";
        setTimeout(() => {
          target.textContent = "Copy";
        }, 1200);
      }
      if (target.classList.contains("playground-button")) {
        const code = decodeURIComponent(target.getAttribute("data-playground") ?? "");
        setCode(code);
        setLanguage("javascript");
      }
    };

    document.addEventListener("click", handleCopy);
    return () => document.removeEventListener("click", handleCopy);
  }, [setCode, setLanguage]);

  return (
    <div
      className="prose prose-invert max-w-none prose-pre:bg-transparent prose-code:text-cyan-200"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownRenderer;
