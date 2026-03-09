interface Route {
    ID: number,
    post_name: string,
    post_parent: string,
    post_title: string,
    post_type: string,
    lang: string
}

export default interface RouterProps {
    basename: string | null,
    items: Route[]
}
