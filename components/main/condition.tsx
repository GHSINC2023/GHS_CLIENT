import React from 'react'
import styles from '../../styles/components/main/conditions.module.scss'

export default function Condition({ close }: any) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => close(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d02222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <h2>Terms and Condition</h2>
            <p>We are dedicated to helping you find the best job opportunities and guiding you through the application process. Before submitting your job application, please read the following terms and conditions carefully:
            </p>
            <ul>
                <li><b>Job application requirements</b>: You must meet all the requirements stated in the job posting and submit all the necessary documents and information accurately and truthfully.</li>
                <li><b>Application review</b>: We review all job applications and make sure they meet the requirements of the job posting. However, we cannot guarantee that all applications will be accepted or that you will be selected for an interview.</li>
                <li> Communication: We will communicate with you regarding your job application and any updates regarding your status. Please make sure to provide us with accurate and up-to-date contact information.</li>
                <li><b>Confidentiality</b>: We will keep all information you provide us confidential and will only share it with potential employers with your permission. However, we cannot guarantee the confidentiality of information transmitted over the internet.</li>
                <li><b>Fees</b>: Our services are free to job seekers. We are compensated by the companies we work with to fill job openings.</li>
                <li>
                    <b>Job offers</b>: We will inform you of any job offers received from potential employers. You are free to accept or decline any job offers at your own discretion.
                </li>
                <li>
                    <b>Liability</b>: We are not liable for any damages or losses arising from the use of our services, including but not limited to, errors or omissions in job postings, incomplete or inaccurate information provided by potential employers, or any damages resulting from the use of our website.
                </li>
                <li>
                    <b>Changes to terms and conditions</b> : We reserve the right to modify or update these terms and conditions at any time without notice. By using our services, you agree to be bound by the current version of these terms and conditions.

                </li>

                By submitting your job application, you acknowledge that you have read and agree to these terms and conditions. If you have any questions or concerns, please contact us.

            </ul>
        </div>
    )
}
