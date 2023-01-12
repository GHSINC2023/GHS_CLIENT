import React from 'react'
import Head from 'next/head'
import { useQuery } from '@apollo/client'
import { getMyApplicaiton } from '../../../util/applicaiton/application.query'
import jwtDecode from 'jwt-decode'

export default function Index({ appId }: any) {
  const { loading , data, error } = useQuery(getMyApplicaiton, {
    variables: {
      applicationId: appId
    }
  })
  return (
    <div>
      <Head>
        <title></title>
      </Head>
      <div>
        <h2>Header</h2>
      </div>
      <div>{loading ? null : JSON.stringify(data.getApplicantByID, null ,2)}</div>
    </div>
  )
}

export const getServerSideProps = async (context: any) => {
  const cookies = context.req.cookies["ghs_access_applicant"]
  const { applicantID }: any = jwtDecode(cookies)
  return {
    props: {
      appId: applicantID
    }
  }
}