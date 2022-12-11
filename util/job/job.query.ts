import { gql } from '@apollo/client'


export const jobQueries = gql`query JobQuery {
  jobQuery {
    jobPostID
    title
  }
}`

export const getAllJobQuery = gql`query getAllJobPost {
  getAllJobPost {
    jobPostID
    title
    description
    status
    createdAt
    updatedAt
    details {
      jobDetailsID
      jobType
      location
      salary
    }
  }
}
`


export const getJobById = gql`query GetJobPostById($jobPostId: ID!) {
  getJobPostById(jobPostID: $jobPostId) {
    jobPostID
    title
    description
    responsibilities
    qualification
    details {
      category
      jobDetailsID
      jobType
      location
      salary
      workType
    }
  }
}`


export const getJobStatus = gql`
query Query($status: String!, $take: Int!, $order: orderedBy, $offset: Int!) {
  getJobByStatus(status: $status, take: $take, order: $order, offset: $offset) {
    jobPostID
    title
    description
    status
    createdAt
    updatedAt
    users {
      userID
      email
      role
      profile {
        firstname
        lastname
      }
    }
    applicants {
      applicantID
      createdAt
    }
  }
}
`

export const getJobSearch = gql`query Query($search: String!) {
  getJobPostSearch(search: $search) {
    jobPostID
    title
  }
}`