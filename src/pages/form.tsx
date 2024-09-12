import { Link } from "react-router-dom";

import { Input } from "@/components/ui/input";
import useFormStore from "@/hooks/useFormStore";
import { Button } from "@/components/ui/button";

export default function Form() {
  const { formFields } = useFormStore();

  if (formFields.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3">
        <span>No form created...</span>
        <Link to="/form-builder">
          <Button>Create form</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-auto p-4 rounded-md items-center justify-center bg-slate-900 max-w-[500px]">
      {formFields.map((form) => (
        <div
          key={form.id}
          className="flex items-start mb-3 flex-col max-w-[500px]"
        >
          <label>{form.label}</label>
          {form.inputType === "input" && <Input />}
        </div>
      ))}
      <Button>Submit</Button>
    </div>
  );
}
