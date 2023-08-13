<script setup>
import emailjs from 'emailjs-com';
import { useSmoothieStore } from '../store/smoothie';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { useCustomBowls } from '../store/customBowls';
import { storeToRefs } from 'pinia';

const smoothieStore = useSmoothieStore();
const { selectedSmoothieState, allSmoothies } = storeToRefs(smoothieStore);

const signatureBowlStore = useSignatureBowlStore();
const { selectedSignatureBowlState, signatureBowls } = storeToRefs(signatureBowlStore);

let customBowlStore = useCustomBowls();

const {
	customBowl,
	selectedCustomBowlBy12Oz,
	selectedCustomBowlBy16Oz,
	selectedCustomBowlBy24Oz
} = storeToRefs(customBowlStore);

const sendEmail = async () => {
    const serviceID = 'service_43kez0s';
    const templateID = 'template_ltcvo0u';
    const userID = 'Rz4xcyykQw9RGco5t';
    console.log('it worked');
    console.log(smoothieStore.selectedSmoothie);
    const templateParams = {
        from_name: 'David Guzman',
        to_name: 'Victoria',
        smoothie: `Smoothie Name: ${selectedSmoothieState.value?.join(', ')}`,
        customBowl: `Custom Bowls: \n
			${selectedCustomBowlBy12Oz ? selectedCustomBowlBy12Oz.value?.join(' ') + '\n' : ''}
			${selectedCustomBowlBy16Oz ? selectedCustomBowlBy16Oz.value?.join(' ')  + '\n': ''}
			${selectedCustomBowlBy24Oz ? selectedCustomBowlBy24Oz.value?.join(' ')  + '\n': ''}`,
        signatureBowl: `Signature Bowls: \n
			${selectedSignatureBowlState.value?.join(', ')}
		`
    };

    try {
        let response = await emailjs.send(serviceID, templateID, templateParams, userID);
        console.log('Email sent successfully!', response);
        console.log('bowl state: ' + JSON.stringify(selectedSignatureBowlState.value));

        console.log('smoothie state: ' + JSON.stringify(selectedSmoothieState.value));
        resetSmoothie();
        resetSignatureBowl();
        resetCustomBowl();
        console.log('Store :' + JSON.stringify(smoothieStore.allSmoothies));
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

const resetSmoothie = () => {
    allSmoothies.value.forEach((smoothie) => {
        smoothie.checked = false;
        smoothie.collapsed = true;
    });
    selectedSmoothieState.value = [];
    console.log('selected smoothie state', selectedSmoothieState.value);
};

const resetSignatureBowl = () => {
    signatureBowls.value.forEach((bowl) => {
        bowl.collapsed = true;
        bowl.sizes.forEach((size) => {
            size.checked = false;
        });

		selectedSignatureBowlState.value = [];
    });

	console.log('selectedSignatureBowlState', selectedSignatureBowlState.value);

    selectedSignatureBowlState.value = [];
};

const resetCustomBowl = () => {
    customBowl.value.forEach(bowl => {
		bowl.base.forEach(base => {
			base.checked = false;
		})

		bowl.toppings.forEach(topping => {
			topping.checked = false;
		})

		bowl.fruits.forEach(fruit => {
			fruit.checked = false;
		})
	})

	selectedCustomBowlBy12Oz.value = [];
	console.log('selectedCustomBowlBy12Oz', selectedCustomBowlBy12Oz.value);
};
</script>

<template>
    <form @submit.prevent="sendEmail" class="form">
        <slot></slot>
    </form>
</template>

<style scoped></style>
