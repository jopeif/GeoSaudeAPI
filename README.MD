# GeoSaúdeAPI

API REST do projeto **GeoSaúde**, responsável por centralizar regras de negócio, persistência de dados e autenticação da plataforma.

---

## 📌 Visão Geral

A **GeoSaúdeAPI** fornece endpoints para gerenciamento de usuários, autenticação, permissões e demais recursos do sistema GeoSaúde.  
Arquitetura focada em **Clean Architecture**, separando domínio, aplicação e infraestrutura.

---

## 🧱 Tecnologias

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (JSON Web Token)**
- **Swagger / OpenAPI** (em andamento)

---

## 📂 Estrutura do Projeto

```bash
src/
├── application/
│   ├── DTOs/
│   └── useCases/
├── domain/
│   ├── entities/
│   └── repo/
├── di/
├── infra/
│   ├── web/
│   │   ├── auth/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── middlewares/
│   ├── db/
│   │   └── prisma/
│   └── utils/
└── server.ts
```
---
## ⚙️ Requisitos

- Node.js >= 18

- PostgreSQL

- Yarn ou NPM

---
## 🚀 Instalação
git clone https://github.com/jopeif/GeoSaudeAPI.git

cd geosaude-api

npm install

## 🔐 Variáveis de Ambiente

Crie um arquivo **.env** na raiz do projeto:

DATABASE_URL="sua URL"

URL="http://localhost"

PORT=3000

ACCESS_SECRET = "...";

REFRESH_SECRET = "..."

---
## 🧬 Prisma
**Gerar client**

```npx prisma generate```

**Rodar migrations**

```npx prisma migrate dev```

## ▶️ Executando o Projeto

**Desenvolvimento**

```npm run dev```

**Produção**

```
npm run build
npm start
```

## 📖 Documentação da API
*Documentação temporária, em breve será feita no Swagger.*

---

## 👤 Módulo de Usuários

### **POST** `/user/agent/register`

**Descrição**  
Registra um novo agente no sistema.

**Autenticação**  
❌ Não requer autenticação

---

### 📥 Request Body

| Campo         | Tipo   | Obrigatório | Descrição |
|--------------|--------|-------------|-----------|
| name         | string | ✅ | Nome completo do agente |
| email        | string | ✅ | Email único |
| password     | string | ✅ | Senha do usuário |
| phoneNumber  | string | ✅ | Telefone de contato |
| block        | string | ✅ | Quarteirão |
| registration | string | ✅ | Matrícula única |

#### Exemplo
```json
{
  "name": "João da Silva",
  "email": "joao@email.com",
  "password": "Senha@123",
  "phoneNumber": "88999999999",
  "block": "A",
  "registration": "AGT-001"
}
```

### 📤 Respostas

#### ✅ 201 — Agente criado
```
{
  "success": true,
  "id": "69057c5a-9f49-4300-b66f-39473f3181b4"
}
```

#### ❌ 400 — Requisição inválida

Motivos possíveis:

- Email já em uso

- Matrícula já em uso

```
{
  "success": false,
  "message": "Email already in use"
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```


### **POST** `/user/supervisor/register`

**Descrição**  
Registra um novo supervisor no sistema.

**Autenticação**  
❌ Não requer autenticação

---

### 📥 Request Body

| Campo         | Tipo   | Obrigatório | Descrição |
|--------------|--------|-------------|-----------|
| name         | string | ✅ | Nome completo do supervisor |
| email        | string | ✅ | Email único |
| password     | string | ✅ | Senha do usuário |
| phoneNumber  | string | ✅ | Telefone de contato |
| registration | string | ✅ | Matrícula única |

#### Exemplo
```json
{
  "name": "João da Silva",
  "email": "joao@email.com",
  "password": "Senha@123",
  "phoneNumber": "88999999999",
  "registration": "AGT-001"
}
```

### 📤 Respostas

#### ✅ 201 — Supervisor criado
```
{
  "success": true,
  "id": "69057c5a-9f49-4300-b66f-39473f3181b4"
}
```

#### ❌ 400 — Requisição inválida

Motivos possíveis:

- Email já em uso

