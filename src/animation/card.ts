const animate = {
    visible: { opacity: 1, scale: 1,y:0 },
    hidden: { opacity: 0, scale: 0,y:100 },
    hover: { scale: 1.05 }
}
export const cardAnimation = (delay?: number) => ({
    variants: animate,
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true },
    whileHover:"hover",
    transition: { duration: .5, type: 'spring', delay }
})