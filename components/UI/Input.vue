<template>
  <div class="w-full">
    <input
      type="text"
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      @input="(event) => onChange(event)"
      @keyup.enter="$emit('onEnter')"
      @blur="handleBlur"
      class="w-full px-4 border-0 border-b-4 border-slate-400 hover:border-slate-500 focus:border-b-primary-500 outline-none transition-all h-10 dark:bg-gray-700 dark:text-white"
    />
    <span v-if="errors">{{ errors }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate"

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
})

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },
  errors: {
    type: String,
    required: false,
  },
})
const onChange = (event: Event) => {
  emits("update:modelValue", (<HTMLTextAreaElement>event.target).value)
}
</script>
