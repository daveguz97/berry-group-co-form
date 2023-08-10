<script setup>
import { ref} from 'vue'
import Smoothies from './Smoothies.vue'
import SignatureBowls from './SignatureBowls.vue'
import CustomBowls from './CustomBowls.vue'

const SmoothiesRoute = { template: Smoothies }
const SigBowlsRoute = { template: SignatureBowls }
const CustomBowlsRoute = { template: CustomBowls }

let id = 0
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
        path: '/customBowls',
        template: CustomBowlsRoute
    }
])
</script>

<template>
    <section class="choices">
        <div class="container">
            <router-link v-for="item in content" :key="item.id" :to="item.path">
                <div class="card" @click="$router.path">
                    <div class="content">
                        <font-awesome-icon :icon="item.icon" size="lg" style="color: #872ab5" />
                        <p>{{ item.name }}</p>
                    </div>
                </div>
            </router-link>
        </div>
    </section>
</template>

<style scoped>
@import '../assets/base.css';
.choices .container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.choices .container .card {
    cursor: pointer;
    min-width: 250px;
    min-height: 250px;
    background: var(--lighter-green-color);
    margin: 1.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    border-radius: 5px;
    -webkit-box-shadow: 1px 2px 15px -1px var(--periwinkle);
    -moz-box-shadow: 1px 2px 15px -1px var(--periwinkle);
    box-shadow: 1px 1px 10px -1px var(--periwinkle);
	transition: all .3s ease-in-out;
}

.choices .container .card:hover {
	background-color: var(--light-green-color);
}

.choices .container .card .content {
    color: var(--dark-color);
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.choices .container .card .content p {
    margin-top: 0.5rem;
}

@media screen and (min-width: 768px) {
	.choices .container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-areas: 
		"smoothies signature"
		". custom";
		gap: 1.5rem;
		margin: 0 1rem;
	}
	.choices .container .card:first-child {
		grid-area: smoothies;
	}
	.choices .container .card:nth-child(2) {
		grid-area: signature;
	}

	.choices .container .card:last-child {
		grid-area: custom;
	}
}

@media screen and (min-width: 1024px  ) {
	.choices .container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.choices .container .card {
		margin: 2rem 1rem;
	}
	
}
</style>
