<template>
  <header>
    <div class="intro">
      <p>It's {{ currentTime }}.</p>
      <p>Somewhere just outside {{ city }}.</p>
      <p>The wind is about to shift.</p>
    </div>
    <TitleCard>This is the Dramatic Weather Agency.</TitleCard>
  </header>
</template>

<script>
import TitleCard from "./TitleCard";
import store from "../store/store";

export default {
  name: "intro",
  components: { TitleCard },
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
    }
  }
};
</script>

<style>
.intro {
  position: absolute;
  width: 400px;
  left: calc(50% - 200px);
  margin: 5vh auto;
}
</style>