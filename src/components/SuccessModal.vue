<template>
    <div v-if="successShow" class="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
        <div class="min-h-80 w-3/5 relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button @click="closeModal" type="button"
                class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
            <div class="p-4 md:p-5 text-center">
                <div class="text-white text-4xl uppercase">Ваша заявка успешно отправлена!
                </div>
                <div class="text-white mb-5 mt-5 text-lg font-normal" v-html="getRequest">
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { computed } from 'vue';
import { useStore } from "vuex";

const store = useStore();
const getRequest = computed(() => store.getters.getRequest);
const successShow = computed(() => store.getters.getSuccessShow);
const closeModal = () => store.dispatch("toggleSuccessModal");
</script>
  