import React from "react";
import Editor from "@monaco-editor/react";
import * as ts from "typescript";
import { usePlayground } from "../lib/playground";

const Playground: React.FC = () => {
  const { code, setCode, language, setLanguage } = usePlayground();
  const [output, setOutput] = React.useState<string[]>([]);
  const [errors, setErrors] = React.useState<string[]>([]);
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);
  const examples = [
    {
      title: "Array map",
      language: "javascript" as const,
      code: "const numbers = [1, 2, 3];\\nconst doubled = numbers.map(n => n * 2);\\nconsole.log(doubled);"
    },
    {
      title: "Fetch data",
      language: "javascript" as const,
      code: "async function load() {\\n  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');\\n  const data = await response.json();\\n  console.log(data);\\n}\\n\\nload();"
    },
    {
      title: "TypeScript types",
      language: "typescript" as const,
      code: "type User = { name: string; age: number };\\nconst user: User = { name: 'Ada', age: 36 };\\nconsole.log(user);"
    }
  ];

  const runCode = () => {
    setOutput([]);
    setErrors([]);
    const compiled =
      language === "typescript"
        ? ts.transpileModule(code, {
            compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext }
          }).outputText
        : code;

    const html = `<!doctype html>
      <html><body><script>
      const logs = [];
      const errors = [];
      const send = (type, payload) => parent.postMessage({ type, payload }, '*');
      console.log = (...args) => send('log', args.map(String).join(' '));
      console.error = (...args) => send('error', args.map(String).join(' '));
      window.onerror = (message) => send('error', String(message));
      try { ${compiled} } catch (err) { send('error', err?.message || String(err)); }
      </script></body></html>`;

    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }
  };

  React.useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data.type === "log") {
        setOutput((prev) => [...prev, event.data.payload]);
      }
      if (event.data.type === "error") {
        setErrors((prev) => [...prev, event.data.payload]);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Playground</h1>
          <p className="text-slate-400 mt-2">Run JavaScript or TypeScript safely in the browser.</p>
        </div>
        <div className="flex gap-2">
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value as "javascript" | "typescript")}
            className="bg-slate-800 px-3 py-2 rounded text-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
          </select>
          <button onClick={runCode} className="bg-cyan-500 text-slate-900 px-4 py-2 rounded text-sm">
            Run
          </button>
          <button
            onClick={() => setCode("console.log('Hello from the playground!');")}
            className="bg-slate-800 px-4 py-2 rounded text-sm"
          >
            Reset
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="bg-slate-800 px-4 py-2 rounded text-sm"
          >
            Copy code
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <Editor
            height="420px"
            defaultLanguage="javascript"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value ?? "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false }
            }}
          />
        </div>
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h2 className="text-sm font-semibold">Example snippets</h2>
            <div className="mt-3 space-y-2 text-xs">
              {examples.map((example) => (
                <button
                  key={example.title}
                  onClick={() => {
                    setLanguage(example.language);
                    setCode(example.code);
                  }}
                  className="w-full text-left bg-slate-800 px-3 py-2 rounded hover:bg-slate-700"
                >
                  {example.title}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h2 className="text-sm font-semibold">Console output</h2>
            <div className="mt-3 text-xs text-slate-300 space-y-1 min-h-[80px]">
              {output.length === 0 && <p className="text-slate-500">No output yet.</p>}
              {output.map((line, index) => (
                <p key={`${line}-${index}`}>{line}</p>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <h2 className="text-sm font-semibold">Errors</h2>
            <div className="mt-3 text-xs text-red-300 space-y-1 min-h-[80px]">
              {errors.length === 0 && <p className="text-slate-500">No errors.</p>}
              {errors.map((line, index) => (
                <p key={`${line}-${index}`}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <iframe ref={iframeRef} title="sandbox" sandbox="allow-scripts" className="hidden" />
    </div>
  );
};

export default Playground;
