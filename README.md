Instrucciones para ejecutar el proyecto

##
Este es un proyecto desarrollado con React 19 y configurado usando Vite para un entorno de desarrollo rápido.
Se utilizaron las siguientes tecnologías principales:
#### React Router v7 para el enrutamiento
#### Zustand para el manejo de estado global
#### Tailwind CSS para los estilos
Ideal para construir interfaces modernas, rápidas y escalables.

## Requisitos previos #####
Tener instalado Node.js (v20 o superior recomendado)
Tener instalado npm

## Acceda al proyecto
cd nombre-del-proyecto

## Instalar dependencias
npm install

# Ejecutar el proyecto en desarrollo
npm run dev
http://localhost:5173

## Login
El proyecto incluye un login básico para validar el funcionamiento del manejo de estado global con Zustand.
Puedes iniciar sesión con las siguientes credenciales:

Correo: admin

Contraseña: 123

Una vez autenticado, se generará un token que se usará para validar si el usuario está autenticado o no. Este token se almacena en sessionStorage, lo que permite mantener la sesión activa incluso al recargar la página. El estado de autenticación se gestiona globalmente mediante Zustand.