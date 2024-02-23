<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref(localStorage.getItem('rememberMe') || '');
const password = ref('');
const rememberMe = ref(localStorage.getItem('rememberMe') ? true : false);
const loading = ref(false); // Add this line

const signInWithEmail = async (email: string, password: string) => {
  loading.value = true; // Add this line
  try {
    await signInWithEmailAndPassword(auth, email, password);
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', email);
    } else {
      localStorage.removeItem('rememberMe');
    }
    window.alert('You have successfully signed in');
    router.push('/dashboard');
  } catch (error: any) {
    window.alert(error.message);
  } finally {
    loading.value = false; // Add this line
  }
};

const darkMode = ref(getDarkMode());

function getDarkMode() {
  // Try to get the dark mode setting from localStorage
  const storedDarkMode = localStorage.getItem('darkMode');

  // If the setting exists, return it (converted to a boolean)
  if (storedDarkMode !== null) {
    return storedDarkMode === 'true';
  }

  // Otherwise, determine the setting based on the body class
  const body = document.querySelector('body');
  const isDark = body?.classList.contains('dark');
  return isDark;
}

function toggleDarkMode() {
  darkMode.value = !darkMode.value;

  // Store the new setting in localStorage
  localStorage.setItem('darkMode', darkMode.value.toString());

  const body = document.querySelector('body');
  body?.classList.toggle('dark', darkMode.value);
}

onMounted(() => {
  const body = document.querySelector('body');
  body?.classList.toggle('dark', darkMode.value);
});

</script>
<template>
  <div class="flex items-end justify-end ms-3">
    <Button variant="ghost" size="sm" class="mr-0" @click="toggleDarkMode">
      <span class="material-symbols-outlined hover:bg-accent p-2 rounded" v-if="darkMode">
        light_mode
      </span>
      <span class="material-symbols-outlined hover:bg-accent p-2 rounded" v-else>
        dark_mode
      </span>
    </Button>
  </div>
  <div
    class="w-80 sm:w-96 p-8 bg-white border border-gray-200 rounded-lg shadow md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form class="space-y-6" @submit.prevent="signInWithEmail(email, password)">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">Login to Clairenet Billing System</h5>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input v-model="email" type="email" name="email" id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com" required />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password</label>
        <input v-model="password" type="password" name="password" id="password" placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required />
      </div>
      <div class="flex items-start">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input v-model="rememberMe" id="remember" type="checkbox" value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
          </div>
          <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember
            me</label>
        </div>
        <!-- <a href="#" class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a> -->
      </div>
      <button type="submit"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

        <div v-if="loading" class="flex items-center justify-center">
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101"
            fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB" />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor" />
          </svg>
          <span>Loading...</span>
        </div>
        <span v-else>Login to your account</span>
      </button>
      <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
        </div> -->
    </form>

  </div>
</template>