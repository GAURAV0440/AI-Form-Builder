import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Upload,
  Sparkles,
  FileText,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";

interface Field {
  id: string;
  label: string;
  field_type: string;
  required: boolean;
  options: string[];
  field_order: number;
}

export default function FillForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [fields, setFields] = useState<Field[]>([]);

  const [values, setValues] = useState<Record<string, any>>({});

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploadedFilename, setUploadedFilename] =
    useState("");

  const [loadingForm, setLoadingForm] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [extracting, setExtracting] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [aiCompleted, setAiCompleted] =
    useState(false);

  useEffect(() => {
    fetchForm();
  }, []);

  async function fetchForm() {
    try {
      const res = await api.get(`/forms/${id}`);

      setTitle(res.data.title);

      setFields(res.data.fields || []);
    } catch (err) {
      console.error(err);

      toast.error("Unable to load form");
    } finally {
      setLoadingForm(false);
    }
  }

  async function uploadDocument() {
    if (!selectedFile) {
      toast.error("Please select a document");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", selectedFile);

      const res = await api.post(
        "/upload/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setUploadedFilename(
        res.data.filename
      );

      toast.success(
        "Document uploaded successfully"
      );
    } catch (err) {
      console.error(err);

      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function extractAI() {
    if (!uploadedFilename) {
      toast.error(
        "Please upload a document first"
      );
      return;
    }

    try {
      setExtracting(true);

      const res = await api.post(
        `/extract/${id}`,
        null,
        {
          params: {
            filename:
              uploadedFilename,
          },
        }
      );

      setValues(
        res.data.autofill || {}
      );

      setAiCompleted(true);

      toast.success(
        "AI extraction completed"
      );
    } catch (err) {
      console.error(err);

      toast.error(
        "AI extraction failed"
      );
    } finally {
      setExtracting(false);
    }
  }

  function updateValue(
    label: string,
    value: any
  ) {
    setValues((prev) => ({
      ...prev,
      [label]: value,
    }));
  }

  async function submitForm() {
    for (const field of fields) {
      if (
        field.required &&
        !values[field.label]
      ) {
        toast.error(
          `${field.label} is required`
        );
        return;
      }
    }

    try {
      setSaving(true);

      await api.post(
        "/responses/",
        {
          form_id: id,
          responses: values,
        }
      );

      toast.success(
        "Form submitted successfully"
      );

      navigate("/success");
    } catch (err) {
      console.error(err);

      toast.error(
        "Submission failed"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loadingForm) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading Form...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-5xl p-8">

        <div className="rounded-xl bg-white p-8 shadow">

          <h1 className="text-4xl font-bold mb-2">
            {title}
          </h1>

          <p className="mb-8 text-gray-500">
            Upload your document and let AI
            fill the form automatically.
          </p>

          <div className="rounded-lg border border-dashed border-gray-300 p-6 mb-8">

            <h2 className="text-xl font-semibold mb-4">
              Upload Resume / Document
            </h2>

            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => {
                if (e.target.files)
                  setSelectedFile(
                    e.target.files[0]
                  );
              }}
              className="mb-4"
            />

            {selectedFile && (
              <div className="flex items-center gap-2 mb-4">

                <FileText size={20} />

                <span>
                  {selectedFile.name}
                </span>

              </div>
            )}

            <button
              onClick={uploadDocument}
              disabled={uploading}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white"
            >
              <Upload size={18} />

              {uploading
                ? "Uploading..."
                : "Upload"}
            </button>

            {uploadedFilename && (
              <button
                onClick={extractAI}
                disabled={extracting}
                className="mt-4 flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white"
              >
                <Sparkles size={18} />

                {extracting
                  ? "Extracting..."
                  : "Extract with AI"}
              </button>
            )}

            {aiCompleted && (
              <div className="mt-4 flex items-center gap-2 text-green-600 font-semibold">

                <CheckCircle size={20} />

                AI Extraction Completed

              </div>
            )}

          </div>

          {aiCompleted && (
            <>
                        <h2 className="mb-6 text-2xl font-bold">
              Review AI Extracted Data
            </h2>

            {fields.map((field) => (
              <div
                key={field.id}
                className="mb-6"
              >
                <label className="mb-2 block font-semibold">
                  {field.label}

                  {field.required && (
                    <span className="text-red-500">
                      {" "}*
                    </span>
                  )}
                </label>

                {field.field_type === "textarea" ? (

                  <textarea
                    rows={4}
                    className="w-full rounded-lg border p-3"
                    value={values[field.label] || ""}
                    onChange={(e) =>
                      updateValue(
                        field.label,
                        e.target.value
                      )
                    }
                  />

                ) : field.field_type === "dropdown" ? (

                  <select
                    className="w-full rounded-lg border p-3"
                    value={values[field.label] || ""}
                    onChange={(e) =>
                      updateValue(
                        field.label,
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select
                    </option>

                    {(field.options || []).map(
                      (option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      )
                    )}

                  </select>

                ) : field.field_type === "checkbox" ? (

                  <input
                    type="checkbox"
                    checked={
                      Boolean(
                        values[field.label]
                      )
                    }
                    onChange={(e) =>
                      updateValue(
                        field.label,
                        e.target.checked
                      )
                    }
                  />

                ) : (

                  <input
                    className="w-full rounded-lg border p-3"
                    type={
                      field.field_type ===
                      "number"
                        ? "number"
                        : field.field_type ===
                          "date"
                        ? "date"
                        : "text"
                    }
                    value={
                      values[field.label] || ""
                    }
                    onChange={(e) =>
                      updateValue(
                        field.label,
                        e.target.value
                      )
                    }
                  />

                )}
              </div>
            ))}

            <button
              onClick={submitForm}
              disabled={saving}
              className="mt-8 w-full rounded-lg bg-green-600 py-4 text-lg font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
            >
              {saving
                ? "Submitting..."
                : "Submit Form"}
            </button>

          </>
          )}

        </div>

      </div>

    </div>
  );
}