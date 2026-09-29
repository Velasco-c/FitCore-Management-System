# FitCore Management System

Sistema de gestión desarrollado en **Node.js** para administrar clientes, planes de entrenamiento, nutrición, progreso físico, contratos y movimientos financieros de un entrenador personal o gimnasio.

La aplicación funciona mediante una **interfaz de línea de comandos (CLI)** y utiliza **MySQL** como sistema de persistencia.

## Descripción

FitCore Management System centraliza la información relacionada con la gestión de clientes y los servicios asociados a ellos.

El sistema permite mantener información personal de los clientes, asignar planes de entrenamiento, registrar contratos, controlar el progreso físico, administrar planes nutricionales y alimentos, y registrar movimientos financieros.

La información se almacena en una base de datos relacional, permitiendo conservar el historial de las operaciones y aplicar restricciones de integridad sobre los datos.

## Funcionalidades principales

El sistema incluye las siguientes áreas:

* **Clientes:** registrar, consultar, listar, actualizar y desactivar clientes.
* **Planes de entrenamiento:** crear, consultar, listar, actualizar y desactivar planes.
* **Planes asignados:** asignar planes a clientes, consultar asignaciones, actualizar su información y cancelar asignaciones.
* **Contratos:** crear y consultar contratos asociados a las asignaciones de planes, además de actualizar y cambiar su estado.
* **Progreso físico:** registrar y consultar mediciones de progreso asociadas a los clientes y sus planes.
* **Nutrición:** administrar planes nutricionales, días nutricionales y alimentos asociados a cada día.
* **Alimentos:** administrar el catálogo de alimentos y su información nutricional.
* **Finanzas:** registrar y consultar ingresos y egresos, incluyendo movimientos relacionados con asignaciones.
* **Datos de ejemplo:** cargar datos sintéticos mediante el comando `npm run seed`.

## Tecnologías

* **Node.js** — entorno de ejecución.
* **JavaScript con módulos ES** — lenguaje y sistema de módulos.
* **MySQL** — sistema gestor de base de datos.
* **mysql2** — conexión con MySQL mediante promesas y consultas parametrizadas.
* **Inquirer** — construcción de los menús interactivos de la CLI.
* **dotenv** — gestión de variables de entorno.

## Arquitectura

El proyecto utiliza una arquitectura organizada por responsabilidades:

```text
CLI
 │
 ▼
Commands
 │
 ├── Validators
 │
 ▼
Services
 │
 ▼
Repositories
 │
 ▼
Queries
 │
 ▼
MySQL
```

De forma general:

* **CLI:** interacción con el usuario mediante menús.
* **Commands:** reciben las operaciones provenientes de la CLI y coordinan la ejecución.
* **Validators:** validan los datos de entrada.
* **Services:** contienen las principales reglas de negocio.
* **Repositories:** encapsulan el acceso a los datos.
* **Queries:** contienen las consultas SQL.
* **MySQL:** proporciona la persistencia de la información.

Para conocer la arquitectura con mayor profundidad:

→ [Documentación de arquitectura](./docs/architecture.md)

## Estructura del proyecto

```text
.
├── database/
│   └── schema.sql
│
├── docs/
│   ├── architecture.md
│   └── database/
│       ├── FitCore.svg
│       ├── README.md
│       └── Workbench_ER.png
│
├── src/
│   ├── app.js
│   ├── cli/
│   ├── commands/
│   ├── config/
│   ├── database/
│   ├── models/
│   ├── queries/
│   ├── repositories/
│   ├── services/
│   ├── utils/
│   └── validators/
│
├── tests/
│   └── models/
│       └── seed-data.js
│
└── package.json
```

## Base de datos

El esquema de la base de datos se encuentra en:

[`database/schema.sql`](./database/schema.sql)

La documentación detallada del modelo de datos se encuentra en:

→ [Documentación de la base de datos](./docs/database/README.md)

También se incluyen los diagramas del modelo:

* [Diagrama ER — FitCore](./docs/database/FitCore.svg)
* [Diagrama ER — MySQL Workbench](./docs/database/Workbench_ER.png)

## Requisitos

Antes de ejecutar el proyecto se necesita:

* **Node.js** compatible con las versiones especificadas en `package.json`.
* **npm**.
* **MySQL**.
* Un usuario de MySQL con permisos suficientes para crear la base de datos y sus tablas.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Velasco-c/FitCore-Management-System.git
cd FitCore-Management-System
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos

Ejecutar el esquema SQL:

```bash
mysql -u <usuario> -p < database/schema.sql
```

> [!WARNING]
> `database/schema.sql` utiliza `DROP DATABASE IF EXISTS` antes de crear la base de datos. Si `fitcore_management` ya existe, su contenido será eliminado al ejecutar nuevamente el esquema.

## Configuración

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=<tu_usuario>
DB_PASSWORD=<tu_contraseña>
DB_NAME=fitcore_management
```

El valor de `DB_NAME` debe coincidir con la base de datos definida en `database/schema.sql`.

El archivo `.env` no debe subirse al repositorio.

## Ejecución

### Iniciar la aplicación

```bash
npm start
```

Ejecuta:

```text
node src/app.js
```

### Modo desarrollo

```bash
npm run dev
```

Utiliza `node --watch` para reiniciar la aplicación cuando se detectan cambios.

### Cargar datos de ejemplo

```bash
npm run seed
```

Este comando ejecuta:

```text
node tests/models/seed-data.js
```

El script genera datos sintéticos para facilitar la preparación de información inicial en la base de datos.

## Posibles mejoras

La implementación actual proporciona las funcionalidades principales del sistema. Como parte de una evolución futura, podrían considerarse las siguientes mejoras:

* Incorporar **transacciones** para operaciones que involucren múltiples modificaciones relacionadas en la base de datos.
* Incorporar un archivo **`.env.example`** para facilitar la configuración inicial del proyecto.
* Ampliar el manejo de errores y la retroalimentación proporcionada por la CLI.
* Incorporar mecanismos adicionales de validación e integridad conforme aumenten las funcionalidades del sistema.
* Evolucionar la arquitectura de persistencia y los mecanismos de consulta a medida que crezca el volumen de información.
* Incorporar pruebas automatizadas en futuras etapas de desarrollo, si el alcance del proyecto lo requiere.

Estas propuestas corresponden a posibles evoluciones del sistema y no representan funcionalidades requeridas para la versión actual.

## Documentación

| Documento                                              | Descripción                                                                                                          |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| [Arquitectura](./docs/architecture.md)                 | Arquitectura, flujo de ejecución, responsabilidades, validaciones, servicios, repositories y observaciones técnicas. |
| [Base de datos](./docs/database/README.md)             | Entidades, tablas, relaciones, restricciones, integridad e implementación del modelo de datos.                       |
| [Diagrama ER](./docs/database/FitCore.svg)             | Representación gráfica del modelo entidad-relación.                                                                  |
| [Diagrama Workbench](./docs/database/Workbench_ER.png) | Diagrama del modelo generado mediante MySQL Workbench.                                                               |

## Licencia

Este proyecto utiliza la licencia **ISC**, de acuerdo con la configuración definida en `package.json`.
