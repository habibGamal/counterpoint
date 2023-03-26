import { motion } from 'framer-motion';
import React from 'react';

export default function AnimatedP({ text, delay }: { text: React.ReactNode, delay?: number }) {

    const item = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 150 },
    }
    return (
        <motion.p variants={item} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: .5, delay }} className="w-[90%]">
            {text}
        </motion.p>
    )
}
