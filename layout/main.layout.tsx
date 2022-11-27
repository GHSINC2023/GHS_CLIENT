import React, { ReactNode } from 'react'
import dynamic
    from 'next/dynamic'


const Header = dynamic(() => import('../components/main/headers'), {
    ssr: false
})
interface Props {
    children: ReactNode
}
export default function Main({ children }: Props) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
