import React from 'react'
import Link from 'next/link'
import styles from '../styles/custom404.module.scss'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function NotFound() {

    const router = useRouter()
    return (
        <div className={styles.container}>
            <Head>
                <title>404 - Not Found</title>
            </Head>
            <div className={styles.box}>
                <h2>404 - Not Found</h2>
                <div className={styles.body}>
                    <ul>
                        <li>The URL or its content (such as files or images) was either deleted or moved (without adjusting any internal links accordingly)
                        </li>
                        <li>The URL was written incorrectly (during the creation process or a redesign), linked incorrectly, or typed into the browser incorrectly</li>
                        <li>The server responsible for the website is not running or the connection is broken</li>
                        <li>The requested domain name can’t be converted to an IP by the domain name system (DNS)</li>
                        <li>The requested domain name can’t be converted to an IP by the domain name system (DNS)</li>
                    </ul>
                </div>
                <div className={styles.btnContainer}>
                    <button onClick={() => router.back()}>Go Back</button>
                </div>
            </div>
        </div>
    )
}
