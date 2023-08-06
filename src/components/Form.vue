<script setup>
import emailjs from 'emailjs-com'
import { useSmoothieStore } from '../store/smoothie'
import { storeToRefs } from 'pinia'

const store = useSmoothieStore()
const {selectedSmoothie, showErrorMessage, smoothieState } = storeToRefs(store);


const sendEmail = async () => {
    const serviceID = 'service_43kez0s'
    const templateID = 'template_ltcvo0u'
    const userID = 'Rz4xcyykQw9RGco5t'
    console.log('it worked')
    console.log(store.selectedSmoothie)
    const templateParams = {
        from_name: 'David Guzman',
        to_name: 'Victoria',
        smoothie: `Smoothie Name: ${selectedSmoothie.value.join(', ')}`,
        customBowl: 'Custom Bowls: ',
        signatureBowl: 'Signature Bowls: '
    }

    try {
		console.log('Selected smoothie', selectedSmoothie);
        let response = await emailjs.send(serviceID, templateID, templateParams, userID)
        console.log('Email sent successfully!', response)
		selectedSmoothie.value = []
		showErrorMessage.value = false;
		smoothieState.value = store.allSmoothies
    } catch (error) {
        console.error('Failed to send email:', error)
    }
}
</script>

<template>
    <form @submit.prevent="sendEmail" class="form">
        <slot></slot>
    </form>
</template>

<style scoped></style>
