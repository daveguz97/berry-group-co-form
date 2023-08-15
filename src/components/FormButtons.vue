<script setup>
import { useRouter, } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSmoothieStore } from '../store/smoothie';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { useCustomBowls } from '../store/customBowls';
import { v4 as uuidv4 } from 'uuid';

const route = useRouter();
const smoothieStore = useSmoothieStore();
const signatureBowlStore = useSignatureBowlStore();
const customBowlStore = useCustomBowls();

let {
    showErrorMessage: showErrorMessageForSmoothie,
    allSmoothies,
    selectedSmoothieState
} = storeToRefs(smoothieStore);

let {
    signatureBowls,
    selectedSignatureBowlState,
    showErrorMessage: showErrorMessageForBowl
} = storeToRefs(signatureBowlStore);

let {
    selectedCustomBowl,
    selectedSizeState,
    showErrorMessage: showErrorMessageForCustom
} = storeToRefs(customBowlStore);

const handleSmoothieCheckout = () => {
    allSmoothies.value.forEach((smoothie) => {
        if (smoothie.checked) {
            smoothie.id = uuidv4();
            selectedSmoothieState.value.push({
                id: smoothie.id,
                name: smoothie.name,
                price: smoothie.price,
                size: smoothie.size
            });
        }
    });

    if (allSmoothies.value.filter((smoothie) => smoothie.checked).length > 0) {
        route.push('/');
        showErrorMessageForSmoothie.value = false;
    } else {
        showErrorMessageForSmoothie.value = true;
        return showErrorMessageForSmoothie;
    }

    allSmoothies.value.forEach((smoothie) => {
        if (smoothie.checked) {
            smoothie.checked = false;
        }
    });
};

const handleSignatureBowlCheckout = () => {
    signatureBowlStore.signatureBowls.forEach((bowl) => {
        bowl.sizes.forEach((size) => {
            if (size.checked) {
                size.id = uuidv4();
                selectedSignatureBowlState.value.push({
                    id: size.id,
                    name: bowl.name,
                    size: size.size,
                    price: size.price
                });
            }
        });
    });

    if (signatureBowls.value.filter((bowl) => bowl.sizes.some((size) => size.checked)).length > 0) {
        showErrorMessageForBowl.value = false;
        route.push('/');
    } else {
        // Set the error message to true
        showErrorMessageForBowl.value = true;
        return showErrorMessageForBowl;
    }

    // Reset all the sizes to false
    signatureBowls.value.forEach((bowl) => {
        bowl.sizes.forEach((size) => {
            if (size.checked) {
                size.checked = false;
            }
        });
    });
};

const handleCustomBowlCheckout = () => {
    let fruitOptions = [];
    let toppingOptions = [];
    let baseOptions = [];
    // Loop through the fruits checked, toppings checked, and base checked and push them to the custom bowl options array along with the string, selectedSize.value
    customBowlStore.customBowl.forEach((bowl) => {
        bowl.id = uuidv4();
        bowl.fruits.forEach((fruit) => {
            if (fruit.checked) {
                fruitOptions.push(fruit.name);
            }
        });
        bowl.toppings.forEach((topping) => {
            if (topping.checked) {
                toppingOptions.push(topping.name);
            }
        });
        bowl.base.forEach((base) => {
            if (base.checked) {
                baseOptions.push(base.name);
            }
        });
    });

    let price = customBowlStore.size.filter((item) => item.name === selectedSizeState.value)[0]
        .price;

    if (fruitOptions.length > 0 || toppingOptions.length > 0 || baseOptions.length > 0) {
        let customBowlOptions = {
            id: uuidv4(),
            size: selectedSizeState.value,
            fruits: fruitOptions,
            toppings: toppingOptions,
            base: baseOptions,
            price: price
        };
        selectedCustomBowl.value.push(customBowlOptions);
        sessionStorage.setItem('selectedSize', null);
        showErrorMessageForCustom.value = false;
        route.push('/');
    } else {
        showErrorMessageForCustom.value = true;
        return showErrorMessageForCustom;
    }

    customBowlStore.customBowl.forEach((bowl) => {
        bowl.fruits.forEach((fruit) => {
            if (fruit.checked) {
                fruit.checked = false;
            }
        });
        bowl.toppings.forEach((topping) => {
            if (topping.checked) {
                topping.checked = false;
            }
        });
        bowl.base.forEach((base) => {
            if (base.checked) {
                base.checked = false;
            }
        });
    });
};

const addToOrder = () => {
    let { path } = route.currentRoute.value;

    switch (path) {
        case '/smoothies':
            return handleSmoothieCheckout();
        case '/signatureBowls':
            return handleSignatureBowlCheckout();
        case '/customBowls':
            return handleCustomBowlCheckout();
        default:
            return;
    }
};

const navigatePrevious = () => {
    route.go(-1);
};
</script>

<template>
    <div class="form-buttons">
        <button class="prev-button" @click.prevent="navigatePrevious">Previous</button>
        <button class="add-to-order" @click.prevent="addToOrder">Add to Order</button>
    </div>
</template>

<style scoped>
@import '../assets/base.css';

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

button:hover {
    background-color: var(--light-green-color);
}

.form-buttons {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
}
</style>
