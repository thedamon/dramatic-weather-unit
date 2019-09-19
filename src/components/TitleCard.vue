<template>
  <div
    class="title-card"
    v-show="showing"
  >
    <Weather :weatherConditions="currentConditions"></Weather>
    <h1 class="title"></h1>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import Weather from "./Weather";
import StaggerIn from "./StaggerIn";
import { mapGetters } from "vuex";
import store from "../store/store";

export default {
  name: "title-card",
  components: { Weather, StaggerIn },
  data() {
    return {
      showing: true,
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
    ...mapGetters(["location", "realWeatherSummary"]),
    lines() {
      return typeof this.text === "string" && this.text.split(this.splitter);
    },
    delays() {
      return [8, 8, 2, 3, 8, 5].map(n => {
        return n * 70;
      });
    },
    currentConditions() {
      if (this.realWeatherSummary && this.realWeatherSummary.condition) {
        return this.realWeatherSummary.condition;
      } else {
        return "Rain";
      }
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
  }
};
</script>

<style lang="scss">
h1 {
  margin: 0;
  line-height: 12vh;
  font-size: calc(10px + 4vh);
}
.title-card {
  height: 120vh;
  padding-top: 16vh;
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
  position: relative;
  z-index: 5;
  background: rgba(#0c1a3c, 0.7);
}
</style>
