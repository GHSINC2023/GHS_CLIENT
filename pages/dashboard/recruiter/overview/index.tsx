import React, { FC } from 'react'
import Dashboard from '../../../../layout/dashboard.layout'
import PageWithLayout from '../../../../layout/page.layout'

const Recruiter: FC = () => {
    return (
        <div>Recruiter</div>
    )
}


(Recruiter as PageWithLayout).layout = Dashboard

export default Recruiter