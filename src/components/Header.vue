<script setup>
import { useSmoothieStore } from '../store/smoothie';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { useCustomBowls } from '../store/customBowls';

const smoothieStore = useSmoothieStore();
const signatureBowlStore = useSignatureBowlStore();
const customBowlStore = useCustomBowls();

const calculateState = () => {
	let totalAmountOfItems = smoothieStore.selectedSmoothieState.length + signatureBowlStore.selectedSignatureBowlState.length + customBowlStore.selectedCustomBowl.length;
	return totalAmountOfItems; 
}
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
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 90%;
    margin: 0 auto;
    justify-content: space-around;
    position: relative;
    width: 100vw;
}
.logo {
    max-width: 200px;
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
