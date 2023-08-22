<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import Base from './Base.vue';
import FormButtons from './FormButtons.vue';
import Fruits from './Fruits.vue';
import Toppings from './Toppings.vue';

onMounted(() => {
	gsap.from('.container', { duration: 1, opacity: 0 }).duration(1);
});
</script>

<template>
	<div class="container">
		<Base></Base>
		<Fruits></Fruits>
		<Toppings></Toppings>
		<FormButtons></FormButtons>
	</div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.logo-div,
.info {
    margin: 2rem 0;
}
.logo {
    max-width: 250px;
}

.title,
.description h6 {
    color: var(--periwinkle);
}
.title {
    letter-spacing: 10px;
    font-weight: 500;
}

.pricing {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}

.pricing ul {
    display: flex;
}

.pricing ul li {
    margin: 0 0.5rem;
    font-weight: 500;
}

.pricing ul li:not(:last-child) {
    border-right: 3px var(--border-color) solid;
    padding: 0 1rem;
}
.description {
    position: relative;
    width: 100%;
}
.description h6 {
    letter-spacing: 3px;
    font-family: heavyFont, sans-serif;
    font-weight: 500;
}

.organic-info {
    color: var(--dark-green-color);
}

</style>
