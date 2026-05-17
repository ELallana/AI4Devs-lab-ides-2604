Tables
======
Acronyms:
- UK: unit key
- PK: primary key
- AU; auto-increment

Candidate
----------
Represents the `candidate` entity, which stores information about job candidates.

| Field      | Type     | Special | Description                                       |
|------------|----------|---------|---------------------------------------------------|
| id         | integer  | PK, AU  | Unique identifier                                 |
| created_at | datetime |         | Date and time when the candidate was created      |
| updated_at | datetime |         | Date and time when the candidate was last updated |
| name       | text     |         | Name of the candidate                             |
| surname    | text     |         | Surname of the candidate                          |
| email      | text     | UK      | Email address of the candidate                    |
| phone      | text     |         | Phone number of the candidate                     |
| education  | text     |         | Education ca                                      |
| job_exp    | text     |         | Job experience                                    |
| resume     | binary   |         | Resume of the candidate                           |



