import React, { FC } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'

const Overview: FC = () => {
    return (
        <div>Overview</div>
    )
}


(Overview as PageWithLayout).layout = Dashboard
export default Overview