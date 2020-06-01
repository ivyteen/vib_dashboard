<template>
    <span>
        <CBadge style="margin-left:20px" color="warning"> X axis </CBadge>
        <CBadge style="margin-left:20px" color="warning"> Y axis </CBadge>
        <CBadge style="margin-left:20px" color="danger"> Z axis </CBadge>
    </span>
</template>

<script>

function autoUpdate(){
    this.$http.get('/sensor/'+this.$route.params.id+'?dataType=warning_alarm')
        .then((res)=>{
            /*
            let obj = res.data;
            
            this.flag.x = obj.x,
            this.flag.y = obj.y,
            this.flag.z = obj.z
            */                        
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
        this.timer = setInverval(autoUpdate.bind(this),60000);
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