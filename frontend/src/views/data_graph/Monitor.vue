<template>
    <div>

        <CButtonGroup>
            <CButton v-on:click="Play" color="success">Play</CButton>
            <CButton v-on:click="Stop" color="info">Stop</CButton>
        </CButtonGroup>
        <span style="float: right;">Latest Update : <time>{{timestamp}}</time></span>
        <FreqGraph v-bind:freq_data_arr="freq"/>
        <SpectrumGraph v-bind:spec_data_arr="spectrum"/>

<!--
        <CSwitch labelOn="X" labelOff="X" class="mx-1" color="primary" checked shape="pill"/>
        <CSwitch labelOn="Y" labelOff="Y" class="mx-1" color="success" checked shape="pill"/>
        <CSwitch labelOn="Z" labelOff="Z" class="mx-1" color="danger" checked shape="pill"/>
-->        
    </div>
</template>

<script>
//import { CChartLine } from '@coreui/vue-chartjs'
import FreqGraph from './FreqGraph'
import SpectrumGraph from './SpectrumGraph'


let bindedDataUpdated = ''
function autoDataUpdate () {
    //console.log("auto update?");
    //console.log(this);

    this.$http.get('/sensor/'+this.$route.params.id+'?dataType=monitor')
        .then((res)=>{
            //console.log(res.data);            
            let obj = res.data;
            this.freq = obj.freq_data;
            this.spectrum = obj.spectrum;
            this.timestamp = obj.timestamp;
           //console.log(this.timestamp);
        })


}

/*
function cancelAutoUpdate () {
    clearInterval(this.timer)

}
*/

export default {
    name: "Monitor",

    components: {
        //CChartLine,
        FreqGraph,
        SpectrumGraph
    },

    methods: {
        Play: function () {
            if(this.timer === ''){
                this.timer = setInterval(autoDataUpdate.bind(this),2000);
                console.log("Play "+this.timer);
            }else
                console.log("Skip Play");


        },
        Stop: function () {
            clearInterval(this.timer);
            console.log("Stop "+this.timer);
            this.timer = '';
        }
    },

    created () {
        //console.log("monitor created");
        this.timer = setInterval(autoDataUpdate.bind(this),2000);
    },

    data () {
        return {
            //value: 0,
            freq: { x:[], y:[], z:[] },
            spectrum: { x:[], y:[], z:[] },
            timestamp: '',
            timer: ''
        }
    },

    beforeDestroy () {
        console.log("monitor destroyed")
        clearInterval(this.timer);
    }

}
</script>