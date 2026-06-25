import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  FileCheck2,
  FileText,
  Send,
  Sparkles,
  Upload,
  WandSparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";
import Loader from "../../components/Loader";

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
  const [values, setValues] = useState<Record<string, unknown>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [loadingForm, setLoadingForm] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiCompleted, setAiCompleted] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
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
    };

    fetchForm();
  }, [id]);

  async function uploadDocument() {
    if (!selectedFile) {
      toast.error("Please select a document");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await api.post("/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedFilename(res.data.filename);
      toast.success("Document uploaded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function extractAI() {
    if (!uploadedFilename) {
      toast.error("Please upload a document first");
      return;
    }

    try {
      setExtracting(true);
      const res = await api.post(`/extract/${id}`, null, {
        params: { filename: uploadedFilename },
      });

      setValues(res.data.autofill || {});
      setAiCompleted(true);
      toast.success("AI extraction completed");
    } catch (err) {
      console.error(err);
      toast.error("AI extraction failed");
    } finally {
      setExtracting(false);
    }
  }

  function updateValue(label: string, value: unknown) {
    setValues((prev) => ({ ...prev, [label]: value }));
  }

  async function submitForm() {
    for (const field of fields) {
      if (field.required && !values[field.label]) {
        toast.error(`${field.label} is required`);
        return;
      }
    }

    try {
      setSaving(true);
      await api.post("/responses/", {
        form_id: id,
        responses: values,
      });
      toast.success("Form submitted successfully");
      navigate("/success");
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    } finally {
      setSaving(false);
    }
  }

  if (loadingForm) {
    return <Loader label="Preparing your form..." />;
  }

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate("/forms")}
          className="mb-6 flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to all forms
        </button>

        <div className="grid items-start gap-7 lg:grid-cols-[.72fr_1.28fr]">
          <aside className="animate-enter lg:sticky lg:top-24">
            <p className="eyebrow">
              <Sparkles size={14} />
              Smart application
            </p>
            <h1 className="page-title mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-md leading-7 text-slate-600">
              Upload a document for AI-assisted autofill, then review every
              field before submitting.
            </p>

            <div className="surface-card mt-7 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-slate-400">
                Your progress
              </p>
              <div className="mt-5 space-y-4">
                <ProgressItem
                  number={1}
                  title="Choose document"
                  complete={Boolean(selectedFile)}
                />
                <ProgressItem
                  number={2}
                  title="Upload and extract"
                  complete={aiCompleted}
                />
                <ProgressItem
                  number={3}
                  title="Review and submit"
                  complete={false}
                  active={aiCompleted || !selectedFile}
                />
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="surface-card animate-enter-delay overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Upload size={21} />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      Upload your document
                    </h2>
                    <p className="mt-0.5 text-sm text-slate-500">
                      PDF, PNG, JPG or JPEG
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-5 py-9 text-center transition hover:border-indigo-300 hover:bg-indigo-50/45">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => {
                      if (e.target.files) {
                        setSelectedFile(e.target.files[0]);
                        setUploadedFilename("");
                        setAiCompleted(false);
                      }
                    }}
                    className="sr-only"
                  />
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md">
                    <FileText size={25} />
                  </div>
                  <p className="mt-4 font-extrabold text-slate-800">
                    {selectedFile ? selectedFile.name : "Choose a document"}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedFile
                      ? "Click to choose a different file"
                      : "Click to browse from your device"}
                  </p>
                </label>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={uploadDocument}
                    disabled={uploading || !selectedFile}
                    className="btn-primary flex-1 px-5 py-3.5"
                  >
                    {uploading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload size={18} />
                        Upload document
                      </>
                    )}
                  </button>

                  <button
                    onClick={extractAI}
                    disabled={extracting || !uploadedFilename}
                    className="btn-success flex-1 px-5 py-3.5"
                  >
                    {extracting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Extracting...
                      </>
                    ) : (
                      <>
                        <WandSparkles size={18} />
                        Extract with AI
                      </>
                    )}
                  </button>
                </div>

                {uploadedFilename && !aiCompleted && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700">
                    <FileCheck2 size={18} />
                    Upload complete. Your document is ready for AI extraction.
                  </div>
                )}

                {aiCompleted && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                    <CheckCircle2 size={18} />
                    AI extraction complete. Please review the fields below.
                  </div>
                )}
              </div>
            </section>

            <section className="surface-card animate-enter-delay overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-7">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Review your information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Check the extracted details or enter them manually.
                  </p>
                </div>
                <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs font-extrabold text-slate-600 sm:block">
                  {fields.length} field{fields.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="p-5 sm:p-7">
                <div className="grid gap-5">
                  {fields.map((field) => (
                    <FormField
                      key={field.id}
                      field={field}
                      value={values[field.label]}
                      onChange={(value) => updateValue(field.label, value)}
                    />
                  ))}
                </div>

                <button
                  onClick={submitForm}
                  disabled={saving}
                  className="btn-success mt-8 w-full py-4 text-base"
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit form
                    </>
                  )}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProgressItemProps {
  number: number;
  title: string;
  complete: boolean;
  active?: boolean;
}

function ProgressItem({
  number,
  title,
  complete,
  active = false,
}: ProgressItemProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-extrabold ${
          complete
            ? "bg-emerald-500 text-white"
            : active
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-500"
        }`}
      >
        {complete ? <Check size={15} strokeWidth={3} /> : number}
      </span>
      <span
        className={`text-sm font-bold ${
          complete || active ? "text-slate-800" : "text-slate-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

interface FormFieldProps {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
}

function FormField({ field, value, onChange }: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {field.label}
        {field.required && <span className="ml-1 text-rose-500">*</span>}
      </label>

      {field.field_type === "textarea" ? (
        <textarea
          rows={4}
          className="input-shell resize-y px-4 py-3.5"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.field_type === "dropdown" ? (
        <select
          className="input-shell px-4 py-3.5"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select an option</option>
          {(field.options || []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.field_type === "checkbox" ? (
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/30">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 accent-indigo-600"
          />
          Confirm selection
        </label>
      ) : (
        <input
          className="input-shell px-4 py-3.5"
          type={
            field.field_type === "number"
              ? "number"
              : field.field_type === "date"
                ? "date"
                : "text"
          }
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
