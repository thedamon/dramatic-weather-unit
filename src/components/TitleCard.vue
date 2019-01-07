<template>
<div class="title-card" v-show="showing">
  <Weather :weatherConditions="currentWeather"></Weather>
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
import debounce from "lodash.debounce";
import Weather from "./Weather";

export default {
  name: "title-card",
  components: { Weather },
  data() {
    return {
      showing: true,
      text: "",
      currentWeather: "raining"
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
    }
  },
  mounted() {
    this.text = this.$slots.default ? this.$slots.default[0].text : "";

    // add removeeventlistener if there's a situation this component will ever not be there.
    window.addEventListener(
      "scroll",
      debounce(() => {
        const clearance = window.innerHeight * 3;
        const scrollY = window.scrollY;
        if (scrollY > clearance && this.showing) {
          this.showing = false;
        } else if (scrollY <= clearance && !this.showing) {
          this.showing = true;
        }
      }, 150)
    );
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      let delay = this.delays[el.dataset.index];
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
  height: 120vh;
  padding-top: 10vh;
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
</style>
