<template>
  <div>
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="traffic" class="card-title mb-0">Sensor 0</h4>
            <div class="small text-muted">Latest : 2020.03.30 19:20:01</div>
          </CCol>
        </CRow>

        <!-- Freq 
        <CRow>
          <CCol sm="12" style="margin-top:50px;">
            <h6 class="font-weight-bold text-center">Freq</h6>
          </CCol>
        </CRow>
        -->

        <FreqGraph />

        <!--
        <MainChartExample style="height:300px;margin-top:40px;"/>
        -->
      </CCardBody>
    </CCard>
  </div>

</template>


<script>

import FreqGraph from "./data_graph/FreqGraph"


export default {
    name: 'SensorDataDisplay',

    created () {
      this.$http.get('sensor/1?dataType=abs_avg')
        .then((res)=>{
          this.record = res.data
        })
    },

    data () {
      return {
        record: {}
      }
    },

    components: {
      FreqGraph
        //MainChartExample

    },

    computed: {

    }
}
</script>