<script setup lang="ts">
import { nanoid } from 'nanoid'
import { type PropType, ref } from 'vue'

defineOptions({ inheritAttrs: false })

defineProps({
  id: {
    type: String,
    default: () => `text-input-${nanoid()}`,
  },
  type: {
    type: String,
    default: 'text',
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

const setSelectionRange = (start: number, end: number) => {
  inputRef.value?.setSelectionRange(start, end)
}

defineExpose({ focus, select, setSelectionRange })
</script>

<template>
  <div :class="$attrs.class">
    <label v-if="label" class="form-label" :for="id">{{ label }}:</label>
    <input :id="id" ref="inputRef" v-bind="{ ...$attrs, class: null }"
      class="form-input focus:outline-none focus:ring-1 focus:ring-indigo-400" :class="{ error: error }" :type="type"
      :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>
