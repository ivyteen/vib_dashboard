<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" class="card-title mb-0">Sensor 0</h4>
            <!--
            <div class="small text-muted">Latest : {{time}}</div>
            -->
          </CCol>
        </CRow>

        <!-- Freq 
        <CRow>
          <CCol sm="12" style="margin-top:50px;">
            <h6 class="font-weight-bold text-center">Freq</h6>
          </CCol>
        </CRow>
        -->
<!--
        <FreqGraph v-bind:freq_data_arr="freq"/>
        <SpectrumGraph v-bind:spec_data_arr="spectrum"/>
-->
        <AbsAvgGraph v-bind:abs_avg_data="abs_avg"/>

        <!--
        <MainChartExample style="height:300px;margin-top:40px;"/>
        -->
      </CCardBody>
    </CCard>
  </div>

</template>


<script>

//import FreqGraph from "./data_graph/FreqGraph"
//import SpectrumGraph from "./data_graph/SpectrumGraph"
import AbsAvgGraph from "./data_graph/AbsAvgGraph"


export default {
    name: 'SensorDataDisplay',

    created () {
      //this.$http.get('/sensor/1?dataType=abs_avg')

/*
      this.$http.get('/sensor/0')
        .then((res)=>{
          let obj = res.data[0];
          this.time = obj.time;
          this.freq = obj.freq_data;
          this.spectrum = obj.spectrum;
          this.abs_avg = obj.abs_avg;

          //console.log(this.abs_avg);
        })
*/


      this.$http.get('/sensor/0?dataType=abs_avg&period=1')
        .then((res)=>{
          let obj = res.data[0];
          this.time = obj.time;
          /*
          this.freq = obj.freq_data;
          this.spectrum = obj.spectrum;
          */
          this.abs_avg = obj.abs_avg;

          //console.log(this.abs_avg);
        })
    },

    data () {
      return {
        time: "",
        freq: {},
        spectrum: {},
        abs_avg: {}
      }
    },

    components: {
      //FreqGraph,
      //SpectrumGraph,
      AbsAvgGraph

    },

 
}
</script>