<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()

const base = 'rounded-lg border bg-card text-card-foreground shadow-sm'
</script>

<template>
  <div :class="[base, props.class]">
    <slot />
  </div>
</template>

