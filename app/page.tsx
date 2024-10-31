"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PortalMenu } from "@/components/landing/portal-menu"
import { FeatureSection } from "@/components/landing/feature-section"
import { ProductSection } from "@/components/landing/product-section"
import { 
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  CircleDollarSign,
  Lightbulb,
  Clock
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2070"
          alt="Solar panels on village homes"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">
              Empowering Rural Liberia with Affordable Solar Energy
            </h1>
            <p className="text-xl mb-8">
              Bringing Sustainable Power to Every Village Home
            </p>
            <div className="flex gap-4">
              <PortalMenu />
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FeatureSection />
      
      <ProductSection />

      {/* How It Works */}
      <div className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Flexible, and Affordable</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Lightbulb className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Choose Your Solution</h3>
              <p className="text-muted-foreground">Select the best option for your energy needs</p>
            </div>
            <div className="text-center">
              <CircleDollarSign className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Flexible Payments</h3>
              <p className="text-muted-foreground">6, 12, or 18-month payment plans available</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Installation & Support</h3>
              <p className="text-muted-foreground">Professional installation and ongoing support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Power Up Your Home with Solar!</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Carey & Johnson Street, Monrovia, Liberia</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>0886777716 / 0777887170</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@bestbrainstech.com</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Contact Us Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2024 BBTECH Africa Energy. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link 
                href="https://web.facebook.com/bbtechafricaengergy" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link 
                href="#" 
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}