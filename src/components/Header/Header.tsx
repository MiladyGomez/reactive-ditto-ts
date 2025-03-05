import { useState, useEffect } from 'react';
import axios from '@utils/axiosInstance';
import HeaderProps from '@interface/headerProps';
import { useSetRecoilState } from 'recoil';
import { siteLoadedAtom } from '@utils/recoilStates';
import styles from './Header.module.scss';

const Header = () => {

    const [ headerInfo, setNavItems ] = useState<HeaderProps>({ has_logo: false, logo: null, title: '', menu: [] });
    const setAssetsLoaded = useSetRecoilState(siteLoadedAtom);

    useEffect(() => {
        let isCancelled = false;
        const getHeaderNav = async () => axios.get('navigation/main_menu')
            .then(response => { 
                if (response.data) {
                    setNavItems(response.data);
                    setAssetsLoaded(prevState => ({ ...prevState, header: true }))
                } 
            })
            .catch(err => { console.log(err) })

        if (!isCancelled) getHeaderNav();

        return () => { isCancelled = true; }
    }, []);

    return (
        <header className={styles.Container}>
            { headerInfo.has_logo && headerInfo.logo ? 
                <img src={headerInfo.logo} alt={headerInfo.title} />
            : headerInfo.title }
        </header>
    )
}

export default Header