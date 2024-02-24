<template>
  <div class="min-h-screen grid place-items-center">
    <div class="grid gap-4">
      <Button city="moscow" />
      <Button city="petersburg" />
    </div>
    <FormModal />
    <SuccessModal />
    <ErrorModal />
  </div>
</template>

<script setup>
import Button from './components/Button.vue';
import FormModal from './components/FormModal.vue';
import ErrorModal from './components/ErrorModal.vue';
import SuccessModal from './components/SuccessModal.vue';
</script>
