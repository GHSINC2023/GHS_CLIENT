import React, { useEffect, useRef, useState } from 'react'
import styles from '../../../../styles/components/dashboard/post/card.module.scss'
import { useRouter } from 'next/router'

export default function CardPost({ id, title, description, status, author }: any) {
    const router = useRouter()
    const [ jobID, setJobID ] = useState("")
    const [ deleteID, setDeleteID ] = useState("")

    const handleOptionIDRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: any) => {
            if (handleOptionIDRef.current && !handleOptionIDRef.current.contains(e.target)) {
                let clicks = 0;
                clicks++;
                if (clicks === 1) {
                    setTimeout(() => {
                        setJobID("")
                    }, 100)
                }
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [ jobID ])

    return (
        <div className={styles.card}>
            <div className={styles.cardHead}>
                <h2>{title}</h2>
            </div>
            <div className={styles.cardBody}>
                <div className={styles.author}>
                    <h4>Posted By: </h4>
                    <h3>{author}</h3>
                </div>
                <div className={styles.descriptions}>
                    <p>{description.substring(0, 100)}</p>
                </div>
            </div>
            <div className={styles.btnContainer}>
                <button onClick={() => router.push(`${router.asPath}/${id}`)}>View</button>
            </div>
        </div>
    )
}
