import { atom } from 'recoil';

export const siteLoadedAtom = atom({
    key: 'siteLoaded',
    default: {
        assets: false,
        header: true,
        footer: false,
        components: false,
    },
});

export const languageAtom = atom({
    key: 'language',
    default: 'en',
});
