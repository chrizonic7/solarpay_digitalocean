import { Users, Shield, Sun } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Trained Professionals",
    description: "Expert technicians and sales agents across Liberia",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Certified products with manufacturer warranty",
  },
  {
    icon: Sun,
    title: "Nationwide Coverage",
    description: "Serving both urban and rural communities",
  },
]

export function FeatureSection() {
  return (
    <div className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose BBTECH Africa Energy?</h2>
          <p className="text-muted-foreground">Experience the future of energy with our innovative solutions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}