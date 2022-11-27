export interface applicant {
    application: string
    applicantID: string
    id: string
    email: string
    status: string
    createdAt: string
    applicantProfile: []
    applicantInterviewer: []
    applyJobPost: []
    applicantUpload: []
}

export interface applicantProfile {
    profileID: string
    firstname: string
    lastname: string
}

export interface applyJobPost {
    title: string
}