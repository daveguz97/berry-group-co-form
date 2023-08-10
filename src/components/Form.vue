<script setup>
import { watchEffect } from 'vue';
import { useSessionStorage } from '@vueuse/core';
import emailjs from 'emailjs-com';
import { useSmoothieStore } from '../store/smoothie';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { storeToRefs } from 'pinia';

const smoothieStore = useSmoothieStore();
const { selectedSmoothie, showErrorMessage, smoothieState, allSmoothies } =
    storeToRefs(smoothieStore);

const signatureBowlStore = useSignatureBowlStore();
const { selectedSignatureBowl, bowlState } = storeToRefs(signatureBowlStore);

const sendEmail = async () => {
    const serviceID = 'service_43kez0s';
    const templateID = 'template_ltcvo0u';
    const userID = 'Rz4xcyykQw9RGco5t';
    console.log('it worked');
    console.log(smoothieStore.selectedSmoothie);
    const templateParams = {
        from_name: 'David Guzman',
        to_name: 'Victoria',
        smoothie: `Smoothie Name: ${selectedSmoothie.value.join(', ')}`,
        customBowl: 'Custom Bowls: ',
        signatureBowl: `Signature Bowls: \n\n
			${selectedSignatureBowl.value.join(', ')}
		`
    };

    try {
        console.log('Selected smoothie', selectedSmoothie);
        let response = await emailjs.send(serviceID, templateID, templateParams, userID);
        console.log('Email sent successfully!', response);
        resetSmoothie();
        resetSignatureBowl();
        console.log('Store :' + JSON.stringify(smoothieStore.allSmoothies));
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

const resetSmoothie = () => {
    smoothieState.value.forEach((smoothie) => {
        smoothie.collapsed = true;
        smoothie.checked = false;
    });
};

const resetSignatureBowl = () => {
    bowlState.value.forEach((bowl) => {
        bowl.collapsed = true;
        bowl.sizes.forEach((size) => {
            size.checked = false;
        });
    });
};
</script>

<template>
    <form @submit.prevent="sendEmail" class="form">
        <slot></slot>
    </form>
</template>

<style scoped></style>
