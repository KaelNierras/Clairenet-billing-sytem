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
  <div class="flex items-center ms-3">
    <Button variant="ghost" size="sm" class="mr-0" @click="toggleDarkMode">
      <span class="material-symbols-outlined" v-if="darkMode">
        light_mode
      </span>
      <span class="material-symbols-outlined" v-else>
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
        <span v-if="loading">Loading...</span> <!-- Add this line -->
        <span v-else>Login to your account</span></button>
      <!-- <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
        </div> -->
    </form>

  </div>
</template>