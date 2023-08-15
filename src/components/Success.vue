<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
	router.push('/')
}
</script>
<template>
<div class="container">
	<h4>
		Thank you for your order!
	</h4>

	<button class="order-button" @click="goHome">Create Another Order</button>
</div>
</template>

<style scoped>
.container {
	height: 50vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
}

h4 {
	margin-bottom: 1rem;
}

button {
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

button:hover {
    background-color: var(--light-green-color);
}
</style>