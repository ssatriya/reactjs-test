import { useState } from "react";
import { Grip, PencilLine, TrashIcon } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormField } from "@/lib/type";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface SortableItemProps {
  id: string;
  label: string;
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
}

export function SortableItem({ id, label, setFormFields }: SortableItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLabel, setNewLabel] = useState("");

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleLabelChange = (id: string, newLabel: string) => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, label: newLabel } : field
      )
    );
  };

  const handleRemoveField = (id: string) => {
    setFormFields((prevFields) =>
      prevFields.filter((field) => field.id !== id)
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[400px] mb-3 rounded-lg bg-slate-900"
      onClick={() => {
        setIsEditing(false);
        handleLabelChange(id, newLabel);
      }}
    >
      <div className="flex items-center justify-between p-2 border-b border-slate-600">
        <Button
          variant="ghost"
          size="sm"
          ref={setActivatorNodeRef}
          className="p-1 cursor-grab"
          {...listeners}
          {...attributes}
        >
          <Grip className="w-5 h-5 bg-inherit" />
        </Button>
        <Button
          className="p-1 cursor-pointer"
          size="sm"
          variant="destructive"
          onClick={() => handleRemoveField(id)}
        >
          <TrashIcon className="w-5 h-6 bg-inherit" />
        </Button>
      </div>

      <div
        className="w-full p-2 space-y-2 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {!isEditing && (
          <div
            className="flex justify-start h-8"
            onDoubleClick={() => setIsEditing(true)}
          >
            <label className="block text-white select-none text-normal">
              {label}
            </label>
          </div>
        )}
        {isEditing && (
          <div className="flex">
            <input
              className="w-full h-6 select-text bg-inherit text-normal focus:outline-none"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              autoFocus
            />
            <div className="p-1">
              <PencilLine className="w-6 h-6" />
            </div>
          </div>
        )}
        <Input placeholder="your answer" />
      </div>
    </div>
  );
}
