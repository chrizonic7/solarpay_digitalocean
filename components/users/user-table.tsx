"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/dashboard/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, UserCog, Ban, Shield } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditUserDialog } from "@/components/users/edit-user-dialog"
import { useState } from "react"
import { toast } from "sonner"

// This would come from your API in a real application
const users = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    role: "admin",
    status: "active",
    permissions: ["manage_users", "manage_inventory", "view_reports"],
    lastActive: "2024-01-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "agent",
    status: "active",
    permissions: ["manage_customers", "view_inventory"],
    lastActive: "2024-01-14",
  },
]

type User = typeof users[0]

interface UserTableProps {
  search: string
}

export function UserTable({ search }: UserTableProps) {
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const handleEditUser = (user: User) => {
    setEditingUser(user)
  }

  const handleDeactivate = (userId: string) => {
    toast.success("User deactivated successfully")
  }

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string
        return (
          <Badge
            variant={
              role === "superAdmin"
                ? "destructive"
                : role === "admin"
                ? "default"
                : "secondary"
            }
          >
            {role}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={status === "active" ? "default" : "secondary"}
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "permissions",
      header: "Permissions",
      cell: ({ row }) => {
        const permissions = row.getValue("permissions") as string[]
        return (
          <div className="flex flex-wrap gap-1">
            {permissions.slice(0, 2).map((permission) => (
              <Badge key={permission} variant="outline" className="text-xs">
                {permission.replace("_", " ")}
              </Badge>
            ))}
            {permissions.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{permissions.length - 2} more
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "lastActive",
      header: "Last Active",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEditUser(user)}>
                <UserCog className="mr-2 h-4 w-4" />
                Edit User
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeactivate(user.id)}>
                <Ban className="mr-2 h-4 w-4" />
                Deactivate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <DataTable columns={columns} data={filteredUsers} />
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={() => setEditingUser(null)}
        />
      )}
    </>
  )
}