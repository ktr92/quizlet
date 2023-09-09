<template>
  <UIModalBase :show="show">
    <slot :emit-result="emitResult">
      <div class="p-4">
        <slot name="header" :emit-result="emitResult">
          <div class="text-xl !font-bold">
            <slot name="title"></slot>
          </div>
        </slot>

        <slot name="body">
          <div class="py-2 text-md my-4">
            <slot name="text"></slot>
          </div>
        </slot>

        <slot name="actions" :emit-result="emitResult">
          <div class="flex justify-end gap-2">
            <UIButton
              class="bg-indigo-200 px-3 py-1 font-medium"
              @click="$emit('result', false)"
            >
              Cancel
            </UIButton>

            <UIButton
              type="danger"
              class="bg-indigo-200 px-3 py-1 font-medium"
              @click="$emit('result', true)"
            >
              Yes
            </UIButton>
          </div>
        </slot>
      </div>
    </slot>
  </UIModalBase>
</template>
<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: "result", value: boolean): void
}>()

function emitResult(value: boolean) {
  emit("result", value)
}
</script>
