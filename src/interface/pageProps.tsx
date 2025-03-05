import ComponentContentProps from "./componentContent"

interface Content {
    acf_fc_layout: string,
    content: ComponentContentProps[]
}

export default interface PageProps {
    have_post: boolean,
    content: Content[]
}