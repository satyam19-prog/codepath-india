import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode, language }) {
  return (
    <Editor
      height="100%"
      defaultLanguage="cpp"
      language={language}
      theme="vs-dark"
      value={code}
      onChange={(val) => setCode(val)}
    />
  );
}
