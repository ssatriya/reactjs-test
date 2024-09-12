import { useState } from "react";
import { Link } from "react-router-dom";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { FormField } from "@/lib/type";
import useFormStore from "@/hooks/useFormStore";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/form-builder/sidebar";
import FormArea from "@/components/form-builder/form-area";

export default function FormBuilder() {
  const { saveFormFields } = useFormStore();
  const [formFields, setFormFields] = useState<FormField[]>([]);

  const handleDrop = (label: string) => {
    const newField = {
      id: Math.random().toString(36).substring(7),
      label,
      inputType: "string",
    };
    setFormFields([...formFields, newField]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    if (over && over.id === "form-area") {
      const newField = {
        id: Math.random().toString(36).substring(7),
        label: "Label",
        inputType: "input",
      };
      setFormFields([...formFields, newField]);
    }
  };

  const handleSaveForm = () => {
    saveFormFields(formFields);
  };

  return (
    <div className="flex flex-col items-end justify-end gap-4 ">
      <div className="flex gap-6">
        <Link to="/form">
          <Button>View form</Button>
        </Link>
        <Button onClick={handleSaveForm}>Save</Button>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="relative flex items-center justify-center gap-4 mx-auto">
          <div className="sticky top-0">
            <Sidebar />
          </div>
          <FormArea
            formFields={formFields}
            setFormFields={setFormFields}
            handleDrop={handleDrop}
          />
        </div>
      </DndContext>
    </div>
  );
}
