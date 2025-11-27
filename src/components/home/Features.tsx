import { Truck, Shield, RefreshCw, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $100",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected transactions",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer service",
  },
];

export const Features = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-secondary/30 to-background" />

      {/* Floating accent elements */}
      <div className="absolute top-8 left-16 w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-8 right-16 w-16 h-16 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Main feature card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background/80 to-secondary/50 backdrop-blur-sm border border-border/50 p-8 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 hover:border-primary/30 hover:bg-gradient-to-br hover:from-background/90 hover:to-secondary/60">

                {/* Icon container with enhanced styling */}
                <div className="relative mb-6">
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:from-primary/30 group-hover:to-accent/30">
                    <feature.icon className="h-8 w-8 text-primary transition-all duration-500 group-hover:scale-110 group-hover:text-accent" />
                  </div>

                  {/* Animated ring effect */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 scale-0 group-hover:scale-110 transition-transform duration-500" />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
