<script setup>
import { ref } from 'vue';
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
    display: flex;
    flex-direction: row;
    align-items: center;
}

@media screen and (max-width: 768px) {
    .choices .container {
        flex-direction: column;
    }
}
</style>
