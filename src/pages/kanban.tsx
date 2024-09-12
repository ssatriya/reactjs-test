import { KanbanBoard } from "@/components/kanban/kanban-board";

export default function Kanban() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col gap-6 mx-4">
        <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
          Drag and Drop Kanban Board
        </h1>
        <KanbanBoard />
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          With Keyboard Controls and Screen Reader interactions.
        </p>
      </main>
    </div>
  );
}
