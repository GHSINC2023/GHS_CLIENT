import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useQuery } from '@apollo/client'
import styles from '../../styles/components/chart/mainChart.module.scss'
import { filtersDWMY } from '../../util/values/filter'
import { getApplicationDWYMY } from '../../util/applicaiton/application.query'
import { getEndorsementCount } from '../../util/endorse/endorse.query'
import { getAllJobDWMY } from '../../util/job/job.query'
import { format } from 'date-fns'
export default function MainChart() {

  const [DWMY, setDWMY] = useState("day")


  const { loading: loadApp, data: dataApp  } = useQuery(getApplicationDWYMY, {
    variables: {
      select: DWMY
    }
  })

  const { loading: loadEndorse, data: dataEndorse} = useQuery(getEndorsementCount, {
    variables: {
      select: DWMY 
    }
  })

  const { loading: loadJob, data: dataJob } = useQuery(getAllJobDWMY, {
    variables: {
      select: DWMY
    }
  })



  if(loadApp || loadEndorse || loadJob) return null
  return (
    <div className={styles.container}>
        <div className={styles.filterDWMY}>
          {filtersDWMY.map(({name, value}) => (
            <button key={name} onClick={(e) => setDWMY(e.currentTarget.value)} value={value}>{name}</button>
          ))}
        </div>
        <div className={styles.chart}>
        <Bar 
          options={{
            scales: {
              x: {
                 display: true,
                //  stacked: true,

              },
              y: {
                display:true,

              },
              
            }
          }}
          data={{
            datasets: [
              {
              data: dataApp.getApplicantByDWMY.map(({ _count, createdAt }: any) => {
                  return {x: format(new Date(createdAt), "MMM dd yyyy"), y: _count}
              }),
                  animation: {
                    delay: 500,
                    easing: "linear",
                  },
                  label: "Applicants",
                  backgroundColor: "#0072bd",
                  
              }, 
              {
                data: dataEndorse.getEndorsementByDWMY.map(({ _count, createdAt }: any) => {
                  return {x: format(new Date(createdAt), "MMM dd yyyy"), y: _count }
                }),
                animation: {
                  delay: 500,
                  easing: "linear",
                },
                label: "Endorsement",
                backgroundColor: "#d95319",
              },  
              {
                data: dataJob.getJobPostDWMY.map(({ _count, createdAt }: any) => {
                  return {x: format(new Date(createdAt), "MMM dd yyyy"), y: _count }
                }),
                animation: {
                  delay: 500,
                  easing: "linear",
                },
                label: "Post",
                backgroundColor: "#edb120",
              }
            ],
          }}    
        />
        </div>
    </div>
  )
}
