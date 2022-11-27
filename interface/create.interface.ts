export interface CreateJob {
    title: string
    overview: string
    location: string[]
    jobType: string[]
    workType: string[]
    salary: string
    category: string
}

export interface CreateEndorse {
    firstname: string
    lastname: string
    email: string
    phone: string
    birthday: string
    city: string
    province: string
    zipcode: string
    street: string
}
