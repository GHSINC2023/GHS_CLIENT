import React, { useState, useRef } from 'react'
import styles from '../../../../styles/components/dashboard/endorsement/data.module.scss'
import Image from 'next/image'
import { endorsement_status } from '../../../../util/values/filter'
import { endorsementByStatus } from '../../../../util/endorsement/endorsement.query'
import { endorsementUpdate } from '../../../../util/endorsement/endorsement.mutation'
import { useRouter } from 'next/router'
import { format } from 'date-fns'
import { useMutation, useQuery } from '@apollo/client'


export default function Data({ limit, status, order }: any) {

    const router = useRouter()
    const statsRef = useRef<HTMLDivElement>(null)
    const [ pages, setPages ] = useState(0)
    const { loading, data } = useQuery(endorsementByStatus, {
        variables: {
            status,
            limit,
            offset: pages * limit,
            order
        }
    })

    const [ id, setID ] = useState("")
    const getEndorsementID = (endorsementID: any) => {
        setID(() => endorsementID)
        if (id === endorsementID) {
            setID(() => "")
        }
    }
    const [ updateEndosement ] = useMutation(endorsementUpdate)
    const updateEndorsementStatus = (name: any) => {
        updateEndosement({
            variables: {
                endorsementId: id,
                status: name
            },
            refetchQueries: [ endorsementByStatus ],
            onQueryUpdated: (observableQuery) => {
                return observableQuery.refetch()
            },
            onError: e => {
                console.log(e)
            }
        })
        setID(() => "")
    }
    return (
        <div className={styles.container}>

            <div className={styles.tableContainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Endorse Date</th>
                            <th>Endorse by</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? null :
                            data.getEndorsementSpecificStatus.map(({ endorsementID, Status, createdAt, applicants, endorseBy }: any) => (
                                applicants.map(({ applicantProfile }: any) => (
                                    applicantProfile.map(({ firstname, lastname }: any) => (
                                        endorseBy.map(({ profile: prof }: any) => (
                                            prof.map(({ firstname: first, lastname: last }: any) => (
                                                <tr key={endorsementID}>
                                                    <td className={styles.name}>{lastname}, {firstname}</td>
                                                    <td className={styles.status}>
                                                        <button onClick={() => getEndorsementID(endorsementID)}>
                                                            <div className={styles.box} about={Status} />
                                                            <span>{Status}</span>
                                                        </button>
                                                        {id === endorsementID ?
                                                            <div ref={statsRef} className={styles.containerButtons}>
                                                                {endorsement_status.map((name) => (
                                                                    <button onClick={
                                                                        (e) => {
                                                                            e.preventDefault();
                                                                            updateEndorsementStatus(name)
                                                                        }
                                                                    } key={name} value={name} className={styles.statusContainer}>
                                                                        <div className={styles.box} about={name} />
                                                                        <span key={name}>{name}</span>
                                                                    </button>
                                                                ))}
                                                            </div> :
                                                            null
                                                        }
                                                    </td>
                                                    <td>{format(new Date(createdAt), "MMM dd, yyy")}</td>
                                                    <td>{first} {last}</td>
                                                    <td>
                                                        <button onClick={() => router.push(`${router.pathname}/${endorsementID}`)}>
                                                            <Image src="/dashboard/eye-line.svg" alt="" height={20} width={20} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ))
                                    ))
                                ))
                            ))
                        }
                    </tbody>
                    <tfoot>

                    </tfoot>
                </table>
            </div>
            <div className={styles.pages}>
                <button disabled={!pages} onClick={() => setPages(() => pages - 1)}>
                    <Image src="/dashboard/arrow-left-line.svg" alt="" height={20} width={20} />
                </button>
                <span>{pages + 1}</span>
                <button disabled={loading ? true : data.getEndorsementSpecificStatus.length < limit || data.getEndorsementSpecificStatus.length === 0} onClick={() => setPages(() => pages + 1)}>
                    <Image src="/dashboard/arrow-right-line.svg" alt="" height={20} width={20} />
                </button>
            </div>
        </div>
    )
}
