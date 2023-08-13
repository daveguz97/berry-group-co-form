<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSmoothieStore } from '../store/smoothie';
import { useSignatureBowlStore } from '../store/signatureBowls';
import { useCustomBowls } from '../store/customBowls';
import { useSessionStorage } from '@vueuse/core';

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

let { customBowl, selectedCustomBowlBy12Oz, selectedCustomBowlBy16Oz, selectedCustomBowlBy24Oz } =
    storeToRefs(customBowlStore);

const handleSmoothieCheckout = () => {
    let smoothieOptions = smoothieStore.allSmoothies.filter((smoothie) => {
		return smoothie.checked;
	});

	const selectedSmoothie = smoothieOptions.map((smoothie) => {
		return `${smoothie.name} - ${smoothie.checked}`;
	});

    if (smoothieOptions.length > 0) {
        selectedSmoothieState.value.push(...selectedSmoothie);
        showErrorMessageForSmoothie.value = false;
    } else {
        showErrorMessageForSmoothie.value = true;
    }

	smoothieOptions.forEach((smoothie) => {
		if (smoothie.checked) {
			smoothie.checked = false;
		}
	});
};

const handleSignatureBowlCheckout = () => {
	// Create a empty array that will hold the signature bowl options
	let signatureBowlOptions = [];

	// Loop through the signature bowls
	signatureBowlStore.signatureBowls.forEach((bowl) => {
		// Loop through the sizes
		bowl.sizes.forEach((size) => {
			// If the size is checked
			if (size.checked) {
				// append it to the signature bowl name and the size
				signatureBowlOptions.push(`${bowl.name} - ${size.size}`);
			}
		});
	});

	if(signatureBowlOptions.length > 0) {
		// Push the signature bowl options to the selected signature bowl state
		selectedSignatureBowlState.value.push(...signatureBowlOptions);
		// Set the error message to false
		showErrorMessageForBowl.value = false;
	} else {
		// Set the error message to true
		showErrorMessageForBowl.value = true;
	}

	// Reset all the sizes to false
	signatureBowlStore.signatureBowls.forEach((bowl) => {
		bowl.sizes.forEach((size) => {
			if (size.checked) {
				size.checked = false;
			}
		});
	});
};

const handleCustomBowlCheckout = () => {
	let customBowlOptions = []

	let sizeOptions = []

	let toppingOptions = []

	let fruitOptions = []

	let baseOptions = []

	customBowl.value.forEach((bowl) => {
		if (customBowlStore.selectedSize === bowl.size) {
			sizeOptions.push(bowl.size);
			bowl.base.forEach((base) => {
				if (base.checked) {
					baseOptions.push(base.name);
				}
			});

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

			customBowlOptions.push(
				`Size: ${sizeOptions.join(', ')}\n`,
				`Base: ${baseOptions.join(', ')}\n`,
				`Fruits: ${fruitOptions.join(', ')}\n`,
				`Toppings: ${toppingOptions.join(', ')}\n\n`
			);
		}
	});

	if (customBowlOptions.length > 0) {
		if (customBowlStore.selectedSize === '12oz') {
			selectedCustomBowlBy12Oz.value.push(...customBowlOptions);
		}

		if (customBowlStore.selectedSize === '16oz') {
			selectedCustomBowlBy16Oz.value.push(...customBowlOptions);
		}

		if (customBowlStore.selectedSize === '24oz') {
			selectedCustomBowlBy24Oz.value.push(...customBowlOptions);
		}
	}

	customBowlStore.customBowl.forEach((bowl) => {
		if (customBowlStore.selectedSize === bowl.size) {
			bowl.base.forEach((base) => {
				if (base.checked) {
					base.checked = false;
				}
			});

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
		}
	});
};

const addToOrder = () => {
    let { path } = route.currentRoute.value;
    if (path === '/smoothies') {
        return handleSmoothieCheckout();
    }

    if (path === '/signatureBowls') {
        return handleSignatureBowlCheckout();
    }

    if (path === '/customBowls/0' || path === '/customBowls/1' || path === '/customBowls/2') {
        return handleCustomBowlCheckout();
    }
};

const handleDisplayCheckout = () => {
    let { path } = route.currentRoute.value;

    route.push('/checkout');
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
