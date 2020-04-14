<template>
    <CChartLine
        :labels="TimeLabel"
        :datasets="Datasets"
        :options="Options"
        style="height:400px;"
    />
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'

export default {
    name: 'AbsAvgGraph',
    components: {
        CChartLine
    },
    props: {
        abs_avg_data:Array
    },
    computed: {
        TimeLabel () {
            return this.abs_avg_data.map(o => o.time)
        },

        Datasets () {
            const colorX = 'rgba(0,0,255,0.5)';
            const colorY = 'rgba(0,255,0,0.5)';
            const colorZ = 'rgba(255,0,0,0.5)';

            return [
                {
                    label: 'X',
                    backgroundColor: 'transparent',
                    borderColor: colorX,
                    borderWidth: 1,
                    //pointBackgroundColor: colorX,
                    pointHoverBackgroundColor: colorX,
                    data: this.abs_avg_data.map(o => o.abs_avg.x)
                },
                {
                    label: 'Y',
                    backgroundColor: 'transparent',
                    borderColor: colorY,
                    pointHoverBackgroundColor: colorY,
                    borderWidth: 1,
                    data: this.abs_avg_data.map(o => o.abs_avg.y)
                },
                {
                    label: 'Z',
                    backgroundColor: 'transparent',
                    borderColor: colorZ,
                    pointHoverBackgroundColor: colorZ,
                    borderWidth: 1,
                    data: this.abs_avg_data.map(o => o.abs_avg.z)
                }
            ]
        },
        Options () {
            return {

                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'top',
                    align: 'end'
                },
                title: {
                    display: true,
                    text: 'Abs Avg',
                    fontSize: 16
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            displayFormats: {
                                second: 'YYYY/MM/D HH:mm:ss'
                            },
                            tooltipFormat: 'YYYY/MM/D HH:mm:ss'
                        },
                        gridLines: {
                            drawOnChartArea: false
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 5,
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