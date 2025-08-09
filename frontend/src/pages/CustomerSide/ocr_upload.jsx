import React, { useState } from "react";

const OCRUpload = () => {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [storeResults, setStoreResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle file select
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Upload to OCR endpoint
  const handleUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!file) {
      setResponseMessage(<span style={{ color: "red" }}>Please select a file</span>);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - let the browser set it with boundary
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.text) {
        setResponseMessage(<h3 style={{ color: "green" }}>Text Extracted Successfully!</h3>);
        setOcrText(data.text);
      } else if (data.error) {
        setResponseMessage(<span style={{ color: "red" }}>{data.error}</span>);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setResponseMessage(
        <span style={{ color: "red" }}>
          Error: {error.message || "Failed to upload file"}
        </span>
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Save edited text and find items
  const handleSave = async () => {
    if (!ocrText.trim()) {
      alert("Please extract text first");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/find-items", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: ocrText }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const resData = await res.json();
      setStoreResults(resData.store_results || []);

      if (resData.message) {
        setResponseMessage(<span style={{ color: "green" }}>{resData.message}</span>);
      }
    } catch (error) {
      console.error("Find items error:", error);
      setResponseMessage(
        <span style={{ color: "red" }}>
          Error: {error.message || "Failed to find items"}
        </span>
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* OCR Upload Section */}
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ textAlign: "center" }}>Upload Image for OCR</h1>
        <form 
          onSubmit={handleUpload} 
          encType="multipart/form-data"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center"
          }}
        >
          <div style={{ width: "100%" }}>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              style={{ display: "none" }}
            />
            <label 
              htmlFor="file"
              style={{
                display: "block",
                padding: "10px 15px",
                backgroundColor: "#f0f0f0",
                borderRadius: "5px",
                cursor: "pointer",
                textAlign: "center",
                border: "1px dashed #ccc"
              }}
            >
              {file ? file.name : "Choose an image"}
            </label>
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              width: "200px"
            }}
          >
            {isLoading ? "Processing..." : "Upload"}
          </button>
        </form>

        {/* Response Message */}
        <div style={{ margin: "20px 0", minHeight: "30px" }}>
          {responseMessage}
        </div>

        {/* Editable OCR Text */}
        {ocrText && (
          <div style={{ marginTop: "20px" }}>
            <h3>Extracted Text:</h3>
            <textarea
              style={{
                width: "100%",
                minHeight: "150px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                marginBottom: "15px"
              }}
              value={ocrText}
              onChange={(e) => setOcrText(e.target.value)}
            />
            <button 
              onClick={handleSave}
              disabled={isLoading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              {isLoading ? "Searching..." : "Find Items in Stores"}
            </button>
          </div>
        )}

        {/* Store Search Results */}
        {storeResults.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h2>Store Search Results:</h2>
            <div style={{ display: "grid", gap: "20px" }}>
              {storeResults.map((store, idx) => (
                <div 
                  key={idx}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "15px",
                    backgroundColor: "#f9f9f9"
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>{store.store}</h3>
                  {store.found_items.length > 0 && (
                    <div style={{ marginBottom: "10px" }}>
                      <strong style={{ color: "green" }}>Found Items:</strong>
                      <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
                        {store.found_items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {store.not_found_items.length > 0 && (
                    <div>
                      <strong style={{ color: "red" }}>Not Found Items:</strong>
                      <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
                        {store.not_found_items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OCRUpload;