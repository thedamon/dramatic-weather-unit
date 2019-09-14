<template>
  <transition-group
    name="stagger-in"
    :tag="tag"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
  >
    <slot v-show="started"></slot>
  </transition-group>
</template>

<script>
export default {
  name: "transition-stagger-in",
  data() {
    return {
      started: false
    };
  },
  props: {
    tag: { type: String, default: "span" },
    /**
     * a number of milliseconds, or an array of millisecondses
     */
    stepDelay: { type: Array | Number, default: 100 },
    delayStart: { type: Number, default: 0 },
    transition: { type: Number, default: 50 }
  },
  computed: {
    compoundDelays() {
      if (Array.isArray(this.stepDelay)) {
        return this.stepDelay.reduce(function(r, a) {
          r.push(((r.length && r[r.length - 1]) || 0) + a);
          return r;
        }, []);
      }
      return false;
    }
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      let delay = this.compoundDelays
        ? this.compoundDelays[el.dataset.index]
        : this.stepDelay;
      setTimeout(function() {
        el.style.opacity = 1;
      }, delay);
    }
  },
  mounted() {
    console.log("mounted");
    setTimeout(() => {
      console.log("started!");
      console.log(this);
      this.started = true;
    }, this.delayStart);
  }
};
</script>