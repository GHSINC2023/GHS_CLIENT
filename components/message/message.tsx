import React from 'react'
import styles from '../../styles/components/message/message.module.scss'
import Image from 'next/image'


interface msg {
    label: string
    status: "success" | "error"
    message: string
}
export default function Message({ label, message, status }: msg) {
    return (
        <div className={status === "success" ? styles.success : styles.error}>

            {
                status === "success" ?
                    <Image src="/message/check-circle.svg" alt="" height={30} width={30} />
                    :
                    <Image src="/message/x-circle.svg" alt="" height={30} width={30} />
            }

            <div className={styles.msg}>
                <span className={styles.title}>{label}</span>
                <span className={styles.sub}>{message}</span>
            </div>
        </div>
    )
}
