interface MenuItem {
    ID: number,
    title: string,
    url: string,
    slug: string,
    path: string,
    page_id: number,
    parent: number,
    classes: string[],
    target: string
}

export default interface HeaderProps {
    has_logo: boolean,
    logo: string | null,
    title: string,
    menu: MenuItem[]
}