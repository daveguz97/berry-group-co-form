<script setup>
import { ref, computed, watchEffect } from 'vue'

import { useRoute } from 'vue-router'

import Header from './Header.vue'

const headerTitle = ref('Pick your Options')

const route = useRoute()

const path = computed(() => route.path)

let bowlPrices = {
    '12 OZ': (10.0).toFixed(2),
    '16 OZ': (13.0).toFixed(2),
    '24 OZ': (16.0).toFixed(2)
}

const changeHeader = () => {
    switch (path.value) {
        case '/smoothies':
            headerTitle.value = `Smoothies - 16 oz`
            break
        case '/signatureBowls':
            headerTitle.value = `Signature Bowls`
            break
		case '/customBowlSize':
			headerTitle.value = 'Choose your Size'
			break
        case '/customBowls':
            headerTitle.value = 'Build your bowl'
            break
        case '/checkout':
            headerTitle.value = 'Checkout'
            break
        default:
            headerTitle.value = 'Pick your Options'
    }
}

watchEffect(() => {
    changeHeader()
})
</script>

<template>
    <Header
        ><h3>{{ headerTitle }}</h3>
		<div class="wrapper" v-if="$route.path === '/signatureBowls' || $route.path === '/customBowls'">
			<h6 v-for="(value, key) in bowlPrices" :key="key">
				<span class="size">{{ key }}</span> <span class="bowlPrice">${{ value }}</span>
			</h6>
		</div>
    </Header>
    <router-view></router-view>
</template>

<style scoped>
h3 {
    text-align: center;
}
.wrapper {
	display: flex;
	justify-content: center;
}

h6 {
	margin: 1rem .5rem;
	font-weight: 700;
}
.wrapper h6:not(:last-child) {
	border-right: 3px var(--border-color) solid;
	padding: 0 .5rem;
}
.size {
	margin: 0 .5rem;
}
</style>
