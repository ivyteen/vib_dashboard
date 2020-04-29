<template>
    <CChartLine
        :labels="IndexLabel"
        :datasets="Datasets"
        :options="Options"
        style="height:300px;margin-top:40px"
    />
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'

export default {
    name: 'SpectrumGraph',
    components: {
        CChartLine
    },
    props: {
        spec_data_arr:Object
    },
    computed: {
        IndexLabel () {
            return this.spec_data_arr.x.map((value, index) => index)
        },
    
        Datasets () {
            let elements = 800;
            const colorX = 'rgba(0,0,255,0.5)';
            const colorY = 'rgba(0,255,0,0.5)';
            const colorZ = 'rgba(255,0,0,0.5)';
           
            return [
                {
                    label: 'X',
                    backgroundColor: 'transparent',
                    borderColor: colorX,
                    pointHoverBackgroundColor: colorX,
                    borderWidth: 1,
                    data: this.spec_data_arr.x
                },
                {
                    label: 'Y',
                    backgroundColor: 'transparent',
                    borderColor: colorY,
                    pointHoverBackgroundColor: colorY,
                    borderWidth: 1,
                    data: this.spec_data_arr.y
                },
                {
                    label: 'Z',
                    backgroundColor: 'transparent',
                    borderColor: colorZ,
                    pointHoverBackgroundColor: colorZ,
                    borderWidth: 1,
                    //borderDash: [8, 5],
                    data: this.spec_data_arr.z
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
                  text: 'Spectrum',
                  fontSize: 16
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                          display: true,
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
                },
                animation: {
                    duration: 10,
                    easing: 'linear'
                }

            }
        }
    }   
   
}
</script>