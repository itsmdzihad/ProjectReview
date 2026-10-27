# Backend API

API documentation for the Express backend.

## Base URL and conventions

- Base path: `/api/v1`
- Requests with a body use JSON (`Content-Type: application/json`).
- Login sets an `accessToken` HTTP-only cookie. Protected routes read the token from that cookie; send it on later requests. The API does not document a Bearer-token header because the middleware does not read one.
- Roles are `STUDENT` and `MENTOR`.
- Successful responses use `{ "success": true, "statusCode": <number>, "message": "...", "data": ... }`.
- Error responses use `{ "success": false, "message": "...", "error": ..., "stack": ... }`. In development, `error` and `stack` contain details; otherwise they are `null`. Validation failures return HTTP 400 and include a validation message.
- UUIDs and timestamps below are illustrative. Response messages follow the server's capitalization normalization.
- List endpoints accept pagination query parameters, but their current controllers return only the `data` array; they do not include the `meta` pagination object calculated by the services. `page` defaults to `1`, `limit` defaults to `10`, and service limits are clamped to `1..100`.

## Health

### `GET /api/v1/health`

Public liveness check.

**Response — 200**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "The server is running",
  "data": {}
}
```

## Authentication

### `POST /api/v1/auth/register`

Create a student account. The new account gets the `STUDENT` role. Body fields are all required: `name` (2–100 characters), `email` (valid email, normalized to lowercase), and `password` (8–72 characters). Unknown fields are rejected.

**Request**

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "learning123"
}
```

**Response — 200**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registration successfully",
  "data": {
    "id": "2e3a8e32-8abe-4ba9-bc39-67bcf3838f36",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "role": "STUDENT",
    "createdAt": "2026-10-27T08:00:00.000Z",
    "updatedAt": "2026-10-27T08:00:00.000Z"
  }
}
```

### `POST /api/v1/auth/login`

Log in with `email` and `password`; both are required. On success, the response sets the `accessToken` cookie (HTTP-only, one-day max age).

**Request**

```json
{
  "email": "ada@example.com",
  "password": "learning123"
}
```

**Response — 200** (also includes `Set-Cookie: accessToken=...`)

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User login successfully",
  "data": {
    "id": "2e3a8e32-8abe-4ba9-bc39-67bcf3838f36",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "role": "STUDENT",
    "createdAt": "2026-10-27T08:00:00.000Z",
    "updatedAt": "2026-10-27T08:00:00.000Z"
  }
}
```

## Users

All user routes require authentication. `GET /me` allows students and mentors; the other two routes are mentor-only. Password hashes are omitted from user responses.

### `GET /api/v1/users/me`

Return the authenticated user's profile.

**Response — 200**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User profile retrieved successfully",
  "data": {
    "id": "2e3a8e32-8abe-4ba9-bc39-67bcf3838f36",
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "role": "STUDENT",
    "createdAt": "2026-10-27T08:00:00.000Z",
    "updatedAt": "2026-10-27T08:00:00.000Z"
  }
}
```

### `GET /api/v1/users`

Mentor only. List users, newest first. Optional query parameters: `page`, `limit`, and `role` (`STUDENT` or `MENTOR`). The current response contains an array and does not expose pagination metadata.

**Example:** `GET /api/v1/users?page=1&limit=10&role=STUDENT`

**Response — 200**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": "2e3a8e32-8abe-4ba9-bc39-67bcf3838f36",
      "name": "Ada Lovelace",
      "email": "ada@example.com",
      "role": "STUDENT",
      "createdAt": "2026-10-27T08:00:00.000Z",
      "updatedAt": "2026-10-27T08:00:00.000Z"
    }
  ]
}
```

### `GET /api/v1/users/:id`

Mentor only. Get a user by ID.

**Response — 200**: same user object and envelope as `GET /api/v1/users/me`, with message `User retrieved successfully`.

## Courses

### `GET /api/v1/courses`

Public list of published courses, newest first. Optional query parameters: `page`, `limit`, and `search` (case-insensitive match against title or description). The current response contains an array and does not expose pagination metadata.

**Example:** `GET /api/v1/courses?page=1&limit=10&search=typescript`

