<template>
  <div 
    class="rain-cloud-container" 
    :class="{raining, flipX, bob, track}" 
    :style="styleObject"
  >
    <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 612 612" preserveAspectRatio="xMinYMin meet">
      <g :id="`cloud${id}-cloud`" class="cloud-cloud">
        <g class="st0">
          <path d="M452 305c7-5 9-16 4-23-4-7-15-10-23-7 11-12 2-31-9-44-17-21-40-41-68-46-27-6-59 6-70 32-8-6-22 3-21 13 2-2 0-6-3-7-18-12-40-22-62-18-25 4-46 28-46 54s19 50 44 55c-2 5-5 10-3 16s8 9 12 5c-10 3-16 13-18 23s1 20 6 29c13 26 42 44 71 44 30 0 59-18 72-44 5 6 14 8 22 5 7-3 12-11 11-19 18 12 44 10 60-4s21-39 12-59" class="st1"/>
          <path d="M452 306c7-6 9-16 5-24-5-8-16-11-24-7l1 1c9-12 2-28-5-39-9-13-20-24-33-34-12-9-26-16-41-19-13-2-27-1-39 4-13 6-25 16-30 29h1c-10-6-24 2-23 13h1c6-4-8-11-10-12-8-5-17-9-26-11-15-5-32-4-46 4-13 7-23 19-27 33-5 14-3 29 4 42 8 14 22 25 38 29v-1c-3 5-6 13-2 19 2 3 7 5 11 2v-1c-16 6-21 23-18 38 3 16 13 31 26 41 12 10 26 16 42 18a82 82 0 0 0 81-44h-1c6 6 15 9 23 6s12-12 12-20l-1 1c15 9 33 9 49 2 15-7 25-22 28-38 1-10 0-19-4-28l-1 1c7 15 5 33-4 46-8 15-24 23-41 23-9 0-18-2-26-7h-1c0 8-4 16-12 19-7 3-16 0-21-6h-1a81 81 0 0 1-72 45c-30-1-59-20-71-47-4-9-6-20-4-30 3-8 8-16 17-19h-1c-3 3-9-1-10-5-3-5 0-11 2-16 1 0 0 0 0 0-27-6-47-34-43-62 2-13 9-26 20-34 11-10 26-14 41-13 9 1 19 4 27 8a134 134 0 0 1 18 10c2 1 6 5 3 7h1c-1-10 12-18 21-12h1c10-25 38-36 63-34 30 3 54 24 73 46 9 12 21 31 10 45l1 1c7-4 17-1 22 6 4 8 2 18-5 23l1 1z" class="st1"/>
        </g>
        <g class="st2">
          <path d="M166 261c-1-17 12-34 28-38v-1c-17 4-30 21-29 39h1z" class="st3"/>
        </g>
        <g class="st2">
          <path d="M407 228a69 69 0 0 0-54-26v1c20 0 40 10 53 26 1 1 1 0 1-1z" class="st3"/>
        </g>
        <g class="st2">
          <path d="M397 370c17 2 34-8 41-24h-1c-7 15-23 25-40 23v1z" class="st3"/>
        </g>
        <g class="st2">
          <path d="M219 386c8 16 25 26 43 24v-1c-17 2-35-8-42-23h-1z" class="st3"/>
        </g>
      </g>
      <g :id="`cloud${id}-rain1`" class="cloud-rain1">
        <g class="st0">
          <path d="M242 465l14-14h-1l-14 14h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M199 439l14-15h-1l-14 14 1 1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M168 531l47-47v-1l-48 47c0 1 0 2 1 1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M279 505l84-84 24-24-1-1-84 85-24 24h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M294 462l39-39-1-1-39 40h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M225 531l27-27c1-1 0-1-1-1l-27 27c0 1 0 2 1 1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M168 493l61-61v-1l-62 61c0 1 0 2 1 1z" class="st1"/>
        </g>
      </g>
      <g :id="`cloud${id}-rain2`" class="cloud-rain2">
        <g class="st0">
          <path d="M290 430l15-14-1-1-14 14v1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M326 415l14-14-1-1-14 15h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M243 469l47-47v-1l-48 48h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M117 516l84-84 24-24-1-1-84 85-24 24h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M313 443l40-40h-1l-39 39v1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M211 449l27-27v-1l-28 27 1 1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M210 476l62-61-1-1-61 62c-1 0 0 1 0 0z" class="st1"/>
        </g>
      </g>
      <g :id="`cloud${id}-rain3`" class="cloud-rain3">
        <g class="st0">
          <path d="M199 458l14-14-1-1-14 15h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M154 479l71-71-1-1-71 72h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M117 516l25-25h-1l-25 25h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M385 402l25-25c1 0 0-1 0 0l-25 25c-1 0 0 1 0 0z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M302 486l35-35-1-1-35 35 1 1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M198 484l76-76-1-1-76 77h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M166 516l15-14-1-1-15 15h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M342 423l40-40v-1l-41 41h1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M274 491l27-27-1-1-27 27 1 1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M339 407l30-30h-1l-29 29v1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M261 486l49-49-1-1-49 49 1 1z" class="st1"/>
        </g>
        <g class="st0">
          <path d="M262 451l39-39v-1l-40 39 1 1z" class="st1"/>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
let id = 0;

export default {
  name: "rain-cloud",
  components: {},
  mixins: [],
  props: {
    raining: { type: Boolean },
    flipX: { type: Boolean },
    bob: { type: Boolean },
    track: { type: Boolean },
    size: { type: Number, default: 1 },
    scaleX: { type: Number, default: 1 },
    scaleY: { type: Number, default: 1 }
  },
  data() {
    return {
      id: 0,
      isRaining: true,
      styleObjectDocs: {
        color: "red",
        fontSize: "13px"
      }
    };
  },
  computed: {
    styleObject() {
      return {
        color: "red",
        transform: this.transformStyle
      };
      return {
        fontSize: "13px"
      };
    },
    transformStyle() {
      return [this.scaleStyle, this.flipStyle].join(" ");
    },
    scaleStyle() {
      return `scale(${this.scaleX * this.size}, ${this.scaleY * this.size})`;
    },
    flipStyle() {
      return "";
    }
  },
  watch: {},
  created() {
    id++;
    this.id = id;
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
@import "./../styles/animations";

.rain-cloud-container {
  transform-origin: 50% 70%;
  .st0 {
    opacity: 0.65;
  }
  .st1 {
    fill: #adbfc7;
  }
  .st2 {
    opacity: 0.54;
  }
  .st3 {
    fill: #ffffff;
  }

  [class^="cloud-rain"] {
    opacity: 0;
  }

  //states

  &.track {
    @include track-animation($duration: 25, $delay: 8);
  }

  &.bob > svg {
    @include bob-animation();
  }

  &.flipX .cloud-coud {
    transform: rotateY(180deg);
  }

  &.raining {
    .cloud-rain1 {
      @include flicker-animation($duration: 0.25);
    }
    .cloud-rain2 {
      @include flicker-animation($delay: 0.5);
    }
    .cloud-rain3 {
      @include flicker-animation($delay: 0.8, $duration: 0.4);
    }
  }
}
</style>
