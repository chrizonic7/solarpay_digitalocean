// Mock admin data - In a real app, this would come from a database
export const admins = [
  {
    id: "1",
    username: "admin1",
    password: "Admin@123", // In production, this would be hashed
    name: "Admin User",
    email: "admin@solarpay.com",
    role: "admin",
    status: "active",
    permissions: ["manage_users", "manage_inventory", "manage_agents", "view_reports"]
  },
  {
    id: "2",
    username: "admin2",
    password: "Admin@456",
    name: "System Admin",
    email: "system@solarpay.com",
    role: "admin",
    status: "active",
    permissions: ["manage_users", "manage_inventory", "manage_agents", "view_reports", "manage_settings"]
  }
]

export interface AdminLoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  admin?: typeof admins[0]
}

export const authenticateAdmin = (credentials: AdminLoginCredentials): AuthResponse => {
  const admin = admins.find(
    a => (a.username === credentials.username || a.email === credentials.username) && 
         a.password === credentials.password
  )

  if (!admin) {
    return {
      success: false,
      message: "Invalid credentials"
    }
  }

  if (admin.status !== "active") {
    return {
      success: false,
      message: "Account is not active"
    }
  }

  return {
    success: true,
    message: "Authentication successful",
    admin: {
      ...admin,
      password: undefined // Don't send password back to client
    }
  }
}