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
        phone: "",
        bday: "",
        street: "",
        city: "",
        province: "",
        zipcode: ""
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
                    phone: `+63${applications.phone}`
                },
                address: {
                    city: applications.city,
                    province: applications.province,
                    street: applications.street,
                    zipcode: applications.zipcode
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
                    phone: "",
                    province: "",
                    street: "",
                    zipcode: ""
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
        console.log(file)
        if (file.size > 10485760 || !file) {
            alert("File exceed on 2MB")
        }
        if (file.type !== "application/pdf") {
            alert("PDF Only")
            return
        }
        setFileUpload(file)
    }
    const onChangeVideoUpload = (e: any) => {
        const video = e.target.files[ 0 ]
        if (video.size > 1e+7 || !video) {
            alert("Video is exceed in 10MB")
            return
        }
        setVideoUpload(video)
    }


    useEffect(() => {
        setTimeout(() => {
            setMessage(false)
        }, 15000)
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
                <OTPS email={applications.email} applicantForm={applicaitonForm} />
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
                        onChange={e => setApplications({ ...applications, phone: e.target.value })}
                        maxLength={12} placeholder="09123456789" />
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
                        onChange={e => setApplications({ ...applications, zipcode: e.target.value })}
                        maxLength={4} placeholder="Zipcode" />
                </div>
                <div className={styles.resume}>
                    <h2>Upload your resume</h2>
                    <span>Maximum file is 2mb</span>
                    <input ref={fileRef} type="file" accept='application/pdf' hidden onChange={onChangeFileUpload} />
                    <div onClick={onClickFile} className={styles.containerResume}>
                        <Image src="/icon/file-plus-line.svg" alt="" height={25} width={25} />
                        <span>{fileUpload ? "Upload Successfully" : " Upload your resume here."}</span>
                    </div>
                </div>
                <div className={styles.video}>
                    <h2>Upload your Video</h2>
                    <span>Maximum file is 10mb</span>
                    <span>Maximum of 20 seconds</span>
                    <input ref={videoRef} type="file" accept="video/mp4" hidden onChange={onChangeVideoUpload} />
                    <div onClick={onClickVideoFile} className={styles.containerResume}>
                        <Image src="/icon/video-plus-line.svg" alt="" height={30} width={30} />
                        <span>{videoUpload ? "Upload Successfully" : " Upload your resume here."}</span>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        setOTP(() => !otps)
                        e.preventDefault()
                        createNewOTP()
                    }}
                    disabled={!applications.bday || !applications.city || !applications.email || !applications.firstname || !applications.lastname || !applications.phone || !applications.province || !applications.street || !applications.zipcode ||
                        !fileUpload || !videoUpload
                    }

                    type='button'>Submit</button>
            </form>
        </div>
    )
}
