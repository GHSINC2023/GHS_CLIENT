import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import styles from '../../../../styles/components/dashboard/settings/user.settings.module.scss'
import Image from 'next/image'

function useWindowSize() {
    const [ windowSize, setWindowSize ] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {

        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }


        window.addEventListener("resize", handleResize);


        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}
export default function User({ userid }: any) {

    const size = useWindowSize()


    const [ tab, setTab ] = useState("email")

    const [ mob, setMobile ] = useState(false)
    const [ userEmail, setUserEmail ] = useState({
        email: "",
        retype: ""
    })

    const [ passwordUser, setUserPassword ] = useState({
        password: "",
        retype: ""
    })

    const [ profile, setUserProfile ] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        birthday: ""
    })

    const [ address, setUserAddress ] = useState({
        city: "",
        province: "",
        zipcode: "",
        street: ""
    })
    const sideLink = [
        { name: "Email", value: "email" },
        { name: "Password", value: "password" },
        { name: "Profile", value: "profile" },
        { name: "Activity Logs", value: "logs" }
    ]

    const changeSidebarValue = (e: any) => {
        setTab(e.target.value)
    }
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                {sideLink.map(({ value, name, }) => (
                    <button onClick={changeSidebarValue} key={name} value={value}>{name}</button>
                ))}
            </div>
            <div className={styles.tab}>
                {size.width > 700 ? null : <div className={styles.mobile}>
                    <div className={styles.mobileNav}>
                        <button onClick={() => setMobile(() => !mob)}>
                            <Image src="/dashboard/menu.svg" alt="" height={25} width={25} />
                        </button>
                    </div>
                    {mob ? <div className={styles.links}>
                        {sideLink.map(({ name, value }) => (
                            <button onClick={changeSidebarValue} key={name} value={value}>{name}</button>
                        ))}
                    </div> : null}
                </div>}
                {tab === "email" ?
                    <div className={styles.userContainer}>
                        <h2>Change Email Address</h2>
                        <form>
                            <input type="email" placeholder='Email Address' />
                            <input type="email" placeholder='Re-type Email Address' />
                            <button type="submit">
                                Update
                            </button>
                        </form>
                    </div> : null}

                {tab === "password" ?
                    <div className={styles.userContainer}>
                        <h2>Password</h2>
                        <form>
                            <input type="password" placeholder='New Password' />
                            <input type="password" placeholder='Re-type Password' />
                            <button type="submit">
                                Update
                            </button>
                        </form>
                    </div>
                    : null}

                {tab === "profile" ?
                    <div className={styles.userContainer}>
                        <div>
                            <h2>Profile</h2>
                            <form>
                                <input type="text" placeholder='Firstname' />
                                <input type="text" placeholder='Lastname' />
                                <input type="text" placeholder='Phone' />
                                <input type="date" placeholder='Birthday' />
                                <button type="submit">
                                    Update
                                </button>
                            </form>
                        </div>
                        <div>
                            <h2>Address</h2>
                            <form>
                                <input type="text" placeholder='Street' />
                                <input type="text" placeholder='City' />
                                <input type="text" placeholder='Province' />
                                <input type="text" placeholder='Zipcode' />
                                <button type="submit">
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                    : null}
            </div>
        </div>
    )
}
