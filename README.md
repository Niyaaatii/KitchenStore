# KitchenStoreAPI

KitchenStoreAPI is a small ASP.NET Core Web API that manages kitchen store products and categories. It uses Entity Framework Core with a SQLite database and includes a minimal frontend under `frontend/` for quick demos.

## Table of contents

- Project overview
- Tech stack
- Prerequisites
- Setup
- Database (Migrations)
- Run (development)
- API endpoints
- Frontend
- Project structure
- Contributing & next steps

## Project overview

This API exposes endpoints for Categories and Products. Products belong to Categories. The project includes EF Core migrations and a tiny static frontend `frontend/index.html` to exercise the API.

## Tech stack

- .NET 9 (ASP.NET Core)
- Entity Framework Core (SQLite provider)
- Minimal JavaScript frontend (static)

## Prerequisites

- .NET 9 SDK (dotnet) — install from https://dotnet.microsoft.com/
- (Optional) EF Core CLI: `dotnet tool install --global dotnet-ef`

Confirm your dotnet version:

```bash
dotnet --version
```

## Setup

1. Clone the repository:

```bash
git clone <repo-url>
cd KitchenStoreAPI
```

2. Restore packages:

```bash
dotnet restore
```

3. (Optional) If you need the EF CLI and don't have it installed:

```bash
dotnet tool install --global dotnet-ef
```

## Database (migrations)

The project uses a SQLite database configured in `appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=kitchenstore.db"
}
```

Migrations are already included in the `Migrations/` folder. To apply migrations and create/update the database:

```bash
dotnet ef database update
```

To add a new migration (development only):

```bash
dotnet ef migrations add YourMigrationName
dotnet ef database update
```

Note: Run these commands from the project root or specify the project with `--project KitchenStoreAPI.csproj`.

## Run (development)

Start the API using the SDK:

```bash
dotnet run
```

By default ASP.NET Core will launch on the standard Kestrel ports (e.g. `https://localhost:5001` and `http://localhost:5000`), unless overridden via `ASPNETCORE_URLS` or launch settings.

During development Swagger UI is enabled (see `Program.cs`). When running in Development you can open:

```
https://localhost:5001/swagger
```

If you have HTTPS certificate issues when calling from curl, either use `--insecure` or call the HTTP port.

## API endpoints

Base URL: `/api`

Categories

- GET `/api/categories` — Returns all categories
- POST `/api/categories` — Create a new category

Sample Category JSON

```json
{
  "name": "Beverages"
}
```

Products

- GET `/api/products` — Returns all products (includes Category via EF Core Include)
- POST `/api/products` — Create a new product

Sample Product JSON

```json
{
  "name": "Olive Oil",
  "price": 12.99,
  "description": "Extra virgin olive oil",
  "categoryId": 1
}
```

Example curl requests

Get all categories:

```bash
curl -sS https://localhost:5001/api/categories --insecure
```

Create a category:

```bash
curl -sS -X POST https://localhost:5001/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name":"Pantry"}' --insecure
```

Get all products:

```bash
curl -sS https://localhost:5001/api/products --insecure
```

Create a product:

```bash
curl -sS -X POST https://localhost:5001/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Tomato Sauce","price":3.5,"description":"Marinara","categoryId":1}' --insecure
```

## Frontend

There is a tiny static frontend in the `frontend/` folder: `index.html` and `script.js`. It can be opened directly in a browser or served via a static file server. The frontend calls the API endpoints to show products and categories.

## Project structure

- `Controllers/` — API controllers (`ProductsController`, `CategoriesController`)
- `Models/` — EF Core models (`Product`, `Category`)
- `Data/` — `AppDbContext` and EF Core setup
- `Migrations/` — EF Core migrations
- `frontend/` — small static demo UI
- `Program.cs` — app startup and DI configuration
- `appsettings.json` — connection strings and logging

## Contributing & next steps

- Add validation and error handling for controllers (current controllers are minimal).
- Add endpoints for GET by id, PUT (update) and DELETE.
- Add unit/integration tests.
- Consider switching to a richer data store (Postgres/SQL Server) for production.



---


