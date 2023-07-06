import { Fragment } from "react"
import Head from "next/head"
import { getServerSideProps } from "../categories"
import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import FaqModal from "@/components/faq/FaqModal"
import NewFaq from "@/components/faq/NewFaq"
import { useRouter } from "next/router"

function Mart(martID) {
    const router = useRouter()
    const id = martID.shopID._id
    const favicon = martID.shopID.shopData.shopDetails.imageData.icons.icon

    return <Fragment>
        <Head>
            <title>Mart Analytics</title>
            <link rel="icon" type="image/jpeg" href={favicon} />
        </Head>
    </Fragment>
}

export default Mart

export { getServerSideProps }