<template>
    <CChartLine
        :datasets="Datasets"
        :options="Options"
        style="height:300px;"
    />
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'

function random (min, max) {
  return (Math.random() * (max - min + 1) + min)
}

export default {
    name: 'FreqGraph',
    components: {
        CChartLine
    },
    computed: {
        Datasets () {

            let elements = 1600
            const dataX = []
            const dataY = []
            const dataZ = []

            for (let i = 0; i <= elements; i++) {
                dataX.push(random(-0.01,0.01))
                dataY.push(random(-1, 1))
                dataZ.push(random(-1, 1))
            }

            return [
                {
                    label: 'X',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(0,0,255,0.5)',
                    pointHoverBackgroundColor: 'rgba(0,0,255,0.5)',
                    borderWidth: 1,
                    data: dataX,
                },
                {
                    label: 'Y',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(0,255,0,0.5)',
                    pointHoverBackgroundColor: 'rgba(0,255,0,0.5)',
                    borderWidth: 1,
                    data: dataY
                },
                {
                    label: 'Z',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,0,0,0.5)',
                    pointHoverBackgroundColor: 'rgba(255,0,0,0.5)',
                    borderWidth: 1,
                    //borderDash: [8, 5],
                    data: dataZ
                }
            ]
        },
        Options () {
            return {

                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                title: {
                  display: true,
                  text: 'Freq',
                  fontSize: 16
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'Time',
                          padding: 0,
                          fontStyle: "italic"
                        },
                        gridLines: {
                        drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                       // stepSize: Math.ceil(250 / 5),
                        max: 2
                        },
                        gridLines: {
                        display: true
                        }
                    }]
                },
                elements: {
                    line: {
                      tension: 0
                    },
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3
                    }
                }
            }
        }
    }   
   
}
</script>