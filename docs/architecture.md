# FitCore Management System

Sistema de gestión desarrollado en **Node.js** para administrar clientes, planes de entrenamiento, nutrición, progreso físico, contratos y movimientos financieros de un entrenador personal o gimnasio.

La aplicación funciona mediante una **interfaz de línea de comandos (CLI)** y utiliza **MySQL** como sistema de persistencia.

---

## Descripción

FitCore Management System centraliza la información relacionada con la gestión de clientes y los servicios asociados a ellos.

El sistema permite mantener información personal de los clientes, asignar planes de entrenamiento, registrar contratos, controlar el progreso físico, administrar planes nutricionales y alimentos, y registrar movimientos financieros.

La información se almacena en una base de datos relacional, permitiendo conservar el historial de las operaciones y aplicar restricciones de integridad sobre los datos.

---

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
* **Datos sintéticos:** cargar información de ejemplo mediante el comando `npm run seed`.

---

## Tecnologías

* **Node.js** — entorno de ejecución.
* **JavaScript con módulos ES** — lenguaje y sistema de módulos.
* **MySQL** — sistema gestor de base de datos.
* **mysql2** — conexión con MySQL mediante promesas y consultas parametrizadas.
* **Inquirer** — construcción de los menús interactivos de la CLI.
* **dotenv** — gestión de variables de entorno.
* **Jest** — dependencia de desarrollo disponible para incorporar pruebas automatizadas.

---

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
* **Commands:** reciben las operaciones provenientes de la CLI, ejecutan la validación y delegan la operación al service.
* **Validators:** validan y normalizan los datos de entrada.
* **Services:** contienen las principales reglas de negocio.
* **Repositories:** encapsulan el acceso a los datos.
* **Queries:** contienen las consultas SQL.
* **Models:** representan los datos mediante clases JavaScript.
* **MySQL:** proporciona la persistencia y aplica restricciones de integridad.

Para consultar el funcionamiento detallado de cada capa:

→ [Documentación de arquitectura](./docs/architecture.md)

---

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

El directorio `tests/models/seed-data.js` contiene actualmente el script utilizado para generar **datos sintéticos** para el sistema. Su función es facilitar la preparación de información de ejemplo para trabajar con la aplicación.

---

## Base de datos

El esquema de la base de datos se encuentra en:

[`database/schema.sql`](./database/schema.sql)

La documentación detallada del modelo de datos se encuentra en:

→ [Documentación de la base de datos](./docs/database/README.md)

También se incluyen los diagramas del modelo:

* [Diagrama ER — FitCore](./docs/database/FitCore.svg)
* [Diagrama ER — MySQL Workbench](./docs/database/Workbench_ER.png)

---

## Requisitos

Antes de ejecutar el proyecto se necesita:

* **Node.js** compatible con las versiones especificadas en `package.json`.
* **npm**.
* **MySQL**.
* Un usuario de MySQL con permisos suficientes para crear la base de datos y sus tablas.

---

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

---

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

> [!TIP]
> Se recomienda crear posteriormente un archivo `.env.example` con las variables requeridas y valores de referencia, sin incluir credenciales reales. Esto facilita la configuración inicial del proyecto y documenta explícitamente las variables necesarias.

---

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

Utiliza `node --watch` para reiniciar la aplicación automáticamente cuando se detectan cambios.

### Cargar datos sintéticos

```bash
npm run seed
```

Este comando ejecuta:

```text
node tests/models/seed-data.js
```

El script genera información sintética para facilitar la preparación de datos iniciales en la base de datos.

> [!WARNING]
> El comando `npm run seed` inserta información directamente en la base de datos configurada mediante `.env`. Se recomienda ejecutarlo sobre una base de datos destinada al desarrollo o demostración.

---

## Consideraciones técnicas

El análisis de la implementación identificó algunos aspectos que pueden evolucionar en futuras versiones:

### Manejo de errores

Actualmente se utiliza `Error` estándar para errores de validación, reglas de negocio y errores propagados desde MySQL.

Una evolución posible sería incorporar tipos de error específicos, por ejemplo:

```text
ValidationError
BusinessRuleError
NotFoundError
DatabaseError
```

Esto permitiría diferenciar los errores de entrada de los errores internos y mejorar los mensajes mostrados por la CLI.

### Transacciones