**Response — 200**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Published courses retrieved successfully",
  "data": [
    {
      "id": "b8da532a-c314-47a2-a7c3-85ecc31700ad",
      "title": "TypeScript Fundamentals",
      "description": "Learn the TypeScript language and its type system.",
      "coverImage": "https://example.com/typescript.jpg",
      "content": "Course lessons and learning material...",
      "status": "PUBLISHED",
      "mentorId": "581fa558-8b6d-451e-b44c-7f51921de837",
      "createdAt": "2026-10-27T08:00:00.000Z",
      "updatedAt": "2026-10-27T08:00:00.000Z",
      "mentor": {
        "id": "581fa558-8b6d-451e-b44c-7f51921de837",
        "name": "Grace Hopper"
      },
      "_count": { "enrollments": 12 }
    }
  ]
}
```

### `GET /api/v1/courses/:id`

Public details for a published course. Draft courses are not returned by this route.

**Response — 200**: one course object in the same shape as an item from `GET /api/v1/courses`, with message `Course retrieved successfully`.

### `GET /api/v1/courses/my-courses`

Mentor only. List the authenticated mentor's courses, including drafts. Optional query parameters: `page`, `limit`, and `search` (case-insensitive title match). The current response contains an array and does not expose pagination metadata.

**Response — 200**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Your courses retrieved successfully",
  "data": [
    {
      "id": "b8da532a-c314-47a2-a7c3-85ecc31700ad",
      "title": "TypeScript Fundamentals",
      "description": "Learn the TypeScript language and its type system.",
      "coverImage": null,
      "content": "Course lessons and learning material...",
      "status": "DRAFT",
      "mentorId": "581fa558-8b6d-451e-b44c-7f51921de837",
      "createdAt": "2026-10-27T08:00:00.000Z",
      "updatedAt": "2026-10-27T08:00:00.000Z",
      "_count": { "enrollments": 0, "submissions": 0 }
    }
  ]
}
```

### `POST /api/v1/courses`

Mentor only. Create a course. Required body fields: `title` (3–150 characters), `description` (10–1000), and `content` (at least 20). Optional: `coverImage` (URL) and `status` (`DRAFT` or `PUBLISHED`, defaults to `DRAFT`). Unknown fields are rejected.

**Request**

```json
{
  "title": "TypeScript Fundamentals",
  "description": "Learn the TypeScript language and its type system.",
  "coverImage": "https://example.com/typescript.jpg",
  "content": "Course lessons and learning material...",
  "status": "PUBLISHED"
}
```

**Response — 201**: created course record (including `id`, `mentorId`, `createdAt`, and `updatedAt`), in the same course field shape above, without `mentor` or `_count`.

### `PATCH /api/v1/courses/:id`

Mentor only; the authenticated mentor must own the course. Send at least one field from `title`, `description`, `coverImage`, `content`, or `status`. Field constraints match course creation; `coverImage` additionally accepts `null` or an empty string to clear it. The response is the updated course record (no `mentor` or `_count`) in the common envelope, status 200, message `Course updated successfully`.

**Request**

```json
{ "status": "PUBLISHED", "coverImage": null }
```

### `DELETE /api/v1/courses/:id`

Mentor only; the authenticated mentor must own the course.

**Response — 200**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Course deleted successfully",
  "data": null
}
```

## Enrollments

Every enrollment route requires a `STUDENT` account.

### `POST /api/v1/enrollments`

Enroll in a published course. Body must contain a valid UUID `courseId` and no other fields.

**Request**

```json
{ "courseId": "b8da532a-c314-47a2-a7c3-85ecc31700ad" }
```

**Response — 201**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Successfully enrolled in course",
  "data": {
    "id": "ace97c79-e81b-473e-982e-58b6240f6b0c",
    "studentId": "2e3a8e32-8abe-4ba9-bc39-67bcf3838f36",
    "courseId": "b8da532a-c314-47a2-a7c3-85ecc31700ad",
    "createdAt": "2026-10-27T08:00:00.000Z",
    "course": {
      "id": "b8da532a-c314-47a2-a7c3-85ecc31700ad",
      "title": "TypeScript Fundamentals",
      "description": "Learn the TypeScript language and its type system.",
      "coverImage": "https://example.com/typescript.jpg",
      "status": "PUBLISHED"
    }
  }
}
```

### `GET /api/v1/enrollments`

List the current student's enrollments, newest first. Optional query parameters: `page`, `limit`. The response is an array without pagination metadata.

**Response — 200**: common envelope with message `Enrollments retrieved successfully` and an array of enrollment objects. Each includes `id`, `studentId`, `courseId`, `createdAt`, and a `course` object with `id`, `title`, `description`, `coverImage`, `status`, and `mentor: { id, name }`.

### `GET /api/v1/enrollments/check/:courseId`

Check whether the current student is enrolled in the course. The `courseId` is used as supplied; this route does not validate it as a UUID.

**Response — 200 (enrolled)**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Enrollment status retrieved successfully",
  "data": {
    "isEnrolled": true,
    "enrollment": {
      "id": "ace97c79-e81b-473e-982e-58b6240f6b0c",
      "createdAt": "2026-10-27T08:00:00.000Z"
    }
  }
}
```

When not enrolled, `isEnrolled` is `false` and `enrollment` is `null`.

### `GET /api/v1/enrollments/:id`

Get one enrollment belonging to the current student. The response data is an enrollment object with `id`, `studentId`, `courseId`, `createdAt`, and `course` (including `id`, `title`, `description`, `coverImage`, `content`, `status`, and `mentor: { id, name }`).

### `DELETE /api/v1/enrollments/:id`

Delete an enrollment belonging to the current student.

**Response — 200**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Successfully unenrolled from course",
  "data": null
}
```

