import React from 'react'
import styles from '../../../../styles/components/exports/viewen.module.scss'
import Image from 'next/image'
import { CSVLink } from 'react-csv'


export default function Endorsement({ data, close, filename, status}: any) {


    const headers = [
        { label: "Status", key: "Status" },
        { label: "Application ID", key: "ApplicantID" },
        { label: "Email", key: "Email" },
        { label: "Firstname", key: "Firstname" },
        { label: "Lastname", key: "Lastname" },
        { label: "Phone", key: "Phone" },
        { label: "Endorse By", key: "EndorseBy" }
    ]
    const datas = data ? data.getEndorsmentByCSV.map(({ Status, createdAt, applicants, endorseBy }: any) => {
        return {
            Status: Status,
            ApplicantID: applicants[ 0 ].id,
            Email: applicants[ 0 ].email,
            Firstname: applicants[ 0 ].applicantProfile[ 0 ].firstname,
            Lastname: applicants[ 0 ].applicantProfile[ 0 ].lastname,
            Phone: `=""${applicants[ 0 ].applicantProfile[ 0 ].phone}""`,
            EndorseBy: `${endorseBy[ 0 ].profile[ 0 ].firstname} ${endorseBy[ 0 ].profile[ 0 ].lastname}`,

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
                            <Image src="/dashboard/download.svg" alt="" height={25} width={25} />
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
                            <th>Application ID</th>
                            <th>Email Address</th>
                            <th>Name</th>
                            <th>Phone No.</th>
                            <th>Endorsed By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.getEndorsmentByCSV.map(({ endorsementID, applicants, endorseBy }: any) => (
                            <tr key={endorsementID}>
                                {applicants.map(({ id }: any) => (
                                    <td key={id}>{id}</td>
                                ))}
                                {applicants.map(({ email }: any) => (
                                    <td key={email}>{email}</td>
                                ))}
                                {applicants.map(({ applicantProfile }: any) => (
                                    applicantProfile.map(({ firstname, lastname }: any) => (
                                        <td key={lastname}>{firstname} {lastname}</td>
                                    ))
                                ))}
                                {applicants.map(({ applicantProfile }: any) => (
                                    applicantProfile.map(({ phone }: any) => (
                                        <td key={phone}>{phone}</td>
                                    ))
                                ))}
                                {endorseBy.map(({ profile }: any) => (
                                    profile.map(({ firstname, lastname }: any) => (
                                        <td key={firstname}>{firstname} {lastname}</td>
                                    ))
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
