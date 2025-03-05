import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { siteLoadedAtom } from '@utils/recoilStates';

const Error404 = () => {

    const setAssetsLoaded = useSetRecoilState(siteLoadedAtom);
    
    useEffect(() => {
        document.title = 'Page not found';
        setAssetsLoaded(prevState => ({ ...prevState, components: true }))
    }, [])

    return (
        <main>
            <div className="container">
                [Error 404]
            </div>
        </main>
    )
}

export default Error404;