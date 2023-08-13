import { createRouter, createWebHistory } from 'vue-router';
import Smoothies from '../components/Smoothies.vue';
import SignatureBowls from '../components/SignatureBowls.vue';
import CustomBowlSize from '../components/CustomBowlSize.vue';
import CustomBowls from '../components/CustomBowls.vue';
import Choices from '../components/Choice.vue';
import Checkout from '../components/checkout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Choices
        },

        {
            path: '/smoothies',
            name: 'Smoothies',
            component: Smoothies
        },
        {
            path: '/signatureBowls',
            name: 'Signature bowls',
            component: SignatureBowls
        },
        {
            path: '/customBowlSize',
            name: 'Custom Bowl Size',
            component: CustomBowlSize
        },
        {
            path: '/customBowls/:id',
            name: 'Custom Bowls',
            component: CustomBowls
        },
        {
            path: '/checkout',
            name: 'Checkout',
            component: Checkout
        }
    ]
});

export default router;
