<script setup>
import { ref } from 'vue';
import { useCustomBowls } from '../store/customBowls';
import Form from './Form.vue';

const store = useCustomBowls();

const showGrains = ref(false);
const showChiaPuddings = ref(false);
const showNutsAndSeeds = ref(false);
const showCoconuts = ref(false);
const showButters = ref(false);
const showSyrups = ref(false);

const GRAINS = store.toppings.slice;

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
					<sup class="gf"  v-if="glutenFree(topping.gf)">&nbsp;GF</sup>
					<sup class="nf" v-if="nonFat(topping.nf)">&nbsp;NF</sup>
                </div>
            </div>
        <p class="error-message" v-if="store.showErrorMessage">Please create a Custom Bowl.</p>
    </Form>
</template>

<style scoped>
@import '../assets/base.css';
.form-group {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
	margin: .5rem;
}

input[type='checkbox'] {
   position: absolute;
   left: 10px;
}

.form-group input {
    margin-right: 0.5rem;
}
</style>