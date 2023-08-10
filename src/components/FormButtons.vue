<script setup>
import { watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSmoothieStore } from '../store/smoothie';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { useSessionStorage } from '@vueuse/core';

const route = useRouter();
const smoothieStore = useSmoothieStore();
const signatureBowlStore = useSignatureBowlStore();

let {
    showErrorMessage: showErrorMessageForSmoothie,
    selectedSmoothie,
    smoothieState
} = storeToRefs(smoothieStore);

let {
    bowlState,
    selectedSignatureBowl,
    showErrorMessage: showErrorMessageForBowl
} = storeToRefs(signatureBowlStore);

const handleSmoothieCheckout = () => {
    let smoothieOptions = new Set();

    smoothieState.value.some((smoothie) => {
        if (smoothie.checked) {
            smoothieOptions.add(smoothie.name);
            route.push('/checkout');
            showErrorMessageForSmoothie.value = false;
        }
        console.log(smoothieOptions, smoothieOptions);

        if (smoothieOptions.size > 0) {
            selectedSmoothie.value = [...smoothieOptions];
            console.log(selectedSmoothie.value);
        }

        if (smoothieOptions.size <= 0) {
            showErrorMessageForSmoothie.value = true;
        }
    });
};

const handleSignatureBowlCheckout = () => {
    let signatureBowlOptions = new Set();

    bowlState.value.some((bowl) => {
        bowl.sizes.forEach((size) => {
            if (size.checked) {
                signatureBowlOptions.add(`${bowl.name} - ${size.size}`);
                route.push('/checkout');
                showErrorMessageForBowl.value = false;
            }
            console.log(signatureBowlOptions);
        });

        if (signatureBowlOptions.size > 0) {
            selectedSignatureBowl.value = [...signatureBowlOptions];
            console.log(selectedSignatureBowl.value);
        }
        if (signatureBowlOptions.size <= 0) {
            showErrorMessageForBowl.value = true;
        }
    });
};

const handleDisplayCheckout = () => {
    let { path } = route.currentRoute.value;

	if(path === '/smoothies') {
		return handleSmoothieCheckout();
	}

	if(path === '/signatureBowls') {
		return handleSignatureBowlCheckout();
	}
};

const navigatePrevious = () => {
    route.go(-1);
};
</script>

<template>
    <div class="form-buttons">
        <button class="prev-button" @click.prevent="navigatePrevious">Previous</button>
        <button class="next-button" @click.prevent="handleDisplayCheckout">Next</button>
    </div>
</template>

<style scoped>
@import '../assets/base.css';

.next-button,
.prev-button {
    border: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: var(--lighter-green-color);
    margin: 0 0.5rem;
    width: 150px;
    height: 30px;
    transition: all 0.3s ease-in-out;
    text-align: center;
}

.next-button:hover,
.prev-button:hover {
    background-color: var(--light-green-color);
}

.form-buttons {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}
</style>
