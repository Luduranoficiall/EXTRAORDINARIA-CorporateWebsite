import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Sparkles className="w-10 h-10 text-black" />
        </motion.div>
        
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl font-black mb-2"
        >
          EXTRAORDINÁRI<span className="text-primary">.A.</span>
        </motion.h2>
        
        <motion.p
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
          className="text-white/60 text-sm"
        >
          AI First. People Always.
        </motion.p>
      </div>
    </motion.div>
  );
}
