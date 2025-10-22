// firebase-init.js

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA91w3MTHWuUAQnbvfE1sxVNz2bRM1DuSU",
    authDomain: "meter-form.firebaseapp.com",
    projectId: "meter-form",
    storageBucket: "meter-form.firebasestorage.app",
    messagingSenderId: "1048555343427",
    appId: "1:1048555343427:web:09ec7f6242c7c7fb86cef6",
    measurementId: "G-RVW9QQG9F5"
};

// Инициализация приложения
const app = firebase.initializeApp(firebaseConfig);

// Глобальные ссылки на сервисы, которые мы используем
const auth = app.auth();
const db = app.firestore();
  
console.log("✅ Firebase (Auth и Firestore) успешно подключен.");