- Matrícula já em uso

```
{
  "success": false,
  "message": "Email already in use"
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```

### **POST** `/user/adm/register`

**Descrição**  
Registra um novo administrador no sistema.

**Autenticação**  
❌ Não requer autenticação

---

### 📥 Request Body

| Campo         | Tipo   | Obrigatório | Descrição |
|--------------|--------|-------------|-----------|
| name         | string | ✅ | Nome completo do administrador |
| email        | string | ✅ | Email único |
| password     | string | ✅ | Senha do usuário |
| phoneNumber  | string | ✅ | Telefone de contato |
| accessLevel  | number | ✅ | Nível de acesso |

#### Exemplo
```json
{
  "name": "João da Silva",
  "email": "joao@email.com",
  "password": "Senha@123",
  "phoneNumber": "88999999999",
  "acessLevel": 2
}
```

### 📤 Respostas

#### ✅ 201 — administrador criado
```
{
  "success": true,
  "id": "69057c5a-9f49-4300-b66f-39473f3181b4"
}
```

#### ❌ 400 — Requisição inválida

Motivos possíveis:

- Email já em uso

- Matrícula já em uso

```
{
  "success": false,
  "message": "Email already in use"
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```

### **GET** `/user/`

**Descrição**  
Retorna todos os usuários cadastrados no sistema.

**Autenticação**  
🔒 Requer autenticação

---

### 📤 Respostas

#### ✅ 200 — Usuários buscados com sucesso
```json
{
  "success": true,
  "users": [
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "João Silva",
      "email": "joao.silva@email.com",
      "role": "AGENT",
      "phoneNumber": "+55 11 91234-5678",
      "banned": false,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "registration": "AGT-2025-001",
      "block": "3º quarteirão, rua José Muniz"
    },
    {
      "id": "3b91e7f4-6d2a-4c9b-8b17-91cde12a4f55",
      "name": "Maria Oliveira",
      "email": "maria.oliveira@email.com",
      "role": "SUPERVISOR",
      "phoneNumber": "+55 21 99876-5432",
      "banned": false,
      "createdAt": "2024-11-03T09:10:12.000Z",
      "registration": "SPV-2025-003",
      
    },
    {
      "id": "1a9c5d2e-0f44-4f1a-9c73-77d9b8e4f999",
      "name": "Carlos Mendes",
      "email": "carlos.mendes@email.com",
      "role": "ADM",
      "phoneNumber": "+55 85 98888-7777",
      "banned": true,
      "createdAt": "2023-06-18T18:45:00.000Z",
      "accessLevel": 2
    }
  ]
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```

### **GET** `/user/agent/`

**Descrição**  
Retorna todos os agents cadastrados no sistema.

**Autenticação**  
🔒 Requer autenticação

---

### 📤 Respostas

#### ✅ 200 — Agentes buscados com sucesso
```json
{
  "success": true,
  "users": [
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "João Silva",
      "email": "joao.silva@email.com",
      "role": "AGENT",
      "phoneNumber": "+55 11 91234-5678",
      "banned": false,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "registration": "AGT-2025-001",
      "block": "3º quarteirão, rua José Muniz"
    },
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "Maria Silva",
      "email": "joao.silva@email.com",
      "role": "AGENT",
      "phoneNumber": "+55 11 91234-5678",
      "banned": false,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "registration": "AGT-2025-001",
      "block": "3º quarteirão, rua José Muniz"
    },
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "João Silva",
      "email": "joao.silva@email.com",
      "role": "AGENT",
      "phoneNumber": "+55 11 91234-5678",
      "banned": true,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "registration": "AGT-2025-001",
      "block": "3º quarteirão, rua José Muniz"
    }
  ]
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```

### **GET** `/user/supervisor/`

**Descrição**  
Retorna todos os supervisores cadastrados no sistema.

**Autenticação**  
🔒 Requer autenticação

---

### 📤 Respostas

