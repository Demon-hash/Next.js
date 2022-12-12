import React from "react";
import {useTranslation} from "next-i18next";
import styles from "../../styles/components/footer.module.css";

type Props = {}

const Footer: React.FC<Props> = () => {
    const {t} = useTranslation('footer');

    return (
        <footer className={styles.footer}>
        </footer>
    )
}

export default Footer;