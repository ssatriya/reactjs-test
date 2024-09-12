import {
  DndContext,
  closestCenter,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { FormField } from "@/lib/type";
import { SortableItem } from "./sortable-item";

type HandleDrop = (label: string) => void;

interface FormAreaProps {
  formFields: FormField[];
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
  handleDrop: HandleDrop;
}

export const FormArea = ({
  formFields,
  setFormFields,
  handleDrop,
}: FormAreaProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "form-area",
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = formFields.findIndex((item) => item.id === active.id);
      const newIndex = formFields.findIndex((item) => item.id === over?.id);
      setFormFields((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={formFields.map((field) => field.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`w-[500px] flex bg-slate-800 rounded-md min-h-[500px] p-10 flex-col transition-colors duration-200 ${
            isOver
              ? "border-blue-500 bg-slate-700"
              : "border-dashed border-slate-400"
          }`}
          onDrop={(event) => {
            event.preventDefault();
            const label = event.dataTransfer.getData("text/plain");
            if (label) {
              handleDrop(label);
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>Form Builder Area</h3>
          {formFields.length === 0 && (
            <p>Drag components here to build your form</p>
          )}
          {formFields.map((field) => (
            <SortableItem
              key={field.id}
              id={field.id}
              label={field.label}
              setFormFields={setFormFields}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default FormArea;
