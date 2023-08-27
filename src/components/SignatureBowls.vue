<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { useSignatureBowlStore } from '../store/signatureBowls';
import Form from './Form.vue';
import FormButtons from './FormButtons.vue';

const store = useSignatureBowlStore();

onMounted(() => {
    gsap.from('.bowl-container', { duration: 1, opacity: 0 }).duration(1);
});
</script>

<template>
    <Form>
        <div class="container">
            <div class="bowl-container" v-for="bowl in store.signatureBowls" :key="bowl.id">
                <div class="form-group">
                    <label :for="bowl.name">&nbsp;{{ bowl.name }}</label>
                    <small class="base" :for="bowl.base">{{ bowl.base }}&nbsp;Base</small>
                </div>
                <div class="form-group">
                    <button class="ingredients-button" @click.prevent="store.toggleCollapse(bowl)">
                        {{ bowl.collapsed ? '&rarr; show toppings' : '&darr; Hide toppings' }}
                    </button>
                </div>
                <ul v-if="!bowl.collapsed">
                    <li v-for="topping in bowl.toppings" :key="topping">
                        {{ topping }}
                    </li>
                </ul>
                <div class="size-container form-group">
                    <template v-for="size in bowl.sizes" :key="size">
                        <input v-model="size.checked" name="price" type="checkbox" />
                        <label class="size" for="price">
                            {{ size.size }}
                        </label>
                    </template>
                </div>
            </div>
        </div>
        <FormButtons />
        <p class="error-message" v-if="store.showErrorMessage">Please select a bowl.</p>
    </Form>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
.form-group {
	margin: .3rem 0;
}
.bowl-container {
    margin: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.size-container {
    display: flex;
    justify-content: center;
}

.size-container input {
    margin: 0 1rem;
}

.base {
	font-weight: 400;
	font-size: 12px;
}

.form-group:first-child {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.form-group:first-child label {
	margin: .3rem 0;
}
</style>
