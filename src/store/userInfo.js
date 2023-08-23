import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useUserInfo = defineStore('setUserInfo', () => {
    const firstName = ref('');
    const phoneNumber = ref('');

    return {
        firstName,
        phoneNumber
    };
});
