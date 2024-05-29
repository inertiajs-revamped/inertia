<script setup lang="ts">
import { nanoid } from 'nanoid'
import { type PropType, ref, watch } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  id: {
    type: String,
    default: () => `select-input-${nanoid()}`,
  },
  error: String,
  label: String,
  modelValue: [String, Number, Boolean] as PropType<
    string | number | boolean | null
  >,
})

const emit = defineEmits(['update:modelValue'])

const selected = ref(props.modelValue)
const inputRef = ref<HTMLInputElement | null>(null)

watch(selected, (selected) => {
  emit('update:modelValue', selected)
})

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
    <select :id="id" ref="inputRef" v-model="selected" v-bind="{ ...$attrs, class: null }"
      class="form-select focus:outline-none focus:ring-1 focus:ring-indigo-400" :class="{ error: error }">
      <slot />
    </select>
    <div v-if="error" class="form-error">{{ error }}</div>
  </div>
</template>
