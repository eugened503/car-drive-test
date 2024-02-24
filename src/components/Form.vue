<template>
    <form @submit.prevent="submitForm" class="space-y-4" action="#">
        <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ваше имя
            </label>
            <input v-model="form.name" type="text" name="name" id="name" placeholder="Введите Имя"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
            <div class="h-2 text-rose-600">
                <div v-for="(error, index) of v$.name.$errors" :key="index">
                    <p class="">{{ error.$message }}</p>
                </div>
            </div>
        </div>
        <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Номер телефона
            </label>
            <input v-model="form.phone" v-imask="phoneNumberMask" placeholder="+7 (921) 123-45-67" @keypress="isNumber"
                @accept="onAccept" maxlength="18" type="tel" name="phone" id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />

            <div class="h-2 text-rose-600">
                <div v-for="(error, index) of v$.phone.$errors" :key="index">
                    <p class="">{{ error.$message }}</p>
                </div>
            </div>
        </div>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Адрес электронной почты
            </label>
            <input v-model="form.email" type="email" name="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com" />

            <div class="h-2 text-rose-600">
                <div v-for="(error, index) of v$.email.$errors" :key="index">
                    <p class="">{{ error.$message }}</p>
                </div>
            </div>
        </div>
        <div class="col-span-2 sm:col-span-1">
            <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Город</label>
            <select v-model="form.selectCity" id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option v-for="option in options" :key="option.id" :value="option.name">
                    {{ option.name }}
                </option>
            </select>
        </div>
        <button type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Отправить
        </button>
    </form>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import {
    required,
    minLength,
    maxLength,
    helpers,
    email,
} from "@vuelidate/validators";
import { options, phoneNumberMask } from '../helpers/constants';

const form = ref({
    name: "",
    phone: "",
    email: "",
    selectCity: "",
});

onMounted(() => {
    getSelectCity();
});

const store = useStore();

const selectCity = computed(() => store.getters.getSelectCity);

const rules = computed(() => {
    const localRules = {
        name: {
            $autoDirty: true,
            required: helpers.withMessage("Поле является обязательным", required),
            minLength: helpers.withMessage(
                "Минимальная длина имени - 2 символа",
                minLength(2)
            ),
            maxLength: helpers.withMessage(
                "Максимальная длина имени - 30 символов",
                maxLength(30)
            ),
        },

        phone: {
            $autoDirty: true,
            required: helpers.withMessage("Поле является обязательным", required),
        },

        email: {
            $autoDirty: true,
            required: helpers.withMessage("Поле является обязательным", required),
            email: helpers.withMessage("Некорректный e-mail", email),
        },
    };
    return localRules;
});

const v$ = useVuelidate(rules, form);

const submitForm = async () => {
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) return;

    const { name, phone, email, selectCity } = form.value;
    const orderData = {
        name: name,
        phone: convertNumberformat(phone),
        email: email,
        city_id: getOptionId(selectCity),
    }

    store.dispatch("sendOrderRequest", orderData)
};

const onAccept = (e) => {
    const maskRef = e.detail;
    form.phone = maskRef.value;
};

const isNumber = (e) => {
    const regex = /[0-9]/

    if (!regex.test(e.key)) {
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
    }
};

const convertNumberformat = (str) => {
    const regex = /\d+/g;
    return "+" + str.match(regex).join('')
};

const getOptionId = (name) => {
    return options.find(option => option.name === name).id
};

const getSelectCity = () => {
    form.value.selectCity = selectCity.value;
};
</script>
  