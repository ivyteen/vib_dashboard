<template>
    
   
<!--
    <CSwitch labelOn="X" labelOff="X" class="mx-1" color="primary" checked shape="pill"/>
    <CSwitch labelOn="Y" labelOff="Y" class="mx-1" color="success" checked shape="pill"/>
    <CSwitch labelOn="Z" labelOff="Z" class="mx-1" color="danger" checked shape="pill"/>
-->

    <CCard style="margin-top:20px;">
        <CCardHeader>
<!--            
            <h5>Freq</h5>
            <CInputCheckbox
                      v-for="(option, optionIndex) in options"
                      :key="key + option"
                      :label="option"
                      :value="option"
                      :custom="key > 1"
                      :name="`Option 1${key}`"
                      :checked="optionIndex === key"
                      :inline="key % 2 === 1"
                    />
-->
            <CRow>
                <CCol>
                    <h5>Freq</h5>
                </CCol>
                <CCol>
                    <!--
                    <CInputCheckbox
                        v-for="label_name in legend_labels"
                        :label="label_name " 
                        :inline="true" 
                    />
                    -->
                </CCol>
            </CRow>

        </CCardHeader>
        <CCardBody>
            <CChartLine
                :labels="IndexLabel"
                :datasets="Datasets"
                :options="Options"
                style="height:300px;"
            />
        </CCardBody>
    </CCard>
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'

let legend_flag = [null,null,null];

export default {
    name: 'FreqGraph',
    components: {
        CChartLine
    },
    props: {
        freq_data_arr:Object
    },

    data () {
        return {
            legend_labels: ["X","Y","Z"],
            show_graph: [true,true,true]

        }

    },
/*
    created () {
        
        let chart = this.$children[0].chart;
        let meta = chart.getDatasetMeta(0);
        meta.legend_flag = Array(3);
        console.log(meta);
        
        legend_flag.forEach((item,index,arr)=>{
            arr[index] = null;
        })
    
        console.log(legend_flag);
    },

    beforeUpdate () {
        let chart = this.$children[0].chart;
        //let meta = chart.getDatasetMeta(0);
        //console.log(chart);
        [
            chart.getDatasetMeta(0),
            chart.getDatasetMeta(1),
            chart.getDatasetMeta(2)
        ].forEach((meta,index) => {
            meta.hidden = legend_flag[index];
        })
        console.log(chart.getDatasetMeta(0).hidden);
        console.log(chart.getDatasetMeta(1).hidden);
        console.log(chart.getDatasetMeta(2).hidden);

        chart.update();
    },
*/    
    computed: {
        IndexLabel () {
            return this.freq_data_arr.x.map((value, index) => index)
        },

        Datasets () {
            let elements = 1600;
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
                    data: this.freq_data_arr.x,
                    //showLine: false
                },
                {
                    label: 'Y',
                    backgroundColor: 'transparent',
                    borderColor: colorY,
                    pointHoverBackgroundColor: colorY,
                    borderWidth: 1,
                    data: this.freq_data_arr.y
                    //showLine: false
                },
                {
                    label: 'Z',
                    backgroundColor: 'transparent',
                    borderColor: colorZ,
                    pointHoverBackgroundColor: colorZ,
                    borderWidth: 1,
                    data: this.freq_data_arr.z,
                    //showLine: false
                }
            ]
        },
        Options () {
            return {

                maintainAspectRatio: false,
                
                legend: {
                    display: false,
                    /*
                    position: 'top',
                    align: 'end',
                    onClick: function (e, legendItem) {
                        console.log("Legend Click");
                        var index = legendItem.datasetIndex;
                        var ci = this.chart;
                        //console.log(ci);
                        var meta = ci.getDatasetMeta(index);
                        //console.log(meta);
                        // See controller.isDatasetVisible comment
                        meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
                        
                        //this.legend_flag[meta.index] = meta.hidden;
                        // We hid a dataset ... rerender the chart
                        //legend_flag[meta.index] = meta.hidden;
                        legend_flag[index] = meta.hidden;

                        console.log(legend_flag);
                        ci.update();
                    }
                    */
                },
                /*
                title: {
                  display: true,
                  text: 'Freq',
                  fontSize: 16
                },
                */
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
                       // max: 2
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