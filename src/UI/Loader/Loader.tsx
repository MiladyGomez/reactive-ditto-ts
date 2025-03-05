import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { siteLoadedAtom } from '@utils/recoilStates';
import style from './Loader.module.scss';

const Loader = () => {

    const siteLoaded = useRecoilValue(siteLoadedAtom);
    const [ isLoaded, setIsLoaded ] = useState(false);

    useEffect(() => {
        const allLoaded = Object.values(siteLoaded).every(value => value === true);
        setIsLoaded(allLoaded);
    }, [ siteLoaded ]);

    return (
        <section className={isLoaded ? [style.Container, style.Loaded].join(' ') : style.Container} />
    )
}

export default Loader;