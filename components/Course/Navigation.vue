<template>
  <div>
    <div class="flex max-auto my-8 md:my-8 justify-center">
      <div class="mx-2 md:mx-4" v-if="props.condition1">
        <UIButton
          @click="$emit('someEvent1')"
          size="lg"
          :liquid="false"
          :rounded="true"
          type="danger"
        >
          {{ text1 }}
        </UIButton>
      </div>
      <div class="mx-2 md:mx-4" v-if="props.condition2">
        <UIButton
          @click="$emit('someEvent2')"
          size="lg"
          :liquid="false"
          :rounded="true"
          type="primary"
        >
          {{ text2 }}
        </UIButton>
      </div>
    </div>
    <div>
      <UIProgress :value="barWidthCalculated" />
      <div v-if="falseItems?.length">
        <h3 class="text-xl font-bold text-red-400">Wrong answers</h3>
        <UITable :items="falseItems"></UITable>
      </div>
      <div v-if="trueItems?.length">
        <h3 class="text-xl font-bold text-[#08BB3C]">Right answers</h3>
        <UITable :items="trueItems"></UITable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  condition1: {
    type: Boolean,
    default: true,
  },
  condition2: {
    type: Boolean,
    default: true,
  },
  text1: {
    type: String,
    required: true,
  },
  text2: {
    type: String,
    required: true,
  },
  trueItems: {
    type: Array<IWord>,
    required: false,
  },
  falseItems: {
    type: Array<IWord>,
    required: false,
  },
  count: {
    type: Number,
    default: 0,
  },
})

const barWidthCalculated = computed(() => {
  return props.falseItems
    ? ((props.count - props.falseItems.length) / props.count) * 100
    : 0
})
</script>

<style scoped></style>