#### ✅ 200 — Supervisores buscados com sucesso
```json
{
  "success": true,
  "users": [
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "João Silva",
      "email": "joao.silva@email.com",
      "role": "SUPERVISOR",
      "phoneNumber": "+55 11 91234-5678",
      "banned": false,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "registration": "AGT-2025-001",
    },
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "Maria Silva",
      "email": "joao.silva@email.com",
      "role": "SUPERVISOR",
      "phoneNumber": "+55 11 91234-5678",
      "banned": false,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "registration": "AGT-2025-001",
    },
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "João Silva",
      "email": "joao.silva@email.com",
      "role": "SUPERVISOR",
      "phoneNumber": "+55 11 91234-5678",
      "banned": true,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "registration": "AGT-2025-001",
    }
  ]
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```

### **GET** `/user/adm/`

**Descrição**  
Retorna todos os supervisores cadastrados no sistema.

**Autenticação**  
🔒 Requer autenticação

---

### 📤 Respostas

#### ✅ 200 — Administradores buscados com sucesso
```json
{
  "success": true,
  "users": [
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "João Silva",
      "email": "joao.silva@email.com",
      "role": "ADM",
      "phoneNumber": "+55 11 91234-5678",
      "banned": false,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "accessLevel":2
    },
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "João Silva",
      "email": "joao.silva@email.com",
      "role": "ADM",
      "phoneNumber": "+55 11 91234-5678",
      "banned": false,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "accessLevel":2
    },
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "João Silva",
      "email": "joao.silva@email.com",
      "role": "ADM",
      "phoneNumber": "+55 11 91234-5678",
      "banned": false,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "accessLevel":2
    }
  ]
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```

### **GET** `/user/by-id/:id`

**Descrição**  
Retorna o usuário com dado id.

**Autenticação**  
🔒 Requer autenticação

---

### 📤 Respostas

#### ✅ 200 — Usuário buscado com sucesso
```json
{
  "success": true,
  "user": 
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "João Silva",
      "email": "joao.silva@email.com",
      "role": "ADM",
      "phoneNumber": "+55 11 91234-5678",
      "banned": false,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "accessLevel":2
    }
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```

### **GET** `/user/by-registration/:registration`

**Descrição**  
Retorna o usuário com dada matrícula.

**Autenticação**  
🔒 Requer autenticação

---

### 📤 Respostas

#### ✅ 200 — Usuário buscado com sucesso
```json
{
  "success": true,
  "user": 
    {
      "id": "8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
      "name": "João Silva",
      "email": "joao.silva@email.com",
      "role": "SUPERVISOR",
      "phoneNumber": "+55 11 91234-5678",
      "banned": false,
      "createdAt": "2025-02-10T14:32:45.000Z",
      "registration": "SPV-03592"
    }
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```
---
## 🔒 Módulo de Autenticação

### **POST** `/auth/login/`

**Descrição**  
Retorna o Access Token e Refresh Token de um usuário já cadastrado no sistema.

**Autenticação**  
❌ Não requer autenticação

---

### 📥 Request Body

| Campo         | Tipo   | Obrigatório | Descrição |
|--------------|--------|-------------|-----------|
| login        | string | ✅ | Email ou matrícula do usuário |
| password     | string | ✅ | Senha do usuário |

#### Exemplo
```json
{
  "login":"joao.silva@email.com",
  "password":"Password123"
}
```

### 📤 Respostas

#### ✅ 200 — Usuário autenticado com sucesso
```
{
  "success": true,
  "user":{
    "id":"8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTA1N2M1YS05ZjQ5LTQzMDAtYjY2Zi0zOTQ3M2YzMTgxYjQiLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE3NzE5NDA5OTMsImV4cCI6MTc3MTk0MTg5M30.sl7PJIkFoM4SJb8zdI6JNUauFNVqDtjJ-IB-RJQ-qbQ",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTA1N2M1YS05ZjQ5LTQzMDAtYjY2Zi0zOTQ3M2YzMTgxYjQiLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE3NzE5NDA5OTMsImV4cCI6MTc3MjU0NTc5M30.HS4Abz0TVN1rKZ4khVCUn_JR2DD3_R1wp4hCJgso-BM",
    "role": "AGENT"
  }
}
```

#### ❌ 401 — Credenciais inválidas

Motivos possíveis:

