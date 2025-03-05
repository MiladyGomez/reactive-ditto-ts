import { useState, useEffect } from 'react';
import DynamicZone from '@ui/DynamicZone/DynamicZone';
import axios from '@utils/axiosInstance';
import { htmlentities } from '@utils/functions';
import PageProps from '@interface/pageProps';
import { useSetRecoilState } from 'recoil';
import { siteLoadedAtom } from '@utils/recoilStates';

const Page: React.FC<{ id: number, postTitle: string }> = ({ id, postTitle }) => {

    const [ pageContent, setPageContent ] = useState<PageProps>({ have_post: false, content: [] });
    const setAssetsLoaded = useSetRecoilState(siteLoadedAtom);

    useEffect(() => {
        let isCancelled = false;
        setAssetsLoaded(prevState => ({ ...prevState, components: false }))
        const getPage = async () => axios.get(`page/${id}`)
            .then(response => { 
                if (response.data) {
                    setPageContent(response.data);
                    setAssetsLoaded(prevState => ({ ...prevState, components: true }))
                } 
            })
            .catch(err => { console.log(err) })
        
        if(!isCancelled) getPage();

        scroll({top: 0});
    
        return () => { isCancelled = true; }
    }, [ id ])

    let formatedContent;
    if(pageContent.content.length > 0) {
        formatedContent = pageContent.content.map(({ acf_fc_layout, content }, index: number) => {
            return <DynamicZone key={index + 1} numb={index + 1} id={id} component={acf_fc_layout} content={content} />;
        });
    }

    document.title = htmlentities(postTitle);

    return (formatedContent ? formatedContent : <div className="container"></div>);
}

export default Page;