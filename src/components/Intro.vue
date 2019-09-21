<template>
  <header class="intro">
    <StaggerIn
      class="teaser"
      tag="div"
      :stepDelay="1800"
      :delayStart="800"
    >
      <p
        v-for="(line, i) in lines"
        :key="i"
        :data-index="i"
      >
        <VueTyper
          :text="line"
          :repeat="0"
          :type-delay="70"
          :pre-type-delay="i * 1500"
        />
      </p>
    </StaggerIn>
    <TitleCard>This is the Dramatic Weather Agency.</TitleCard>
  </header>
</template>

<script>
import TitleCard from "./TitleCard";
import StaggerIn from "./StaggerIn";
import store from "../store/store";
import { VueTyper } from "vue-typer";

export default {
  name: "intro",
  components: { VueTyper, TitleCard, StaggerIn },
  data() {
    return {
      q: "What"
    };
  },
  computed: {
    currentTime() {
      return (
        store.state.now &&
        store.state.now.toLocaleTimeString([], { timeStyle: "short" })
      );
    },
    city() {
      return store.state.location && store.state.location.city;
    },
    lines() {
      return (
        store.state.now && [
          `It's ${this.currentTime}.`,
          `Somewhere just outside ${this.city}.`
        ]
      );
    }
  }
};
</script>

<style lang="scss">
.teaser {
  width: 400px;
  left: calc(50% - 200px);
  margin: 3vh auto;

  p {
    margin: 20px 0;
  }
}
.vue-typer .custom.char.typed {
  color: white;
}
</style>