- Login (email ou matrícula) não existe no sistema;
- senha incorreta.

```
{
  "success": false,
  "message": "Invalid Credentials."
}
```

#### ❌ 403 — Usuário está banido do sistema

```
{
  "success": false,
  "message": "User is banned."
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```

### **POST** `/auth/refresh-token/`

**Descrição**  
Usuário envia seu Refresh Token atual, o sistema retorna novos Access Token e Refresh Token e invalida o anterior.

**Autenticação**  
❌ Não requer autenticação

---

### 📥 Request Body

| Campo         | Tipo   | Obrigatório | Descrição |
|--------------|--------|-------------|-----------|
| refreshToken | string | ✅ | Refresh Token que é fornecido ao fazer o login. |

#### Exemplo
```json
{
  "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTA1N2M1YS05ZjQ5LTQzMDAtYjY2Zi0zOTQ3M2YzMTgxYjQiLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE3NzE5NDA5OTMsImV4cCI6MTc3MjU0NTc5M30.HS4Abz0TVN1rKZ4khVCUn_JR2DD3_R1wp4hCJgso-BM"
}
```

### 📤 Respostas

#### ✅ 200 — Usuário autenticado com sucesso
```
{
  "success": true,
  "user":{
    "id":"8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTA1N2M1YS05ZjQ5LTQzMDAtYjY2Zi0zOTQ3M2YzMTgxYjQiLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE3NzE5NDA5OTMsImV4cCI6MTc3MTk0MTg5M30.sl7PJIkFoM4SJb8zdI6JNUauFNVqDtjJ-IB-RJQ-qbQ",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTA1N2M1YS05ZjQ5LTQzMDAtYjY2Zi0zOTQ3M2YzMTgxYjQiLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE3NzE5NDA5OTMsImV4cCI6MTc3MjU0NTc5M30.HS4Abz0TVN1rKZ4khVCUn_JR2DD3_R1wp4hCJgso-BM",
    "role": "AGENT"
  }
}
```

#### ❌ 401 — Refresh Token inválido.

Motivos possíveis:

- Nenhum Refresh Token foi fornecido;
- O dado Refresh Token já foi revogado;
- O dado Refresh Token já expirou;

```
{
  "success": false,
  "message": "Refresh Token is not valid."
}
```

#### ❌ 403 — Usuário está banido do sistema

```
{
  "success": false,
  "message": "User is banned."
}
```


#### ❌ 404 — Usuário não existe
Motivos possíveis:

- Usuário que tinha o dado Refresh Token não existe mais.
```
{
  "success": false,
  "message": "User with the given Refresh Token does not exist."
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```

### **POST** `/auth/refresh-token/`

**Descrição**  
Usuário as informações do usuário autenticado atualmente.

**Autenticação**  
🔒 Requer autenticação

---

### 📤 Respostas

#### ✅ 200 — Usuário autenticado com sucesso
```
{
  "success": true,
  "user":{
    "id":"8f3a2c1e-91c4-4d0b-9a42-3a2d9e8a1b21",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTA1N2M1YS05ZjQ5LTQzMDAtYjY2Zi0zOTQ3M2YzMTgxYjQiLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE3NzE5NDA5OTMsImV4cCI6MTc3MTk0MTg5M30.sl7PJIkFoM4SJb8zdI6JNUauFNVqDtjJ-IB-RJQ-qbQ",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OTA1N2M1YS05ZjQ5LTQzMDAtYjY2Zi0zOTQ3M2YzMTgxYjQiLCJyb2xlIjoiQUdFTlQiLCJpYXQiOjE3NzE5NDA5OTMsImV4cCI6MTc3MjU0NTc5M30.HS4Abz0TVN1rKZ4khVCUn_JR2DD3_R1wp4hCJgso-BM",
    "role": "AGENT"
  }
}
```

#### ❌ 404 — Usuário não existe
Motivos possíveis:

- Usuário que tinha o dado Token não existe mais.
```
{
  "success": false,
  "message": "There is no user with given id."
}
```

#### ❌ 500 — Erro interno do servidor
```
{
  "success": false,
  "message": "Internal server error"
}
```


