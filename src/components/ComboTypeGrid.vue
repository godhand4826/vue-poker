<script setup lang="ts">
defineProps<{
  isSelected: boolean
  isPair: boolean
  isSuit: boolean
  isOffsuit: boolean
  text: string
}>()
</script>

<template>
  <div
    v-bind:class="{
      selected: isSelected,
      pair: isPair,
      suited: isSuit,
      'off-suited': isOffsuit
    }"
  >
    {{ text }}
  </div>
</template>

<style scoped>
.suited {
  color: lightgreen;
}

.off-suited {
  color: lightblue;
}

.pair {
  color: lightpink;
}

.selected {
  background-color: rgb(60, 60, 60);
}
</style>
