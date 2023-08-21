<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { useSignatureBowlStore } from '../store/signatureBowls'
import Form from './Form.vue'
import FormButtons from './FormButtons.vue';

const store = useSignatureBowlStore()

onMounted(() => {
	gsap.from('.bowl-container', { duration: 1, opacity: 0 }).duration(1);
})
</script>

<template>
    <Form>
        <div class="container">
            <div class="bowl-container" v-for="bowl in store.signatureBowls" :key="bowl.id">
                <label :for="bowl.name">&nbsp;{{ bowl.name }}</label>
				<div>
                            <button
                                class="ingredients-button"
                                @click.prevent="store.toggleCollapse(bowl)"
                            >
                                {{
                                    bowl.collapsed
                                        ? '&rarr; show ingredients'
                                        : '&darr; Hide Ingredients'
                                }}
                            </button>
                        </div>
						<ul v-if="!bowl.collapsed">
                            <li v-for="ingredient in bowl.toppings" :key="ingredient">
                                {{ ingredient }}
                            </li>
                        </ul>
                <div class="size-container">
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
.bowl-container {
	margin: .5rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.size-container {
	display: flex;
	justify-content: center;
}

.size-container input {
	margin: 0 1rem
}
</style>
