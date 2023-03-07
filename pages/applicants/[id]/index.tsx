import React, { useState } from 'react'
import Head from 'next/head'
import { useQuery, useMutation } from '@apollo/client'
import { getMyApplicaiton } from '../../../util/applicaiton/application.query'
import jwtDecode from 'jwt-decode'
import styles from '../../../styles/components/applicant/applicant.module.scss'
import { format } from 'date-fns'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import TerminationApplicant from '../../../components/dashboard/applicant/terminate'



export default function Index({ appId }: any) {
  const { loading, data, error } = useQuery(getMyApplicaiton, {
    variables: {
      applicationId: appId
    }
  })


  const [ open, setOpened ] = useState(false)

  const onHandleTerminateApp = (e: any) => {
    setOpened(() => !open)

  }


  const router = useRouter()
  const onLogouthandle = () => {
    Cookies.remove("ghs_access_applicant")
    router.push("/")
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onLogouthandle}>Logout</button>
      </div>
      {
        open ? <div className={styles.bee}>
          <TerminationApplicant id={appId} close={setOpened} /> </div> : null
      }
      {loading ? null : data.getApplicantByID.map(({ id, email, status, createdAt, applyJobPost, applicantProfile, applicantUpload, endorseFeedback, applicantInterviewer }: any) => (
        applicantProfile.map(({ firstname, lastname, birthday, phone, profileAddress }: any) => (
          applicantUpload.map(({ file, upload }: any) => (
            <div className={styles.body} key={id}>
              <Head>
                <title>{`${firstname} ${lastname} - ${id}`}</title>
              </Head>
              <div className={styles.xyz}>
                <div className={styles.app}>
                  <div className={styles.dvtitle}>
                    <h2>Personal Information</h2>
                  </div>
                  <div className={styles.table}>
                    <div className={styles.row}>
                      <div className={styles.head}>
                        <div>Applicant No.</div>
                      </div>
                      <div className={styles.cell}>
                        <div>{id}</div>
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.head}>
                        <div>Email Address</div>
                      </div>
                      <div className={styles.cell}>
                        <div>
                          {email}
                        </div>
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.head}>
                        <div>Applicant Status</div>
                      </div>
                      <div className={styles.cell}>
                        <div>
                          {status === "approved" ? "Approved" : null}
                          {status === "rejected" ? "Rejected" : null}
                          {status === "waiting" ? "Waiting" : null}
                        </div>
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.head}>
                        <div>Name</div>
                      </div>
                      <div className={styles.cell}>{firstname} {lastname}</div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.head}>
                        Phone No.
                      </div>
                      <div className={styles.cell}>
                        {phone}
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.head}>
                        Address
                      </div>
                      <div className={styles.cell}>
                        {profileAddress.map(({ street, zipcode, province, city }: any) => (
                          <div key={street}>
                            {street}, {city}, {province}, {zipcode}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.head}>
                        Birthday
                      </div>
                      <div className={styles.cell}>
                        {format(new Date(birthday), "MMMM dd, yyyy")}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.application}>
                  <div>
                    <div className={styles.dvtitle}>
                      <h2>Application</h2>
                    </div>
                    {applyJobPost.map(({ title }: any) => (
                      <table key={title}>
                        <tbody>
                          <tr>
                            <th>Job Applied</th>
                            <td>{title}</td>
                          </tr>
                          <tr>
                            <th>Date Applied</th>
                            <td>{format(new Date(createdAt), "MMMM dd yyyy")}</td>
                          </tr>
                          {applicantInterviewer.length === 0 ? <tr><th>Interviewer</th>
                            <td>N/A</td></tr> : applicantInterviewer.map(({ user }: any) => (
                              user.map(({ profile }: any) => (
                                profile.map(({ profileID, firstname, lastname }: any) => (
                                  <tr key={profileID}>
                                    <th>Interviewer</th>
                                    <td>{firstname} {lastname}</td>
                                  </tr>
                                ))
                              ))
                            ))}
                        </tbody>
                      </table>
                    ))}
                  </div>
                  {status === 'approved' ? null : <button onClick={onHandleTerminateApp}>Terminate</button>}
                </div>
              </div>
              <div className={styles.feedback}>
                <div className={styles.dvtitle}>
                  <h2>Endorse Feedback</h2>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Status</th>
                      <th>Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {endorseFeedback.map(({ feedback, feedbackID, endorse }: any) => (
                      endorse.map(({ endorseStatus, company }: any) => (
                        company.map(({ companyName }: any) => (
                          <tr key={feedbackID}>
                            <td>{companyName}</td>
                            <td>{endorseStatus}</td>
                            <td>{feedback}</td>
                          </tr>
                        ))
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ))
      ))}
    </div >
  )
}

export const getServerSideProps = async (context: any) => {
  const cookies = context.req.cookies[ "ghs_access_applicant" ]
  const { applicantID }: any = jwtDecode(cookies)
  return {
    props: {
      appId: applicantID
    }
  }
}