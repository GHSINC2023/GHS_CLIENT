export const roles = [
    { name: "Administrator", value: "administrator" },
    { name: "Manager", value: "manager" },
    { name: "Moderator", value: "moderator" },
    { name: "Recruiter", value: "recruiter" },
    { name: "Employer", value: "employer" }
]

export const MR = [

    { name: "Manager", value: "manager" },
    { name: "Moderator", value: "moderator" },
    { name: "Recruiter", value: "recruiter" },
]


export const mod = [
    { name: "Moderator", value: "moderator" },
    { name: "Recruiter", value: "recruiter" },
]

export const OrderDate = [
    { name: "Newest", value: "desc" },
    { name: "Oldest", value: "asc" },
]

export const limits = [ 10, 20, 30, 40, 50 ]

export const status = [
    {
        name: "In Progress", value: "inProgress"
    },
    {
        name: "Approved", value: "approved"
    },
    {
        name: "Declined", value: "declined"
    }
]

export const statused = [
    { name: "Declined", value: "declined" },
    { name: "Approved", value: "approved" }
]

export const CSVStatused = [
    { name: "Waiting", value: "waiting" },
    { name: "Declined", value: "declined" },
    { name: "Approved", value: "approved" }
]

export const applicantsStatus = [
    { name: "Waiting", value: "waiting" },
    { name: "Approved", value: "approved" },
    { name: "Declined", value: "declined" }
]

export const JobStatus = [
    { name: "Waiting", value: "inProgress" },
    { name: "Approved", value: "approved" },
    { name: "Declined", value: "declined" }
]


export const jobType = [
    "Consultant", "Contract", "Freelance", "Full-Time", "OJT / Internship", "Part-Time"
]

export const workType = [
    "Hybrid", "OnSite", "Work From Home"
]

export const category = [
    "Accounting and Finance",
    "Administration and Coordination",
    "Administrative Staff",
    "Agriculture",
    "Architecture / Engineering / Construction ",
    "Arts and Sports",
    "Aviation",
    "Biotechnology / Chemical",
    "Business Consulting and Services",
    "Conglomerate",
    "Customer Service",
    "Customer Support",
    "Education and Training",
    "Electronics / Automotive Engineering",
    "Entertainment",
    "Food and Beverages",
    "General Services",
    "Geology / Geophysics",
    "Healthcare and Medical",
    "Hospitality and Tourism",
    "Human Resources",
    "Information Technology and Software",
    "Journalist / Editors",
    "Law and Legal Services",
    "Logistic / Supply Chain",
    "Management and Consultancy",
    "Manufacturing and Production",
    "Media and Creatives",
    "Public Service and NGOs",
    "Retail",
    "Safety and Security",
    "Sales and Marketing",
    "Sciences",
    "Writing and Content",
    "Others"

]



export const endorsement_status: string[] = [ "Active", "Final/Ops Interview", "Employed", "Hired", "Near Hire", "Follow-up", "Rescheduled", "Endorsed", "Terminated", "Not Qualified", "Failed - No Re-endorsement", "Backed-out", "Failed/Re-endorsed", "No Show", "Decline Offer", "No Call", "No Answer", "Not Eligible", "TCBR", "CBR", "Endorsement Making", "Text Blast", "Re-Invited", "Re-endorsement (No Date)", "Exam/Versant" ]

export const endorsement_statusv2: string[] = [ "Active", "Final/Ops Interview", "Employed", "Hired", "Near Hire", "Follow-up", "Rescheduled", "Endorsed", "Pending", "Terminated", "Not Qualified", "Failed - No Re-endorsement", "Backed-out", "Failed/Re-endorsed", "No show", "Decline Offer", "No Call", "No Answer", "Not Eligible", "TCBR", "CBR", "Endorsement Making", "Text Blast", "Re-Invited", "Re-endorsement (No Date)", "Exam/Versant" ]

export const CSVSort = [
    { name: "Ascending", value: "asc" },
    { name: "Descending", value: "desc" }
]


export const tabs = [
    { name: "Account", value: "account" },
    { name: "Edit Profile", value: "eprof" },
    { name: "Changed Password", value: "cpass" },
    { name: "Change Pin", value: "pin" },
    { name: "Activtiy Log", value: "log" },
]


export const endorseStatused = [
    { name: "Waiting", value: "waiting" },
    { name: "Approved", value: "approved" },
    { name: "Declined", value: "declined" }
]


export const ArchiveTab = [
    { name: "Job Post", value: "post" },
    { name: "Applicants", value: "applicant" },
    { name: "Endorse", value: "endorsed" },
]