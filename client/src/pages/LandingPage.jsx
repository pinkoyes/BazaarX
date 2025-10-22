import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShoppingBag,
  Shield,
  Users,
  TrendingUp,
  Star,
  CheckCircle2,
  Zap,
  ArrowUpRight,
  DollarSign,
  MessageCircle,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const categories = [
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop",
    items: "1.2k+ items",
  },
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=300&fit=crop",
    items: "3.4k+ items",
  },
  {
    name: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&h=300&fit=crop",
    items: "2.1k+ items",
  },
  {
    name: "Sports",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=300&fit=crop",
    items: "950+ items",
  },
];

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Users",
  },
  {
    icon: ShoppingBag,
    value: "100K+",
    label: "Items Listed",
  },
  {
    icon: MessageCircle,
    value: "1M+",
    label: "Messages Sent",
  },
  {
    icon: Heart,
    value: "95%",
    label: "Satisfaction Rate",
  },
];

const features = [
  {
    icon: ShoppingBag,
    title: "Easy Listing",
    description:
      "List your items in minutes with our simple and intuitive interface",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Safe and protected payments for both buyers and sellers",
  },
  {
    icon: Users,
    title: "Verified Users",
    description: "Trust our community of verified buyers and sellers",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Get real-time market data to price your items competitively",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-background to-accent/20 min-h-screen flex items-center">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">
                  The Future of Trading
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
                {...fadeIn}
              >
                Buy and Sell Anything in the
                <span className="text-primary block mt-2">Open Market</span>
              </motion.h1>

              <motion.p
                className="mt-6 text-xl text-muted-foreground leading-relaxed"
                {...fadeIn}
                transition={{ delay: 0.2 }}
              >
                Your trusted marketplace for buying and selling items. Join
                thousands of users and start trading today with our secure and
                easy-to-use platform.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                {...fadeIn}
                transition={{ delay: 0.3 }}
              >
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                  Start Selling
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  Browse Items
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </motion.div>

              <motion.div
                className="mt-12 flex items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-background bg-primary/10"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">50k+ Happy Users</div>
                  <div className="text-muted-foreground">
                    Join our growing community
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
                <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop"
                    alt="Marketplace"
                    className="w-full"
                  />
                </div>

                <motion.div
                  className="absolute -bottom-8 -left-8 bg-card p-4 rounded-xl border border-border shadow-xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">4.9/5 Rating</div>
                      <div className="text-sm text-muted-foreground">
                        From 10k+ Reviews
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-8 -right-8 bg-card p-4 rounded-xl border border-border shadow-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <div className="font-semibold">$2M+ Revenue</div>
                      <div className="text-sm text-muted-foreground">
                        For our sellers
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-12 bg-background border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Powerful Features</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Why Choose OpenMarket?</h2>
            <p className="text-xl text-muted-foreground">
              Experience the best way to buy and sell with our powerful features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>{" "}
      {/* Categories Section */}
      <section className="py-24 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold">Popular Categories</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover items in our most popular categories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="aspect-4/3 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">{category.items}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Trading?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join our community of buyers and sellers. Create your account now
              and start trading in minutes.
            </p>
            <Button size="lg" className="gap-2">
              Get Started Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
