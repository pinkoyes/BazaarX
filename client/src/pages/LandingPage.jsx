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
      <section className="overflow-hidden bg-linear-to-b from-background to-accent/20 pt-16 pb-32">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto pt-16">
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight"
              {...fadeIn}
            >
              Buy and Sell Anything in the
              <span className="text-primary"> Open Market</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-xl text-muted-foreground"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              Your trusted marketplace for buying and selling items. Join
              thousands of users and start trading today.
            </motion.p>
            <motion.div
              className="mt-10 flex gap-4 justify-center"
              {...fadeIn}
              transition={{ delay: 0.3 }}
            >
              <Button size="lg" className="gap-2">
                Start Selling
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Browse Items
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
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
            <h2 className="text-3xl font-bold">Why Choose OpenMarket?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Experience the best way to buy and sell with our powerful features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl bg-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
