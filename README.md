# Configuración del Backend

## 📥 Instalación de dependencias
1. **Asegúrate de tener Node.js instalado** (versión 18 o superior)
2. **Posiciónate en la carpeta del backend**:
```bash
	cd Routes-Proyect-Node/backend
```
3.  **Instala todas las dependencias**:
    

```bash

npm install
```

## ⚙️ Configuración del entorno (.env)

-   Crea un archivo  `.env`  en la carpeta  `backend`  (junto al  `package.json`)
    
-   Configura las siguientes variables (ajusta según tus necesidades):
    
# Ejemplo para MongoDB Atlas:
```env

PORT=5100

SERVER_DB=@routes.dh7f0if

USER_DB=usr

PASS_DB=u9Tjo7


```
Para desarrollo (con recarga automática):
## 🚀 Ejecución del servidor
```bash

npm run dev
