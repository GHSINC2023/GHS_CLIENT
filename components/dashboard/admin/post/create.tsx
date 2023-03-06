import React, { useState, useEffect } from 'react'
import styles from '../../../../styles/components/dashboard/post/create.module.scss'
import dynamic from 'next/dynamic'
import { CreateJob } from '../../../../interface/create.interface'
import { useMutation } from '@apollo/client'
import { JobCreateMutation } from '../../../../util/job/job.mutation'
import Head from 'next/head'
import Image from 'next/image'
import { jobType, workType, category } from '../../../../util/values/filter'
import Message from '../../../message/message'

const Qualifications = dynamic(() => import("../../rich/qualification"), {
    ssr: false
})

const Responsibilties = dynamic(() => import("../../rich/responsibilities"), {
    ssr: false
})


export default function Create({ userid, close }: any) {

    const [ responsibilities, setResponsibilities ] = useState("")
    const [ qualifications, setQualification ] = useState("")
    const [ message, setMessage ] = useState(false)


    const [ create, setCreate ] = useState<CreateJob>({
        title: "",
        category: "",
        overview: "",
        location: [],
        jobType: [],
        workType: [],
        salary: ""
    })

    const [ job, setJob ] = useState(false)
    const [ work, setWork ] = useState(false)
    const [ categ, setCateg ] = useState(false)


    const onSplit = (e: any) => {
        let getAllLocation = [ ...create.location, e.target.value ]
        if (e.key === "Enter" && e.ctrlKey) {
            setCreate({ ...create, location: getAllLocation })
            e.target.value = ""
        }
    }

    const jobOnClick = () => {
        setJob(() => !job)
    }


    const workOnClick = () => {
        setWork(() => !work)
    }

    const categoryOnClick = () => {
        setCateg(() => !categ)
    }

    const getJobType = (e: any) => {
        let listJobType = [ ...create.jobType, e.target.value ]
        if (create.jobType.includes(e.target.value)) {
            listJobType = create.jobType.filter(job => job !== e.target.value)
        }
        setCreate({ ...create, jobType: listJobType })
    }
    const getWorkType = (e: any) => {
        let listWorkType = [ ...create.workType, e.target.value ]
        if (create.workType.includes(e.target.value)) {
            listWorkType = create.workType.filter(work => work !== e.target.value)
        }

        setCreate({ ...create, workType: listWorkType })
    }

    const onChangeCategory = (e: any) => {
        setCreate({ ...create, category: e.target.value })
    }

    const [ jobPost, { data } ] = useMutation(JobCreateMutation)
    const formSubmit = (e: any) => {
        e.preventDefault()
        jobPost({
            variables:
            {
                jobPost: {
                    title: create.title,
                    description: create.overview,
                    qualification: qualifications,
                    responsibilities: responsibilities
                },
                jobDetails: {
                    location: create.location,
                    salary: create.salary,
                    workType: create.workType,
                    category: create.category,
                    jobType: create.jobType
                },
                userId: userid,
            },
            onCompleted: (data) => {

                setMessage(true)
                setResponsibilities: "";
                setQualification: "";
                setCreate({
                    category: "",
                    jobType: [],
                    location: [],
                    overview: "",
                    salary: "",
                    title: "",
                    workType: [],
                })

            },
            onError: (error) => {
                alert()
                console.log(error.message)
            }

        })
    }

    useEffect(() => {
        if (message === true) {
            setTimeout(() => {
                setMessage(false)
            }, 1000)
        }
    }, [ message ])

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Job Post</title>
            </Head>

            <div className={styles.formContainer}>
                {
                    data && message ?
                        <div className={styles.message}>
                            <Message status='success' label='Successfully Created' message='You have successfully created an Job Post' />
                        </div> :
                        null
                }
                <form>
                    <div className={styles.header}>
                        <h2>Create Post</h2>
                        <button onClick={() => close(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <input type="text" value={create.title} onChange={e => setCreate({ ...create, title: e.target.value })} placeholder='Title' />
                    <div className={styles.locationsekey}>
                        {create.location.map((name) => (
                            <div className={styles.spanContainer} key={name} >
                                <span>{name}</span>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    let locList = [ ...create.location, name ]
                                    if (locList.includes(name)) {
                                        locList = locList.filter(tags => tags !== name)
                                    }
                                    setCreate({ ...create, location: locList })
                                }}>
                                    <Image src="/dashboard/x.svg" alt="close" height={20} width={20} />
                                </button>
                            </div>
                        ))}

                    </div>
                    <input type="text" placeholder='Enter a location  CTRL + ENTER' onKeyDown={onSplit} />
                    <textarea value={create.overview} onChange={e => setCreate({ ...create, overview: e.target.value })} placeholder="Type here..."></textarea>
                    <div className={styles.btnDiv}>
                        <div className={styles.div}>
                            <span>Job Type</span>
                            {create.jobType.map((val) => (
                                <div key={val} className={styles.values}>
                                    <span >{val}</span>
                                    <button onClick={e => {
                                        e.preventDefault()
                                        let jobList = [ ...create.jobType, val ]
                                        if (jobList.includes(val)) {
                                            jobList = jobList.filter(tags => tags !== val)
                                        }
                                        setCreate({ ...create, jobType: jobList })
                                    }}
                                    >
                                        <Image src="/dashboard/x.svg" alt="close" height={15} width={15} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Image onClick={jobOnClick} src="/dashboard/caret.svg" height={20} width={20} alt="caret" />
                    </div>
                    {job ? <div className={styles.options}>
                        {jobType.map((name) => (
                            <button onClick={getJobType} type="button" key={name} value={name}>{name}</button>
                        ))}
                    </div> : null}
                    <div className={styles.btnDiv}>
                        <div className={styles.div}>
                            <span>Work Type</span>
                            {create.workType.map((val) => (
                                <div key={val} className={styles.values}>
                                    <span >{val}</span>
                                    <button onClick={e => {
                                        e.preventDefault()
                                        let workList = [ ...create.workType, val ]
                                        if (workList.includes(val)) {
                                            workList = workList.filter(tags => tags !== val)
                                        }
                                        setCreate({ ...create, workType: workList })
                                    }}
                                    >
                                        <Image src="/dashboard/x.svg" alt="close" height={15} width={15} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Image onClick={workOnClick} src="/dashboard/caret.svg" height={20} width={20} alt="caret" />
                    </div>
                    {work ? <div className={styles.options}>
                        {workType.map((name) => (
                            <button onClick={getWorkType} type="button" key={name} value={name}>{name}</button>
                        ))}
                    </div> : null}
                    <div className={styles.btnDiv}>
                        <div className={styles.div}>
                            <span>Category</span>
                            {create.category ? <div className={styles.values}>
                                <span> {create.category}</span>
                                <button onClick={e => {
                                    e.preventDefault()
                                    setCreate({ ...create, category: "" })
                                }}>
                                    <Image src="/dashboard/x.svg" alt="close" height={15} width={15} />
                                </button>
                            </div> : null}
                        </div>
                        <Image onClick={categoryOnClick} src="/dashboard/caret.svg" height={20} width={20} alt="caret" />
                    </div>
                    {categ ? <div className={styles.options}>
                        {category.map((name) => (
                            <button onClick={onChangeCategory} type="button" key={name} value={name}>{name}</button>
                        ))}
                    </div> : null}
                    <input type="text" placeholder='Salary' value={create.salary} onChange={e => setCreate({ ...create, salary: e.target.value })} />
                    <label>Qualification</label>
                    <Qualifications data={data} value={qualifications} setValue={setQualification} />
                    <label>Responsibilities</label>
                    <Responsibilties data={data} value={responsibilities} setValue={setResponsibilities} />
                    <button
                        disabled={
                            !create.category || !create.salary || create.jobType.length === 0 || !create.overview || create.workType.length === 0 ||
                            !create.title || !responsibilities || !qualifications || create.location.length === 0
                        }
                        onClick={formSubmit} className={styles.submit}>Submit
                    </button>
                </form>
            </div >
        </div >
    )
}

