import { motion } from "framer-motion";

const variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror" as const,
      duration: 1,
      ease: "circIn",
    },
  },
};

interface BarLoaderProps {
  className?: string;
  barColor?: string;
  message?: string;
}

export const BarLoader = ({ 
  className = "", 
  barColor = "bg-white", 
  message = "Loading..." 
}: BarLoaderProps) => {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <motion.div
        transition={{
          staggerChildren: 0.25,
        }}
        initial="initial"
        animate="animate"
        className="flex gap-1"
      >
        <motion.div variants={variants} className={`h-12 w-2 ${barColor}`} />
        <motion.div variants={variants} className={`h-12 w-2 ${barColor}`} />
        <motion.div variants={variants} className={`h-12 w-2 ${barColor}`} />
        <motion.div variants={variants} className={`h-12 w-2 ${barColor}`} />
        <motion.div variants={variants} className={`h-12 w-2 ${barColor}`} />
      </motion.div>
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm font-medium text-center"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

// Full-screen overlay version for authentication flows
export const BarLoaderOverlay = ({ 
  message = "Signing you in...",
  onComplete
}: { 
  message?: string;
  onComplete?: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center z-50"
      onAnimationComplete={() => {
        // Auto-complete after 2 seconds if no onComplete handler
        if (!onComplete) {
          setTimeout(() => {
            // This would typically be handled by the parent component
          }, 2000);
        }
      }}
    >
      <BarLoader 
        barColor="bg-white" 
        message={message}
        className="text-white"
      />
    </motion.div>
  );
};

export default BarLoader;