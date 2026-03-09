import { useState, useEffect } from 'react';
import DynamicZone from '@ui/DynamicZone/DynamicZone';
import axios from '@utils/axiosInstance';
import { htmlentities } from '@utils/functions';
import PageProps from '@interface/pageProps';
import { useSetRecoilState } from 'recoil';
import { siteLoadedAtom, languageAtom } from '@utils/recoilStates';

const Page: React.FC<{ id: number, postTitle: string, lang: string }> = ({ id, postTitle, lang }) => {

    const [pageContent, setPageContent] = useState<PageProps>({ have_post: false, content: [] });
    const setAssetsLoaded = useSetRecoilState(siteLoadedAtom);
    const setLanguage = useSetRecoilState(languageAtom);

    useEffect(() => {
        setLanguage(lang);
        scroll({ top: 0 });

        // Use PHP-inlined page data on first load to skip the REST API call
        const preloaded = (window as any).__PAGE_DATA__;
        if (preloaded?.have_post) {
            delete (window as any).__PAGE_DATA__;
            setPageContent(preloaded);
            setAssetsLoaded(prevState => ({ ...prevState, components: true }));
            return;
        }

        let isCancelled = false;
        setAssetsLoaded(prevState => ({ ...prevState, components: false }));
        const getPage = async () => axios.get(`page/${id}`, { params: { lang } })
            .then(response => {
                if (response.data) {
                    setPageContent(response.data);
                    setAssetsLoaded(prevState => ({ ...prevState, components: true }))
                }
            })
            .catch(err => { console.error(err) })

        if (!isCancelled) getPage();

        return () => { isCancelled = true; }
    }, [id, lang]);

    let formatedContent;
    if (pageContent.content && pageContent.content.length > 0) {
        formatedContent = pageContent.content.map((component: any, index: number) => {
            return <DynamicZone key={`${id}-${index}-${lang}`} component={component} />;
        });
    }

    document.title = htmlentities(postTitle);

    return (formatedContent ? formatedContent : <div className="container"></div>);
}

export default Page;
