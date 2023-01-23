import React from 'react'
import styles from "../../../../styles/components/dashboard/settings/account.module.scss";
import { getUserProfile } from '../../../../util/account/profile.query';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
export default function Account({ userid }: any) {


    const { loading, data } = useQuery(getUserProfile, {
        variables: {
            userId: userid
        },

    })
    return (
        <div className={styles.container}>
            {loading ? null : data.getUserByID.map(({ userID, email, profile }: any) => (
                <div className={styles.userCon} key={userID}>
                    {profile.map(({ profileID, firstname, lastname, birthday, profileAddress }: any) => (
                        <div key={profileID} className={styles.profile}>
                            <div className={styles.pf}>
                                <h2>Account Overview</h2>
                                <div className={styles.p}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Name</th>
                                                <td>{firstname} {lastname}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{email}</td>
                                            </tr>
                                            <tr>
                                                <th>Birthday</th>
                                                <td>{format(new Date(birthday), "MMMM dd, yyyy")}</td>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                {profileAddress.map(({ addressID, street, city, province, zipcode }: any) => (
                                                    <td key={addressID}>{street}, {city}, {province}, {zipcode}</td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
