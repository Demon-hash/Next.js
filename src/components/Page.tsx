import React from "react";
import {Header, Navbar, Footer} from "./index";

import styles from "../styles/components/page.module.css";

type Props = {
    children?: React.ReactNode;
}

const Page: React.FC<Props> = ({children}) => {
    return (
        <>
            <Header/>
            <div className={styles.container}>
                <Navbar/>
                <main>
                    {children}
                </main>
            </div>
            <Footer/>
        </>
    );
}

export default Page;