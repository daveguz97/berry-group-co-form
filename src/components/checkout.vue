<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { useCustomBowls } from '../store/customBowls';
import { useSmoothieStore } from '../store/smoothie';
import { useUserInfo } from '../store/userInfo';
import { useRouter } from 'vue-router';
import Form from './Form.vue';
import emailjs from 'emailjs-com';
const userInfoStore = useUserInfo();
const { firstName, phoneNumber, email } = storeToRefs(userInfoStore);
const smoothieStore = useSmoothieStore();
const { selectedSmoothieState } = storeToRefs(smoothieStore);
const { selectedSignatureBowlState } = storeToRefs(useSignatureBowlStore());
const signatureBowlStore = useSignatureBowlStore();
const customBowlStore = useCustomBowls();
const route = useRouter();
let price = ref(0);
let smoothies = ref([]);
let signatureBowls = ref([]);
let customBowls = ref([]);
let smoothiePrice = ref(0);
let signatureBowlPrice = ref(0);
let customBowlPrice = ref(0);
let formError = ref();
let objectError = ref();

const getAllData = () => {
    getSmoothieData();
    getSignatureBowlData();
    getCustomBowlData();
    calculateTotalPrice();
};

const filterSmoothies = () => {
    return (
        smoothieStore.selectedSmoothieState.map((smoothie) => {
            return `<strong>Name: </strong>${smoothie.name}<br></br>`;
        }) || { name: 'No Smoothies' }
    );
};

const filterSignatureBowls = () => {
    return (
        signatureBowlStore.selectedSignatureBowlState.map((bowl) => {
            return `<strong>Name: </strong>${bowl.name} - <strong>Size: </strong>${bowl.size} - <strong>Price: </strong><br></br>`;
        }) || { name: 'No Signature Bowls' }
    );
};

const filterCustomBowl = () => {
    return customBowlStore.selectedCustomBowl.map((bowl) => {
        return `<strong>Size: </strong>${bowl.size} - <strong>Base: </strong> ${bowl.base.join(
            ', '
        )} - <strong>Fruits: </strong>${bowl.fruits.join(
            ', '
        )} - <strong>Toppings: </strong>${bowl.toppings.join(', ')}<br></br>`;
    });
};

