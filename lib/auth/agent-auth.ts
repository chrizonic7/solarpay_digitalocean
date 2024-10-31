// Mock agent data - In a real app, this would come from a database
export const agents = [
  {
    id: "1",
    username: "agent1",
    password: "Agent@123", // In production, this would be hashed
    name: "John Smith",
    email: "john@solarpay.com",
    county: "Montserrado",
    role: "agent",
    status: "active",
    commissionRate: 10
  },
  {
    id: "2",
    username: "agent2",
    password: "Agent@456",
    name: "Sarah Johnson",
    email: "sarah@solarpay.com",
    county: "Margibi",
    role: "agent",
    status: "active",
    commissionRate: 12
  }
]

export interface AgentLoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  agent?: typeof agents[0]
}

export const authenticateAgent = (credentials: AgentLoginCredentials): AuthResponse => {
  const agent = agents.find(
    a => (a.username === credentials.username || a.email === credentials.username) && 
         a.password === credentials.password
  )

  if (!agent) {
    return {
      success: false,
      message: "Invalid credentials"
    }
  }

  if (agent.status !== "active") {
    return {
      success: false,
      message: "Account is not active"
    }
  }

  return {
    success: true,
    message: "Authentication successful",
    agent: {
      ...agent,
      password: undefined // Don't send password back to client
    }
  }
}