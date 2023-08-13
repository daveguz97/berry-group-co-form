<script setup>
import { useRouter } from 'vue-router'
import { useSmoothieStore } from '../store/smoothie'
import Form from './Form.vue'
import FormButtons from './FormButtons.vue';

const store = useSmoothieStore()

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
					<FormButtons/>
					<p class="error-message" v-if="store.showErrorMessage">Please select a smoothie.</p>
                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped>
@import '../assets/base.css';
.container {
    text-align: center;
    margin: 1rem 0;
}

.content {
    margin: 1rem 0;
}
</style>
