<template>
  <div class="flex items-center mt-8 mb-8">
    <UIIconbutton
      @some-event="backButton()"
      bg="#efadad"
      bghover=""
      type=""
      :tooltip="$t('back')"
      classes="mr-4 w-12 h-12 md:!p-0 flex items-center justify-center"
    >
      <Icon name="eva:arrow-back-outline" size="30" />
    </UIIconbutton>
    <div
      class="md:text-5xl text-primary-800 dark:text-white font-bold flex justify- items-center"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const backButton = () => {
  router.back()
}
</script>

<style scoped></style>
