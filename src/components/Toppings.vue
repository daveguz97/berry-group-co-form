<script setup>
import { useCustomBowls } from '../store/customBowls';
import Form from './Form.vue';

const store = useCustomBowls();

const glutenFree = (gf) => {
	return gf
}

const nonFat = (nf) => {
	return nf
}

</script>

<template>
    <Form>
            <div class="heading">
                <h5>3. Choose your Toppings</h5>
            </div>
            <div class="toppings-container">
                <div class="form-group" v-for="topping in store.toppings" :key="topping.name">
                    <input type="checkbox" :name="topping.name" v-model="topping.checked" />
                    <label :for="topping.name">&nbsp;{{ topping.name }}</label>
					<sup class="gf"  v-if="glutenFree(topping.gf)">GF</sup>
					<sup class="divider" v-if="glutenFree(topping.gf) && nonFat(topping.nf)"></sup>
					<sup class="nf" v-if="nonFat(topping.nf)">NF</sup>
                </div>
            </div>
        <p class="error-message" v-if="store.showErrorMessage">Please select a Topping.</p>
    </Form>
</template>

<style scoped>
@import '../assets/base.css';
.toppings-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
	grid-gap: 1rem;
	justify-items: center;
	margin-bottom: 1rem;
}

.form-group {
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