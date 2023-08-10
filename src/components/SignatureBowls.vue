<script setup>
import {watchEffect} from 'vue'
import { useSignatureBowlStore } from '../store/signatureBowls'
import { storeToRefs } from 'pinia'
import Form from './Form.vue'
import FormButtons from './FormButtons.vue';

const store = useSignatureBowlStore()
const {showErrorMessage} = storeToRefs(store)

const isBowlChecked = () => {
	store.bowlState.some((bowl) => {
		bowl.sizes.some((size) => {
			if (size.checked) {
				showErrorMessage.value = false
			}
		})
	})
}

watchEffect(() => {
	isBowlChecked()
})
</script>

<template>
    <Form>
        <div class="container">
            <div class="bowl-container" v-for="bowl in store.bowlState" :key="bowl.id">
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
                            <label for="price">
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
	margin: 1rem 0;
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
