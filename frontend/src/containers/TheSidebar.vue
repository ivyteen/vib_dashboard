<template>
  <CSidebar 
    fixed 
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
  <!--
    <CSidebarBrand class="d-md-down-none" to="/">
    
      <CIcon 
        class="c-sidebar-brand-full" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 556 134"
      />
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 110 134"
      />
      
    </CSidebarBrand>
    <CRenderFunction flat :content-to-render="sensorsList"/>  
    <CRenderFunction flat :content-to-render="$options.nav"/>  

  -->
    <CRenderFunction flat :content-to-render="nav"/>  

    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
//import nav from './_nav'

export default {
  name: 'TheSidebar',
  //nav,
  created: function () {
    
    this.$http.get('/sensor/list')
      .then((res)=>{      
        const sensorList = res.data.map((value) => {
          return {
            _name: 'CSidebarNavItem', 
            name: value.Tables_in_vibration_analyzer.slice(0,6)+' '+value.Tables_in_vibration_analyzer.slice(6),
            //to: '/sensor/'+value.Tables_in_vibration_analyzer.slice(6),
            icon: 'cil-audio'
          }
        })
        console.log(sensorList);
        for(let i=0; i<sensorList.length; i++)
          this.nav[0]._children.push(sensorList[i]);
    })
    

  },

  data () {
    return {
      nav: [
        {
            _name: 'CSidebarNav',
            _children: [

              {
                _name: 'CSidebarNavTitle',
                _children: ['Sensors']
              }
              /*
              {
                _name: 'CSidebarNavItem',
                name: 'Sensor 0',
                to: '/theme/colors',
                icon: 'cil-audio'
              },
              {
                _name: 'CSidebarNavItem',
                name: 'Sensor 1',
                to: '/theme/typography',
                icon: 'cil-audio'
              }
              */
            
            ]
        }
      ]
    }
  },
  computed: {

    show () {
      return this.$store.state.sidebarShow 
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  }

}
</script>
