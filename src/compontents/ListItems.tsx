import ListItem from "./ListItem";

export default function ListItems({ textList, delay }: { textList: string[], delay?: number }) {
    return <>{textList.map((text, i) => <ListItem text={text} delay={delay !== undefined ? delay +( i * .05) : undefined} />)}</>
}
