import { ColumnDef } from "@tanstack/react-table";

import { UserInfo } from "@/lib/type";

export const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "first_name",
    header: () => <div className="text-left">First Name</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("first_name")}</div>;
    },
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("last_name")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("email")}</div>;
    },
  },
];
