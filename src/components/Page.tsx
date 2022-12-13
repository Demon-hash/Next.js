import React from "react"
import { Header, Navbar, Footer } from "./index"

import styles from "../styles/components/page.module.css"
import CookieBar from "./Cookie-Bar"

type Props = {
    children?: React.ReactNode
}

const Page: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <div className={styles.container}>
                <Navbar />
                {children}
            </div>
            <CookieBar />
            <Footer />
        </>
    )
}

export default Page
