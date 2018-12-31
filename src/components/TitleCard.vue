<template>
<div class="title-card">
  <!-- <div class="cloud-container"> -->
    <!-- <img src="./../assets/cloud-o.svg" /> -->
  <!-- </div> -->
  <div class="cloud-container">
    <RainCloud class="big-rain-cloud"></RainCloud>
  </div>
  <h1 class="title">
    <transition-group
      name="staggered-in"
      tag="span"
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <span v-for="(line, i) in lines" :data-index="i" :key="i+line" :class="['line', 'line'+i]">{{ line }}</span>
    </transition-group>
  </h1>
</div>
</template>

<script>
import RainCloud from "./RainCloud";
export default {
  name: "title-card",
  components: { RainCloud },
  data() {
    return {
      text: ""
    };
  },
  props: {
    splitter: {
      type: String,
      default: " "
    }
  },
  computed: {
    lines() {
      return typeof this.text === "string" && this.text.split(this.splitter);
    },
    delays() {
      let prevTotal = 100;
      return [8, 8, 2, 3, 8, 5].map(n => {
        let delay = n * 70;
        prevTotal += delay;
        return prevTotal;
      });
      // return this.lines.map((line, i) => {
      //   let delay = 250 + line.length * 200;
      //   prevTotal += delay;
      //   return prevTotal;
      // });
    }
  },
  mounted() {
    this.text = this.$slots.default ? this.$slots.default[0].text : "";
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      let delay = this.delays[el.dataset.index];
      console.log(delay);
      setTimeout(function() {
        el.style.opacity = 1;
      }, delay);
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
  line-height: 12vh;
  font-size: calc(10px + 4vh);
}
.title-card {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.line {
  display: block;
  text-align: center;
}

.line0 {
  font-size: calc(14px + 5vh);
}
.line3,
.line4,
.line5 {
  font-size: calc(40px + 6vh + 1vw);
  transition: opacity 0.5s;
  text-transform: capitalize;
}

.line {
  transition: opacity 0.5s;
}

.big-rain-cloud {
  position: absolute;
  top: -10vw;
  right: 0vw;
  width: 50vw;
}
</style>
