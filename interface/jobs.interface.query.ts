export interface JobQuery {
    jobPostID: string
    title: string
    description: string
    details: []
}

export interface details {
    jobDetailsID: string
    jobType: string[]
    location: string[]
    workType: string[]
    salary: string
}


export interface Filter { 
    jobType: string[]
    workType: string[]
    category: string
}