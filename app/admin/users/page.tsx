"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UserTable } from "@/components/users/user-table"
import { AddUserDialog } from "@/components/users/add-user-dialog"
import { StatsCard } from "@/components/dashboard/stats-card"

export default function UsersPage() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their permissions</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value="156"
          description="Active users"
          trend="up"
          percentage="+12.3%"
        />
        <StatsCard
          title="Admins"
          value="8"
          description="System administrators"
          trend="up"
          percentage="+2"
        />
        <StatsCard
          title="Agents"
          value="45"
          description="Sales agents"
          trend="up"
          percentage="+5"
        />
        <StatsCard
          title="Customers"
          value="103"
          description="End users"
          trend="up"
          percentage="+15.2%"
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline">Filter</Button>
          <Button variant="outline">Export</Button>
        </div>

        <UserTable search={search} />
      </Card>

      <AddUserDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}