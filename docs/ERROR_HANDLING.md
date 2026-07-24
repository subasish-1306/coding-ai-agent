# Error Handling Standards

This document defines status codes, error models, and exception handling standards across the system.

## HTTP Status Codes

| Code | Meaning | Usage |
|---|---|---|
| `200 OK` | Request succeeded | Returned on successful GET operations. |
| `201 Created` | Resource created | Returned by `POST /api/v1/upload` upon successful scan completion. |
| `400 Bad Request` | Client error | Returned when uploaded file is missing or not a `.zip` archive. |
| `404 Not Found` | Resource missing | Returned when workspace ID is not found in cache. |
| `422 Unprocessable Entity` | Extraction failed | Returned if `.zip` file is corrupted or unextractable. |
| `500 Internal Error` | Server error | Returned on unexpected server exceptions with log trace. |

## Error Envelope

All API errors return a consistent JSON response:

```json
{
  "detail": "Invalid file type. Only .zip files are supported."
}
```
