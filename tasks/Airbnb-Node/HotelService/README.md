
```markdown
## 🏨 HotelService - Sequelize CRUD API

**Sequelize CRUD operations** with validation using **Zod** and soft delete support using `deletedAt`.

---

## ✨ Features

- ✅ RESTful CRUD API for Hotels  
- ✅ Clean project structure  
- ✅ Soft delete support (`deletedAt`)  
- ✅ Schema validation using Zod  
- ✅ DTOs for strong typing  

---

## 📦 Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd HotelService
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file in the root

```env
PORT=3000
DB_HOST=your_db_host
DB_USER=your_db_user_name
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=db_port
```

### 4. Run Sequelize migrations

```bash
npx sequelize-cli db:migrate
```

### 5. Start the development server

```bash
npm run dev
```

---

## 🧪 API Endpoints

| Method | Endpoint        | Description            |
|--------|------------------|------------------------|
| POST   | `/hotels`        | Create a new hotel     |
| GET    | `/hotels`        | Get all hotels         |
| GET    | `/hotels/:id`    | Get hotel by ID        |
| PUT    | `/hotels/:id`    | Update hotel details   |
| DELETE | `/hotels/:id`    | Soft delete a hotel    |

---

## 📚 Learning Goals

### ✅ Sequelize Models & Migrations  
Define your database structure and keep it version-controlled using migrations.

### 🧼 Soft Deletes with `deletedAt`  
Use non-destructive delete operations by marking records as removed instead of hard deletion.

### 🧱 Layered Architecture  
Organize your code cleanly using layers:
```
Controller → Service → Repository
```

### 🔐 Type-Safe Request Handling  
Use **Zod** schemas and DTOs for safe and structured request validation.

---

## 🗂 Folder Structure

```
src/
├── config/             # Configuration files
├── controllers/        # Route handlers
├── db/
│   ├── migrations/     # Sequelize migration files
│   ├── models/         # Sequelize models
│   └── seeders/        # Sequelize seed files
├── dto/                # DTOs (Type-safe shapes)
├── middlewares/        # Express middlewares
├── repositories/       # Data access logic
├── routes/             # Route definitions
├── services/           # Business logic
├── utils/              # Utilities and custom errors
└── validators/         # Zod validation schemas

.env                    # Environment variables
.gitignore              # Git ignored files
package.json            # NPM project metadata
README.md               # Project documentation
```

---