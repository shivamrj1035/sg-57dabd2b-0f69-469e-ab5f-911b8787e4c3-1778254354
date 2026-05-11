import React, { useState } from "react";
import { Search, Store, Package, Star, Clock, Filter, ChevronRight } from "lucide-react";
import { CustomerLayout } from "@/components/layouts/CustomerLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { AreaSelector } from "@/components/AreaSelector";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CustomerHome() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Electronics", icon: "📱", color: "from-blue-500/20 to-cyan-500/20" },
    { name: "Fashion", icon: "👗", color: "from-pink-500/20 to-rose-500/20" },
    { name: "Grocery", icon: "🍎", color: "from-green-500/20 to-emerald-500/20" },
    { name: "Beauty", icon: "💄", color: "from-purple-500/20 to-indigo-500/20" },
    { name: "Home", icon: "🏠", color: "from-orange-500/20 to-amber-500/20" },
  ];

  const featuredStores = [
    {
      name: "Modern Electronics",
      area: "Indiranagar",
      rating: 4.8,
      distance: "1.2 km",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=400",
      slug: "modern-electronics",
      category: "Electronics"
    },
    {
      name: "Fashion Hub",
      area: "HSR Layout",
      rating: 4.5,
      distance: "2.5 km",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400",
      slug: "fashion-hub",
      category: "Fashion"
    },
    {
      name: "Fresh Mart",
      area: "Indiranagar",
      rating: 4.9,
      distance: "0.8 km",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400",
      slug: "fresh-mart",
      category: "Grocery"
    }
  ];

  return (
    <CustomerLayout>
      <SEO 
        title="LocalHub - Find Best Stores Near You" 
        description="Discover local stores, browse products, and order via WhatsApp from your favorite neighborhood shops."
      />

      <div className="space-y-8 max-w-2xl mx-auto">
        {/* Header Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-heading font-black tracking-tight">
              What are you <br />
              <span className="text-gradient">looking for today?</span>
            </h1>
          </div>
          
          <AreaSelector />

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search for products or stores..." 
              className="pl-12 h-14 rounded-2xl glass border-white/10 text-lg shadow-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight uppercase text-xs tracking-[0.2em] text-muted-foreground">Categories</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
            {categories.map((cat) => (
              <motion.button
                key={cat.name}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 min-w-[80px]"
              >
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl glass border-white/20 shadow-lg`}>
                  {cat.icon}
                </div>
                <span className="text-xs font-bold uppercase tracking-tighter">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Featured Stores */}
        <section className="space-y-4 pb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight uppercase text-xs tracking-[0.2em] text-muted-foreground">Stores Near You</h2>
            <Link href="/discover" className="text-primary text-xs font-black flex items-center gap-1 uppercase tracking-widest">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {featuredStores.map((store) => (
              <Link href={`/store/${store.slug}`} key={store.slug} className="block">
                <GlassCard className="group p-0 rounded-3xl">
                  <div className="flex h-32">
                    <div className="w-32 h-full relative overflow-hidden">
                      <img 
                        src={store.image} 
                        alt={store.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className="text-[10px] uppercase font-black bg-primary/10 text-primary border-none">
                            {store.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                            <Star className="h-3 w-3 fill-current" />
                            {store.rating}
                          </div>
                        </div>
                        <h3 className="font-heading font-black text-xl leading-tight">{store.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Store className="h-3 w-3" />
                          {store.area} • {store.distance}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-green-500">
                        <Clock className="h-3 w-3" />
                        Open Now • Delivery in 30m
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </CustomerLayout>
  );
}