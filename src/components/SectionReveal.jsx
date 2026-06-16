import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Reveals its children with blur + fade + translateY when scrolled into view.
export default function SectionReveal({ children, delay = 0, amount = 0.15, y = 20, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount })

  return (
    <motion.div
      ref={ref}
      initial={{ filter: 'blur(10px)', opacity: 0, y }}
      animate={inView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
