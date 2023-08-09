<template>
  <div>
    <div class="flex max-auto my-2 md:my-8 justify-center">
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
    <!-- /.flex -->
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
})
</script>

<style scoped></style>
