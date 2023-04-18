import React from 'react'
import { CSVLink } from 'react-csv'
import styles from '../../../../styles/components/exports/viewen.module.scss'

export default function EndorseView({ data, close, filename }: any) {


    const headers = [
        { label: "Email", key: "Email" },
        { label: "Job Application", key: "JobApply" },
        { label: "Firstname", key: "Firstname" },
        { label: "Lastname", key: "Lastname" },
        { label: "Phone", key: "Phone" },
        { label: "Date Endorsed", key: "endorse" }
    ]

    console.log(data ? data.getEndorseByCSV : null)
    const datas = data ? data.getEndorseByCSV.map(({ endorseStatus, createdAt, endorseID, endorsement }: any) => {
        return {
            Email: endorsement[ 0 ].applicants[ 0 ].applyJobPost[ 0 ].title,
            JobApply: endorsement[ 0 ].applicants[ 0 ].applyJobPost[ 0 ].title,
            Firstname: endorsement[ 0 ].applicants[ 0 ].applicantProfile[ 0 ].firstname,
            Lastname: endorsement[ 0 ].applicants[ 0 ].applicantProfile[ 0 ].lastname,
            Phone: `=""${endorsement[ 0 ].applicants[ 0 ].applicantProfile[ 0 ].phone}""`,
            endorse: createdAt,
        }


    }) : null


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>{filename} - {status}</h2>
                <div className={styles.h}>
                    <CSVLink headers={headers}
                        className={styles.csvgen}
                        data={datas}
                        filename={filename}>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D02222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                        </button>
                    </CSVLink>

                    <button onClick={() => close(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={styles.body}>
                <table>
                    <thead>
                        <tr>
                            <th>Email Address</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Job Apply</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getEndorseByCSV.map(({ endorseStatus, createdAt, endorseID, endorsement }: any) => (
                            <tr key={endorseID}>
                                {
                                    endorsement.map(({ applicants }: any) => (
                                        applicants.map(({ email }: any) => (
                                            <td key={email}>{email}</td>
                                        ))
                                    ))
                                }
                                {
                                    endorsement.map(({ applicants }: any) => (
                                        applicants.map(({ applicantProfile }: any) => (
                                            applicantProfile.map(({ firstname, lastname }: any) => (
                                                <td key={firstname}>{firstname} {lastname}</td>
                                            ))

                                        ))
                                    ))
                                }
                                {
                                    endorsement.map(({ applicants }: any) => (
                                        applicants.map(({ applicantProfile }: any) => (
                                            applicantProfile.map(({ phone }: any) => (
                                                <td key={phone}>{phone}</td>
                                            ))

                                        ))
                                    ))
                                }
                                {
                                    endorsement.map(({ applicants }: any) => (
                                        applicants.map(({ applyJobPost }: any) => (
                                            applyJobPost.map(({ title }: any) => (
                                                <td key={title}>{title}</td>
                                            ))

                                        ))
                                    ))
                                }
                                <td>{createdAt}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
