export interface EditJob {
    id: string
    title: string
    description: string
    qualification: string
    responsiblities: string
    details: []
    open: any
    close: any
}


export interface Details {
    jobDetailsID?: any
    location: string[]
    jobType: string[]
    workType: string[]
    salary: string
    category: string
}

export interface EditProps {
    title: string
    overview: string
    location: string[]
    jobType: string[]
    workType: string[]
    salary: string
    category: string
}