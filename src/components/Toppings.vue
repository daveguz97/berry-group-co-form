<script setup>
import { useCustomBowls } from '../store/customBowls';
import Form from './Form.vue';

const store = useCustomBowls();

const glutenFree = (gf) => {
    return gf;
};

const nonFat = (nf) => {
    return nf;
};
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
                <sup class="gf" v-if="glutenFree(topping.gf)">&nbsp;GF</sup>
                <sup class="nf" v-if="nonFat(topping.nf)">&nbsp;NF</sup>
            </div>
        </div>
        <p class="error-message" v-if="store.showErrorMessage">Please create a Custom Bowl.</p>
    </Form>
</template>

<style scoped>
@import '../assets/base.css';
.heading {
    width: 100%;
    margin: 0.5rem auto;
    text-align: center;
    display: flex;
    justify-content: center;
}
.toppings-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.form-group {
    width: 80%;
    display: flex;
    align-items: center;
}
input[type='checkbox'] {
    margin-right: 0.5rem;
    align-self: flex-start;
}

.form-group label {
	margin-left: .5rem;
}

@media screen and (min-width: 768px) {
    .form-group {
        width: 100%;
    }

    .toppings-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
    }
}
</style>
