
        // Screen navigation
        const screens = {
            login: document.getElementById('loginScreen'),
            register: document.getElementById('registerScreen'),
            error: document.getElementById('errorScreen')
        };

        function showScreen(screenId) {
            Object.values(screens).forEach(screen => {
                screen.classList.remove('active');
            });
            screens[screenId].classList.add('active');
        }

        document.getElementById('showRegisterBtn').addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('register');
        });

        document.getElementById('showLoginBtn').addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('login');
        });

        document.getElementById('errorBackBtn').addEventListener('click', () => {
            showScreen('login');
        });

        document.getElementById('errorRetryBtn').addEventListener('click', () => {
            const lastScreen = localStorage.getItem('lastScreen') || 'login';
            showScreen(lastScreen);
        });

        // Validación y envío de formularios.
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            //Validación de demostración: en una aplicación real, esto se conectaría a un backend
            if (username === 'admin' && password === 'admin123') {
                alert('Inicio de sesión exitoso');
            } else {
                localStorage.setItem('lastScreen', 'login');
                document.getElementById('errorTitle').textContent = 'Error de autenticación';
                document.getElementById('errorMessage').textContent = 'Usuario o contraseña incorrectos. Por favor verifique sus credenciales e intente nuevamente.';
                showScreen('error');
            }
        });

        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const nombres = document.getElementById('nombres').value;
            const apellidos = document.getElementById('apellidos').value;
            const cedula = document.getElementById('cedula').value;
            const fechaNacimiento = document.getElementById('fechaNacimiento').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validar formato de cédula 
            const cedulaRegex = /^\d{10}$/;
            if (!cedulaRegex.test(cedula)) {
                localStorage.setItem('lastScreen', 'register');
                document.getElementById('errorTitle').textContent = 'Error de validación';
                document.getElementById('errorMessage').textContent = 'El número de cédula debe contener 10 dígitos numéricos.';
                showScreen('error');
                return;
            }
            
            //Validar fecha de nacimiento (debe tener al menos 18 años) 
            const birthDate = new Date(fechaNacimiento);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 18) {
                localStorage.setItem('lastScreen', 'register');
                document.getElementById('errorTitle').textContent = 'Error de validación';
                document.getElementById('errorMessage').textContent = 'Debe ser mayor de 18 años para registrarse.';
                showScreen('error');
                return;
            }
            
            //Validar coincidencia de contraseña
            if (newPassword !== confirmPassword) {
                localStorage.setItem('lastScreen', 'register');
                document.getElementById('errorTitle').textContent = 'Error de validación';
                document.getElementById('errorMessage').textContent = 'Las contraseñas no coinciden. Por favor verifique e intente nuevamente.';
                showScreen('error');
                return;
            }
            
            // Si pasan todas las validaciones
            alert('Registro exitoso');
            showScreen('login');
        });

        //Agrega animación de movimiento a la pantalla de error
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (screens.error.classList.contains('active')) {
                        screens.error.classList.add('error-shake');
                        setTimeout(() => {
                            screens.error.classList.remove('error-shake');
                        }, 500);
                    }
                }
            });
        });

        observer.observe(screens.error, { attributes: true });
   