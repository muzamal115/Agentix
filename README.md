# 🤖 Agentix — AI Multi-Agent SaaS Platform

Agentix is a full-stack **AI Multi-Agent SaaS platform** that brings multiple AI-powered capabilities together in a single application.

The platform uses specialized AI agents for tasks such as **chat, coding, web search, PDF/document analysis, PowerPoint generation, image generation, and image analysis**.

Agentix was built as a practical project to work with **AI agents, microservices, authentication, databases, Redis, Docker, AWS infrastructure, payment integration, and CI/CD**.

---

## ✨ Features

* 💬 AI Chat Agent
* 💻 AI Coding Agent
* 🔎 Web Search Agent
* 📄 PDF / Document Processing
* 📚 PDF RAG Agent
* 📊 PowerPoint Generation
* 🎨 AI Image Generation
* 🖼️ Image Analyzer Agent
* 🔐 Firebase Authentication
* 🔑 Google Authentication
* 👤 User management
* 💳 Safepay payment integration
* 📦 Free and paid plans
* ⚡ Redis for caching/session-related functionality
* 🗄️ MongoDB database
* 🐳 Dockerized backend services
* ☁️ AWS deployment
* 🔄 GitHub Actions CI/CD

---

## 🏗️ Architecture

Agentix uses a **microservice-style backend architecture**.

```text
                         ┌─────────────────────┐
                         │      Frontend       │
                         │ React + TypeScript  │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │       Gateway       │
                         │       :8000         │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
       │    Auth     │       │    Chat     │       │    Agent    │
       │    :8001    │       │    :8002    │       │    :8003    │
       └─────────────┘       └─────────────┘       └─────────────┘
                                                          │
                                                          ▼
                                                   ┌─────────────┐
                                                   │   Billing   │
                                                   │    :8004    │
                                                   └─────────────┘

                    ┌─────────────┐       ┌─────────────┐
                    │   MongoDB   │       │    Redis    │
                    └─────────────┘       └─────────────┘
```

The **Gateway** acts as the main entry point for backend requests and forwards requests to the appropriate microservice.

---

## 🧩 Backend Services

### Gateway Service

The Gateway runs on port `8000` and handles:

* API routing
* CORS
* Cookies
* Authentication middleware
* Request proxying
* Communication with backend services

### Auth Service

Runs on port `8001`.

Responsibilities include:

* User authentication
* Firebase ID token verification
* Google authentication
* User data management

### Chat Service

Runs on port `8002`.

Handles AI chat-related functionality.

### Agent Service

Runs on port `8003`.

This service contains the AI agent workflows, including specialized agents such as:

* Coding Agent
* Search Agent
* PDF/RAG Agent
* PowerPoint Agent
* Image Generation Agent
* Image Analyzer Agent

### Billing Service

Runs on port `8004`.

Handles:

* Plans
* Payment sessions
* Payment-related operations
* Safepay integration

---

## 🤖 AI Technology

Agentix uses several AI technologies to build and orchestrate its agents.

### LangChain

Used for building AI application workflows and working with language models.

### LangGraph

Used to create structured AI agent workflows and state-based agent execution.

### LLM Providers

The project works with providers/models including:

* Groq
* Gemini
* OpenRouter

### Tavily

Used for AI-powered web search functionality.

### Pollinations

Used for AI image generation.

---

## 🧠 AI Agents

Agentix follows a specialized-agent architecture where different agents handle different types of tasks.

```text
                         User Request
                              │
                              ▼
                       Agent / Intent
                         Selection
                              │
          ┌───────────┬───────┼───────┬───────────┐
          ▼           ▼       ▼       ▼           ▼
        Chat        Coding   Search   PDF        Image
                                      /RAG      Analysis
```

### Coding Agent

The coding agent can generate project files and code artifacts based on user requests.

The coding workflow uses intent classification, LangGraph state, and LLM-powered code generation.

### PDF RAG Agent

The PDF RAG functionality allows users to work with information contained inside documents and use that information as context for AI responses.

### Image Analyzer

The image analysis workflow processes images and uses AI to understand their content.

### Search Agent

The search workflow uses Tavily to retrieve web information for AI-assisted responses.

---

## 🔐 Authentication

Agentix uses **Firebase Authentication**.

The authentication flow includes Google login and backend token verification.

```text
User
  │
  ▼
Firebase Authentication
  │
  ▼
Firebase ID Token
  │
  ▼
Gateway
  │
  ▼
Auth Service
  │
  ▼
Firebase Admin SDK
  │
  ▼
Token Verification
```

The backend uses the Firebase Admin SDK to verify Firebase ID tokens.

---

## 💳 Billing & Payments

