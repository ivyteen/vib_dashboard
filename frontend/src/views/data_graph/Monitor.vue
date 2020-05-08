<template>
    <div>

        <CButtonGroup>
            <CButton v-on:click="Play" color="success">Play</CButton>
            <CButton v-on:click="Stop" color="info">Stop</CButton>
        </CButtonGroup>
        <span style="float: right;">Latest Update : <time>{{timestamp}}</time></span>
        <FreqGraph v-bind:freq_data_arr="freq"/>
        <SpectrumGraph v-bind:spec_data_arr="spectrum"/>

    </div>
</template>

<script>
import FreqGraph from './FreqGraph'
import SpectrumGraph from './SpectrumGraph'


let bindedDataUpdated = ''
function autoDataUpdate () {

    this.$http.get('/sensor/'+this.$route.params.id+'?dataType=monitor')
        .then((res)=>{
            let obj = res.data;
            this.freq = obj.freq_data;
            this.spectrum = obj.spectrum;
            this.timestamp = obj.timestamp;
        })


}

export default {
    name: "Monitor",

    components: {
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