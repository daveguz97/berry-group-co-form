<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSmoothieStore } from '../store/smoothie';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { useCustomBowls } from '../store/customBowls';
import { v4 as uuidv4 } from 'uuid';
import OrderAdded from './OrderAdded.vue';

const showModal = ref(false);

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
        showErrorMessageForSmoothie.value = false;
    } else {
        showErrorMessageForSmoothie.value = true;
        throw new Error('Please select a smoothie.');
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
    } else {
        // Set the error message to true
        showErrorMessageForBowl.value = true;
        throw new Error('Please select a bowl.');
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
    } else {
        showErrorMessageForCustom.value = true;
        throw new Error('Please select a bowl.');
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

const addToOrder = async () => {
    let { path } = route.currentRoute.value;
	let promiseChoice;
    try {
        switch (path) {
            case '/smoothies':
                promiseChoice = new Promise((resolve, reject) => {
					resolve(handleSmoothieCheckout());
				});
                break;
            case '/signatureBowls':
                promiseChoice = new Promise((resolve, reject) => {
					resolve(handleSignatureBowlCheckout());
				});
                break;
            case '/customBowls':
				promiseChoice = new Promise((resolve, reject) => {
					resolve(handleCustomBowlCheckout());
				});
                break;
            default:
                break;
        }

		await promiseChoice;

		await Promise.resolve(
			setTimeout(() => {
				showModal.value = true;
                showErrorMessageForBowl.value = false;
                showErrorMessageForSmoothie.value = false;
                showErrorMessageForCustom.value = false;
                allSmoothies.value.forEach((smoothie) => {
                    smoothie.collapsed = true;
                });
                signatureBowls.value.forEach((bowl) => {
                    bowl.collapsed = true;
                });
                
			}, 600)
		);
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

const navigatePrevious = () => {
    showErrorMessageForBowl.value = false;
    showErrorMessageForSmoothie.value = false;
    showErrorMessageForCustom.value = false;

    allSmoothies.value.forEach((smoothie) => {
        smoothie.collapsed = true;
    });

    signatureBowls.value.forEach((bowl) => {
        bowl.collapsed = true;
    });
    route.go(-1);
};
</script>

<template>
    <div class="form-buttons">
        <button class="prev-button" @click.prevent="navigatePrevious">Previous</button>
        <button class="add-to-order" @click.prevent="addToOrder">Add to Order</button>
    </div>
    <OrderAdded v-if="showModal"></OrderAdded>
</template>

<style scoped>
@import '../assets/base.css';



.form-buttons {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    bottom: 0;
}
</style>
