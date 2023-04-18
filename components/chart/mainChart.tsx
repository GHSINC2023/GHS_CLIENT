import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useQuery } from '@apollo/client'
import styles from '../../styles/components/chart/mainChart.module.scss'
import { getApplicationDWYMY } from '../../util/applicaiton/application.query'
import { getEndorsementCount } from '../../util/endorse/endorse.query'
import { getAllJobDWMY } from '../../util/job/job.query'
import { format, subDays } from 'date-fns'
export default function MainChart() {

  const [ DWMY, setDWMY ] = useState("day")
  const [ start, setStart ] = useState(format(new Date(subDays(Date.now(), 7),), "yyyy-MM-dd"))
  const [ end, setEnd ] = useState(format(new Date(Date.now()), "yyyy-MM-dd"))

  const { loading: loadApp, data: dataApp } = useQuery(getApplicationDWYMY, {
    variables: {
      start: start,
      end: end
    }
  })

  const { loading: loadEndorse, data: dataEndorse } = useQuery(getEndorsementCount, {
    variables: {
      start: start,
      end: end
    }
  })

  const { loading: loadJob, data: dataJob } = useQuery(getAllJobDWMY, {
    variables: {
      start: start,
      end: end
    }
  })



  if (loadApp || loadEndorse || loadJob) return null
  return (
    <div className={styles.container}>
      <div className={styles.filterDWMY}>
        <div className={styles.dateCon}>
          <label>Start: </label>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>
        <div className={styles.dateCon}>
          <label>End: </label>
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </div>
      <div className={styles.chart}>
        <Bar
          options={{
            plugins: {

            },
            devicePixelRatio: 10,
            scales: {
              x: {
                display: true,

              },
              y: {
                display: true,

              },
            }
          }}
          data={{
            datasets: [
              {
                data: dataApp.getApplicantByDWMY.map(({ _count, createdAt }: any) => {
                  return { x: format(new Date(createdAt), "MMM dd yyyy"), y: _count }
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
                  return { x: format(new Date(createdAt), "MMM dd yyyy"), y: _count }
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
                  return { x: format(new Date(createdAt), "MMM dd yyyy"), y: _count }
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
