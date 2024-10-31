"use client"

import { Battery } from "lucide-react"

const products = [
  {
    id: "sunking-200x",
    name: "Sunking Home 200X",
    features: [
      "2 LED Tube Lights",
      "4 LED Bulbs",
      "Radio",
      "Multiple USB Ports",
      "24-Month Warranty"
    ]
  },
  {
    id: "sunking-200x-plus",
    name: "Sunking Home 200X Plus",
    features: [
      "4 LED Tube Lights",
      "4 LED Bulbs",
      "Radio",
      "Multiple USB Ports",
      "24-Month Warranty"
    ]
  },
  {
    id: "bluetti-p100",
    name: "Bluetti P100 Solar System",
    features: [
      "2 LED Tube Lights",
      "2 LED Bulbs",
      "Multiple USB Ports",
      "Mobile Charging",
      "12-Month Warranty"
    ]
  },
  {
    id: "bluetti-p200",
    name: "Bluetti P200 Solar System",
    features: [
      "4 LED Tube Lights",
      "4 LED Bulbs",
      "Multiple USB Ports",
      "Mobile Charging",
      "12-Month Warranty"
    ]
  }
]

export function ProductSection() {
  return (
    <div className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Solar Solutions for Every Need</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-card rounded-lg p-6 shadow-lg">
              <Battery className="h-8 w-8 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <ul className="space-y-2 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}