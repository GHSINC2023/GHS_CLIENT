import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { CategoryScale, Chart as Chartjs, Legend, BarElement, LinearScale, PointElement, Title, Tooltip, LineElement } from 'chart.js/auto'
import { useQuery } from '@apollo/client'
import { getApplicationByDate } from '../../util/applicaiton/application.query'
import { format } from 'date-fns'

Chartjs.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)



export default function OverviewChart() {



  const { loading, data, error } = useQuery(getApplicationByDate, {
    pollInterval: 1000
  })


  if(loading) return null ;


  return (
    <div style={{width: "200px", height: "220px"}}>
        <Bar
        options={{
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
              },
              stacked: true
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
        data={{
          datasets: [

            {
            data:  data.getAllApplicationDateCount.map(({ _count }: any) => {
              return _count
            }),
            animation: {
              delay: 500,
              easing: "linear",
            },
            backgroundColor: "#0072bd",
            }
          ],
          labels: data.getAllApplicationDateCount.map(({ createdAt }: any) => {
            return format(new Date(createdAt), "MMM dd yyyy")
          })
        }}    
          
        />
    </div>
  )
}
