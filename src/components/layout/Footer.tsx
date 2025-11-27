import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Clock,
  Send
} from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const quickLinks = [
    { name: "All Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Best Sellers", href: "/best-sellers" },
    { name: "Sale", href: "/sale" },
  ];

  const supportLinks = [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Returns", href: "/returns" },
    { name: "Size Guide", href: "/size-guide" },
  ];

  const accountLinks = [
    { name: "My Account", href: "/account" },
    { name: "Order History", href: "/orders" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Gift Cards", href: "/gift-cards" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-secondary/50 via-background to-secondary/30 border-t border-border/50">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-3xl opacity-50" />

      <div className="container relative py-16 md:py-20">
        {/* Newsletter Section */}
        <div className="mb-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Stay in the Loop
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Get exclusive access to new arrivals, special offers, and style inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
                />
              </div>
              <Button
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 group"
              >
                <Send className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="group flex items-center gap-3 mb-6">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-accent shadow-lg shadow-primary/25 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-110">
                <span className="text-xl font-black text-primary-foreground bg-gradient-to-br from-primary-foreground to-accent-foreground bg-clip-text text-transparent">
                  M
                </span>
                <div className="absolute inset-0 rounded-xl border-2 border-primary/20 scale-0 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Musika
                </span>
                <div className="h-0.5 w-0 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </Link>

            <p className="text-muted-foreground mb-6 leading-relaxed text-base">
              Discover tomorrow's luxury products today. From innovative electronics to fashion-forward apparel,
              we curate the finest selection for the discerning customer.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>123 Fashion Street, Style City, SC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Shop</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-foreground">Account</h4>
            <ul className="space-y-3">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              © 2025 Musika. All rights reserved. Crafted with ❤️ for style enthusiasts.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-4">Follow us:</span>
              <div className="flex gap-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
