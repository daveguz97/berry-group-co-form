<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import Smoothies from './Smoothies.vue';
import SignatureBowls from './SignatureBowls.vue';
import CustomBowlSize from './CustomBowlSize.vue';
const SmoothiesRoute = { template: Smoothies };
const SigBowlsRoute = { template: SignatureBowls };
const CustomBowlSizeRoute = { template: CustomBowlSize };

let id = 0;
const content = ref([
    {
        id: id++,
        icon: ['fas', 'blender'],
        name: 'smoothies',
        path: '/smoothies',
        template: SmoothiesRoute
    },
    {
        id: id++,
        icon: ['fas', 'leaf'],
        name: 'signature bowls',
        path: '/signatureBowls',
        template: SigBowlsRoute
    },
    {
        id: id++,
        icon: ['fas', 'seedling'],
        name: 'Custom Bowls',
        path: '/customBowlSize',
        template: CustomBowlSizeRoute
    }
]);

onMounted(() => {
    gsap.from('.choices', { duration: 1, opacity: 0 }).duration(1);
});
</script>

<template>
    <section class="choices">
        <div class="container">
            <router-link v-for="item in content" :key="item.id" :to="item.path">
                <div class="card" @click="$router.path">
                    <div class="content">
                        <font-awesome-icon :icon="item.icon" size="lg" style="color: #872ab5" />
                        <h6>{{ item.name }}</h6>
                    </div>
                </div>
            </router-link>
        </div>
    </section>
    <footer>
        <small><sup>*</sup> Order must be submitted by 10:30 AM</small>
        <small><sup>*</sup>Deliveries are not available on Tuesdays and Wednesdays</small>
    </footer>
</template>

<style scoped>
.choices .container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
    align-items: center;
    justify-content: center;
}

footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
	position: relative;
	bottom: 0;
	margin: 1rem 0;
	font-size: .8rem;
}

/* Laptop and Desktop */
@media screen and (min-width: 1024px) {
    .choices .container {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        text-align: center;
    }
}
</style>
