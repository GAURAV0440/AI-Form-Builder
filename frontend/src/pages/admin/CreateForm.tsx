import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronsUpDown,
  CircleDot,
  GripVertical,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Type,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const fieldTypes = [
  "text",
  "textarea",
  "number",
  "date",
  "dropdown",
  "checkbox",
] as const;

type FieldType = (typeof fieldTypes)[number];

interface EditableField {
  label: string;
  field_type: FieldType;
  required: boolean;
}

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const [fields, setFields] = useState<EditableField[]>([
    { label: "", field_type: "text", required: false },
  ]);

  const addField = () => {
    setFields([
      ...fields,
      { label: "", field_type: "text", required: false },
    ]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = <K extends keyof EditableField>(
    index: number,
    key: K,
    value: EditableField[K]
  ) => {
    const copy = [...fields];
    copy[index] = { ...copy[index], [key]: value };
    setFields(copy);
  };

  const saveForm = async () => {
    if (!title.trim()) {
      toast.error("Enter form title");
      return;
    }

    for (const field of fields) {
      if (!field.label.trim()) {
        toast.error("Every field needs a label");
        return;
      }
    }

    try {
      const payload = {
        title,
        description: "",
        fields: fields.map((field, index) => ({
          label: field.label,
          field_type: field.field_type,
          required: field.required,
          placeholder: "",
          options: [],
          field_order: index + 1,
        })),
      };

      const response = await api.post("/forms/", payload);
      console.log(response.data);
      toast.success("Form created successfully!");
      setTitle("");
      setFields([{ label: "", field_type: "text", required: false }]);
      navigate("/admin/forms");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create form.");
    }
  };

  return (
    <div className="px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-7xl">
        <div className="animate-enter">
          <button
            onClick={() => navigate("/admin/forms")}
            className="mb-5 flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to forms
          </button>
          <p className="eyebrow">
            <Sparkles size={14} />
            Form studio
          </p>
          <h1 className="page-title mt-2 text-4xl font-black text-slate-950 sm:text-5xl">
            Create a new form
          </h1>
          <p className="mt-3 text-slate-500">
            Add fields on the left and see the finished experience instantly.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-6 xl:grid-cols-[1.05fr_.95fr]">
          <section className="surface-card animate-enter-delay p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Form structure
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Name your form and configure its fields.
                </p>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-extrabold text-indigo-700">
                {fields.length} field{fields.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-7">
              <label
                htmlFor="form-title"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Form title
              </label>
              <div className="input-shell flex items-center px-4">
                <Type size={18} className="text-slate-400" />
                <input
                  id="form-title"
                  className="w-full bg-transparent px-3 py-3.5 outline-none"
                  placeholder="e.g. Candidate application"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/65 p-4 transition hover:border-indigo-200 hover:bg-white sm:p-5"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-extrabold text-slate-700">
                      <GripVertical size={17} className="text-slate-400" />
                      Field {index + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
                    <div>
                      <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Label
                      </label>
                      <input
                        className="input-shell px-3.5 py-3"
                        placeholder="Enter field label"
                        value={field.label}
                        onChange={(e) =>
                          updateField(index, "label", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                        Field type
                      </label>
                      <div className="relative">
                        <select
                          className="input-shell appearance-none px-3.5 py-3 pr-10 capitalize"
                          value={field.field_type}
                          onChange={(e) =>
                            updateField(
                              index,
                              "field_type",
                              e.target.value as FieldType
                            )
                          }
                        >
                          {fieldTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        <ChevronsUpDown
                          size={16}
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  <label className="mt-4 inline-flex cursor-pointer items-center gap-3 text-sm font-bold text-slate-600">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        updateField(index, "required", e.target.checked)
                      }
                      className="peer sr-only"
                    />
                    <span className="flex h-5 w-5 items-center justify-center rounded-md border border-slate-300 bg-white text-transparent transition peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-indigo-100">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    Required field
                  </label>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addField}
              className="btn-secondary mt-5 w-full border-dashed py-3.5 text-indigo-600"
            >
              <Plus size={18} />
              Add another field
            </button>
          </section>

          <section className="surface-card sticky top-24 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="font-extrabold text-slate-900">Live preview</h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Updates as you edit
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            <div className="bg-gradient-to-b from-slate-50 to-white p-5 sm:p-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-indigo-500">
                    Application form
                  </p>
                  <h3 className="page-title mt-2 text-2xl font-black text-slate-950">
                    {title || "Untitled Form"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Complete the fields below and submit your response.
                  </p>
                </div>

                {fields.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
                    <CircleDot size={22} className="mx-auto text-slate-300" />
                    <p className="mt-3 text-sm font-semibold text-slate-500">
                      Add a field to see it here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {fields.map((field, index) => (
                      <PreviewField key={index} field={field} />
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={saveForm}
                  className="btn-success mt-7 w-full py-3.5"
                >
                  <Save size={18} />
                  Save form
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function PreviewField({ field }: { field: EditableField }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {field.label || "Field label"}
        {field.required && <span className="ml-1 text-rose-500">*</span>}
      </label>
      {field.field_type === "textarea" ? (
        <textarea
          rows={3}
          className="input-shell resize-none px-3.5 py-3"
          placeholder="Long answer"
        />
      ) : field.field_type === "checkbox" ? (
        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-sm text-slate-600">
          <input type="checkbox" className="h-4 w-4 accent-indigo-600" />
          Select this option
        </label>
      ) : field.field_type === "dropdown" ? (
        <select className="input-shell px-3.5 py-3">
          <option>Choose an option</option>
        </select>
      ) : (
        <input
          className="input-shell px-3.5 py-3"
          type={field.field_type}
          placeholder="Enter your answer"
        />
      )}
    </div>
  );
}
