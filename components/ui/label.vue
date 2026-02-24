<script setup lang="ts">
const props = defineProps<{
  for?: string
  class?: string
}>()

const baseClass = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
</script>

<template>
  <label :for="props.for" :class="[baseClass, props.class]">
    <slot />
  </label>
</template>