const sendEmail = async () => {
    const serviceID = 'service_43kez0s';
    const templateID = 'template_ltcvo0u';
    const userID = 'Rz4xcyykQw9RGco5t';
    console.log('it worked');
    console.log(smoothieStore.selectedSmoothie);
    const templateParams = {
        from_name: firstName.value,
        to_name: 'Victoria',
        phoneNumber: phoneNumber.value,
        email: email.value,
        smoothie: filterSmoothies(),
        signatureBowl: filterSignatureBowls(),
        customBowl: filterCustomBowl()
    };

    try {
        if (firstName.value === '') {
            formError.value = 'first name';
            return;
        } else if (phoneNumber.value === '') {
            formError.value = 'phone number';
            return;
        } else if (email.value === '') {
            formError.value = 'email';
            return;
        } else {
            formError.value = '';
        }

        if (
            smoothieStore.selectedSmoothieState.length === 0 &&
            signatureBowlStore.selectedSignatureBowlState.length === 0 &&
            customBowlStore.selectedCustomBowl.length === 0
        ) {
            objectError.value = 'Please select an item.';
            return;
        }

        await emailjs.send(serviceID, templateID, templateParams, userID);
        resetEverything();
        calculateSmoothiePrice();
        calculateSignatureBowlPrice();
        calculateCustomBowlPrice();
        route.push('/success');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

const calculateTotalPrice = () => {
    price.value = (
        Number(smoothiePrice.value) +
        Number(signatureBowlPrice.value) +
        Number(customBowlPrice.value)
    ).toFixed(2);
};

const getSmoothieData = () => {
    smoothieStore.selectedSmoothieState.forEach((item) => {
        smoothies.value.push({
            id: item.id,
            name: item.name,
            size: item.size
        });
    });
    calculateSmoothiePrice();
};

const calculateSmoothiePrice = () => {
    smoothiePrice.value = smoothieStore.selectedSmoothieState
        .reduce((acc, item) => {
            return acc + Number(item.price);
        }, 0)
        .toFixed(2);
};

const removeSmoothie = (id) => {
    selectedSmoothieState.value = selectedSmoothieState.value.filter((item) => item.id !== id);

    smoothies.value = smoothies.value.filter((item) => item.id !== id);

    calculateSmoothiePrice();
    calculateTotalPrice();
};

const calculateCustomBowlPrice = () => {
    customBowlPrice.value = customBowlStore.selectedCustomBowl
        .reduce((acc, item) => {
            return acc + Number(item.price);
        }, 0)
        .toFixed(2);
};

const getCustomBowlData = () => {
    customBowlStore.selectedCustomBowl.forEach((item) => {
        customBowls.value.push({
            id: item.id,
            base: item.base,
            size: item.size,
            fruits: item.fruits,
            toppings: item.toppings,
            price: item.price
        });
    });
    calculateCustomBowlPrice();
};

const removeItem = (id) => {
    removeSmoothie(id);
    removeSignatureBowl(id);
    removeCustomBowl(id);
    price.value = calculateTotalPrice();
};

const getSignatureBowlData = () => {
    signatureBowlStore.selectedSignatureBowlState.forEach((item) => {
        signatureBowls.value.push({
            id: item.id,
            name: item.name,
            size: item.size,
            price: item.price
        });
    });
    calculateSignatureBowlPrice();
};

const calculateSignatureBowlPrice = () => {
    signatureBowlPrice.value = signatureBowlStore.selectedSignatureBowlState
        .reduce((acc, item) => {
            return acc + Number(item.price);
        }, 0)
        .toFixed(2);
};

const removeSignatureBowl = (id) => {
    selectedSignatureBowlState.value = selectedSignatureBowlState.value.filter(
        (item) => item.id !== id
    );

    signatureBowls.value = signatureBowls.value.filter((item) => item.id !== id);

    calculateSignatureBowlPrice();
    calculateTotalPrice();
};

const removeCustomBowl = (id) => {
    customBowlStore.selectedCustomBowl = customBowlStore.selectedCustomBowl.filter(
        (item) => item.id !== id
    );

    customBowls.value = customBowls.value.filter((item) => item.id !== id);

    calculateCustomBowlPrice();
    calculateTotalPrice();
};

const resetEverything = () => {
    smoothieStore.selectedSmoothieState = [];
    signatureBowlStore.selectedSignatureBowlState = [];
    customBowlStore.selectedCustomBowl = [];
    firstName.value = '';
    phoneNumber.value = '';
    email.value = '';
    smoothieStore.allSmoothies.forEach((smoothie) => {
        smoothie.checked = false;
    });

    signatureBowlStore.signatureBowls.forEach((bowl) => {
        bowl.sizes.forEach((size) => {
            size.checked = false;
        });
    });

    smoothies.value = [];
    signatureBowls.value = [];
    customBowls.value = [];

    sessionStorage.clear();
};

const generateError = (item) => {
    if (formError.value) {
        return `Please type in your ${item}`;
    }
    if (objectError.value) {
        console.log(objectError.value);
        return `Please choose an item.`;
    }
};

const backToHome = () => {
    route.push('/');
};

watchEffect(() => {
    calculateTotalPrice();
});

onMounted(() => {
    getAllData();
});
</script>

<template>
    <Form>
        <div class="container">
            <!-- Create a form that gets the first name, last name, phone number, and email -->
            <div class="form-group">
                <label for="firstName">Name<sup>*</sup></label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    :class="formError || objectError ? 'error-input' : 'form-input'"
                    v-model="firstName"
                    required
                />
            </div>
            <div class="form-group">
                <label for="phoneNumber">Phone Number<sup>*</sup></label>
                <input
                    type="tel"
                    :class="formError || objectError ? 'error-input' : 'form-input'"
                    id="phoneNumber"
                    name="phoneNumber"
                    v-model="phoneNumber"
                    required
                />
            </div>
            <div class="form-group">
                <label for="email">Email <sup>*</sup></label>
                <input
                    :class="formError || objectError ? 'error-input' : 'form-input'"
                    type="email"
                    id="email"
                    name="email"
                    v-model="email"
                    required
                />
            </div>
            <template v-if="formError">
                <p class="error-message" v-if="formError">{{ generateError(formError) }}</p>
            </template>
            <template v-else-if="objectError">
                <p class="error-message">{{ generateError(objectError) }}</p>
            </template>
            <div class="total-price">
                <h4>Your Order</h4>
                <div class="item-wrapper">
                    <template v-if="smoothies.length > 0">
                        <h6>Smoothies: ${{ smoothiePrice }}</h6>
                        <div>
                            <ul>
                                <li v-for="smoothie in smoothies" :key="smoothie.id">
                                    <img
                                        src="../assets/xmark-solid.svg"
                                        @click="removeItem(smoothie.id)"
                                        alt="remove item"
                                    />
                                    {{ smoothie.name }}
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="signatureBowls.length > 0">
                        <h6>Signature Bowls: ${{ signatureBowlPrice }}</h6>
                        <div>
                            <ul>
                                <li v-for="bowl in signatureBowls" :key="bowl.id">
                                    <img
                                        src="../assets/xmark-solid.svg"
                                        @click="removeItem(bowl.id)"
                                    />{{ bowl.name }} - {{ bowl.size }}
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="customBowls.length > 0">
                        <h6>Custom Bowls: ${{ customBowlPrice }}</h6>
                        <div class="custom-bowl-wrapper">
                            <ul>
                                <template v-for="bowl in customBowls" :key="bowl.id">
                                    <div class="custom-bowl-wrapper">
                                        <img
                                            src="../assets/xmark-solid.svg"
                                            @click="removeItem(bowl.id)"
                                        />
                                        <li>
                                            <span class="bold-text">Size:</span> {{ bowl.size
                                            }}<span class="bold-text">Base:</span>
                                            {{ bowl.base.join(', ') }}
                                            <span class="bold-text">Fruits:</span>
                                            {{ bowl.fruits.join(', ')
                                            }}<span class="bold-text">Toppings:</span>
                                            {{ bowl.toppings.join(', ') }}
                                        </li>
                                    </div>
                                </template>
                            </ul>
                        </div>
                    </template>
                </div>
                <p>Total: ${{ price }}</p>
            </div>
            <div>
                <h4>Cash App Me</h4>
                <h6>$Trinnydand</h6>
            </div>
            <div class="form-group">
                <button class="submit-button" type="submit" @click.prevent="sendEmail">
                    Submit
                </button>
                <button class="submit-button" type="button" @click="backToHome">
                    Create another Order
                </button>
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
.form-input {
    border: 1px solid var(--lighter-green-color);
}

.error-input {
    border: 1px solid red;
}
input {
    border-radius: 5px;
    outline-color: var(--light-green-color);
    padding: 2px 5px;
}
label {
    margin: 0 0.5rem;
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

.item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
}
.bold-text {
    font-weight: bold;
    margin: 0 0.5rem;
}

.custom-bowl-wrapper ul li {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.custom-bowl-wrapper {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin: 0 5px;
}

h6 {
    margin: 0.3rem 0;
}
</style>
