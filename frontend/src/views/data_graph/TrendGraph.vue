<template>
<div>
    <CChartLine
        :labels="TimeLabel"
        :datasets="Datasets"
        :options="Options"
        style="height:400px;margin-bottom:30px"
    />
    <CSwitch labelOn="X" labelOff="X" class="mx-1" color="primary" checked shape="pill"/>
    <CSwitch labelOn="Y" labelOff="Y" class="mx-1" color="success" checked shape="pill"/>
    <CSwitch labelOn="Z" labelOff="Z" class="mx-1" color="danger" checked shape="pill"/>

</div>    
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'



export default {
    name: "TrendGraph",

    components: {
        CChartLine
    },

    created () {
      this.$http.get('/sensor/'+this.$route.params.id+'?dataType=vrms&many=10')
        .then((res)=>{
            console.log(res.data);
            this.vrms_data = res.data;
        })
    },

    data () {
      return {
        //abs_avg: []
        vrms_data: []
      }
    },

    computed: {
        TimeLabel () {
            return this.vrms_data.map(o => o.time)
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
                    data: this.vrms_data.map(o => o.vrms.x)
                },
                {
                    label: 'Y',
                    backgroundColor: 'transparent',
                    borderColor: colorY,
                    pointHoverBackgroundColor: colorY,
                    borderWidth: 1,
                    data: this.vrms_data.map(o => o.vrms.y)
                },
                {
                    label: 'Z',
                    backgroundColor: 'transparent',
                    borderColor: colorZ,
                    pointHoverBackgroundColor: colorZ,
                    borderWidth: 1,
                    data: this.vrms_data.map(o => o.vrms.z)
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
                    text: 'Vrms',
                    fontSize: 16
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        distribution: 'series',
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