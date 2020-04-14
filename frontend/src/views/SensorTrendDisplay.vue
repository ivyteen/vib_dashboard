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

        <VrmsGraph v-bind:vrms_data="vrms"/>

      </CCardBody>
    </CCard>
  </div>

</template>


<script>

//import AbsAvgGraph from "./data_graph/AbsAvgGraph"
import VrmsGraph from "./data_graph/VrmsGraph"


export default {
    name: 'SensorTrendDisplay',

    created () {
/*
      this.$http.get('/sensor/0?dataType=abs_avg&many=10')
        .then((res)=>{
          this.abs_avg = res.data;
        })
*/
      this.$http.get('/sensor/0?dataType=vrms&many=10')
        .then((res)=>{
          this.vrms = res.data;
        })

    },

    data () {
      return {
        //abs_avg: []
        vrms: []
      }
    },

    components: {
      //AbsAvgGraph
      VrmsGraph
    }

}
</script>