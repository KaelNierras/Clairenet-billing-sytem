import { signInWithEmail } from '@/data/repositories/firebase_services';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


export function useLoginController() {
    const router = useRouter();
	const userCredentials = ref({ email: localStorage.getItem('rememberMe') || '', password: '' });
	const rememberMe = ref(localStorage.getItem('rememberMe') ? true : false);
	var loading = ref(false); // Add this line
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

	const signIn = async () => {
        loading.value = true;
		try {
			await signInWithEmail(userCredentials.value);
            if (rememberMe.value) {
                localStorage.setItem('rememberMe', userCredentials.value.email);
            } else {
                localStorage.removeItem('rememberMe');
            }
            router.push('/dashboard');
			window.alert('User signed in successfully');
            loading.value = false;
		} catch (error) {
			window.alert(`Error signing in user:', ${error}`);
            loading.value = false;
		}
	};

	return {
        darkMode,
		getDarkMode,
		loading,
		rememberMe,
		toggleDarkMode,
		userCredentials,
		signIn
	};
}
