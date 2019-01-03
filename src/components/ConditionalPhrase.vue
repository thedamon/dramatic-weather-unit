<template>
  <div class="conditional-phrase">
    <p v-html="text"></p>
  </div>
</template>

<script>
import sample from "lodash.sample";

const phrases = [
  `A stranger stranded in the mist.`,
  `A ray of sunlight acts as a spotlight.`,
  `Sheets and sheets and sheets of rain.`,
  `A light in the fog.`,
  `A thick pillow of snow to suppress the cries.`,
  `Heavy news on such a heavy day`,
  `(Oh, the humidity!)`,
  ``,
  `Dry leaves skitter and whirl`,
  `Warm fingers of sunshine cut through the winter`,
  `Like there’s layers under everything`,
  `That subtle, just-so breeze in the heady summer night`,
  `Never should a sunshower be wasted`,
  `Clouds pile on clouds pile on deep deep eerie grey`,
  `Leaves thrown around you in a vortex`,
  `This strange humid moment`,
  ``,
  ``,
  ``,
  `A careful winter blizzard set-piece`,
  ``,
  ``,
  `A sudden electric shadow over the tile as the thunder clacks outside`,
  `the old grey oak crashes down in the backyard`,
  `branches hammer at the windows and the windows rattle back`,
  `the fog rises thick off the highway and your eyes drooooop heavy`,
  `the drab silhouette of your Volkswagen rammed into the only tree for miles`,
  `What a great image!`,
  `it’s like a metaphor for loneliness or something`,
  `the breeze carries the warmth of the day and the serene cool of the evening woven together and everything becomes possible`,
  `you breathe that air and realize the thing you should have realized years ago`,
  `A necessary truth buried in that delicious pain.`,
  `Your ears burning in the whipping wind.`,
  ``,
  `It starts to rain cold and you just stand there just getting drenched`,
  `Electricity arcing off the electric lines`,
  `Isn't it neat how one feeling can go out and find its forgotten twin deep inside your memory`,
  `Lying in the long wet night grass.`,
  ``,
  `A drop's drop in a universe of buckets`
];

export default {
  name: "",
  components: {},
  mixins: [],
  props: {
    weatherConditions: { type: String, default: "clear" }
  },
  data() {
    return {};
  },
  computed: {
    text() {
      if (this.weatherConditions !== "clear") {
        return sample(phrases);
      } else {
        return "";
      }
    }
  },
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style>
.conditional-phrase {
  font-style: italic;
  opacity: 0.6;
  color: transparent;
  text-shadow: -2px 2px 2px #333;
  font-size: 48px;
}
</style>