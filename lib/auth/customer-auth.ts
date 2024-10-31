// Mock customer data - In a real app, this would come from a database
export const customers = [
  {
    id: "1",
    username: "customer1",
    password: "Customer@123", // In production, this would be hashed
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    county: "Montserrado",
    role: "customer",
    status: "active",
    plan: "Basic Plan",
    products: [
      { id: "1", name: "Basic Solar Kit", monthlyPayment: 100, remainingMonths: 6 }
    ]
  },
  {
    id: "2",
    username: "customer2",
    password: "Customer@456",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1234567891",
    county: "Margibi",
    role: "customer",
    status: "active",
    plan: "Premium Plan",
    products: [
      { id: "2", name: "Premium Solar Panel", monthlyPayment: 200, remainingMonths: 12 }
    ]
  }
]

export interface CustomerLoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  customer?: typeof customers[0]
}

export const authenticateCustomer = (credentials: CustomerLoginCredentials): AuthResponse => {
  const customer = customers.find(
    c => (c.username === credentials.username || c.email === credentials.username) && 
         c.password === credentials.password
  )

  if (!customer) {
    return {
      success: false,
      message: "Invalid credentials"
    }
  }

  if (customer.status !== "active") {
    return {
      success: false,
      message: "Account is not active"
    }
  }

  return {
    success: true,
    message: "Authentication successful",
    customer: {
      ...customer,
      password: undefined // Don't send password back to client
    }
  }
}