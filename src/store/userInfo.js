import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useUserInfo = defineStore('setUserInfo', () => {
    const firstName = ref('');
    const email = ref('');
    const phoneNumber = ref('');

    return {
        firstName,
        email,
        phoneNumber
    };
});
