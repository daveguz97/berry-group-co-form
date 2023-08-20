<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const backToHome = () => {
	router.push('/');
}

const checkout = () => {
	router.push('/checkout');
}
</script>

<template>
    <div>
        <!-- Modal -->
        <div class="modal">
            <div class="modal-content">
                <h4>Thank You!</h4>
                <p>Your order has been added</p>

				<div class="button-group">
					<button @click="backToHome">
						Home
					</button>
					<button @click="checkout">
						Checkout
					</button>
				</div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
	text-transform: none;
}

.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.modal h2 {
    margin-bottom: 1rem;
}

.modal button {
    background-color: var(--lighter-green-color);
    border: none;
    padding: 0.5rem 1rem;
	margin: 0 1rem;
	margin-top: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.modal button:hover {
    background-color: var(--light-green-color);
}
</style>
