<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { useCustomBowls } from '../store/customBowls';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
const store = useCustomBowls();

const { selectedSize, selectedSizeState } = storeToRefs(store);

const router = useRouter();
const route = useRoute();

const routeToPath = (item) => {
    selectedSize.value = item.name;
    router.push(`/customBowls`);
    selectedSizeState.value = selectedSize.value;
    route.params.size = selectedSize.value;
};
const handleClick = (item) => {
    routeToPath(item);
};

onMounted(() => {
	gsap.from('.customBowlChoices', { duration: 1, opacity: 0 }).duration(1);
});
</script>
<template>
    <div class="customBowlChoices">
        <div class="container">
            <div
                class="card"
                v-for="item in store.size"
                :key="item.name"
                @click="handleClick(item)"
            >
                <div class="content">
                    <h4 class="size">{{ item.name }}</h4>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.customBowlChoices {
    text-align: center;
}
.customBowlChoices .container {
    display: flex;
	flex-direction: row;
	justify-content: space-around;
	text-align: center;
    align-items: center;
    margin: 0 auto;
}

@media screen and (max-width: 768px) {
    .customBowlChoices .container {
        display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-gap: 1rem;
    }
}
</style>
