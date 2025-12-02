import { useState } from "react";
import API from "../services/api";
import "./AdminAddChallenge.css";

export default function AdminAddChallenge() {
  const [form, setForm] = useState({
    title: "",
    difficulty: "",
    tags: "",
    statement: "",
  });

  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const removeTestCase = (index) => {
    const newTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(newTestCases);
  };

  const submit = async () => {
    try {
      const payload = {
        ...form,
        testCases: JSON.stringify(testCases),
      };
      await API.post("/challenges/create", payload);
      alert("Challenge created!");
      setForm({ title: "", difficulty: "", tags: "", statement: "" });
      setTestCases([{ input: "", output: "" }]);
    } catch (err) {
      alert("Error creating challenge");
    }
  };

  return (
    <div className="admin-container">
      <h2>Create Manual Challenge</h2>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Difficulty (easy/medium/hard)"
        value={form.difficulty}
        onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
      />

      <input
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={(e) => setForm({ ...form, tags: e.target.value })}
      />

      <textarea
        placeholder="Problem Statement"
        value={form.statement}
        onChange={(e) => setForm({ ...form, statement: e.target.value })}
      />

      <div className="test-cases-section">
        <h3>Test Cases</h3>
        {testCases.map((tc, index) => (
          <div key={index} className="test-case-row">
            <div className="test-case-inputs">
              <textarea
                placeholder="Input"
                value={tc.input}
                onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
              />
              <textarea
                placeholder="Output"
                value={tc.output}
                onChange={(e) => handleTestCaseChange(index, "output", e.target.value)}
              />
            </div>
            <button className="remove-btn" onClick={() => removeTestCase(index)}>
              Remove
            </button>
          </div>
        ))}
        <button className="add-btn" onClick={addTestCase}>
          + Add Test Case
        </button>
      </div>

      <button className="create-btn" onClick={submit}>Create Challenge</button>
    </div>
  );
}