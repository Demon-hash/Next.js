import React from "react"
import { Header, Navbar, Footer } from "./index"
import CookieBar from "./Cookie-Bar"

type Props = {
    children?: React.ReactNode
}

const Page: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main>
                <Navbar />
                {children}
            </main>
            <CookieBar />
            <Footer />
        </>
    )
}

export default Page
