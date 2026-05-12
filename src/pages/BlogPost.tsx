import { useParams, Link } from "react-router-dom";
import { getBlogBySlug, blogPosts } from "@/data/blog";
import { ChevronLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogBySlug(slug || "");

  if (!post) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Artikel niet gevonden.</p>
        <Link to="/blog" className="text-primary hover:underline mt-4 inline-block">Terug naar blog</Link>
      </div>
    );
  }

  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  // Simple markdown-to-html for content
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("### ")) return <h3 key={i} className="font-heading text-xl font-semibold mt-8 mb-3">{line.slice(4)}</h3>;
      if (line.startsWith("## ")) return <h2 key={i} className="font-heading text-2xl font-semibold mt-10 mb-4">{line.slice(3)}</h2>;
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.*?)\*\*(.*)/);
        if (match) return <li key={i} className="ml-4 mb-1"><strong>{match[1]}</strong>{match[2]}</li>;
      }
      if (line.startsWith("- ")) return <li key={i} className="ml-4 mb-1">{line.slice(2)}</li>;
      if (line.match(/^\d+\. \*\*/)) {
        const match = line.match(/^\d+\. \*\*(.*?)\*\*(.*)/);
        if (match) return <li key={i} className="ml-4 mb-2 list-decimal"><strong>{match[1]}</strong>{match[2]}</li>;
      }
      if (line.trim() === "") return <br key={i} />;
      return <p key={i} className="mb-3">{line}</p>;
    });
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: post.image?.startsWith("http") ? post.image : `https://yourmatcha.nl${post.image}`,
    datePublished: post.date,
    author: { "@type": "Organization", name: "YourMatcha" },
    publisher: { "@type": "Organization", name: "YourMatcha", logo: { "@type": "ImageObject", url: "https://yourmatcha.nl/logo.png" } },
    mainEntityOfPage: `https://yourmatcha.nl/blog/${post.slug}`,
    articleSection: post.category,
  };

  return (
    <div className="py-12">
      <SEO
        title={post.title}
        description={post.excerpt || `${post.title} — Lees alles over matcha op de YourMatcha blog.`}
        canonical={`/blog/${post.slug}`}
        type="article"
        image={post.image}
        publishedTime={post.date}
        jsonLd={articleSchema}
        keywords={`${post.category}, matcha, ${post.title.toLowerCase()}`}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> Terug naar blog
        </Link>

        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-accent font-medium tracking-wide uppercase">{post.category}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" /> {post.readTime} leestijd
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-8 leading-tight">{post.title}</h1>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-secondary mb-10">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            {renderContent(post.content)}
          </div>
        </motion.article>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="font-heading text-2xl font-semibold mb-6">Meer Artikelen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="group block p-6 bg-secondary rounded">
                  <span className="text-xs text-accent font-medium tracking-wide uppercase">{p.category}</span>
                  <h3 className="font-heading text-lg font-semibold mt-2 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
