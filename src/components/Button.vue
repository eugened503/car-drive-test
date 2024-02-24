

<template>
  <button @click="handleShowModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {{ mapCity[city].name }}
  </button>
</template>

<script setup>
import { useStore } from "vuex";
import { mapCity } from "../helpers/constants";

const props = defineProps({
  city: String,
});

const store = useStore();

const handleShowModal = () => {
  const { city } = props;
  store.dispatch("toggleFormModal");
  store.dispatch("selectCity", mapCity[city].selectName);
};
</script>
