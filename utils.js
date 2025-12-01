/**
 * Асинхронно загружает и вставляет HTML-контент из указанного файла.
 * @param {string} targetId ID элемента, куда вставлять.
 * @param {string} filePath Путь к HTML-файлу.
 */
async function loadComponent(targetId, filePath) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
        console.error(`Элемент с ID ${targetId} не найден.`);
        return;
    }
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`);
        }
        const html = await response.text();
        targetElement.innerHTML = html;
        
    } catch (error) {
        targetElement.innerHTML = `<p style="color:red;">Ошибка загрузки компонента: ${error.message}</p>`;
        console.error(error);
    }
}

function toggleTheme() {
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

function toggleMenu() {
	  const menu = document.getElementById("sideMenu");
	  menu.classList.toggle("open");
	}

    	// --- ФУНКЦИЯ: Выход из системы (Logout) ---
		// --- НОВАЯ ФУНКЦИЯ: Показать кастомное модальное окно ---
		function showLogoutModal() {
			const modal = document.getElementById('logout-modal');
			const confirmBtn = document.getElementById('modal-confirm-btn');
			const cancelBtn = document.getElementById('modal-cancel-btn');
			
			// 1. Показываем модальное окно
			modal.style.display = 'flex';
			// Добавляем класс для активации CSS-анимации
			setTimeout(() => modal.classList.add('visible'), 10); 

			// 2. Обновляем обработчики
			// Кнопка "Вийти" (Подтверждение)
			confirmBtn.onclick = () => {
				hideLogoutModal();
				handleLogoutConfirm(); // Вызываем фактическую функцию выхода
			};
			
			// Кнопка "Скасувати"
			cancelBtn.onclick = () => {
				hideLogoutModal();
				console.log("Выход отменен пользователем.");
			};
			
			// Закрытие по клику вне окна
			modal.onclick = (e) => {
				if (e.target.id === 'logout-modal') {
					hideLogoutModal();
					console.log("Выход отменен пользователем.");
				}
			};
		}

		// --- НОВАЯ ФУНКЦИЯ: Скрыть модальное окно ---
		function hideLogoutModal() {
			const modal = document.getElementById('logout-modal');
			modal.classList.remove('visible');
			// Скрываем после анимации
			setTimeout(() => { modal.style.display = 'none'; }, 200); 
		}


		// --- ФУНКЦИЯ: Выход из системы (Logout) - ФАКТИЧЕСКИЙ ВЫХОД ---
		async function handleLogoutConfirm() {
			try {
				await auth.signOut();
				console.log("Успешный выход из Firebase.");
				
				// После выхода перенаправляем на страницу авторизации
				window.location.replace('auth.html'); 
				
			} catch (error) {
				console.error("Ошибка при выходе из Firebase:", error);
				alert("Помилка виходу: " + error.message);
			}
		}
		
	// ОСНОВНАЯ ФУНКЦИЯ: Определяет, показывать модальное окно или выходить напрямую
    async function handleLogout() {
    // 1. Проверяем, есть ли на странице модальное окно
    const modal = document.getElementById('logout-modal'); 
    
    if (modal) {
        // Мы на index.html или другой странице с модальным окном
        
        // ВНИМАНИЕ: Вместо вызова showLogoutModal() мы повторно реализуем его логику здесь, 
        // чтобы избежать ошибок, если модальное окно есть, но его функции нет.
        
        const confirmBtn = document.getElementById('modal-confirm-btn');
        const cancelBtn = document.getElementById('modal-cancel-btn');
        
        // Функция для скрытия модального окна (может быть локальной)
        const hideLogoutModal = () => {
            modal.classList.remove('visible');
            setTimeout(() => { modal.style.display = 'none'; }, 200);
        }
        
        // 1. Показываем модальное окно
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('visible'), 10);
        
        // 2. Обновляем обработчики
        confirmBtn.onclick = () => {
            hideLogoutModal();
            handleLogoutConfirm(); // Вызываем фактическую функцию выхода
        };
        
        cancelBtn.onclick = hideLogoutModal;
        
        // Закрытие по клику вне окна
        modal.onclick = (e) => {
            if (e.target.id === 'logout-modal') {
                hideLogoutModal();
            }
        };

    } else {
        // Мы на auth.html или другой странице БЕЗ модального окна (прямой выход)
        console.log("Модальное окно не найдено. Выполняется прямой выход.");
        handleLogoutConfirm();
    }
}

		/* --- ДОБАВЛЕНО: ФУНКЦИЯ ЗАКРЫТИЯ WEBVIEW --- */
		function closeWebView() {
			console.log("Attempting to close WebView...");
			// Проверка наличия нативного Android-интерфейса
			if (typeof Android !== 'undefined' && Android.closeApp) {
				Android.closeApp();
			} else {
				// Fallback для обычного браузера
				console.warn("Native Android closeApp interface not found. Cannot close application.");
			}
		}
		
		// Новый обработчик для меню "Вихід"
		function handleExit() {
			// В зависимости от того, как вы хотите обрабатывать "Вихід":
			// 1. Если это просто выход из сессии:
			handleLogout(); 
			
			// 2. Если нужно закрыть приложение (как в вашем старом коде):
		    closeWebView();
		}
	
		// --- Закрытие меню при клике вне его области ---
document.addEventListener('click', function(event) {
    const sideMenu = document.getElementById('sideMenu');
    const menuBtn = document.querySelector('.menu-button');

    // Если меню не найдено (еще не загрузилось) или оно закрыто — ничего не делаем
    if (!sideMenu || !sideMenu.classList.contains('open')) return;

    // Проверяем: клик был НЕ внутри меню И НЕ по кнопке открытия?
    if (!sideMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        toggleMenu(); // Вызываем функцию закрытия
    }
});