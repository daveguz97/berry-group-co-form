<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useCustomBowls } from '../store/customBowls';
import { useSmoothieStore } from '../store/smoothie';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { useRouter } from 'vue-router';

import Form from './Form.vue';
const customBowl = useCustomBowls();
const {saveSelectedCustomBowlBy12Oz, saveSelectedCustomBowlBy16Oz, saveSelectedCustomBowlBy24Oz, selectedCustomBowlBy12Oz, selectedCustomBowlBy16Oz, selectedCustomBowlBy24Oz} = storeToRefs(customBowl);
const smoothieStore = useSmoothieStore();
const {selectedSmoothieState, savedSmoothie} = storeToRefs(smoothieStore)
const signatureBowlStore = useSignatureBowlStore();
const {selectedSignatureBowlState, saveSelectedBowls} = storeToRefs(signatureBowlStore)
const route = useRouter();

let firstName = ref('');
let lastName = ref('');
let phoneNumber = ref('');
let email = ref('');
let price = ref(0);
let smoothiePrice = ref(0);
let signatureBowlPrice = ref(0);
let customBowlPrice = ref(0);

let smoothieName = ref([]);
let allSmoothies = ref([]);
let signatureBowlName = ref([]);
let customBowlName = ref([]);

const calculatePrice = () => {
    // For each smoothie that is check add the price to the smoothie price
    smoothieStore.allSmoothies.forEach((smoothie) => {
        if (smoothie.checked) {
            smoothiePrice.value += Number(smoothie.price);
            smoothieName.value.push(smoothie.name);
        }
    });

	savedSmoothie.value.forEach((smoothie) => {
		smoothieStore.allSmoothies.forEach((item) => {
			if (item.name === smoothie) {
				smoothiePrice.value += Number(item.price);
				smoothieName.value.push(item.name);
			}
		});
	});

    // For each custom bowl that size is checked add the price to the custom bowl price

    customBowl.customBowl.forEach((bowl) => {
        const baseIsChecked = bowl.base.some((base) => base.checked);
        const fruitsAreChecked = bowl.fruits.some((fruit) => fruit.checked);
        const toppingsAreChecked = bowl.toppings.some((topping) => topping.checked);

        if (baseIsChecked || fruitsAreChecked || toppingsAreChecked) {
            if (bowl.size.includes('12')) {
                customBowlPrice.value += 10.0;
            }
            if (bowl.size.includes('16')) {
                customBowlPrice.value += 13.0;
            }
            if (bowl.size.includes('24')) {
                customBowlPrice.value += 16.0;
            }
            customBowlName.value.push(`${bowl.size} Custom Bowl`);
        }
    });

    price.value = smoothiePrice.value + signatureBowlPrice.value + customBowlPrice.value;
    return price;
};


const backToHome =() => {
	route.push('/');
};

watchEffect(() => {
	price.value = smoothiePrice.value + signatureBowlPrice.value + customBowlPrice.value;
});

onMounted(() => {
    calculatePrice();
});
</script>

<template>
    <Form>
        <div class="container">
            <!-- Create a form that gets the first name, last name, phone number, and email -->
            <div class="form-group">
                <label for="firstName">First Name <sup>*</sup></label>
                <input type="text" id="firstName" name="firstName" v-model="firstName" />
            </div>
            <div class="form-group">
                <label for="phoneNumber">Phone Number</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" v-model="phoneNumber" />
            </div>
            <div class="form-group">
                <label for="email">Email <sup>*</sup></label>
                <input type="email" id="email" name="email" v-model="email" />
            </div>
            <div class="total-price">
                <h4>Total Price:</h4>
                <p>Smoothies: ${{ smoothiePrice }}</p>
                <div>
                    <ul>
                        <li v-for="name in smoothieName" :key="name">
                            <img src="../assets/xmark-solid.svg" @click="removeItem(name)" />{{ name }}
                        </li>
                    </ul>
                </div>
                <br />
                <p>Signature Bowls: ${{ signatureBowlPrice }}</p>
                <div>
                    <ul>
                        <li v-for="name in signatureBowlName" :key="name">
                            <img src="../assets/xmark-solid.svg" @click="removeItem(name)" />{{ name }}
                        </li>
                    </ul>
                </div>
                <br />
                <p>Custom Bowls: ${{ customBowlPrice }}</p>
                <div>
                    <ul>
                        <li v-for="name in customBowlName" :key="name">
                            <img src="../assets/xmark-solid.svg" @click="removeItem(name)" />{{ name }}
                        </li>
                    </ul>
                </div>
                <br />
                <p>Total: ${{ price }}</p>
            </div>
            <div>
                <h4>Cash App Me</h4>
                <h6>$Trinnydand</h6>
            </div>
            <div class="form-group">
                <button class="submit-button" type="submit">Submit</button>
                <button class="submit-button" type="button" @click="backToHome">Create another Orders</button>
            </div>
        </div>
    </Form>
</template>

<style scoped>
@import '../assets/base.css';
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    cursor: pointer;
}
ul li {
    display: flex;
}

.form-group {
    margin: 1rem 0;
}
input {
    border: 1px solid var(--lighter-green-color);
    border-radius: 5px;
    outline-color: var(--light-green-color);
    padding: 2px 5px;
}
label {
    margin: 0 1rem;
}

button {
    border: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 0.5rem;
    background-color: var(--lighter-green-color);
    margin: 0 0.5rem;
    width: 150px;
    height: 30px;
    transition: all 0.3s ease-in-out;
    text-align: center;
}

button:hover,
button:hover {
    background-color: var(--light-green-color);
}

.total-price {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
