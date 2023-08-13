<script setup>
import { onMounted, ref } from 'vue';
import { useCustomBowls } from '../store/customBowls';
import { useRouter } from 'vue-router';
import Form from './Form.vue';

const store = useCustomBowls();
let customBowlToppings = ref();
let route = useRouter()

const glutenFree = (gf) => {
	return gf
}

const nonFat = (nf) => {
	return nf
}

onMounted(() => {
    console.log(route, route.currentRoute.value.path);
    setCustomBowlToppings();
});

const setCustomBowlToppings = () => {
	const {path} = route.currentRoute.value;

	if (path === '/customBowls/0') {
    customBowlToppings.value = store.customBowl[0].toppings;
	}

	if (path === '/customBowls/1') {
	customBowlToppings.value = store.customBowl[1].toppings;
	}

	if (path === '/customBowls/2') {
	customBowlToppings.value = store.customBowl[2].toppings;
	}
};

</script>

<template>
    <Form>
            <div class="heading">
                <h5>3. Choose your Toppings</h5>
            </div>
            <div class="toppings-container">
                <div class="form-group" v-for="topping in customBowlToppings" :key="topping.name">
                    <input type="checkbox" :name="topping.name" v-model="topping.checked" />
                    <label :for="topping.name">&nbsp;{{ topping.name }}</label>
					<sup class="gf"  v-if="glutenFree(topping.gf)">GF</sup>
					<sup class="divider" v-if="glutenFree(topping.gf) && nonFat(topping.nf)"></sup>
					<sup class="nf" v-if="nonFat(topping.nf)">NF</sup>
                </div>
            </div>
        <p class="error-message" v-if="store.showErrorMessage">Please select a base.</p>
    </Form>
</template>

<style scoped>
@import '../assets/base.css';
.toppings-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	justify-items: center;
}

.form-group {
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.form-group input {
	margin-right: .5rem;
}
.gf {
	margin: .3rem;
}
.nf {
	border-left: 2px solid var(--light-green-color);
	padding-left: .3rem;
}

@media screen and (max-width: 768px) {
    .toppings-container {
        flex-direction: row;
    }

	.toppings-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
}
</style>