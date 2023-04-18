import { gql } from '@apollo/client'


export const createArchiveJob = gql`mutation Mutation($jobPostId: ID!) {
    createJobPostArchive(jobPostID: $jobPostId) {
      archiveID
      createdAt
      type
      status
    }
  }`


export const deleteArchive = gql`mutation DeleteArchive($archiveId: ID!) {
  deleteArchive(archiveID: $archiveId) {
    archiveID
  }
}`