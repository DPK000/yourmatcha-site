import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts, blogCategories } from "@/data/blog";
import { motion } from "framer-motion";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filtered = activeCategory === "Alle"
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold">Blog & Recepten</h1>
          <p className="text-muted-foreground mt-2">Tips, recepten en alles over matcha</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {blogCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-medium tracking-wide uppercase rounded transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[3/2] bg-secondary rounded overflow-hidden mb-4">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-accent font-medium tracking-wide uppercase">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.readTime} leestijd</span>
                </div>
                <h2 className="font-heading text-xl font-semibold group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
