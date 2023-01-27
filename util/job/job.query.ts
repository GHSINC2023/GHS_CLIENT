import { gql } from '@apollo/client'


export const jobQueries = gql`query JobQuery {
  jobQuery {
    jobPostID
    title
  }
}`

export const getAllJobQuery = gql`query GetAllJobPost($limit: Int!, $offset: Int!, $order: orderedBy!) {
  getAllJobPost(limit: $limit, offset: $offset, order: $order) {
    jobPostID
    title
    description
    status
    createdAt
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
    description
    details {
      jobType
    }
  }
}`


export const getRelatedJob = gql`query GetJobRelated($category: String!, $limit: Int!, $offset: Int!) {
  getJobRelated(category: $category, limit: $limit, offset: $offset) {
    jobType
    jobPost {
      jobPostID
      title
    }
  }
}`


export const  getJobFilterSearch = gql`query GetSpecificJob($category: String, $jobType: [String], $workType: [String], $limit: Int!, $offset: Int!) {
  getSpecificJob(category: $category, jobType: $jobType, workType: $workType limit: $limit, offset: $offset) {
    jobDetailsID
    jobPost {
      jobPostID
      title
      description
      details {
            category
            jobType
            workType
      }
    }
  }
}`

export const getAllJobCount = gql`query GetAllCountJob {
  getAllCountJob {
    status
  }
}`


export const getJobChart =gql`query GetGroubyByJob {
  getGroubyByJob {
    _count
    createdAt
  }
}`

export const getAllJobDWMY = gql`query GetGroubyByJob($select: String!) {
  getJobPostDWMY(select: $select) {
    _count
    createdAt
  }
}`