import React, { FC } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'
import { notificationAllQuery, notificationById } from '../../../../util/notifications/notification.query'
import { client } from '../../../_app'

export const getStaticPaths = async () => {
    const { data: { getAllNotification } } = await client.query({
        query: notificationAllQuery,
    })

    const paths = getAllNotification.map(({ notificationID }: any) => {
        return { params: { id: notificationID } }
    })

    return {
        paths, fallback: false
    }
}

export const getStaticProps = async (context: any) => {
    const getId = context.params.id
    const { data: { getNotificationID } } = await client.query({
        query: notificationById,
        variables: {
            notificationId: getId
        }
    })

    return {
        props: {
            notifications: getNotificationID
        }
    }
}
const Notification: FC = ({ notifications }: any) => {
    return (
        <div>{JSON.stringify(notifications, null, 2)}</div>
    )
}

(Notification as PageWithLayout).layout = Dashboard
export default Notification