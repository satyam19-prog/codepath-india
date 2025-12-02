import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import CodeEditor from "../components/CodeEditor";
import { AuthContext } from "../context/AuthContext";
import "./EditorPage.css";

const TEMPLATES = {
  cpp: `// C++ Solution
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
  python: `# Python Solution
def solve():
    print("Hello World")

if __name__ == "__main__":
    solve()`,
  java: `// Java Solution
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
  javascript: `// JavaScript Solution
console.log("Hello World");`
};

export default function EditorPage() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(TEMPLATES.cpp);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle language change
  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(TEMPLATES[newLang]);
  };

  const runCode = async () => {
    setIsRunning(true);
    setIsRunning(true);
    setOutput("Running...");

    try {
      const res = await API.post("/submissions/run", {
        sourceCode: code,
        language,
        stdin
      });

      const result = res.data.result;
      if (result.stdout) {
        setOutput(result.stdout);
      } else if (result.compile_output) {
        setOutput(result.compile_output); // Error
      } else if (result.stderr) {
        setOutput(result.stderr);
      } else {
        setOutput(result.status?.description || "No output");
      }
    } catch (err) {
      setOutput("Error running code: " + (err.response?.data?.message || err.message));
    } finally {
      setIsRunning(false);
    }
  };

  const submit = async () => {
    setIsSubmitting(true);
    setIsSubmitting(true);
    setOutput("Submitting...");

    try {
      const payload = {
        userId: user.id,
        challengeId: Number(id),
        language,
        sourceCode: code,
      };

      const res = await API.post("/submissions", payload);
      const result = res.data.result;

      let out = `Status: ${res.data.status.toUpperCase()}\n`;
      if (result.stdout) out += `Output:\n${result.stdout}`;
      else if (result.compile_output) out += `Error:\n${result.compile_output}`;

      setOutput(out);
    } catch (err) {
      setOutput("Submission failed: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page editor-container">
      <div className="editor-header">
        <h1 className="editor-title">Solve Challenge</h1>
        <select
          className="language-select"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <div className="editor-main">
        <div className="code-section">
          <div className="editor-box">
            <CodeEditor code={code} setCode={setCode} language={language} />
          </div>
          <div className="run-submit-section">
            <button className="run-btn" onClick={runCode} disabled={isRunning}>
              {isRunning ? "Running..." : "Run Code"}
            </button>
            <button className="submit-btn" onClick={submit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>

        <div className="console-section">
          <div className="console-box">
            <div className="console-header">Input</div>
            <textarea
              className="console-input"
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              placeholder="Enter custom input here..."
            />
          </div>
          <div className="console-box">
            <div className="console-header">Output</div>
            <pre className="console-output">
              {output || "Run code to see output"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
