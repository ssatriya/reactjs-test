import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen space-x-4">
      <Link to="/form-builder" className="p-3 rounded-md w-fit bg-slate-800">
        Form Builder
      </Link>
      <Link
        to="/generate-invoice"
        className="p-3 rounded-md w-fit bg-slate-800"
      >
        Generate Invoice
      </Link>
      <Link to="/kanban" className="p-3 rounded-md w-fit bg-slate-800">
        Kanban
      </Link>
      <Link to="/table" className="p-3 rounded-md w-fit bg-slate-800">
        Table
      </Link>
      <Link to="/ui-slice" className="p-3 rounded-md w-fit bg-slate-800">
        UI Slice
      </Link>
    </div>
  );
}
