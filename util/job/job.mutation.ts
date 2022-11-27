import { gql } from '@apollo/client'


export const JobCreateMutation = gql`
    mutation createAJobForAMM(
      $jobPost: JobPostInput
      $jobDetails: jobDetailsInput
      $userId: ID!
    ) {
      createAJobForAMM(
        JobPost: $jobPost
        JobDetails: $jobDetails
        userID: $userId
      ) {
        jobPostID
        title
        description
        qualification
        responsibilities
        status
        createdAt
        updatedAt
        details {
          jobDetailsID
          location
          jobType
          workType
          category
          salary
        }
      }
    }
`


export const jobStatusMutation = gql`mutation Mutation($jobPostId: ID!, $status: jobStatus) {
    updateJobPostStatus(jobPostID: $jobPostId, status: $status) {
      jobPostID
      title
      description
      qualification
      responsibilities
      status
      createdAt
      updatedAt
    }
  }`


export const updateJobPostMutation = gql`
mutation Mutation($jobPostId: ID!, $jobPost: JobPostInput, $jobDetails: jobDetailsInput) {
  updateJobPost(jobPostID: $jobPostId, JobPost: $jobPost, JobDetails: $jobDetails) {
    jobPostID
    title
    description
    qualification
    responsibilities
    status
    createdAt
    updatedAt
    details {
      location
      jobType
      workType
      category
      salary
    }
  }
}
`

export const jobDeleteMutation = gql`mutation Mutation($jobPostId: ID!) {
  deleteJobPost(jobPostID: $jobPostId) {
    jobPostID
    title
    description
    qualification
    responsibilities
    status
    createdAt
    updatedAt
  }
}`


export const JobCreateRecruiter = gql`
  mutation Mutation($userId: ID!, $jobPost: JobPostInput, $jobDetails: jobDetailsInput) {
  createAJobForRecruiter(userID: $userId, JobPost: $jobPost, JobDetails: $jobDetails) {
    title
    responsibilities
    qualification
    description
    createdAt
    details {
      jobDetailsID
      jobType
      location
      salary
      workType
      category
    }
  }
}
`