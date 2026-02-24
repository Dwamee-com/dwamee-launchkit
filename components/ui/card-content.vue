<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()

const base = 'p-6 pt-0'
</script>

<template>
  <div :class="[base, props.class]">
    <slot />
  </div>
</template>

