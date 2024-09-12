import { useDraggable } from "@dnd-kit/core";
import { Grip } from "lucide-react";
import { Button } from "../ui/button";

export const Sidebar = () => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef } =
    useDraggable({
      id: "input-label",
    });

  return (
    <div className="min-h-[500px] w-[350px] bg-slate-800 rounded-md flex items-center flex-col">
      <div className="flex items-center justify-center w-full h-16 border-b border-slate-600">
        <span className="font-bold">Input options</span>
      </div>
      <div className="w-full p-4">
        <div className="rounded-md bg-slate-900">
          <div
            className="w-full px-2 py-1 border-b border-slate-600"
            ref={setActivatorNodeRef}
            {...listeners}
          >
            <div className="flex items-center justify-between">
              <Button variant="ghost" className="p-1">
                <Grip className="bg-inherit" />
              </Button>
              <span className="pr-2 text-sm">Input</span>
            </div>
          </div>
          <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="w-full p-2 rounded-md bg-slate-900 h-fit"
          >
            <span>Add input element</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
