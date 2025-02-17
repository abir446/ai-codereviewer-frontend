import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 2;
}`);

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    prism.highlightAll();
  });

  const codeReview = async () => {
    setLoading(!loading);
    const response = await axios.post(
      "https://ai-codereviewer-backend.onrender.com/ai/get-review",
      {
        code,
      }
    );
    console.log(response.data);
    setReview(response.data);
    setLoading(false);
  };
  return (
    <>
      <h1>AI CODE REVIEWER</h1>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              value={code}
              onValueChange={(code) => setCode(code)}
              style={{
                height: "100%",
                width: "100%",
                fontSize: 16,
              }}
            />
          </div>
          <div onClick={codeReview} className="review">
            Review
          </div>
        </div>
        <div className="right">
          {loading && <h1>Checking Code using Gemini 2.0 Flash</h1>}
          <Markdown>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default App;
