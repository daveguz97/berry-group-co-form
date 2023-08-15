import { createRouter, createWebHistory } from 'vue-router';
import Smoothies from '../components/Smoothies.vue';
import SignatureBowls from '../components/SignatureBowls.vue';
import CustomBowlSize from '../components/CustomBowlSize.vue';
import CustomBowls from '../components/CustomBowls.vue';
import Choices from '../components/Choice.vue';
import Checkout from '../components/checkout.vue';
import Success from '../components/Success.vue'

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
            path: '/customBowls',
            name: 'Custom Bowls',
			component: CustomBowls,
			beforeEnter: (to, from, next) => {
				if(from.params.size) {
					next();
				}
				else {
					next('/customBowlSize');
				}
			},
        },
        {
            path: '/success',
            name: 'Success',
            component: Success,
        },
        {
            path: '/checkout',
            name: 'Checkout',
            component: Checkout,
        },
		// Catch
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: Choices,
		}
    ]
});

export default router;