Las operaciones actuales realizan principalmente escrituras individuales. A medida que el sistema incorpore operaciones que modifiquen varias entidades como parte de una misma operación lógica, será conveniente utilizar **transacciones de MySQL** para garantizar atomicidad.

### Integridad de reglas de negocio

Algunas reglas importantes actualmente se controlan desde Services. Por ejemplo, el sistema verifica que un cliente no tenga otra asignación activa antes de crear una nueva.

Para reglas críticas que deban mantenerse incluso ante operaciones concurrentes, puede ser conveniente reforzar la integridad directamente en la base de datos y/o mediante transacciones.

### Consistencia de validaciones

Los Validators ya centralizan gran parte de la validación de entrada. Como evolución, puede reducirse la duplicación existente entre validators mediante utilidades compartidas para reglas repetidas como:

* validación de identificadores;
* fechas;
* rangos de fechas;
* estados;
* campos obligatorios;
* longitudes máximas.

### Configuración

Actualmente la configuración depende directamente de las variables de entorno.

Una mejora sencilla sería incorporar:

```text
.env.example
```

para documentar las variables necesarias sin exponer credenciales.

### Presentación de resultados

Algunas operaciones de la CLI podrían mejorar la forma en que presentan sus resultados, especialmente aquellas que actualmente reciben identificadores de inserción o cantidad de filas afectadas.

Una evolución posible sería consultar nuevamente el registro después de una operación de creación o actualización y mostrar el resultado completo al usuario.

> [!NOTE]
> Estas mejoras representan oportunidades de evolución identificadas a partir del análisis del código. No forman parte de la implementación actual.

---

## Documentación

| Documento                                              | Descripción                                                                                                         |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| [Arquitectura](./docs/architecture.md)                 | Arquitectura, flujo de ejecución, responsabilidades, validaciones, services, repositories y observaciones técnicas. |
| [Base de datos](./docs/database/README.md)             | Entidades, tablas, relaciones, restricciones, integridad e implementación del modelo de datos.                      |
| [Diagrama ER](./docs/database/FitCore.svg)             | Representación gráfica del modelo entidad-relación.                                                                 |
| [Diagrama Workbench](./docs/database/Workbench_ER.png) | Diagrama generado mediante MySQL Workbench.                                                                         |

---

## Licencia

Este proyecto utiliza la licencia **ISC**, de acuerdo con la configuración definida en `package.json`.

# Glosario

| Término                    | Descripción                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| **CLI**                    | Interfaz de línea de comandos utilizada para interactuar con el sistema.                                 |
| **Command**                | Capa que coordina la validación de entrada y la ejecución de una operación.                              |
| **Validator**              | Componente responsable de validar y normalizar datos de entrada.                                         |
| **Service**                | Componente que implementa reglas y operaciones de negocio.                                               |
| **Repository**             | Componente encargado de acceder a la base de datos.                                                      |
| **Query**                  | Consulta SQL utilizada para interactuar con MySQL.                                                       |
| **Model**                  | Clase JavaScript utilizada para representar datos de una entidad.                                        |
| **Pool**                   | Conjunto administrado de conexiones reutilizables hacia MySQL.                                           |
| **Seed**                   | Script utilizado para insertar datos sintéticos o iniciales en una base de datos.                        |
| **Integridad referencial** | Mecanismo mediante claves foráneas que mantiene relaciones válidas entre tablas.                         |
| **Transacción**            | Unidad de trabajo que permite confirmar o revertir varias operaciones de base de datos de forma atómica. |

# Resumen

FitCore Management System es una aplicación CLI desarrollada con **Node.js, JavaScript ES Modules y MySQL**, organizada mediante una arquitectura por capas.

La separación entre **CLI, Commands, Validators, Services, Repositories y Queries** permite distribuir las responsabilidades del sistema y mantener el acceso a la base de datos separado de la lógica de negocio.

La persistencia se encuentra respaldada por un modelo relacional con restricciones de integridad, mientras que los Services concentran las principales reglas de negocio y los Validators gestionan la validación y normalización de los datos de entrada.

El proyecto incluye además un mecanismo para generar **datos sintéticos** mediante `npm run seed`, facilitando la preparación de información para trabajar con la aplicación.

La documentación detallada de la implementación se encuentra en los documentos de [arquitectura](./docs/architecture.md) y [base de datos](./docs/database/README.md).
