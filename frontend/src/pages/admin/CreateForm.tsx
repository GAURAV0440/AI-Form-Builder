import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/api";

const fieldTypes = [
  "text",
  "textarea",
  "number",
  "date",
  "dropdown",
  "checkbox",
];

export default function CreateForm() {
  const [title, setTitle] = useState("");

  const [fields, setFields] = useState([
    {
      label: "",
      field_type: "text",
      required: false,
    },
  ]);

  const addField = () => {
    setFields([
      ...fields,
      {
        label: "",
        field_type: "text",
        required: false,
      },
    ]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (
    index: number,
    key: string,
    value: any
  ) => {
    const copy = [...fields];

    copy[index] = {
      ...copy[index],
      [key]: value,
    };

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

      setFields([
        {
          label: "",
          field_type: "text",
          required: false,
        },
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create form.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-8">
        <h1 className="mb-8 text-4xl font-bold">
          Create Form
        </h1>

        <div className="grid grid-cols-2 gap-8">
          {/* LEFT */}

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-semibold">
              Form Builder
            </h2>

            <input
              className="mb-6 w-full rounded-lg border p-3"
              placeholder="Form Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {fields.map((field, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg border p-4"
              >
                <input
                  className="mb-3 w-full rounded border p-2"
                  placeholder="Field Label"
                  value={field.label}
                  onChange={(e) =>
                    updateField(index, "label", e.target.value)
                  }
                />

                <select
                  className="mb-3 w-full rounded border p-2"
                  value={field.field_type}
                  onChange={(e) =>
                    updateField(index, "field_type", e.target.value)
                  }
                >
                  {fieldTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  ))}
                </select>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) =>
                      updateField(
                        index,
                        "required",
                        e.target.checked
                      )
                    }
                  />

                  Required
                </label>

                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="mt-4 flex items-center gap-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addField}
              className="flex items-center gap-2 rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Field
            </button>
          </div>

          {/* RIGHT */}

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-semibold">
              Live Preview
            </h2>

            <h3 className="mb-6 text-xl font-bold">
              {title || "Untitled Form"}
            </h3>

            {fields.map((field, index) => (
              <div
                key={index}
                className="mb-5"
              >
                <label className="mb-2 block font-medium">
                  {field.label || "Field"}

                  {field.required && (
                    <span className="text-red-500">
                      {" "}*
                    </span>
                  )}
                </label>

                {field.field_type === "textarea" ? (
                  <textarea className="w-full rounded border p-3" />
                ) : field.field_type === "checkbox" ? (
                  <input type="checkbox" />
                ) : field.field_type === "dropdown" ? (
                  <select className="w-full rounded border p-3">
                    <option>Dropdown</option>
                  </select>
                ) : (
                  <input
                    className="w-full rounded border p-3"
                    type={field.field_type}
                  />
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={saveForm}
              className="mt-8 w-full rounded-lg bg-green-600 py-3 text-white hover:bg-green-700"
            >
              Save Form
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}