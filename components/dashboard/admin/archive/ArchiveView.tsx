import React from 'react'
import styles from '../../../../styles/components/dashboard/archive/archive.view.module.scss'
import { useQuery } from '@apollo/client'
import { getArchiveID } from '../../../../util/archive/archive.query'
import { format } from 'date-fns'
import htmlParse from 'html-react-parser'

export default function ArchiveView({ id, close }: any) {


  const { loading, data } = useQuery(getArchiveID, {
    variables: {
      archiveId: id
    }
  })

  if (loading) return null
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => close("")}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div className={styles.body}>
        {data.getArchiveID.map(({ archiveID, type, job, endorse, applicants }: any) => (
          <div key={archiveID}>
            {type === "post" ? <div>
              {job.map(({ jobPostID, title, qualification, responsibilities, description, details }: any) => (
                <div className={styles.job} key={jobPostID}>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <div>
                    <h2>Qualification</h2>
                    {htmlParse(qualification)}
                  </div>
                  <div>
                    <h2>Responsibilities</h2>
                    {htmlParse(responsibilities)}
                  </div>
                </div>
              ))}
            </div> : null}
            {
              type === "applicant" ?
                <div className={styles.xx}>
                  {applicants.map(({ applicantID, id, applicantProfile, applyJobPost }: any) => (
                    applicantProfile.map(({ firstname, lastname, phone, birthday, profileAddress }: any) => (
                      <div key={applicantID}>
                        <h2>Personal Information</h2>
                        <table>
                          <tbody>
                            <tr>
                              <th>Applicant No.</th>
                              <td>{id}</td>
                            </tr>
                            <tr>
                              <th>Name</th>
                              <td>{firstname} {lastname}</td>
                            </tr>
                            <tr>
                              <th>Phone</th>
                              <td>{phone}</td>
                            </tr>
                            <tr>
                              <th>Job Apply</th>
                              {applyJobPost.map(({ title }: any) => (
                                <td key={title}>{title}</td>
                              ))}
                            </tr>
                            <tr>
                              <th>Birthday</th>
                              <td>{format(new Date(birthday), "MMMM dd, yyyy")}</td>
                            </tr>
                            <tr>
                              <th>Address</th>
                              {profileAddress.map(({ street, city, province, zipcode }: any) => (
                                <td key={street}>{street}, {city}, {province}, {zipcode}</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    ))

                  ))}
                </div> : null
            }
            {
              type === "endorsed" ?
                <div className={styles.xx}>
                  {endorse.map(({ endorseID, company, endorsement }: any) => (
                    <div key={endorseID}>
                      {endorsement.map(({ applicants }: any) => (
                        applicants.map(({ id, applicantProfile, email }: any) => (
                          applicantProfile.map(({ firstname, lastname, phone, birthday }: any) => (
                            <div key={id}>
                              <h2>Personal Information</h2>
                              <table>
                                <tbody>
                                  <tr>
                                    <th>Name</th>
                                    <td>{firstname} {lastname}</td>
                                  </tr>
                                  <tr>
                                    <th>Email</th>
                                    <td>{email}</td>
                                  </tr>
                                  <tr>
                                    <th>Phone</th>
                                    <td>{phone}</td>
                                  </tr>
                                  <tr>
                                    <th>birthday</th>
                                    <td>{format(new Date(birthday), "MMMM dd, yyyy")}</td>
                                  </tr>
                                  <tr>
                                    <th>Company</th>
                                    {company.map(({ companyName }: any) => (
                                      <td key={companyName}>{companyName}</td>
                                    ))}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ))
                        ))
                      ))}

                    </div>
                  ))}
                </div> : null
            }
          </div>
        ))}
      </div>
    </div>
  )
}
