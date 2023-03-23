import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import styles from '../../../../styles/components/dashboard/endorsement/endorse.module.scss'
import { endorseTo } from '../../../../util/endorse/endorse.query'
import Image from 'next/image'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { endorsementById } from '../../../../util/endorsement/endorsement.query'
import CompanyCard from '../../../card/companyCard'
export default function Endorse({ endorsementID, close }: any) {

    const [ pages, setPages ] = useState(0)
    const [ userid, setUserId ] = useState("")
    const [ company, setCompany ] = useState([]) as any
    const [ isRender, setRender ] = useState(false)

    useEffect(() => {
        const cookies = Cookies.get("ghs_access_token")
        if (cookies) {
            const { userID }: any = jwtDecode(cookies)
            setUserId(userID)
        }
    }, [])

    const { loading, data } = useQuery(endorseTo, {
        variables: {
            limit: 10,
            offset: 10 * pages
        },
        onError: error => {
            console.log(error.message)
        }
    })

    const { loading: endorLoad, data: endoData } = useQuery(endorsementById, {
        variables: {
            endorsementId: endorsementID
        },
        onCompleted: () => {
            setRender(true)
        }
    })

    useEffect(() => {
        if (isRender) {
            endoData.getEndorsementById.map(({ endorse }: any) => {
                endorse.map(({ company }: any) => {
                    company.map(({ companyID, companyName }: any) => {
                        setCompany((companies: any) => [ ...companies, companyName ])
                    })
                })
            })
        }

        setRender(false)
    }, [ endoData, isRender ])


    if (endorLoad || loading) return null

    console.log(company)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>Endorse</h2>
                <button onClick={() => close(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div className={styles.body}>
                {
                    data.getEmployerCompany.map(({ companyID, companyName }: any) => (
                        <CompanyCard key={companyID} name={companyName} id={companyID} endorsementID={endorsementID} userid={userid} company={company} />
                    ))
                }

            </div>
            <div className={styles.footer}>
                <button disabled={!pages} onClick={() => setPages(pages - 1)}>
                    <Image src="/icon/arrow-left-line.svg" alt="" height={20} width={20} />
                </button>
                <span>{pages + 1}</span>
                <button disabled={loading ? true : data.getEmployerCompany.length < 10 || data.getEmployerCompany === 0} onClick={() => setPages(pages + 1)}>
                    <Image src="/icon/arrow-right-line.svg" alt="" height={20} width={20} />
                </button>
            </div>
        </div>

    )
}
