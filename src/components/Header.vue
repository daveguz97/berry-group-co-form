<script setup>
import { onMounted } from 'vue';
import { useSmoothieStore } from '../store/smoothie';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { useCustomBowls } from '../store/customBowls';
import { gsap } from 'gsap';

const smoothieStore = useSmoothieStore();
const signatureBowlStore = useSignatureBowlStore();
const customBowlStore = useCustomBowls();

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
        <div class="logo-div">
            <router-link to="/">
                <img class="logo" src="../assets/berry-bar-co-logo.webp" alt="Berry Bar Co. Logo" />
            </router-link>
        </div>
        <router-link to="/checkout">
            <div class="store-container">
                <font-awesome-icon class="store" icon="cart-plus" size="lg" />
				<div>{{ calculateState() }}</div>
            </div>
        </router-link>
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
}

.title {
	font-size: 1.2rem;
}
.logo-div {
	width: 100%;
	margin: .5rem 0;
}
.logo {
    max-width: 100px;
}

.store-container {
	position: absolute;
    top: 30px;
    right: 0;
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
