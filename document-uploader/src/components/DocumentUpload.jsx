import { useState } from "react";
import axios from "axios";

function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    setLoading(true);
    setError("");
    setSummary([]);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8080/api/summarize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      setSummary(res.data.summary || []);
    } catch (err) {
      setError("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg p-6 sm:p-8 bg-white rounded-xl shadow-xl border text-center">
  <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-purple-700 flex items-center justify-center gap-2">
    📄 Document Summarizer
  </h2>

  {/* Drag and Drop Section */}
  <div
    onDragOver={(e) => e.preventDefault()}
    onDrop={(e) => {
      e.preventDefault();
      setFile(e.dataTransfer.files[0]);
    }}
    className="border-2 border-dashed border-purple-300 p-4 sm:p-6 rounded-lg bg-purple-50 hover:bg-purple-100 transition cursor-pointer mb-4"
  >
    <p className="text-purple-700 font-medium">Drag & drop a file here, or click below:</p>

    <label className="inline-block mt-4 py-2 px-4 rounded bg-purple-200 hover:bg-purple-300 text-purple-800 font-semibold cursor-pointer">
      Choose File
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="hidden"
      />
    </label>

    <p className="mt-2 text-sm text-gray-600 truncate max-w-xs mx-auto">
      {file ? `📄 ${file.name}` : "No file chosen"}
    </p>
  </div>

  {/* Upload Button */}
  <button
    onClick={handleUpload}
    className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition"
  >
    Upload & Summarize
  </button>

  {/* Uploading State */}
  {loading && (
    <div className="mt-4 text-purple-700">
      <p>Uploading... {progress}%</p>
      <div className="h-2 w-full bg-gray-200 rounded">
        <div
          className="h-2 bg-purple-500 rounded"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )}

  {/* Error Message */}
  {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}

  {/* Summary Results */}
  {summary.length > 0 && (
    <div className="mt-6 text-left">
      <h3 className="text-lg font-bold text-purple-700 mb-2">📝 Summary:</h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-800">
        {summary.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
}

export default DocumentUpload;
