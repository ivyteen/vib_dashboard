<template>
    <div>
        <!--
        <CChartLine
            :labels="TimeLabel"
            :datasets="Datasets"
            :options="Options"
            style="height:400px;margin-bottom:30px"
        />
        -->

        <FreqGraph v-bind:freq_data_arr="freq"/>
        <SpectrumGraph v-bind:spec_data_arr="spectrum"/>


        <CSwitch labelOn="X" labelOff="X" class="mx-1" color="primary" checked shape="pill"/>
        <CSwitch labelOn="Y" labelOff="Y" class="mx-1" color="success" checked shape="pill"/>
        <CSwitch labelOn="Z" labelOff="Z" class="mx-1" color="danger" checked shape="pill"/>
        
    </div>
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'
import FreqGraph from './FreqGraph'
import SpectrumGraph from './SpectrumGraph'


let bindedDataUpdated = ''
function autoDataUpdate () {
    console.log("auto update?");
    console.log(this);

    this.$http.get('/sensor/'+this.$route.params.id+'?dataType=latest')
        .then((res)=>{
            console.log(res.data);
            //this.vrms_data = res.data;
            let obj = res.data[0];
            this.freq = obj.freq_data;
            this.spectrum = obj.spectrum;
        })


}

function cancelAutoUpdate () {
    clearInterval(this.timer)

}


export default {
    name: "Monitor",

    components: {
        CChartLine,
        FreqGraph,
        SpectrumGraph
    },
/*
   method: {
        autoDataUpdate: function () {
            console.log("auto update?");
            
            this.$http.get('/sensor/'+this.$route.params.id+'?dataType=latest', (res) => {
                let obj = res.data[0];
                this.freq = obj.freq_data;
                this.spectrum = obj.spectrum;
            }).bind(this);
            
        },
        cancelAutoUpdate: function () {
            clearInterval(this.timer)
        }
        
    },
*/
    created () {
        //bindedDataUpdated = autoDataUpdate.bind(this);
        //this.autoDataUpdate();
        console.log("monitor created");
        this.timer = setInterval(autoDataUpdate.bind(this),5000);
    },

    data () {
        return {
            //value: 0,
            freq: {},
            spectrum: {},
            timer: ''
        }
    },

 

    beforeDestroy () {
        console.log("monitor destroyed")
        clearInterval(this.timer);
    }

}
</script>