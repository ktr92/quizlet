<template>
  <div class="w-full">
    <input
      type="text"
      :name="props.name"
      :value="inputValue"
      :placeholder="props.placeholder"
      @input="(event) => onChange(event)"
      @keyup.enter="onEnter"
      @blur="handleBlur"
      class="w-full px-4 border-0 border-b-4 border-slate-400 hover:border-slate-500 focus:border-b-primary-500 outline-none transition-all h-10 dark:bg-gray-700 dark:text-white"
    />
    <span v-if="errorMessage && meta.touched" class="text-red-700 text-sm">{{
      errorMessage
    }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate"
const emits = defineEmits(["update:modelValue", "onEnter"])
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
  },

  name: {
    type: String,
    default: "",
  },
  errors: {
    type: String,
    required: false,
  },
})

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(props.name, undefined, {
  initialValue: props.modelValue,
  valueProp: props.modelValue,
})

const onEnter = () => {
  emits("onEnter")
}

const onChange = (event: Event) => {
  handleChange(event, true)
  emits("update:modelValue", (<HTMLTextAreaElement>event.target).value)
}

const valueProp = computed(() => props.modelValue)
watchEffect(() => {
  inputValue.value = valueProp.value
})
</script>
