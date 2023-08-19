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
        icon: ['fab', 'apple'],
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
</template>

<style scoped>
    .choices .container {
		width: 100%;
        flex-direction: column;
		align-items: center;
		justify-content: center;
    }

	/* Laptop and Desktop */
	@media screen and (min-width: 1024px) {
		.choices .container {
			flex-direction: row;
			justify-content: space-around;
			text-align: center;
		}
	}

</style>
