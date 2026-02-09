# Deployment & Architecture Guide

## System Architecture

### 3-Tier Microservices Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Client Applications                         │
│              (Web, Mobile, Desktop, 3rd Party)                  │
└────────────────────┬────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Patient    │ │   Doctor     │ │ Appointment  │
│   Service    │ │   Service    │ │   Service    │
│   (Port 3001)│ │ (Port 3002)  │ │  (Port 3003) │
└──────────────┘ └──────────────┘ └──────────────┘
        │            │            │
        └────────────┼────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐        ┌──────────────┐
│  PostgreSQL/ │        │    Redis     │
│    MySQL     │        │   (Cache)    │
└──────────────┘        └──────────────┘
```

## Patient Service Details

### Service Responsibilities
- Patient registration and profile management
- Medical history tracking
- Insurance information management
- Appointment coordination (with appointment service)
- Patient search and filtering
- Patient statistics and analytics

### Technology Stack
- **API Layer**: Express.js with REST endpoints
- **Business Logic**: Service layer pattern
- **Data Access**: Sequelize ORM
- **Database**: PostgreSQL/MySQL
- **Validation**: Joi schemas
- **Logging**: Morgan
- **Containerization**: Docker

## Deployment Options

### 1. Local Development
```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

### 2. Docker (Single Service)
```bash
docker build -t patient-service:latest .
docker run -p 3001:3001 --env-file .env patient-service:latest
```

### 3. Docker Compose (Full Stack)
```bash
docker-compose up -d
docker-compose exec patient-service npm run db:migrate
```

### 4. Kubernetes Deployment

**Create ConfigMap for configuration:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: patient-service-config
data:
  NODE_ENV: "production"
  PORT: "3001"
  DB_DIALECT: "postgres"
  DB_HOST: "postgres-service"
  API_PREFIX: "/api/v1"
```

**Create Secret for sensitive data:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: patient-service-secrets
type: Opaque
stringData:
  DB_PASSWORD: "your-password"
  DB_USER: "postgres"
  JWT_SECRET: "your-secret-key"
```

**Deployment:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: patient-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: patient-service
  template:
    metadata:
      labels:
        app: patient-service
    spec:
      containers:
      - name: patient-service
        image: patient-service:latest
        ports:
        - containerPort: 3001
        envFrom:
        - configMapRef:
            name: patient-service-config
        - secretRef:
            name: patient-service-secrets
        livenessProbe:
          httpGet:
            path: /api/v1/health
            port: 3001
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/v1/health
            port: 3001
          initialDelaySeconds: 10
          periodSeconds: 5
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: patient-service
spec:
  selector:
    app: patient-service
  ports:
  - protocol: TCP
    port: 3001
    targetPort: 3001
```

## Database Configuration

### PostgreSQL Setup

**Production Connection String:**
```
postgresql://user:password@host:5432/hospital_patient_db
```

**With SSL:**
```
postgresql://user:password@host:5432/hospital_patient_db?ssl=true
```

**Connection Pooling:**
- Max connections: 10 (production)
- Idle timeout: 10 seconds
- Acquire timeout: 30 seconds

### MySQL Setup

**Connection String:**
```
mysql://user:password@host:3306/hospital_patient_db
```

**Connection Pooling:**
- Max connections: 10
- Min connections: 2
- Idle timeout: 10 seconds

## Security Considerations

### 1. Authentication & Authorization
- Implement JWT validation middleware
- Add role-based access control (RBAC)
- Secure token refresh mechanism

### 2. Data Protection
- Use HTTPS/TLS for all communications
- Encrypt sensitive data at rest
- Hash passwords with bcryptjs
- SQL injection prevention (via ORM)

### 3. API Security
- Rate limiting
- CORS configuration
- Input validation and sanitization
- Output encoding

### 4. Infrastructure Security
- Firewall rules
- Database access control
- VPC isolation
- Key/secrets management

## Performance Optimization

### 1. Database Optimization
```javascript
// Use connection pooling
DB Pooling: {
  max: 10,
  min: 2,
  idle: 10000,
  acquire: 30000
}

// Index critical columns
CREATE INDEX idx_patients_email ON patients(email);
CREATE INDEX idx_patients_status ON patients(status);
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
```

### 2. Caching Strategy
```javascript
// Cache frequently accessed data with Redis
- Patient profiles (TTL: 1 hour)
- Doctor availability (TTL: 30 minutes)
- Appointment slots (TTL: 15 minutes)
```

### 3. Query Optimization
- Use pagination for list endpoints
- Select only required fields
- Implement lazy loading
- Use database indexes

### 4. Application Optimization
- Compression middleware
- Response caching
- Async/await patterns
- Connection pooling

## Monitoring & Logging

### Logging Setup
```javascript
// Winston Logger Configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### Metrics to Monitor
- API response time
- Error rate
- Database query performance
- Memory usage
- CPU usage
- Request throughput

### Health Checks
```bash
GET /api/v1/health
```

## Backup & Recovery

### Database Backup Strategy
```bash
# PostgreSQL
pg_dump -U postgres -d hospital_patient_db > backup.sql

# MySQL
mysqldump -u root -p hospital_patient_db > backup.sql
```

### Automated Backups (Cron)
```bash
# Daily backup at 2 AM
0 2 * * * /path/to/backup-script.sh
```

## Scaling Strategies

### Horizontal Scaling
- Load balancing (Nginx, HAProxy)
- Multiple service instances
- Database replication
- Cache distribution

### Vertical Scaling
- Increase resources (CPU, RAM)
- Optimize queries
- Implement caching
- Connection pooling

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy Patient Service

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
      - run: npm run lint

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: docker build -t patient-service:latest .
      - run: docker push your-registry/patient-service:latest
```

## Troubleshooting Deployment

### Common Issues

**1. Database Connection Timeout**
```
Solution: Check firewall, verify credentials, ensure service is running
```

**2. Port Already in Use**
```bash
lsof -i :3001
kill -9 <PID>
```

**3. Memory Leak**
```
Solution: Check for unclosed connections, implement proper cleanup
```

**4. High Latency**
```
Solution: Optimize queries, implement caching, check network
```

## Production Checklist

- [ ] Environment variables configured
- [ ] Database backups automated
- [ ] SSL/TLS certificates installed
- [ ] Monitoring and alerts set up
- [ ] Logging infrastructure deployed
- [ ] Error tracking configured
- [ ] Rate limiting implemented
- [ ] API documentation updated
- [ ] Security audit completed
- [ ] Load testing performed
- [ ] Disaster recovery plan documented
- [ ] Team trained on deployment
