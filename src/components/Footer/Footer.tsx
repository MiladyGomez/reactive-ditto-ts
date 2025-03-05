import styles from './Footer.module.scss';

const Footer = () => {

    return (
        <footer className={styles.Container}>
            © Reactive Ditto Theme {new Date().getFullYear()}
        </footer>
    )
}

export default Footer;