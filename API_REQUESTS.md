# API Collection for Postman/Thunder Client

## Base URL
```
http://localhost:3001/api/v1
```

## Health Check
```http
GET /health
```

## Patient Endpoints

### Create Patient
```http
POST /patients
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1-555-0101",
  "dateOfBirth": "1985-03-15",
  "gender": "M",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "bloodType": "O+",
  "allergies": "Penicillin",
  "medicalHistory": "Hypertension",
  "emergencyContactName": "Jane Doe",
  "emergencyContactPhone": "+1-555-0102",
  "insuranceProvider": "Blue Cross",
  "insurancePolicyNumber": "BC123456"
}
```

### Get All Patients
```http
GET /patients?page=1&limit=10
```

### Get Patient by ID
```http
GET /patients/{patientId}
```

### Update Patient
```http
PUT /patients/{patientId}
Content-Type: application/json

{
  "firstName": "Jane",
  "email": "jane.doe@example.com"
}
```

### Delete Patient
```http
DELETE /patients/{patientId}
```

### Search Patients
```http
GET /patients/search?firstName=John&bloodType=O+&limit=20
```

### Get Patient Statistics
```http
GET /patients/stats
```

## Appointment Endpoints

### Schedule Appointment
```http
POST /appointments
Content-Type: application/json

{
  "patientId": "{patientId}",
  "doctorId": "{doctorId}",
  "appointmentDate": "2026-02-20",
  "appointmentTime": "14:30",
  "reason": "Regular checkup",
  "consultationType": "in-person",
  "duration": 30
}
```

### Get All Appointments
```http
GET /appointments?page=1&limit=10&status=scheduled
```

### Get Appointment by ID
```http
GET /appointments/{appointmentId}
```

### Get Patient's Appointments
```http
GET /appointments/patient/{patientId}/all
```

### Get Upcoming Appointments
```http
GET /appointments/patient/{patientId}/upcoming?daysAhead=30
```

### Update Appointment
```http
PUT /appointments/{appointmentId}
Content-Type: application/json

{
  "status": "completed",
  "notes": "Appointment completed successfully"
}
```

### Cancel Appointment
```http
POST /appointments/{appointmentId}/cancel
Content-Type: application/json

{
  "reason": "Patient requested cancellation"
}
```

### Get Appointment Statistics
```http
GET /appointments/patient/{patientId}/stats
```

## Doctor Endpoints

### Get Doctor by ID
```http
GET /doctors/{doctorId}
```

### Verify Doctor Availability
```http
GET /doctors/{doctorId}/verify
```

## Sample Requests

### Create a Complete Patient Record
```bash
curl -X POST http://localhost:3001/api/v1/patients \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1-555-0101",
    "dateOfBirth": "1985-03-15",
    "gender": "M"
  }'
```

### Schedule an Appointment
```bash
curl -X POST http://localhost:3001/api/v1/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patientId": "uuid-here",
    "doctorId": "uuid-here",
    "appointmentDate": "2026-02-20",
    "appointmentTime": "14:30",
    "reason": "Regular checkup"
  }'
```

### Get Patient With Pagination
```bash
curl "http://localhost:3001/api/v1/patients?page=1&limit=10"
```