Agentix includes a dedicated billing microservice.

The project uses **Safepay** for payment integration.

The billing system supports application plans and creates payment sessions for paid plans.

```text
User
  │
  ▼
Select Plan
  │
  ▼
Billing Service
  │
  ▼
Safepay
  │
  ▼
Payment
```

---

## 🗄️ Database

Agentix uses **MongoDB** with **Mongoose** for database operations.

MongoDB is used for application data such as user and payment-related information.

---

## ⚡ Redis

Redis is used as part of the backend infrastructure for functionality such as:

* Caching
* Session-related functionality
* Temporary data
* Expiration-based data

The project also uses Redis through Node.js Redis tooling such as `ioredis`.

---

## 🖥️ Frontend

The frontend is built with:

* React
* TypeScript
* Vite
* Tailwind CSS
* Redux Toolkit
* Axios
* React Hook Form
* Zod

The frontend communicates with the backend Gateway through HTTP APIs.

---

## 🐳 Docker

The backend services are containerized using Docker.

Each major backend service has its own Dockerfile.

```text
Gateway  → 8000
Auth     → 8001
Chat     → 8002
Agent    → 8003
Billing  → 8004
```

Example:

```bash
docker build -f ./gateway/Dockerfile -t gateway .
```

Run the Gateway container:

```bash
docker run -it -p 8000:8000 gateway
```

Docker was also used to prepare the backend services for AWS deployment.

---

## ☁️ AWS Infrastructure

Agentix was deployed and tested using AWS infrastructure.

AWS services used during the deployment work included:

* Amazon ECS
* Amazon ECR
* Application Load Balancer
* Amazon ElastiCache / Redis
* Amazon S3
* Amazon CloudWatch

The backend services were containerized with Docker and deployed through ECS.

```text
Docker
   │
   ▼
Docker Images
   │
   ▼
Amazon ECR
   │
   ▼
Amazon ECS
   │
   ▼
Application Load Balancer
   │
   ▼
Gateway
   │
   ├── Auth Service
   ├── Chat Service
   ├── Agent Service
   └── Billing Service
```

---

## 🔄 CI/CD

Agentix uses **GitHub Actions** for backend CI/CD.

The deployment workflow automates the process of building Docker images, pushing them to Amazon ECR, and updating ECS services.

```text
Git Push
   │
   ▼
GitHub Actions
   │
   ▼
Checkout Repository
   │
   ▼
Configure AWS Credentials
   │
   ▼
Login to Amazon ECR
   │
   ▼
Build Docker Images
   │
   ▼
Tag Images
   │
   ▼
Push Images to ECR
   │
   ▼
Update ECS Services
```

This removes the need to manually build and push Docker images after every backend change.

---

## 📁 Project Structure

```text
Agentix/
│
├── frontend/
│
├── backend/
│   ├── gateway/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   │
│   ├── services/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── agent/
│   │   └── billing/
│   │
│   ├── shared/
│   └── docker-compose.yml
│
├── .github/
│   └── workflows/
│       └── deploy-backend.yml
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/muzamal115/agentix.git
cd agentix
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd ../backend
npm install
```

The backend consists of multiple services that can be configured and started individually according to their environment configuration.

---

## 🔑 Environment Variables

Agentix requires environment variables for different services.

Example frontend configuration:

```env
VITE_SERVER_URL=http://localhost:8000
```

Backend services use environment variables for configuration such as:

```env
PORT=
MONGODB_URI=
FRONTEND_URL=
AUTH_SERVICE=
CHAT_SERVICE=
AGENT_SERVICE=
BILLING_SERVICE=
REDIS_URL=
```

AI providers, Firebase, Safepay, and other external services also require their respective credentials.

> **Never commit API keys, passwords, Firebase service-account files, or other secrets to GitHub.**

---

## 📚 What This Project Demonstrates

Agentix demonstrates practical experience with:

* Full-stack development
* React and TypeScript
* REST APIs
* Microservice architecture
* API Gateway pattern
* Firebase authentication
* Google authentication
* MongoDB and Mongoose
* Redis
* AI agents
* LangChain
* LangGraph
* RAG
* Web search with Tavily
* AI image generation
* Docker
* AWS
* Amazon ECS
* Amazon ECR
* Load balancing
* GitHub Actions
* CI/CD
* Payment integration with Safepay

---

## 👨‍💻 Author

**Muzammal Ghafoor**

Full-Stack Developer

BS Information Technology Graduate

* GitHub: https://github.com/muzamal115
* LinkedIn: https://www.linkedin.com/in/muzammal-ghafoor-a38014375/

---

## ⭐ Support

If you find Agentix interesting, consider giving the repository a ⭐ on GitHub.
