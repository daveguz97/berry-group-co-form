<script setup>
import { onMounted, ref } from 'vue';
import { useCustomBowls } from '../store/customBowls';
import { useRouter } from 'vue-router';
import Form from './Form.vue';

const store = useCustomBowls();

let customBowlFruits = ref();
let route = useRouter();

onMounted(() => {
    console.log(route, route.currentRoute.value.path);
    setCustomBowlFruits();
});

const setCustomBowlFruits = () => {
	const {path} = route.currentRoute.value;

	if (path === '/customBowls/0') {
    customBowlFruits.value = store.customBowl[0].fruits;
	}

	if (path === '/customBowls/1') {
	customBowlFruits.value = store.customBowl[1].fruits;
	}

	if (path === '/customBowls/2') {
	customBowlFruits.value = store.customBowl[2].fruits;
	}
};
</script>

<template>
    <Form>
            <div class="heading">
                <h5>2. Choose your Fruit</h5>
            </div>
            <div class="fruits-container">
                <div class="form-group" v-for="fruit in customBowlFruits" :key="fruit.name">
                    <input type="checkbox" :name="fruit.name" v-model="fruit.checked" />
                    <label :for="fruit.name">&nbsp;{{ fruit.name }}</label>
                </div>
            </div>
        <p class="error-message" v-if="store.showErrorMessage">Please select a Fruit.</p>
    </Form>
</template>

<style scoped>


.fruits-container {
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

@media screen and (max-width: 768px) {
    .fruits-container {
        flex-direction: row;
    }

	.fruits-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
}
</style>
