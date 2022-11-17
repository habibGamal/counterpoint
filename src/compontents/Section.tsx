import { motion } from 'framer-motion';
export default function Section({ title, musicIcon, children,className }: { title: string, musicIcon: string, children: JSX.Element[]|JSX.Element,className?:string }) {
    return (
        <div className={`rounded-lg shadow-2xl p-12 m-32 mt-8 relative text-3xl text-primary-50 leading-[3rem] ${className}`}>
            <motion.img
                initial={{ opacity: .5, scale: 1.5, translate: '-50% -50%' }}
                transition={{ duration: 1.5, type: 'spring' }}
                whileInView={{ opacity: .1, scale: 1 }}
                viewport={{ once: true }}
                className='absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[100px]'
                src={musicIcon}
            />
            <h2
                className="text-4xl font-bold text-primary-100 mb-12">
                {title}
            </h2>
            {children}
        </div>
    )
}
