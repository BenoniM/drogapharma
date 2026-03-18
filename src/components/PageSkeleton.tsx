import { motion } from "framer-motion";

const shimmer = {
  hidden: { x: "-100%" },
  visible: { x: "100%", transition: { repeat: Infinity, duration: 1.5, ease: "linear" as const } },
};

const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-lg bg-muted ${className}`}>
    <motion.div
      variants={shimmer}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-background/40 to-transparent"
    />
  </div>
);

/* Hero skeleton */
export const HeroSkeleton = () => (
  <div className="h-screen min-h-[700px] bg-muted flex items-center justify-center">
    <div className="container-narrow flex flex-col items-center gap-6">
      <SkeletonBlock className="h-1 w-16 rounded-full" />
      <SkeletonBlock className="h-16 w-[60%] md:w-[40%]" />
      <SkeletonBlock className="h-6 w-[80%] md:w-[50%]" />
      <SkeletonBlock className="h-12 w-40 rounded-full mt-4" />
    </div>
  </div>
);

/* Card skeleton */
export const CardSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-4">
        <SkeletonBlock className="aspect-[4/3]" />
        <SkeletonBlock className="h-5 w-3/4" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-2/3" />
      </div>
    ))}
  </div>
);

/* Text block skeleton */
export const TextSkeleton = () => (
  <div className="space-y-4 max-w-2xl">
    <SkeletonBlock className="h-3 w-24 rounded-full" />
    <SkeletonBlock className="h-10 w-3/4" />
    <SkeletonBlock className="h-5 w-full" />
    <SkeletonBlock className="h-5 w-5/6" />
  </div>
);

/* Stats skeleton */
export const StatsSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex flex-col items-center gap-3">
        <SkeletonBlock className="w-5 h-5 rounded-full" />
        <SkeletonBlock className="h-12 w-24" />
        <SkeletonBlock className="h-4 w-20" />
      </div>
    ))}
  </div>
);

/* Full page skeleton */
const PageSkeleton = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <HeroSkeleton />
    <div className="container-narrow section-padding space-y-20">
      <TextSkeleton />
      <StatsSkeleton />
      <CardSkeleton />
    </div>
  </motion.div>
);

export default PageSkeleton;
