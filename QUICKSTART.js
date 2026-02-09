#!/usr/bin/env node

/**
 * Hospital Management System - Patient Service
 * Quick Start Guide
 */

console.log(`
╔════════════════════════════════════════════════════════════════╗
║         Patient Service - Quick Start Guide                   ║
╚════════════════════════════════════════════════════════════════╝

🚀 INSTALLATION

1. Install dependencies:
   npm install

2. Configure environment:
   cp .env.example .env
   
   Edit .env with your database credentials

3. Run migrations:
   npm run db:migrate

4. Seed demo data (optional):
   npm run db:seed

5. Start service:
   npm run dev

📦 DOCKER SETUP

1. Run with Docker Compose:
   docker-compose up -d

2. Run migrations:
   docker-compose exec patient-service npm run db:migrate

3. Service available at:
   http://localhost:3001

🧪 TESTING

1. Run tests:
   npm test

2. Watch mode:
   npm run test:watch

3. Lint code:
   npm run lint

4. Format code:
   npm run format

📚 API DOCUMENTATION

Base URL: http://localhost:3001/api/v1

Key Endpoints:
  GET    /health                      - Health check
  POST   /patients                    - Create patient
  GET    /patients                    - List patients
  GET    /patients/:id                - Get patient
  PUT    /patients/:id                - Update patient
  DELETE /patients/:id                - Delete patient
  
  POST   /appointments                - Schedule appointment
  GET    /appointments                - List appointments
  GET    /appointments/:id            - Get appointment
  PUT    /appointments/:id            - Update appointment
  POST   /appointments/:id/cancel     - Cancel appointment

🔧 DEVELOPMENT

Watch mode: npm run dev
Debug mode: node --inspect src/index.js

📋 DATABASE COMMANDS

Migrate:     npm run db:migrate
Undo:        npm run db:migrate:undo
Seed:        npm run db:seed
Unseed:      npm run db:seed:undo

🐳 DOCKER COMMANDS

Build:       npm run docker:build
Run:         npm run docker:run
Stop:        docker-compose down
Logs:        docker-compose logs -f

📖 Additional Documentation
See README.md for detailed API documentation and setup instructions.

🎯 Next Steps

1. Start the service
2. Test health endpoint: curl http://localhost:3001/api/v1/health
3. Create a patient using POST /patients
4. Explore the API with provided endpoints

Happy Coding! 🎉
`);
