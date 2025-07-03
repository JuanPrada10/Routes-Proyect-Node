# Configuración del Backend

## 📥 Instalación de dependencias

1. **Asegúrate de tener Node.js instalado** (versión 18 o superior)
2. **Posiciónate en la carpeta del backend**:
   ```bash
   cd Routes-Proyect-Node/backend
Instala todas las dependencias:

bash
npm install
#⚙️ Configuración del entorno (.env)
-Crea un archivo .env en la carpeta backend (junto al package.json)

-Configura las siguientes variables (ajusta según tus necesidades):
   env:
   PORT=3000
   # Ejemplo para MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://usuario:contraseña@cluster0.mongodb.net/nombre-db
No commits el archivo .env (debe estar listado en tu .gitignore)

🚀 Ejecución del servidor
Para desarrollo (con recarga automática):
bash
npm run dev
