<template>
  <div class="status__bar">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      @click="$emit('click')"
      v-html="svgs[index].svg"
      :viewBox="svgs[index].viewBox"
      :fill="color"
    />
    <span class="status__bar-tooltip" v-if="message">
      {{message}}
    </span>
  </div>
</template>
<script>
export default {
    name: 'Icon',
    props: {
      icon: {
        type: String,
        default: ''
      },
      color:{
        default:''
      },
      message:{}
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
                    viewBox:"0 0 500 500",
                    svg:' <circle style="fill: rgb(204, 162, 102);" cx="229.92" cy="233.936" r="176.273" transform="matrix(1.277433, 0, 0, 1.265124, -38.979813, -28.340054)"/>  <rect x="783.134" y="198.946" width="56.225" height="167.962" style="fill: rgb(255, 255, 255);" transform="matrix(0.650884, -0.759177, 0.759177, 0.650884, -544.687683, 750.955078)" rx="16.84" ry="16.84"/> <rect x="675.703" y="113.505" width="56.225" height="267.601" style="fill: rgb(255, 255, 255);" transform="matrix(0.752091, 0.659059, -0.659059, 0.752091, -56.050251, -374.05368)" rx="12.9" ry="12.9"/>'
                },
                {
                    name:'error',
                    viewBox:"0 0 500 500",
                    svg:'<circle style="fill: rgb(179, 27, 44);" cx="229.92" cy="233.936" r="176.273" transform="matrix(1.277433, 0, 0, 1.265124, -51.865902, -40.713287)"/>  <circle style="fill: rgb(255, 255, 255);" cx="245.921" cy="394.522" r="34.386"/> <path d="M 297.11 134.939 C 297.11 142.552 296.037 149.856 294.067 156.635 C 292.096 163.414 278.275 255.86 278.275 255.86 L 270.348 335.186 L 245.201 335.137 L 220.053 335.087 L 212.437 255.731 C 212.437 255.731 197.956 164.334 195.85 157.354 C 193.745 150.374 192.594 142.822 192.594 134.939 C 192.594 126.051 194.062 117.589 196.709 109.891 C 199.356 102.192 203.183 95.258 207.9 89.425 C 212.643 83.613 218.273 78.899 224.521 75.639 C 230.77 72.379 237.637 70.572 244.852 70.572 C 252.068 70.572 258.934 72.379 265.183 75.639 C 271.431 78.899 277.062 83.613 281.804 89.425 C 286.522 95.258 290.348 102.192 292.995 109.891 C 295.642 117.589 297.11 126.052 297.11 134.939 Z" style="fill: rgb(255, 255, 255);"/>'
                },
                {
                  name:'galochka',
                  viewBox:'0 0 26 26',
                  svg:`<path fill="white" d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"/>`
                },
                {
                  name:'close',
                  viewBox:'0 0 12 12',
                  svg:`
                      <line x1="10.2142" y1="0.707107" x2="0.707054" y2="10.2143" stroke="#999999" stroke-linecap="round"/>
                      <line x1="10.2928" y1="10.2144" x2="0.785591" y2="0.707177" stroke="#999999" stroke-linecap="round"/>`
                },
                {
                  name:'arrow',
                  viewBox:'0 0 129 129',
                  svg:` <g>
                          <path fill="#999" d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
                        </g>`
                }
            ]
        }
    }
}
</script>
<style lang="scss">
svg{
    height: 15px;
    width: 15px;
    position: relative;
}

.status__bar{
  position: absolute;
  height: 15px;
  width: 15px;
  top: calc(50% - 25px);
  right: 25px;
  &:hover &-tooltip{    
      display: block;
  }
  &-tooltip{
    min-width: 12.5rem;
    max-width: 15rem;
    background-color: white;
    border-radius: 0.2rem;
    box-shadow: 0 0.2rem 0.8rem rgba(211, 211, 211, 0.5);
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.004rem;
    line-height: 1.2;
    color: #3e3e3e;
    position: absolute;
    right: 100%;
    z-index: 10;
    margin-right: 1rem;
    top: 50%;
    padding: 0.8rem 0.9rem;
    display: none;
    transform: translateY(-50%);
  }
}
</style>