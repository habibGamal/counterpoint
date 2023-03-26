import { motion } from 'framer-motion';
export default function ListItem({ text, delay }: { text: string, delay?: number }) {


    const item = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 150 },
    }
    return (
        <motion.li variants={item} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: .5, delay }} className=" w-[90%]">
            {text}
        </motion.li>
    );
}