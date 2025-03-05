import { useEffect } from 'react';
import Hello from '@components/Hello/Hello';
import { useSetRecoilState } from 'recoil';
import { siteLoadedAtom } from '@utils/recoilStates';
import { htmlentities } from '@utils/functions';

const Index: React.FC<{ postTitle: string }> = ({ postTitle }) => {

    const setAssetsLoaded = useSetRecoilState(siteLoadedAtom);

    useEffect(() => {
        document.title = htmlentities(postTitle);
        setAssetsLoaded(prevState => ({ ...prevState, components: true }))
    }, [])

    return <Hello />
}

export default Index;