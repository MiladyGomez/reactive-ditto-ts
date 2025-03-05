import { atom } from 'recoil';

export const siteLoadedAtom = atom({
    key: 'siteLoaded',
    default: {
        assets: false,
        header: false,
        components: false,
    },
});