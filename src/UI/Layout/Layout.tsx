import { useEffect } from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import Loader from '@ui/Loader/Loader';
import { useSetRecoilState } from 'recoil';
import { siteLoadedAtom } from '@utils/recoilStates';

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const setAssetsLoaded = useSetRecoilState(siteLoadedAtom);

    useEffect(() => {
        const handleLoad = () => { setAssetsLoaded(prevState => ({ ...prevState, assets: true })) };
    
        if (document.readyState === 'complete') handleLoad() 
        else {
            window.addEventListener('load', handleLoad);
            
            document.addEventListener('readystatechange', () => {
                if (document.readyState === 'complete') handleLoad();
            });
        }
    
        return () => {
            window.removeEventListener('load', handleLoad);
            document.removeEventListener('readystatechange', handleLoad);
        };
    }, [ setAssetsLoaded ]);

    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
            <Loader />
        </>
    )
}

export default Layout;