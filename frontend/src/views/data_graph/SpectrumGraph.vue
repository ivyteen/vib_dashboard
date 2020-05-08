<template>
   
    <CCard style="margin-top:20px;">
        <CCardHeader>
            <CRow>
                <CCol>
                    <h5>Spectrum</h5>
                </CCol>
                <CCol>
                    <div style="float: right;">
                        <div v-for="label in legend_labels" 
                            v-bind:key="label.name" 
                            class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" v-bind:id="label.name" checked v-model="label.show_graph">
                            <label class="form-check-label" v-bind:for="label.name" v-bind:style="label.color">{{label.name}}</label>
                        </div>
                    </div>

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

export default {
    name: 'SpectrumGraph',
    components: {
        CChartLine
    },
    props: {
        spec_data_arr:Object
    },

    data () {
        return {
            legend_labels: [
                {
                    name : "X",
                    show_graph : true,
                    color :'color:rgba(0,0,255,0.5); font-weight:bolder'
                },
                {
                    name : "Y",
                    show_graph : true,
                    color :'color:rgba(0,255,0,0.5); font-weight:bolder'
                },
                {
                    name : "Z",
                    show_graph : true,
                    color : 'color:rgba(255,0,0,0.5); font-weight:bolder'
                },

            ]
            
 
        }

    },


    computed: {
        IndexLabel () {
            return this.spec_data_arr.x.map((value, index) => (index*1600)/800)
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
                    data: this.spec_data_arr.x,
                    showLine: this.legend_labels[0].show_graph

                },
                {
                    label: 'Y',
                    backgroundColor: 'transparent',
                    borderColor: colorY,
                    pointHoverBackgroundColor: colorY,
                    borderWidth: 1,
                    data: this.spec_data_arr.y,
                    showLine: this.legend_labels[1].show_graph

                },
                {
                    label: 'Z',
                    backgroundColor: 'transparent',
                    borderColor: colorZ,
                    pointHoverBackgroundColor: colorZ,
                    borderWidth: 1,
                    data: this.spec_data_arr.z,
                    showLine: this.legend_labels[2].show_graph

                }
            ]
        },
        Options () {
            return {

                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                /*
                title: {
                  display: true,
                  text: 'Spectrum',
                  fontSize: 16
                },
                */
                scales: {
                    xAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'Freq (Hz)',
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
                            suggestedMin: 0,
                            suggestedMax: 0.01,
                            stepSize: 0.002
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