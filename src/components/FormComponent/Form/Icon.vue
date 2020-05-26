<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      @click="$emit('click')"
      v-html="svgs[index].svg"
      viewBox="0 0 500 500"
  />
</template>
<script>
export default {
    name: 'Icon',
    props: {
      icon: {
        type: String,
        default: ''
      },
    },

    computed: {
      index(){
        return this.svgs.findIndex(svg => svg.name === this.icon) !== -1 ? this.svgs.findIndex(svg => svg.name === this.icon) : this.svgs.findIndex(svg => svg.name === 'empty')
      }
    },
    data(){
        return {
            svgs:[
                {
                    name:'ok',
                    svg:' <circle style="fill: rgb(204, 162, 102);" cx="229.92" cy="233.936" r="176.273" transform="matrix(1.277433, 0, 0, 1.265124, -38.979813, -28.340054)"/>  <rect x="783.134" y="198.946" width="56.225" height="167.962" style="fill: rgb(255, 255, 255);" transform="matrix(0.650884, -0.759177, 0.759177, 0.650884, -544.687683, 750.955078)" rx="16.84" ry="16.84"/> <rect x="675.703" y="113.505" width="56.225" height="267.601" style="fill: rgb(255, 255, 255);" transform="matrix(0.752091, 0.659059, -0.659059, 0.752091, -56.050251, -374.05368)" rx="12.9" ry="12.9"/>'
                },
                {
                    name:'error',
                    svg:'<circle style="fill: rgb(179, 27, 44);" cx="229.92" cy="233.936" r="176.273" transform="matrix(1.277433, 0, 0, 1.265124, -51.865902, -40.713287)"/>  <circle style="fill: rgb(255, 255, 255);" cx="245.921" cy="394.522" r="34.386"/> <path d="M 297.11 134.939 C 297.11 142.552 296.037 149.856 294.067 156.635 C 292.096 163.414 278.275 255.86 278.275 255.86 L 270.348 335.186 L 245.201 335.137 L 220.053 335.087 L 212.437 255.731 C 212.437 255.731 197.956 164.334 195.85 157.354 C 193.745 150.374 192.594 142.822 192.594 134.939 C 192.594 126.051 194.062 117.589 196.709 109.891 C 199.356 102.192 203.183 95.258 207.9 89.425 C 212.643 83.613 218.273 78.899 224.521 75.639 C 230.77 72.379 237.637 70.572 244.852 70.572 C 252.068 70.572 258.934 72.379 265.183 75.639 C 271.431 78.899 277.062 83.613 281.804 89.425 C 286.522 95.258 290.348 102.192 292.995 109.891 C 295.642 117.589 297.11 126.052 297.11 134.939 Z" style="fill: rgb(255, 255, 255);"/>'
                },
                {

                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
svg{
    height: 15px;
    width: 15px;
    position: absolute;
    right: 25px;
}
</style>