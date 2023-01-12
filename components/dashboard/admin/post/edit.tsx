import React, { useState, useEffect } from 'react'
import { Details, EditJob, EditProps } from '../../../../interface/edit.interface'
import { useMutation } from '@apollo/client'
import { updateJobPostMutation } from '../../../../util/job/job.mutation'
import Image from 'next/image'
import styles from '../../../../styles/components/dashboard/post/edit.module.scss'
import Message from '../../../message/message'
import { workType, jobType, category } from '../../../../util/values/filter'
import dynamic from 'next/dynamic'
const Qualification = dynamic(() => import('../../rich/qualification'), {
    ssr: false
})
const Responsibilties = dynamic(() => import('../../rich/responsibilities'
), {
    ssr: false
})

export default function Edit({ title, description, id, details, responsibilities, qualification, open, close }: any) {

    const detail = (details as Details[]).map(({ location, jobType, workType, salary, category }: Details) => {
        return {
            location, jobType, workType, salary, category
        }
    })

    const [ update, setUpdated ] = useState<EditProps>({
        title: title,
        overview: description,
        location: detail[ 0 ].location.map(name => {
            return name
        }),
        jobType: detail[ 0 ].jobType.map(name => {
            return name
        }),
        workType: detail[ 0 ].workType.map(name => {
            return name
        }),
        category: detail[ 0 ].category,
        salary: detail[ 0 ].salary

    })

    const [ updateJobPost, { data } ] = useMutation(updateJobPostMutation)

    const [ qualifications, setQualification ] = useState(qualification)
    const [ responsibilitie, setResponsibilities ] = useState(responsibilities)
    const [ message, setMessage ] = useState(false)

    const [ job, setJob ] = useState(false)
    const [ work, setWork ] = useState(false)
    const [ categ, setCateg ] = useState(false)

    const onSplit = (e: any) => {
        let getAllLocation = [ ...update.location, e.target.value ]
        if (e.key === "Enter" && e.ctrlKey) {
            setUpdated({ ...update, location: getAllLocation })
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
        let listJobType = [ ...update.jobType, e.target.value ]
        if (update.jobType.includes(e.target.value)) {
            listJobType = update.jobType.filter(job => job !== e.target.value)
        }
        setUpdated({ ...update, jobType: listJobType })
    }
    const getWorkType = (e: any) => {
        let listWorkType = [ ...update.workType, e.target.value ]
        if (update.workType.includes(e.target.value)) {
            listWorkType = update.workType.filter(work => work !== e.target.value)
        }

        setUpdated({ ...update, workType: listWorkType })
    }

    const onChangeCategory = (e: any) => {
        setUpdated({ ...update, category: e.target.value })
    }


    const formSubmit = (e: any) => {
        e.preventDefault()
        updateJobPost({
            variables: {
                jobPostId: id,
                jobPost: {
                    title: update.title,
                    description: update.overview,
                    qualification: qualifications,
                    responsibilities: responsibilities
                },
                jobDetails: {
                    location: update.location,
                    salary: update.salary,
                    workType: update.workType,
                    jobType: update.jobType,
                    category: update.category
                },
            },
            onCompleted: data => {
                if (data) {
                    console.log(data)
                    setMessage(true)
                }
            },
            onError: error => {
                console.log(error.message)
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        })
    }, [ message ])

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                {
                    data && message ?
                        <div className={styles.message}>
                            <Message status={"success"} label='Successfully Updated' message='You have successfully Updated an Job Post' />
                        </div> :
                        null
                }

                <form>
                    <div className={styles.editPost}>
                        <h2>Edit Post</h2>
                        <button type='button' onClick={() => close(() => !open)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <input type="text" defaultValue={title} onChange={e => setUpdated({ ...update, title: e.target.value })} placeholder='Title' />
                    <div className={styles.locationsekey}>
                        {update.location.map((name) => (
                            <div className={styles.spanContainer} key={name} >
                                <span>{name}</span>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    let locList = [ ...update.location, name ]
                                    if (locList.includes(name)) {
                                        locList = locList.filter(tags => tags !== name)
                                    }
                                    setUpdated({ ...update, location: locList })
                                }}>
                                    <Image src="/dashboard/x.svg" alt="close" height={20} width={20} />
                                </button>
                            </div>
                        ))}

                    </div>
                    <input type="text" placeholder='Enter a location  CTRL + ENTER' onKeyDown={onSplit} />
                    <textarea defaultValue={update.overview} onChange={e => setUpdated({ ...update, overview: e.target.value })} placeholder="Type here..."></textarea>
                    <div className={styles.btnDiv}>
                        <div className={styles.div}>
                            <span>Job Type</span>
                            {update.jobType.map((val) => (
                                <div key={val} className={styles.values}>
                                    <span >{val}</span>
                                    <button onClick={e => {
                                        e.preventDefault()
                                        let jobList = [ ...update.jobType, val ]
                                        if (jobList.includes(val)) {
                                            jobList = jobList.filter(tags => tags !== val)
                                        }
                                        setUpdated({ ...update, jobType: jobList })
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
                            {update.workType.map((val) => (
                                <div key={val} className={styles.values}>
                                    <span >{val}</span>
                                    <button onClick={e => {
                                        e.preventDefault()
                                        let workList = [ ...update.workType, val ]
                                        if (workList.includes(val)) {
                                            workList = workList.filter(tags => tags !== val)
                                        }
                                        setUpdated({ ...update, workType: workList })
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
                            {update.category ? <div className={styles.values}>
                                <span> {update.category}</span>
                                <button onClick={e => {
                                    e.preventDefault()
                                    setUpdated({ ...update, category: "" })
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
                    <input type="text" placeholder='Salary' value={update.salary} onChange={e => setUpdated({ ...update, salary: e.target.value })} />
                    <label>Qualification</label>
                    <Qualification value={qualifications} setValue={setQualification} />
                    <label>Responsibilities</label>
                    <Responsibilties value={responsibilitie} setValue={setResponsibilities} />
                    <button
                        onClick={formSubmit} className={styles.submit}>Submit
                    </button>
                </form>
            </div >
        </div >
    )
}
