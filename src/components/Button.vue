

<template>
  <button @click="handleShowModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {{ mapCity[city].name }}
  </button>
</template>

<script setup>
import { useStore } from "vuex";

const props = defineProps({
  city: String,
});

const store = useStore();

const mapCity = {
  moscow: {
    name: 'Заказать в Москву',
    selectName: 'Москва'
  },
  petersburg: {
    name: 'Заказать в Санкт-Петербург',
    selectName: 'Санкт-Петербург'
  }
};

const handleShowModal = () => {
  const { city } = props;
  store.dispatch("toggleModal");
  store.dispatch("selectCity", mapCity[city].selectName);
};
</script>
