# 🍔 Kiosk App V.1- Aplicación de Autoservicio
<p align="center">
	<b>Aplicación web de autoservicio orientada a la gestión de pedidos en kioskos digitales para restaurantes o establecimientos de comida.</b>
</p>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-14%2B-3C873A?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1-000000?style=for-the-badge&logo=express&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---
# Características

- Carrito de compras dinámico
- Gestión de productos por categorías
- Interfaz táctil moderna tipo kiosk
- Simulación de pagos
- Generación de facturas PDF
- Generación de códigos QR
- Comunicación mediante API REST
- Diseño responsive con Bootstrap y CSS
- Navegación dinámica con React Router
- Alertas interactivas con SweetAlert2

# Tecnologías Utilizadas

## Frontend
- ⚛️ React 19
- 🎨 CSS3
- 🅱️ Bootstrap 5
- 🎯 Bootstrap Icons
- 🔀 React Router DOM
- 🔔 SweetAlert2
- 📄 jsPDF
- 📱 QRCode React

## Backend
- 🟢 Node.js
- 🚂 Express.js
- 🌐 CORS
- 🔐 Dotenv
- 🐘 PostgreSQL (`pg`)

---

# Dependencias Principales

## Frontend

```json
{
  "bootstrap": "^5.3.8",
  "bootstrap-icons": "^1.13.1",
  "jspdf": "^4.2.1",
  "qrcode.react": "^4.2.0",
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^7.14.0",
  "sweetalert2": "^11.26.24"
}
```
## Backend
```json
{
   "cors": "^2.8.6",
  "dotenv": "^17.4.0",
  "express": "^5.1.0",
  "pg": "^8.20.0"
}
```

# Estructura del proyecto
```bash
kiosk-app/
│
├── client/                 # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Backend Express
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```
---

# Instalación

## Clonar el repositorio
```bash
https://github.com/RontaTheOne/Kiosko-POS.git
```
## Instalar dependencias 
```bash
cd KioskDesign
npm install
```
```bash
cd KioskLogic
npm install
```
## Ejecutar el Proyecto
```bash
cd KioskDesign
npm run dev
```
```bash
cd KioskLogic
npm start
```
---

# Base de datos
El proyecto utiliza PostgreSQL como sistema gestor de base de datos.
## Variables de entorno
Crear un archivo .env dentro del KioskLogic:
```bash
PORT=3000
DB_HOST=localhost
DB_USER=tu_usuario_de_postgrSQL
DB_PASSWORD=tu_password
DB_NAME=kioskdb
DB_PORT=5432
```
---

# Imagenes del proyecto

---

# Funcionalidades Futuras
- Panel administrativo
- Autenticación de empleados
- Integración de pagos reales
- Dashboard de ventas
- Obtención de ticket orden mediante escaneo QR
- Despliegue en la nube

---

# Autor
- Desarrollado por Ronald Tapias (RontaTheOne)

---

# Licensia y Uso
Este proyecto se distribuye bajo licencia MIT para facilitar su uso, modificación y adaptación en contextos académicos o de desarrollo.

Puedes reutilizar, modificar y redistribuir el código con la atribución correspondiente.
Los recursos gráficos deben revisarse antes de su publicación externa para confirmar permisos y atribuciones.
Si quieres cambiar la licencia por una académica o institucional, también se puede ajustar.

