import {motion} from 'framer-motion'
export default function Illustration({ description, src }: { description: string, src: string }) {
    
    const illustration = {
        visible: { opacity: 1, scale:1 },
        hidden: { opacity: 0, scale:0 },
    }
    return (
        <motion.div variants={illustration} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{duration:1,type:'spring'}} className="rounded-lg  shadow-xl p-4 w-fit text-primary-50 text-2xl text-center mx-auto my-6">
            <img className='w-[700px] rounded-lg' src={src} alt="" />
            <p className='p-4'>
                {description}
            </p>
        </motion.div>
    );
}