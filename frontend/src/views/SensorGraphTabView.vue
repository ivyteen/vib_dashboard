<template>
    <div>
        
        <CNav :fill=true variant="pills" style="margin-bottom:20px">
            <CNavItem :to="MonitorPath" active > 
                Monitor
            </CNavItem>
            <CNavItem :to="TrendPath">
                Trend
            </CNavItem>


        </CNav>    
        
        <router-view></router-view>    
        
    </div>
</template>

<script>
export default {
    name: "SensorGraphTabView",

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
        },
    }

}
</script>