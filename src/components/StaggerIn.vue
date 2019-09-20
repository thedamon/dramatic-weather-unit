<template>
  <transition-group
    name="stagger-in"
    appear
    :tag="tag"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: "transition-stagger-in",
  props: {
    tag: { type: String, default: "span" },
    /**
     * a number of milliseconds, or an array of millisecondses
     */
    stepDelay: { type: Array | Number, default: 1000 },
    delayStart: { type: Number, default: 0 },
    transition: { type: Number, default: 50 }
  },
  computed: {
    compoundDelays() {
      console.log(this.stepDelay);
      if (Array.isArray(this.stepDelay)) {
        let compoundDelays = this.stepDelay.reduce(function(r, a) {
          r.push(((r.length && r[r.length - 1]) || 0) + a);
          return r;
        }, []);

        return compoundDelays.map(delay => delay + this.delayStart);
      }
      return false;
    }
  },
  methods: {
    beforeEnter(el) {
      console.log("before enter");
      el.style.opacity = 0;
    },
    enter(el, done) {
      console.log("enter");
      let delay = this.compoundDelays
        ? this.compoundDelays[el.dataset.index]
        : this.stepDelay * el.dataset.index + this.delayStart;

      console.log(delay);
      setTimeout(function() {
        el.style.opacity = 1;
      }, delay);
    }
  },
  mounted() {
    console.log("staggering in");
  }
};
</script>