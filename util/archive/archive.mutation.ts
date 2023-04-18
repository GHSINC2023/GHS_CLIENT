import { gql } from '@apollo/client'


export const createArchiveJob = gql`mutation Mutation($jobPostId: ID!) {
    createJobPostArchive(jobPostID: $jobPostId) {
      archiveID
      createdAt
      type
      status
    }
  }`