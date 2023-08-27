<script setup>
import { onMounted } from 'vue';
import { useSmoothieStore } from '../store/smoothie';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { useCustomBowls } from '../store/customBowls';
import {storeToRefs} from 'pinia';
import { useRouter } from 'vue-router';
import { gsap } from 'gsap';

const smoothieStore = useSmoothieStore();
const signatureBowlStore = useSignatureBowlStore();
const customBowlStore = useCustomBowls();

let {
    showErrorMessage: showErrorMessageForSmoothie, allSmoothies
} = storeToRefs(smoothieStore);

let {
    showErrorMessage: showErrorMessageForBowl, signatureBowls
} = storeToRefs(signatureBowlStore);

let {
    showErrorMessage: showErrorMessageForCustom
} = storeToRefs(customBowlStore);

const route = useRouter();

const navigateHome = () => {
    showErrorMessageForBowl.value = false;
    showErrorMessageForSmoothie.value = false;
    showErrorMessageForCustom.value = false;
    allSmoothies.value.forEach(smoothie => {
        smoothie.collapsed = true;
    })
    signatureBowls.value.forEach(bowl => {
        bowl.collapsed = true;
    })
    route.push('/');
}

const navigateCheckout = () => {
    if (calculateState() > 0) {
        showErrorMessageForBowl.value = false;
        showErrorMessageForSmoothie.value = false;
        showErrorMessageForCustom.value = false;
        allSmoothies.value.forEach(smoothie => {
            smoothie.collapsed = true;
        })
        route.push('/checkout');
    } else {
        showErrorMessageForBowl.value = true;
        showErrorMessageForSmoothie.value = true;
        showErrorMessageForCustom.value = true;
    }
    signatureBowls.value.forEach(bowl => {
            bowl.collapsed = true;
        })
}

const calculateState = () => {
	let totalAmountOfItems = smoothieStore.selectedSmoothieState.length + signatureBowlStore.selectedSignatureBowlState.length + customBowlStore.selectedCustomBowl.length;
	return totalAmountOfItems; 
}

// Fade in logo
onMounted(() => {
	gsap.from('header', { duration: 1, opacity: 0}).duration(1);
})
</script>

<template>
    <header>
		<div class="wrapper">

			<div class="logo-div">
					<img @click="navigateHome" class="logo" src="../assets/berry-bar-co-logo.webp" alt="Berry Bar Co. Logo" />
			</div>
				<div class="store-container" @click="navigateCheckout">
					<font-awesome-icon class="store" icon="cart-plus" size="lg" />
					<div>{{ calculateState() }}</div>
				</div>
		</div>
        <div class="title"><slot></slot></div>
    </header>
</template>

<style scoped>
@import url('../assets/base.css');
header {
    max-width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
	justify-content: flex-start;
    margin: 0 auto;
    justify-content: space-around;
    position: relative;
	top: 0;
	text-align: center;
}
.wrapper {
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	margin: 1rem;
}
.title {
	font-size: 1.2rem;
}
.logo-div {
	margin: .5rem 0;
	align-self: flex-start;
}
.logo {
    max-width: 100px;
}

.store-container {
	position: relative;
	margin-right: 1rem;
	cursor: pointer;
}

.store-container div {
	background-color: var(--periwinkle);
	border-radius: 50%;
	color: white;
	text-align: center;
	position: absolute;
	width: 25px;
	height: 25px;
	left: 10px;
	top: 18px;
}
.store {
    color: var(--periwinkle);
}
</style>
