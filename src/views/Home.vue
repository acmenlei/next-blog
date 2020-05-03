<template>
  <div id="Home">
    <Maske />
  </div>
</template>
<script>
import Maske from "../components/HomeComponents/Maske";
export default {
  name: "home",
  components: {
    Maske
  }
};
</script>
<style lang="scss" scoped>
#Home {
  width: 100%;
}
</style>