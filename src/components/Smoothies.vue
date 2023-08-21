<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { useSmoothieStore } from '../store/smoothie'
import Form from './Form.vue'
import FormButtons from './FormButtons.vue';

const store = useSmoothieStore()

onMounted(() => {
	gsap.from('.smoothies', { duration: 1, opacity: 0 }).duration(1);
})
</script>

<template>
    <div class="container">
        <div class="smoothies">
            <Form>
                <div class="wrapper">
                    <div v-for="smoothie in store.allSmoothies" :key="smoothie.id" class="content">
                        <input v-model="smoothie.checked" type="checkbox" :name="smoothie.name" />
                        <label :for="smoothie.name">&nbsp;{{ smoothie.name }}</label>
                        <sup class="price">&nbsp;${{ smoothie.price }}</sup>
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

                        <FormButtons/>
                    </div>
					<p class="error-message" v-if="store.showErrorMessage">Please select a smoothie.</p>
                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped>
@import '../assets/base.css';

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
    position: relative;
}
.container {
    height: 100%;
    text-align: center;
    margin: 1rem 0;
    position: relative;
}

.content {
    margin: .5rem 0;
}
</style>
