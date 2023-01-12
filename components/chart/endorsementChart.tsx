import React from 'react'
import { Bar } from 'react-chartjs-2'
import { useQuery } from '@apollo/client'
import { getEndorsementGroup } from '../../util/endorsement/endorsement.query'
import { format } from 'date-fns'



export default function EndorsementChart() {

  const { loading, data } = useQuery(getEndorsementGroup, {
    pollInterval: 1000
  })

  if (loading) return null
  return (
    <div style={{ width: "200px", height: "220px" }}>
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

        data={{
          datasets: [
            {
              data: data.getAllEndorsementByGroup.map(({ _count }: any) => {
                return _count
              }),
              animation: {
                delay: 500,
                easing: "linear",
              },
              backgroundColor: "#d95319"
            },

          ],
          labels: data.getAllEndorsementByGroup.map(({ createdAt }: any) => {
            return format(new Date(createdAt), "MMM dd yyyy")
          })

        }}
      />
    </div>
  )
}
