<template>
  <div>
    <CCard>
      <CCardHeader>
        <strong>Sensor {{this.$route.params.id}}</strong>
      </CCardHeader>

      <CCardBody>
        <CNav :fill=false variant="pills" style="margin-bottom:20px">

          <CDropdown
            in-nav
            button-content="Dropdown"
            toggler-text="Graph Type"
          >
            <CDropdownItem :to="MonitorPath" >Monitor</CDropdownItem>
            <CDropdownItem :to="TrendPath" >Trend</CDropdownItem>
          </CDropdown>

        </CNav>    
        
        <router-view></router-view>    
      </CCardBody>
    </CCard>
  </div>

</template>


<script>


//import SensorGraphTabView from "./SensorGraphTabView"

let sensor_id;

export default {
    name: 'SensorGraphDisplay',
/*
    components: {
      SensorGraphTabView
    },
*/    

    created () {
      console.log(this.$route.params.id);
    },

    mounted () {
      console.log("mounted call");
      sensor_id = this.$route.params.id

    },

    updated () {
      if(sensor_id != this.$route.params.id){
        console.log("sensor_id changed")
        sensor_id = this.$route.params.id
      }
    },


    data () {
      return {
        path: '/dashboard/graph_display/',
      }

    },
    computed: {
      MonitorPath () {
        return this.path+this.$route.params.id+'/monitor'
      },
      TrendPath () {
        return this.path+this.$route.params.id+'/trend'
      }
      
    }


}
</script>