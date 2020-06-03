<template>
    <span>
        <CBadge v-if="flag.x == 0" style="margin-left:20px" color="success"> X axis </CBadge>
        <CBadge v-else-if="flag.x == 1" style="margin-left:20px" color="warning"> X axis </CBadge>
        <CBadge v-else style="margin-left:20px" color="danger"> X axis </CBadge>

        <CBadge v-if="flag.y == 0" style="margin-left:20px" color="success"> Y axis </CBadge>
        <CBadge v-else-if="flag.y == 1" style="margin-left:20px" color="warning"> Y axis </CBadge>
        <CBadge v-else style="margin-left:20px" color="danger"> Y axis </CBadge>

        <CBadge v-if="flag.z == 0" style="margin-left:20px" color="success"> Z axis </CBadge>
        <CBadge v-else-if="flag.z == 1" style="margin-left:20px" color="warning"> Z axis </CBadge>
        <CBadge v-else style="margin-left:20px" color="danger"> Z axis </CBadge>

    </span>
</template>

<script>

function autoUpdate(){
    //console.log("Warning Alarm Auto Update");
    this.$http.get('/sensor/'+this.$route.params.id+'?dataType=warning_alarm')
        .then((res)=>{
            
            let obj = res.data;
            
            this.flag.x = obj.x,
            this.flag.y = obj.y,
            this.flag.z = obj.z
            
            //console.log(this.flag);

        })
}


export default {
    name: 'WaringAlarm',
/*
    props: {
        sensor_num:Number
    },
*/

    created () {
        console.log("Warning Alarm Created");
        this.timer = setInterval(autoUpdate.bind(this),2000);
    },


    data () {
        return {
            flag: { x:0, y:0, z:0 },
            timer: ''
        }

    },

    beforeDestroy () {
        clearInterval(this.timer);
    }
}
</script>