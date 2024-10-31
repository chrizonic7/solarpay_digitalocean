"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const formSchema = z.object({
  customerId: z.string().min(1, "Please select a customer"),
  productId: z.string().min(1, "Please select a product"),
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
  reference: z.string().min(1, "Reference number is required"),
  notes: z.string().optional(),
})

interface ReceivePaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data - In a real app, this would come from your API
const customers = [
  { 
    id: "1", 
    name: "John Doe", 
    plan: "Basic Plan", 
    agentId: "1", 
    agentCommission: 10,
    products: [
      { id: "1", name: "Basic Solar Kit", monthlyPayment: 100, remainingMonths: 6 },
      { id: "2", name: "Premium Solar Panel", monthlyPayment: 200, remainingMonths: 12 }
    ]
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    plan: "Premium Plan", 
    agentId: "2", 
    agentCommission: 12,
    products: [
      { id: "3", name: "Solar Battery Pack", monthlyPayment: 150, remainingMonths: 18 }
    ]
  }
]

export function ReceivePaymentDialog({ open, onOpenChange }: ReceivePaymentDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
      productId: "",
      amount: "",
      paymentMethod: "",
      reference: "",
      notes: "",
    },
  })

  const calculateCommission = (amount: number, customer: typeof customers[0], productId: string) => {
    const product = customer.products.find(p => p.id === productId)
    if (!product) return 0

    // Calculate how many months this payment covers
    const monthsCovered = amount / product.monthlyPayment
    
    // Calculate commission based on monthly payments
    const commissionPerMonth = (product.monthlyPayment * customer.agentCommission) / 100
    return commissionPerMonth * monthsCovered
  }

  const getCustomerProducts = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId)
    return customer?.products || []
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const amount = parseFloat(values.amount)
      const customer = customers.find(c => c.id === values.customerId)
      
      if (customer) {
        const product = customer.products.find(p => p.id === values.productId)
        if (!product) throw new Error("Product not found")

        const commission = calculateCommission(amount, customer, values.productId)
        const monthsCovered = amount / product.monthlyPayment
        const mockToken = "ABC123XYZ"

        toast.success(
          <div className="space-y-2">
            <p>Payment recorded successfully!</p>
            <p className="text-sm text-muted-foreground">Token: {mockToken}</p>
            <p className="text-sm text-muted-foreground">
              Payment covers {monthsCovered.toFixed(1)} months
            </p>
            <p className="text-sm text-muted-foreground">
              Agent commission: ${commission.toFixed(2)} (${(commission/monthsCovered).toFixed(2)}/month)
            </p>
          </div>
        )
      }

      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error("Failed to process payment")
    } finally {
      setIsLoading(false)
    }
  }

  // Watch for amount changes to show real-time commission calculation
  const watchAmount = form.watch("amount")
  const watchCustomerId = form.watch("customerId")
  const watchProductId = form.watch("productId")

  const selectedCustomerData = customers.find(c => c.id === watchCustomerId)
  const selectedProductData = selectedCustomerData?.products.find(p => p.id === watchProductId)

  const getCommissionPreview = () => {
    if (!watchAmount || !selectedCustomerData || !selectedProductData) return null

    const amount = parseFloat(watchAmount)
    const monthsCovered = amount / selectedProductData.monthlyPayment
    const commission = calculateCommission(amount, selectedCustomerData, watchProductId)

    return {
      monthsCovered: monthsCovered.toFixed(1),
      totalCommission: commission.toFixed(2),
      monthlyCommission: (commission/monthsCovered).toFixed(2)
    }
  }

  const commissionPreview = getCommissionPreview()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
          <DialogDescription>
            Record payment and issue next available token
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedCustomer(value)
                      // Reset product when customer changes
                      form.setValue("productId", "")
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map(customer => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name} - {customer.plan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCustomerData && (
                    <FormDescription>
                      Agent commission rate: {selectedCustomerData.agentCommission}%
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedProduct(value)
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getCustomerProducts(form.getValues("customerId")).map(product => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} ({product.remainingMonths} months remaining)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedProductData && (
                    <FormDescription>
                      Monthly payment: ${selectedProductData.monthlyPayment}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  {commissionPreview && (
                    <FormDescription>
                      Payment covers {commissionPreview.monthsCovered} months
                      <br />
                      Commission: ${commissionPreview.totalCommission} 
                      (${commissionPreview.monthlyCommission}/month)
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="momo">Mobile Money</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Transaction ID or Receipt Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Additional payment details..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Processing..." : "Record Payment & Issue Token"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}