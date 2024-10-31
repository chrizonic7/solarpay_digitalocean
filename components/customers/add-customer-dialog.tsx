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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  nationalId: z.string().min(6, "National ID must be at least 6 characters"),
  plan: z.string().min(1, "Please select a plan"),
  county: z.string().min(1, "Please select a county"),
  district: z.string().optional(),
  address: z.string().min(10, "Address must be at least 10 characters"),
  notes: z.string().optional(),
})

interface AddCustomerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isAgent?: boolean
  defaultValues?: Partial<z.infer<typeof formSchema>>
  onSuccess?: () => void
}

// County and District data
const countyData = {
  dsCounties: {
    gbarpolu: {
      name: "Gbarpolu",
      districts: ["Bopolu District", "Bokomu District", "Belleh District", "Gounwolaila District", "Kongba District"]
    },
    cape_mount: {
      name: "Cape Mount",
      districts: ["Commonwealth District", "Gola Konneh District", "Garwula District", "Porkpa District", "Tewor District"]
    },
    bomi: {
      name: "Bomi",
      districts: ["Klay District", "Dewoin District", "Mecca District", "Senjeh District"]
    },
    nimba: {
      name: "Nimba",
      districts: ["Gbehlay-Geh District", "Sanniquellie-Mah District", "Twan-River District", "Yarpea-Mah District", 
                 "Zoe-Geh District", "Yarmein District", "Garr Bain District", "Buu-Yao District", 
                 "Wee-Gbehy-Mahn District", "Doe District", "Meinpea-Mah District"]
    },
    rivercess: {
      name: "Rivercess",
      districts: ["Cestos District", "Timbo District"]
    },
    sinoe: {
      name: "Sinoe",
      districts: ["Greenville District", "Jaedae District", "Jaedepo District", "Juarzon District", 
                 "Kpayan District", "Pynes Town District", "Sanquin District 1", "Sanquin District 2", 
                 "Sanquin District 3", "Seekon District"]
    },
    grand_kru: {
      name: "Grand Kru",
      districts: ["Barclayville District", "Buah District", "Forpoh District", "Jloh District"]
    }
  },
  isCounties: [
    { id: "bong", name: "Bong" },
    { id: "grand_bassa", name: "Grand Bassa" },
    { id: "grand_gedeh", name: "Grand Gedeh" },
    { id: "lofa", name: "Lofa" },
    { id: "margibi", name: "Margibi" },
    { id: "maryland", name: "Maryland" },
    { id: "montserrado", name: "Montserrado" },
    { id: "river_gee", name: "River Gee" },
  ]
}

export function AddCustomerDialog({ 
  open, 
  onOpenChange, 
  isAgent = false,
  defaultValues,
  onSuccess,
}: AddCustomerDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCounty, setSelectedCounty] = useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      nationalId: "",
      plan: "",
      county: "",
      district: "",
      address: "",
      notes: defaultValues?.notes || "",
    },
  })

  const isDSCounty = (county: string) => {
    return Object.keys(countyData.dsCounties).includes(county)
  }

  const getDistricts = (county: string) => {
    return countyData.dsCounties[county as keyof typeof countyData.dsCounties]?.districts || []
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Customer added successfully")
    setIsLoading(false)
    onOpenChange(false)
    form.reset()
    onSuccess?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogDescription>
            Enter customer details to create a new account
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>National ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ID123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>County</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedCounty(value)
                      // Reset district when county changes
                      form.setValue("district", "")
                    }} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select county" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>DS Counties</SelectLabel>
                        {Object.entries(countyData.dsCounties).map(([id, county]) => (
                          <SelectItem key={id} value={id}>{county.name}</SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>IS Counties</SelectLabel>
                        {countyData.isCounties.map((county) => (
                          <SelectItem key={county.id} value={county.id}>{county.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedCounty && isDSCounty(selectedCounty) && (
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select district" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getDistricts(selectedCounty).map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solar Plan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="basic">Basic Plan (6 months)</SelectItem>
                      <SelectItem value="standard">Standard Plan (12 months)</SelectItem>
                      <SelectItem value="premium">Premium Plan (18 months)</SelectItem>
                      <SelectItem value="onetime">One-time Payment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Installation Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter complete installation address"
                      className="resize-none"
                      {...field}
                    />
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
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional information..."
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
                {isLoading ? "Adding..." : "Add Customer"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}