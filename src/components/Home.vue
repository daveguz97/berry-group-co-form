<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue';
import { gsap } from 'gsap';

import { useRoute } from 'vue-router';

import Header from './Header.vue';

const headerTitle = ref('Pick your Options');

const route = useRoute();

const path = computed(() => route.path);

let bowlPrices = {
    '12 Oz': (10.0).toFixed(2),
    '16 Oz': (13.0).toFixed(2),
    '24 Oz': (16.0).toFixed(2)
};

const changeHeader = () => {
    switch (path.value) {
        case '/smoothies':
            headerTitle.value = `SMOOTHIES - 16 Oz`;
            break;
        case '/signatureBowls':
            headerTitle.value = `SIGNATURE BOWLS`;
            break;
        case '/customBowlSize':
            headerTitle.value = 'CHOOSE YOUR SIZE';
            break;
        case '/customBowls':
            headerTitle.value = 'BUILD YOUR OWN BOWL';
            break;
        case '/checkout':
            headerTitle.value = 'CHECKOUT';
            break;
        case '/success':
            headerTitle.value = '';
            break;
        default:
            headerTitle.value = 'PICK YOUR OPTIONS';
    }
};

watchEffect(() => {
    changeHeader();
});

// Create a fade in effect for header
onMounted(() => {
    gsap.from('.header', { duration: 1, opacity: 0 }).duration(1);
});
</script>

<template>
    <Header
        ><h4 class="header">{{ headerTitle }}</h4>
        <div
            class="wrapper"
            v-if="$route.path === '/signatureBowls' || $route.path === '/customBowls'"
        >
            <h6 class="header" v-for="(value, key) in bowlPrices" :key="key">
                <span class="size">{{ key }}</span> <span class="bowlPrice">${{ value }}</span>
            </h6>
        </div>
    </Header>
    <router-view></router-view>
</template>

<style scoped>
h4 {
    text-align: center;
    text-transform: none;
}
.wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
}

h6 {
    margin: 1rem 0.5rem;
    font-weight: 600;
}
.wrapper h6:not(:last-child) {
    border-right: 3px var(--border-color) solid;
}
.size {
    margin: 0 0.5rem;
}
</style>
