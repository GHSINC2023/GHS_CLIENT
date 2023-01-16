import React from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { getMyApplicaiton } from '../../../util/applicaiton/application.query'
import jwtDecode from 'jwt-decode'
import styles from '../../../styles/components/applicant/applicant.module.scss'
import { format } from 'date-fns'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'



export default function Index({ appId }: any) {
  const { loading, data, error } = useQuery(getMyApplicaiton, {
    variables: {
      applicationId: appId
    }
  })

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
      <div>{loading ? null : data.getApplicantByID.map(({ id, email, status, createdAt, applyJobPost, applicantProfile, applicantUpload, endorseFeedback, applicantInterviewer }: any) => (
        applicantProfile.map(({ firstname, lastname, birthday, phone, profileAddress }: any) => (
          applicantUpload.map(() => (
            applicantInterviewer.map(({ user }: any) => (
              applyJobPost.map(({ title }: any) => (
                <div className={styles.body} key={id}>
                  <Head>
                    <title>{`${firstname} ${lastname} - ${id}`}</title>
                  </Head>
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
                    <div className={styles.row}>
                      <div className={styles.head}>
                        <div>Job Apply</div>
                      </div>
                      <div className={styles.cell}>
                        {title}
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.head}>
                        <div>Interviewed by</div>
                      </div>
                      <div className={styles.cell}>
                        {user.map(({ profile }: any) => (
                          profile.map(({ profileID, firstname, lastname }: any) => (
                            <div key={profileID}> {firstname} {lastname}</div>
                          ))
                        ))}
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.head}>
                        <div>Date Applied</div>
                      </div>
                      <div className={styles.cell}>
                        <div>
                          {format(new Date(createdAt), "MMMM dd, yyyy")}
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    status === "rejected" ? null :
                      <>
                        <div className={styles.dvtitle}>
                          <h2>Feedbacks</h2>
                        </div>
                        <div className={styles.ftable}>
                          <div className={styles.tableHeader}>
                            <div className={styles.fHeader}>
                              <div>Company</div>
                              <div>Status</div>
                              <div>Comments</div>
                            </div>
                          </div>
                          {endorseFeedback.map(({ feedback, feedbackID, endorse }: any) => (
                            endorse.map(({ company, endorseStatus }: any) => (
                              company.map(({ companyName }: any) => (
                                <div key={feedbackID} className={styles.tableBody}>
                                  <div className={styles.fbody}>
                                    <div>{companyName}</div>
                                    <div>
                                      {endorseStatus === "approved" ? "Approved" : null}
                                      {endorseStatus === "rejected" ? "Rejected" : null}
                                    </div>
                                    <div>{feedback}</div>
                                  </div>
                                </div>
                              ))
                            ))
                          ))}
                        </div>
                      </>
                  }
                </div>
              ))
            ))
          ))
        ))
      ))}</div>
    </div>
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