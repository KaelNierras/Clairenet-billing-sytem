// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	query,
	where,
	updateDoc,
	doc,
	deleteDoc,
	writeBatch
} from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Customer } from '@/models/customer/customer_model';
import { UserCredentials } from '@/models/authentication/login_model';
import { CustomerPayable } from '@/models/dashboard/table_model';

// Initialize Firebase when the module is loaded
const config = {
	apiKey: 'AIzaSyCyhAz712ZUOAiesBerbeKh9P39GFEP7K4',
	authDomain: 'clairenet-billing-system.firebaseapp.com',
	projectId: 'clairenet-billing-system',
	storageBucket: 'clairenet-billing-system.appspot.com',
	messagingSenderId: '914202204276',
	appId: '1:914202204276:web:b0855dc27f3420751d1921'
};
const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

export const signInWithEmail = async (user: UserCredentials) => {
	try {
		await signInWithEmailAndPassword(auth, user.email, user.password);
	} catch (error: any) {
		throw error;
	}
};

export const addCustomerData = async (user: Customer) => {
	try {
		const customersRef = collection(db, 'customers');
		const q = query(customersRef, where('customerName', '==', user.customerName));
		const querySnapshot = await getDocs(q);
		if (!querySnapshot.empty) {
			throw new Error('A customer with this name already exists.');
		}
		await addDoc(customersRef, {
			customerName: user.customerName,
			address: user.address,
			createdDate: user.createdDate,
			status: user.status
		});
	} catch (error) {
		throw error;
	}
};

export const addPayable = async (user: CustomerPayable) => {
	try {
		const customersRef = collection(db, 'payables');
		await addDoc(customersRef, {
			customerName: user.customerName,
			address: user.address,
			dueDate: user.dueDate,
			bill: user.bill,
			status: user.status
		});
	} catch (error) {
		throw error;
	}
};

export const updateCustomerStatus = async (customerName: string, newStatus: string) => {
	try {
		const customersRef = collection(db, 'customers');
		const q = query(customersRef, where('customerName', '==', customerName));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			throw new Error('No customer found with this name.');
		}
		const docId = querySnapshot.docs[0].id;
		await updateDoc(doc(db, 'customers', docId), { status: newStatus });
	} catch (error) {
		throw error;
	}
};

export const updatePayableStatus = async (customerName: string, newStatus: string) => {
	try {
		const customersRef = collection(db, 'payables');
		const q = query(customersRef, where('customerName', '==', customerName));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			throw new Error('No customer found with this name.');
		}
		const docId = querySnapshot.docs[0].id;
		await updateDoc(doc(db, 'payables', docId), { status: newStatus });
	} catch (error) {
		throw error;
	}
};

export const deleteCustomer = async (customerName: string) => {
	try {
		const customersRef = collection(db, 'customers');
		const q = query(customersRef, where('customerName', '==', customerName));
		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			throw new Error('No customer found with this name.');
		}
		const docId = querySnapshot.docs[0].id;
		await deleteDoc(doc(db, 'customers', docId));

		// Delete associated payables
		const payablesRef = collection(db, 'payables');
		const payablesQuery = query(payablesRef, where('customerName', '==', customerName));
		const payablesSnapshot = await getDocs(payablesQuery);
		const batch = writeBatch(db);
		payablesSnapshot.docs.forEach((doc) => {
			batch.delete(doc.ref);
		});
		await batch.commit();
	} catch (error) {
		throw error;
	}
};

export const getCustomers = async () => {
	const querySnapshot = await getDocs(collection(db, 'customers'));
	return querySnapshot.docs.map((doc) => {
		const data = doc.data();
		const createdDate = data.createdDate.toDate(); // Convert Firestore Timestamp to JavaScript Date
		data.createdDate = createdDate.toDateString(); // Convert Date to string
		return data;
	});
};
export const getCustomerNames = async () => {
	const querySnapshot = await getDocs(collection(db, 'customers'));
	return querySnapshot.docs.map((doc) => doc.data().customerName);
};
export const getCustomersAddress = async (customerName: string) => {
	const q = query(collection(db, 'customers'), where('customerName', '==', customerName));
	const querySnapshot = await getDocs(q);
	const docs = querySnapshot.docs.map((doc) => doc.data().address);
	return docs;
};

export const getPayable = async () => {
	const querySnapshot = await getDocs(collection(db, 'payables'));
	return querySnapshot.docs.map((doc) => {
		const data = doc.data();
		const dueDate = data.dueDate.toDate();
		data.dueDate = dueDate.toDateString();
		return data;
	});
};
export const getUpcomingDuePayables = async () => {
	const twoDaysLater = new Date();
	twoDaysLater.setDate(twoDaysLater.getDate() + 3); // add 2 days to the current date

	const querySnapshot = await getDocs(collection(db, 'payables'));
	return querySnapshot.docs.map(doc => doc.data())
		.filter(data => {
			const dueDate = data.dueDate.toDate(); // Convert Firestore Timestamp to JavaScript Date
			return dueDate <= twoDaysLater;
		});
};