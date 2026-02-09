# Contributing Guide

## Code Standards

### JavaScript Style
- Use ES6+ features
- Use async/await instead of callbacks
- Use const/let instead of var
- Follow ESLint rules defined in `.eslintrc.json`

### Naming Conventions
- Variables/Functions: camelCase
- Classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- Files: lowercase with dashes (e.g., patient-controller.js)

### Code Organization
- One model per file
- Keep services focused on business logic
- Controllers handle HTTP concerns only
- Middleware for cross-cutting concerns

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/patient-vaccination-records

# Make changes
npm run dev

# Test changes
npm test

# Lint code
npm run lint

# Format code
npm run format

# Commit changes
git commit -m "feat: add patient vaccination records"

# Push to origin
git push origin feature/patient-vaccination-records
```

### 2. Creating a New Endpoint

**Step 1: Create Model (if needed)**
```javascript
// src/models/MedicalRecord.js
module.exports = (sequelize) => {
  const MedicalRecord = sequelize.define('MedicalRecord', {
    // fields...
  });
  return MedicalRecord;
};
```

**Step 2: Create Service**
```javascript
// src/services/medicalRecordService.js
class MedicalRecordService {
  async create(data) { /* ... */ }
  async getById(id) { /* ... */ }
}
module.exports = new MedicalRecordService();
```

**Step 3: Create Controller**
```javascript
// src/controllers/medicalRecordController.js
class MedicalRecordController {
  async create(req, res, next) { /* ... */ }
  async getById(req, res, next) { /* ... */ }
}
module.exports = new MedicalRecordController();
```

**Step 4: Create Route**
```javascript
// src/routes/medicalRecordRoutes.js
router.post('/', validate(validators.createMedicalRecord), controller.create);
router.get('/:id', controller.getById);
```

**Step 5: Add Validator**
```javascript
// src/utils/validators.js
createMedicalRecord: Joi.object({
  patientId: Joi.string().uuid().required(),
  // ...
})
```

### 3. Migrations

```bash
# Create migration
npx sequelize-cli migration:generate --name add-vaccination-status

# Edit migration file
vim src/migrations/XXXXX-add-vaccination-status.js

# Run migration
npm run db:migrate

# If error, undo
npm run db:migrate:undo
```

### 4. Testing

```bash
# Run single test file
npm test -- tests/patient.test.js

# Run specific test
npm test -- tests/patient.test.js -t "should create patient"

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

## Adding Database Features

### Add a New Table
```bash
# Create migration
npx sequelize-cli migration:generate --name create-medical-records

# Edit: src/migrations/XXXXX-create-medical-records.js
# Run: npm run db:migrate
```

### Modify Existing Table
```bash
# Create migration
npx sequelize-cli migration:generate --name add-field-to-patient

# Edit migration to add/remove columns
# Run: npm run db:migrate
```

### Create Seeder
```bash
# Generate seeder
npx sequelize-cli seed:generate --name demo-medical-records

# Edit: src/seeders/XXXXX-demo-medical-records.js
# Run: npm run db:seed
```

## Error Handling Pattern

```javascript
// Service method
async getPatient(id) {
  try {
    const patient = await Patient.findByPk(id);
    if (!patient) {
      const error = new Error('Patient not found');
      error.statusCode = 404;
      throw error;
    }
    return patient;
  } catch (error) {
    throw error;
  }
}

// Controller method
async getById(req, res, next) {
  try {
    const patient = await patientService.getPatient(req.params.id);
    res.json(responseFormatter.success(patient));
  } catch (error) {
    next(error);  // Pass to error handler
  }
}
```

## Adding Validation

```javascript
// Add to src/utils/validators.js
updateMedicalRecord: Joi.object({
  recordType: Joi.string()
    .valid('vaccination', 'allergy', 'surgery')
    .required(),
  details: Joi.string().min(10).required(),
  dateRecorded: Joi.date().required()
}).min(1)

// Use in route
router.put('/:id',
  validate(validators.updateMedicalRecord),
  controller.update
);
```

## Performance Optimization

### 1. Query Optimization
```javascript
// Bad: N+1 query problem
const patients = await Patient.findAll();
patients.forEach(p => {
  p.appointments = await Appointment.findAll({ where: { patientId: p.id } });
});

// Good: Use eager loading
const patients = await Patient.findAll({
  include: [{ model: Appointment }]
});
```

### 2. Pagination
```javascript
// Always paginate large result sets
const { rows, count } = await Patient.findAndCountAll({
  offset: (page - 1) * limit,
  limit,
  order: [['createdAt', 'DESC']]
});
```

### 3. Indexing
```javascript
// Add indexes for frequently queried columns
// In migration:
await queryInterface.addIndex('table_name', ['column_name']);
```

## Testing Guidelines

### Test Structure
```javascript
describe('PatientController', () => {
  describe('POST /patients', () => {
    it('should create a new patient', async () => {
      // Arrange
      const patientData = { /* ... */ };

      // Act
      const response = await request(app)
        .post('/api/v1/patients')
        .send(patientData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
    });
  });
});
```

### Coverage Goals
- Overall: >80%
- Controllers: >90%
- Services: >85%
- Utils: >95%

## Commit Message Convention

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore
**Scope**: patient, appointment, doctor, auth, etc.

### Examples
```
feat(patient): add vaccination history tracking
fix(appointment): prevent double booking
docs(api): update patient endpoint documentation
refactor(patient-service): improve query performance
```

## Review Checklist

- [ ] Code follows style guide
- [ ] No console.log statements
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] No hardcoded secrets
- [ ] Performance optimized

## Release Process

### Version Numbering
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Pre-Release
1. Update version in package.json
2. Update CHANGELOG.md
3. Create release branch
4. Run full test suite
5. Create pull request
6. Code review and approval

### Release
1. Merge to main
2. Create git tag
3. Build Docker image
4. Push to registry
5. Deploy to staging
6. Deploy to production

## Getting Help

- Check existing issues in repository
- Review API documentation
- Check test examples
- Ask team members in discussion forum

## Resources

- [Express.js Documentation](https://expressjs.com)
- [Sequelize Documentation](https://sequelize.org)
- [Joi Validation](https://joi.dev)
- [Jest Testing](https://jestjs.io)

---

**Thank you for contributing!**