## Submissions

### `POST /api/v1/submissions`

Student only. Submit one project for a published course in which the student is enrolled. A student can submit only once per course. Required body fields: `courseId` (UUID), `projectName` (3–150 characters), `repositoryUrl` (URL), `liveUrl` (URL), and `description` (10–3000 characters). Unknown fields are rejected.

**Request**

```json
{
  "courseId": "b8da532a-c314-47a2-a7c3-85ecc31700ad",
  "projectName": "Course Planner",
  "repositoryUrl": "https://github.com/ada/course-planner",
  "liveUrl": "https://course-planner.example.com",
  "description": "A web app for planning a personal course schedule."
}
```

**Response — 201**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Project submitted successfully",
  "data": {
    "id": "ae971ddd-5269-49ed-b428-4b2f010b97a8",
    "projectName": "Course Planner",
    "repositoryUrl": "https://github.com/ada/course-planner",
    "liveUrl": "https://course-planner.example.com",
    "description": "A web app for planning a personal course schedule.",
    "status": "PENDING",
    "feedback": null,
    "studentId": "2e3a8e32-8abe-4ba9-bc39-67bcf3838f36",
    "courseId": "b8da532a-c314-47a2-a7c3-85ecc31700ad",
    "createdAt": "2026-10-27T08:00:00.000Z",
    "updatedAt": "2026-10-27T08:00:00.000Z",
    "course": {
      "id": "b8da532a-c314-47a2-a7c3-85ecc31700ad",
      "title": "TypeScript Fundamentals"
    },
    "student": {
      "id": "2e3a8e32-8abe-4ba9-bc39-67bcf3838f36",
      "name": "Ada Lovelace",
      "email": "ada@example.com"
    }
  }
}
```

### `GET /api/v1/submissions/my-submissions`

Student only. List the current student's submissions, newest first. Optional query parameters: `page`, `limit`, and `status` (`PENDING`, `APPROVED`, or `REJECTED`). Response data is an array (no pagination metadata); each submission includes its course `{ id, title, coverImage }`.

### `GET /api/v1/submissions/course/:courseId`

Mentor only. List submissions for a course owned by the current mentor. Optional query parameters: `page`, `limit`, and `status` (`PENDING`, `APPROVED`, or `REJECTED`). Response data is an array (no pagination metadata); each submission includes student `{ id, name, email }`.

### `GET /api/v1/submissions/:id`

Student or mentor. A student can read only their own submission; a mentor can read submissions only for their own courses. Response data is a submission object including course `{ id, title, mentorId }` and student `{ id, name, email }`.

### `PATCH /api/v1/submissions/:id`

Student only; only the owner can update, and only while status is `PENDING`. Provide at least one of `projectName`, `repositoryUrl`, `liveUrl`, or `description`; the field constraints match submission creation.

**Request**

```json
{ "liveUrl": "https://updated-project.example.com" }
```

**Response — 200**: updated submission record in the common envelope, message `Submission updated successfully`. This route's response does not include related `course` or `student` objects.

### `DELETE /api/v1/submissions/:id`

Student only; only the owner can delete, and only while status is `PENDING`.

**Response — 200**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Submission deleted successfully",
  "data": null
}
```

### `PATCH /api/v1/submissions/:id/review`

Mentor only; the submission must be for one of the mentor's courses and still be `PENDING`. `status` is required and must be `APPROVED` or `REJECTED`. `feedback` is optional up to 3000 characters when approving, and required when rejecting.

**Request — approve**

```json
{ "status": "APPROVED", "feedback": "Well done." }
```

**Request — reject**

```json
{ "status": "REJECTED", "feedback": "Please add input validation and resubmit." }
```

**Response — 200**: updated submission object, including student `{ id, name, email }` and course `{ id, title }`, in the common envelope with message `Submission reviewed successfully`.

## Common error cases

Errors are passed to the shared error handler. Status and message depend on the failure; common cases include:

| HTTP status | Example message | Typical cause |
| --- | --- | --- |
| 400 | `Please register to login` / `Wrong email or password` | Invalid login credentials; request validation failures also return 400 |
| 401 | `Access token has expired` / `Invalid access token` | Missing, expired, or invalid authentication cookie |
| 401 | `You are now authorized!` | Authenticated role does not meet the route requirement (as currently spelled by the middleware) |
| 403 | `Only mentors can create courses` | Authenticated user lacks the required ownership or enrollment |
| 404 | `Course not found` / `Submission not found` | Resource unavailable or not visible to the caller |
| 409 | `You are already enrolled in this course` | Duplicate enrollment or submission |
| 404 | `Route /... not found` | No matching route |

The precise validation error message is assembled from Zod field issues. Error response format:

```json
{
  "success": false,
  "message": "Course title must be at least 3 characters",
  "error": null,
  "stack": null
}
```
