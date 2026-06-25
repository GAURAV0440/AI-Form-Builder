import { useState } from "react";
import { Upload, FileText, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";

export default function UploadDocument() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedPath, setUploadedPath] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.post("/upload/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadedPath(res.data.filepath);

      toast.success("File uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const extractAI = () => {
    if (!uploadedPath) {
      toast.error("Upload a document first");
      return;
    }

    console.log(uploadedPath);

    toast.success(
      "Next step: AI extraction (we'll connect this next)"
    );
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-3xl p-8">

        <h1 className="mb-8 text-4xl font-bold">
          Upload Document
        </h1>

        <div className="rounded-xl bg-white p-8 shadow">

          <div className="mb-8 flex justify-center">

            <div className="rounded-full bg-blue-100 p-5">

              <Upload
                className="text-blue-600"
                size={45}
              />

            </div>

          </div>

          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
            className="mb-6 w-full rounded border p-3"
          />

          {file && (
            <div className="mb-6 flex items-center gap-3 rounded bg-slate-100 p-3">

              <FileText className="text-blue-600" />

              <span>{file.name}</span>

            </div>
          )}

          <button
            onClick={uploadFile}
            disabled={loading}
            className="mb-4 w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>

          {uploadedPath && (
            <button
              onClick={extractAI}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-white hover:bg-green-700"
            >
              <Sparkles size={18} />
              Extract with AI
            </button>
          )}

        </div>

      </div>

    </div>
  );
}