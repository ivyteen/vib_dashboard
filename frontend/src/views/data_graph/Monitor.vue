<template>
    <div>
        value 
        
    </div>
</template>

<script>
import { CChartLine } from '@coreui/vue-chartjs'
/*
function increaseValue () {
    this.value = this.value + 1
}
*/

export default {
    name: "Monitor",

    created () {
        //this.fetchEventsList();
        //this.timer = setInterval(this.fetchEventsList,5000);
    },

    data () {
        return {
            value: 0,
            timer: ''
        }
    },

    method: {
        /*
        fetchEventsList () {
            
        },
        cancelAutoUpdate () {
            clearInterval(this.timer)
        }
        */
    },

    beforeDestroy () {
        //clearInterval(this.timer);
    }

}
</script>