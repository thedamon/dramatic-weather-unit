<template>
<div class="title-card" v-show="showing">
  <Weather :weatherConditions="currentConditions"></Weather>
  <div v-if="locData.city && weatherData.condition" class="floater-box">
    <p>{{ locData.city }}, {{locData.country}}</p>
    <p>{{ weatherData.temp }}°, {{weatherData.condition}}</p>
    {{ weatherData }}
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
import debounce from "lodash.debounce";
import Weather from "./Weather";
import { getCurrentWeatherConditions, getLocation } from "./../currentWeather";

export default {
  name: "title-card",
  components: { Weather },
  data() {
    return {
      showing: true,
      text: "",
      locData: {},
      weatherData: {}
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
    },
    currentConditions() {
      if (this.weatherData && this.weatherData.condition) {
        return this.weatherData.condition;
      } else {
        return "Rain";
      }
    }
  },
  mounted() {
    this.text = this.$slots.default ? this.$slots.default[0].text : "";

    this.getCurrentWeather();

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
    getCurrentWeather: async function() {
      this.locData = await getLocation();
      const weather = await getCurrentWeatherConditions(await this.locData);
      this.weatherData = await weather.summary;
    },
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

<style lang="scss">
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

.floater-box {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 240px;
  font-size: 10px;
  border: 1px solid white;
  padding: 5px 10px;

  p {
    margin: 10px 0;
    line-height: 1.2;
  }
}
</style>
