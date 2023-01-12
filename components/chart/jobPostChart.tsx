import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Bar } from 'react-chartjs-2'
import styles from '../../styles/components/dashboard/overview/ranking.module.scss'
import { getJobChart } from '../../util/job/job.query'
import { format } from 'date-fns'
export default function JobPostChart() {

    const [id, setId] = useState("")


    const { loading, data} = useQuery(getJobChart)



    if(loading) return null



  return (
    <div className={styles.container}>
          <div style={{width: "200px", height: "220px"}}>
      <Bar options={{
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: false,
            grid: {
              display: false
            }
          },
          y: {
            display: false,
            grid: {
              display: false
            },
            
            beginAtZero: true
          }
        }
      }}
      
      data={{datasets: [
        {
          data: data.getGroubyByJob.map(({ _count }: any) => {
            return _count
          }),
          animation: {
            delay: 500,
            easing: "linear",
          },
          backgroundColor: "#edb120"
        },
        
      ], 
      labels: data.getGroubyByJob.map(({ createdAt }: any) => {
        return format(new Date(createdAt), "MMM dd yyyy")
      })
     
    }}
      />
    </div>
    </div>
  )
}
