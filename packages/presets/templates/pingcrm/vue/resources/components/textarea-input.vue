<script setup lang="ts">
import { nanoid } from 'nanoid'
import { type PropType, ref } from 'vue'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  id: {
    type: String,
    default() {
      return `textarea-input-${nanoid()}`
    },
  },
  error: String,
  label: String,
  modelValue: String as PropType<string | null>,
})

defineEmits(['update:modelValue'])

const inputRef = ref<HTMLInputElement | null>(null)

const focus = () => {
  inputRef.value?.focus()
}

const select = () => {
  inputRef.value?.select()
}

defineExpose({ focus, select })
</script>

<template>
  <div :class="$attrs.class">
    <label v-if="label" class="form-label" :for="id">{{ label }}:</label>
    <textarea :id="id" ref="inputRef" v-bind="{ ...$attrs, class: null }" class="form-textarea"
      :class="{ error: error }" :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>
