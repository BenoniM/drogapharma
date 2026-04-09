import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronLeft, Tag } from "lucide-react";
import PageTransition from "@/components/PageTransition";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  img: string;
  category: string;
  date: string;
  readTime: string;
};

const BlogDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const post = (location.state as { post?: BlogPost } | null)?.post;

  if (!post || String(post.id) !== id) {
    return (
      <PageTransition>
        <section className="min-h-[70vh] bg-[#f5f5f5] flex items-center">
          <div className="container-narrow text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-black mb-4">
              Article not found
            </h1>
            <p className="text-black/65 mb-8">
              This blog article is not available or was opened directly without
              list context.
            </p>
            <Link to="/blog" className="btn-primary inline-flex items-center">
              <ChevronLeft size={14} /> Back to Blog
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="bg-[#f5f5f5] min-h-screen">
        <section className="relative h-[62vh] min-h-[460px] overflow-hidden">
          <img
            src={post.img}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/80" />

          <div className="container-narrow relative z-10 h-full flex flex-col justify-end pb-14">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-background/85 hover:text-background text-sm mb-6"
            >
              <ChevronLeft size={14} /> Back to Blog
            </Link>

            <span className="inline-flex items-center gap-1.5 bg-primary text-black text-xs font-bold uppercase tracking-widest px-3 py-1.5 w-fit mb-5">
              <Tag size={10} />
              {post.category}
            </span>

            <h1 className="font-display text-4xl md:text-6xl font-bold text-background leading-tight max-w-4xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-5 text-background/75 text-xs mt-6">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-xl md:text-2xl text-black/80 leading-relaxed mb-10"
            >
              {post.excerpt}
            </motion.p>

            <div className="space-y-7 text-black/80 leading-relaxed text-[1.02rem]">
              <p>
                At Droga Pharma, we continue to invest in quality, ethical
                operations, and long-term healthcare impact. This update
                reflects our commitment to strengthening pharmaceutical access
                and reliability for institutions and patients across Ethiopia.
              </p>
              <p>
                Through collaboration with healthcare partners, regulatory
                alignment, and process improvement, we focus on building trusted
                systems that deliver safe and effective products at the right
                time.
              </p>
              <p>
                As we move forward, we remain dedicated to innovation,
                operational excellence, and community-centered service across
                every point of the supply chain.
              </p>
            </div>
          </div>
        </section>
      </article>
    </PageTransition>
  );
};

export default BlogDetail;
