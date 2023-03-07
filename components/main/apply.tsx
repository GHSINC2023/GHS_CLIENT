import React, { useRef, useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import styles from '../../styles/components/main/application/application.module.scss'
import { createAnApplication } from '../../util/applicaiton/application.mutation';
import Image from 'next/image'
import { applications } from '../../interface/application.interface';
import Message from '../message/message';
import OTPS from './OTP/otp';
import { createOTPS } from '../../util/OTP/otp.mutation';

export default function Apply({ jobid, close, open }: any) {

    const [ fileUpload, setFileUpload ] = useState(null)
    const [ videoUpload, setVideoUpload ] = useState(null)
    const [ otps, setOTP ] = useState(false)




    const [ message, setMessage ] = useState(false)

    const fileRef = useRef<HTMLInputElement>(null)
    const videoRef = useRef<HTMLInputElement>(null)



    const onClickFile = () => {
        fileRef.current?.click()
    }

    const onClickVideoFile = () => {
        videoRef.current?.click()
    }

    const [ applications, setApplications ] = useState<applications>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "" as unknown as number,
        bday: "",
        street: "",
        city: "",
        province: "",
        zipcode: "" as unknown as number
    })


    const [ application, { data, error } ] = useMutation(createAnApplication)
    const handleApplicationClosed = () => {
        close(() => !open)
    }

    const [ createNewOTP ] = useMutation(createOTPS, {
        variables: {
            email: applications.email
        }
    })

    const applicaitonForm = (e: any) => {
        application({
            variables: {
                jobPostId: jobid,
                email: applications.email,
                profile: {
                    birthday: applications.bday,
                    firstname: applications.firstname,
                    lastname: applications.lastname,
                    phone: `+630${applications.phone}`
                },
                address: {
                    city: applications.city,
                    province: applications.province,
                    street: applications.street,
                    zipcode: applications.zipcode.toString()
                },
                file: fileUpload,
                video: videoUpload
            },
            onCompleted: data => {
                setMessage(true)
                close(() => false)
                setApplications({
                    bday: "",
                    city: "",
                    email: "",
                    firstname: "",
                    lastname: "",
                    phone: "" as unknown as number,
                    province: "",
                    street: "",
                    zipcode: "" as unknown as number
                })
                setFileUpload(null);
                setVideoUpload(null)
            },
            onError: err => {
                setMessage(true)
            },

        })
    }
    const onChangeFileUpload = (e: any) => {
        const file = e.target.files[ 0 ]


        if (!file) return



        if (file?.size > 10485760 || !file) {
            alert("File size exceed 2MB")
            return
        }
        if (file?.type !== "application/pdf") {
            alert("Attach PDF only")
            return
        }


        setFileUpload(file)

    }





    const onClickVideoUpload = (e: any) => {
        const video = e.target.files[ 0 ]

        if (!video) return

        if (video?.size > 2097152 || !video) {
            alert("File size is exceed 10MB")
            return
        }


        setVideoUpload(video)
    }


    useEffect(() => {
        if (videoRef.current?.contains(null)) {
            videoRef.current.value = ''
        }
        setTimeout(() => {
            setMessage(false)
        }, 1500)
    }, [ message ])




    return (
        <div className={styles.container}>
            <div className={styles.applicationHeader}>
                <h2>Job Application</h2>
                <button onClick={handleApplicationClosed}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            {otps ? <div className={styles.otps}>
                <OTPS email={applications.email} applicantForm={applicaitonForm} close={setOTP} />
            </div> : null}
            {data && message ?
                <div className={styles.message}>
                    <Message label={'Successfully Created'} message={''} status={'success'} />
                </div> : null}
            {error && message ?
                <div className={styles.message}>
                    <Message label={"Error Occurred"} message={''} status={"error"} />
                </div> : null}
            <form>
                <div className={styles.profile}>
                    <h2>Personal Information</h2>
                    <input type="text" value={applications.firstname}
                        onChange={e => setApplications({ ...applications, firstname: e.target.value })}
                        placeholder='Firstaname' />
                    <input type="text"
                        value={applications.lastname}
                        onChange={e => setApplications({ ...applications, lastname: e.target.value })}
                        placeholder='Lastname' />
                    <input type="Email"
                        value={applications.email}
                        onChange={e => setApplications({ ...applications, email: e.target.value })}
                        placeholder='Email Address' />
                    <input type="tel"
                        value={applications.phone}
                        inputMode='numeric'
                        onChange={e => {
                            setApplications({ ...applications, phone: parseInt(e.target.value) })

                            if (isNaN(parseInt(e.target.value))) {
                                setApplications({ ...applications, phone: "" as unknown as number })
                            }

                        }}
                        maxLength={10} placeholder="9123456789" />
                    <input type="date"
                        value={applications.bday}
                        onChange={e => setApplications({ ...applications, bday: e.target.value })}
                    />
                </div>
                <div className={styles.address}>
                    <h2>Address</h2>
                    <input type="text"
                        value={applications.street}
                        onChange={e => setApplications({ ...applications, street: e.target.value })}
                        placeholder='Street' />
                    <input type="text"
                        value={applications.city}
                        onChange={e => setApplications({ ...applications, city: e.target.value })}
                        placeholder='City' />
                    <input type="text" value={applications.province}
                        onChange={e => setApplications({ ...applications, province: e.target.value })}
                        placeholder='Province' />
                    <input type="text"
                        value={applications.zipcode}
                        onChange={e => {
                            setApplications({ ...applications, zipcode: parseInt(e.target.value) })

                            if (isNaN(parseInt(e.target.value))) {
                                setApplications({ ...applications, zipcode: "" as unknown as number })

                            }
                        }}
                        maxLength={4} placeholder="Zipcode" />
                </div>
                <div className={styles.resume}>
                    <h2>Upload your resume</h2>
                    <span>Maximum file is 2mb</span>
                    <input ref={fileRef} type="file" accept='application/pdf' multiple hidden onClick={onChangeFileUpload} onChange={onChangeFileUpload} />


                    <div className={styles.containerResume} onClick={onClickFile}>
                        <Image src="/icon/file-plus-line.svg" alt="" height={25} width={25} />
                        <span>{fileUpload ? fileUpload?.name : "Upload your Resume"}</span>
                    </div>


                    {
                        fileUpload ? <div className={styles.removeBtn}>
                            <button type="button" onClick={() => setFileUpload(() => null)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path stroke="#d02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M9 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
                                </svg>
                            </button>
                        </div> : null
                    }
                </div>
                {/*  */}
                <div className={styles.video}>
                    <h2>Upload your Video</h2>
                    <span>Introduce yourself not exceeding 20 seconds. The video and must not exceed 10MB.</span>
                    <input ref={videoRef} type="file" accept="video/*" hidden multiple onChange={onClickVideoUpload} onClick={onClickVideoUpload}
                    />

                    <div onClick={onClickVideoFile} className={styles.containerResume}>
                        <Image src="/icon/video-plus-line.svg" alt="" height={30} width={30} />
                        <span>{videoUpload ? videoUpload?.name : "Upload your video"} </span>
                    </div>

                    {videoUpload ? <div className={styles.removeBtn}>
                        <button type="button" onClick={() => {

                            setVideoUpload(() => null)

                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path stroke="#d02222" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M9 7v0a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v0M9 7h6M9 7H6m9 0h3m2 0h-2M4 7h2m0 0v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
                            </svg>
                        </button>
                    </div> : null}
                </div>





                <button
                    className={styles.applybtn}
                    onClick={(e) => {
                        setOTP(() => !otps)
                        e.preventDefault()
                        createNewOTP()
                    }}
                    disabled={!applications.bday || !applications.city || !applications.email || !applications.firstname || !applications.lastname || !applications.phone || !applications.province || !applications.street || !applications.zipcode ||
                        !fileUpload || !videoUpload
                    }

                    type='button'>Submit</button>
            </form >
        </div >
    )
}
