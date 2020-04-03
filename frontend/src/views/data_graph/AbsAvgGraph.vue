<template>
    <CChartBar
        :datasets="Datasets"
        :options="Options"
        style="height:300px;margin-top:40px"
    />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'

export default {
    name: 'AbsAvgGraph',
    components: {
        CChartBar
    },
    props: {
        abs_avg_data:Object
    },
    computed: {
        Datasets () {
            //let elements = 800;
            const colorX = 'rgba(0,0,255,0.5)';
            const colorY = 'rgba(0,255,0,0.5)';
            const colorZ = 'rgba(255,0,0,0.5)';

            return [
                {
                    label: 'X',
                    backgroundColor: colorX,
                    borderColor: colorX,
                    //pointHoverBackgroundColor: colorX,
                    borderWidth: 1,
                    data: [1,2,3,4,5,6,7,8,9]
                },
                
                {
                    label: 'Y',
                    backgroundColor: colorY,
                    borderColor: colorY,
                    //pointHoverBackgroundColor: colorY,
                    borderWidth: 1,
                    data: [1,2,3,4,5,6,7,8,9]
                },
                {
                    label: 'Z',
                    backgroundColor: colorZ,
                    borderColor: colorZ,
                   // pointHoverBackgroundColor: colorZ,
                    borderWidth: 1,
                    //borderDash: [8, 5],
                    data: [1,2,3,4,5,6,7,8,9]
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
                  text: 'Abs Avg',
                  fontSize: 16
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                          display: false,
                          labelString: 'Freq',
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
                        //max: 2
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