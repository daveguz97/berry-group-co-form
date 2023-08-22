<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { useSmoothieStore } from '../store/smoothie';
import Form from './Form.vue';
import FormButtons from './FormButtons.vue';

const store = useSmoothieStore();

onMounted(() => {
    gsap.from('.smoothies', { duration: 1, opacity: 0 }).duration(1);
});
</script>

<template>
    <div class="container">
        <div class="smoothies">
            <Form>
                <div class="wrapper">
                    <div v-for="smoothie in store.allSmoothies" :key="smoothie.id" class="content">
                        <div class="form-group">
                            <input
                                v-model="smoothie.checked"
                                type="checkbox"
                                :name="smoothie.name"
                            />
                            <label :for="smoothie.name">&nbsp;{{ smoothie.name }}
							
							</label>
                            <sup class="price">&nbsp;${{ smoothie.price }}</sup>
                        </div>
                        <div>
                            <button
                                class="ingredients-button"
                                @click.prevent="store.toggleCollapse(smoothie)"
                            >
                                {{
                                    smoothie.collapsed
                                        ? '&rarr; show ingredients'
                                        : '&darr; Hide Ingredients'
                                }}
                            </button>
                        </div>
                        <ul v-if="!smoothie.collapsed">
                            <li v-for="ingredient in smoothie.ingredients" :key="ingredient">
                                {{ ingredient }}
                            </li>
                        </ul>
                    </div>
                    <div class="form-buttons-container">
                        <FormButtons />
                    </div>
                    <p class="error-message" v-if="store.showErrorMessage">
                        Please select a smoothie.
                    </p>
                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped>
@import '../assets/base.css';

.wrapper {
	width: 100%;
    margin-top: 1rem;
}
.container {
    height: 100%;
    margin: 1rem 0;
    position: relative;
}

.content {
    margin: 0.5rem;
	width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.form-group {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem auto;
}


.form-group label {
    margin: 0 1rem;
    display: inline-block;
}

input[type='checkbox'] {
    margin-right: 0.5rem;
}

@media screen and (min-width: 768px) {
	input[type='checkbox'] {
		position: relative;
	}

	.form-group {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0.5rem auto;
	}

	.form-group input {
		margin-right: 0.5rem;
	}
}
</style>
