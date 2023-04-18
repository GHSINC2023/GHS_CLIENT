import React from 'react'
import styles from '../../../../styles/components/exports/viewen.module.scss'
import { CSVLink } from 'react-csv'
export default function ApplicantView({ data, close, filename, status }: any) {


    const headers = [
        { label: "ApplicationID", key: "ApplicationID" },
        { label: "Email", key: "Email" },
        { label: "Job Apply", key: "JobApply" },
        { label: "Firstname", key: "Firstname" },
        { label: "Lastname", key: "Lastname" },
        { label: "Phone", key: "Phone" },
        { label: "Address", key: "Address" },
        { label: "Resume", key: "Resume" },
        { label: "Video", key: "intro" },
        { label: "Date Applied", key: "applied" }

    ]
    const datas = data ? data.generateApplicantCSV.map(({ id, createdAt, email, applyJobPost, applicantProfile, applicantUpload }: any) => {
        return {
            ApplicationID: id,
            Email: email,
            JobApply: applyJobPost[ 0 ].title,
            Firstname: applicantProfile[ 0 ].firstname,
            Lastname: applicantProfile[ 0 ].lastname,
            Phone: `=""${applicantProfile[ 0 ].phone}""`,
            Address: `${applicantProfile[ 0 ].profileAddress[ 0 ].street}, ${applicantProfile[ 0 ].profileAddress[ 0 ].city},${applicantProfile[ 0 ].profileAddress[ 0 ].province}, ${applicantProfile[ 0 ].profileAddress[ 0 ].zipcode}`,
            Resume: applicantUpload[ 0 ].file,
            intro: applicantUpload[ 0 ].video,
            applied: createdAt
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
                            <th>Application ID</th>
                            <th>Email Address</th>
                            <th>Name</th>
                            <th>Phone No.</th>
                            <th>Address</th>
                            <th>Job Apply</th>
                            <th>Resume</th>
                            <th>Video</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.generateApplicantCSV.map(({ id, createdAt, email, applyJobPost, applicantProfile, applicantUpload }: any) => (
                            <tr key={id}>
                                <td key={id}>{id}</td>
                                <td key={email}>{email}</td>
                                {
                                    applicantProfile.map(({ firstname, lastname }: any) => (
                                        <td key={lastname}>{firstname}{lastname}</td>

                                    ))
                                }
                                {
                                    applicantProfile.map(({ phone }: any) => (
                                        <td key={phone}>{phone}</td>
                                    ))
                                }
                                {
                                    applicantProfile.map(({ profileAddress }: any) => (
                                        profileAddress.map(({ addressID, street, zipcode, city, province }: any) => (
                                            <td key={addressID}>{street}, {city}, {province}, {zipcode}</td>
                                        ))
                                    ))
                                }
                                {
                                    applyJobPost.map(({ title }: any) => (
                                        <td key={title}>{title}</td>
                                    ))
                                }
                                {
                                    applicantUpload.map(({ file }: any) => (
                                        <td key={file}>{file}</td>
                                    ))
                                }
                                {
                                    applicantUpload.map(({ video }: any) => (
                                        <td key={video}>{video}</td>
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
