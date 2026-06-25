# AI Form Builder

AI Form Builder is a full-stack web application for creating dynamic forms and
filling them with help from AI.

An administrator can create forms, view all forms, check dashboard statistics,
and review submitted responses. A user can choose a form, upload a PDF
document, let AI extract useful information, review the filled fields, and
submit the form.

The project has a modern and responsive interface for both desktop and mobile
devices.

## Main Features

### Admin features

- Admin login with email and password
- Dashboard showing the number of forms and responses
- Dynamic form builder
- Live form preview while creating a form
- Support for text, textarea, number, date, dropdown, and checkbox fields
- Required-field configuration
- View and delete forms
- Preview a form as a user
- View all submitted responses
- Open the complete data of a response
- Delete responses

### User features

- View all available forms
- Open and complete a selected form
- Upload PDF, PNG, JPG, or JPEG documents
- Extract information from an uploaded document using AI
- Review and edit the extracted information
- Fill the form manually when required
- Required-field validation
- Submit the final response
- Success confirmation page

### UI and design features

- Responsive layout for desktop, tablet, and mobile
- Separate admin and user navigation
- Modern cards, gradients, shadows, and glass-style surfaces
- Small 3D depth and hover effects
- Loading, empty, success, and error states
- Toast notifications
- Accessible form labels and buttons
- Reduced-motion support for users who disable animations

## How the Application Works

The complete user flow is:

1. The admin logs in.
2. The admin creates a form and adds the required fields.
3. The form is stored in the database.
4. A user opens the list of available forms.
5. The user chooses a form.
6. The user can upload a document or fill the form manually.
7. For a PDF, the backend extracts its text.
8. The form fields and document text are sent to the NIA AI service.
9. The AI returns a JSON object containing values for the form fields.
10. The frontend places those values in the correct inputs.
11. The user reviews or edits the information.
12. The response is submitted and stored in the database.
13. The admin can view or delete the response.

## Technology Used

### Frontend

| Technology | Purpose |
| --- | --- |
| React 19 | Builds the user interface |
| TypeScript | Adds type safety to React code |
| Vite | Runs the development server and creates production builds |
| Tailwind CSS 4 | Provides utility classes for responsive styling |
| React Router | Handles page navigation |
| Axios | Sends requests to the backend API |
| Lucide React | Provides icons |
| React Hot Toast | Displays success and error notifications |
| ESLint | Checks frontend code quality |

### Backend

| Technology | Purpose |
| --- | --- |
| Python | Backend programming language |
| FastAPI | Creates the REST API |
| Uvicorn | Runs the FastAPI application |
| SQLAlchemy | Handles database models and queries |
| Pydantic | Validates API data and environment settings |
| SQLite | Default local database |
| Python-JOSE | Creates JWT access tokens |
| Passlib and bcrypt | Hash and verify passwords |
| PyMuPDF | Extracts text from PDF files |
| Pillow | Provides image-processing support |
| Requests | Communicates with the NIA AI API |

## Project Structure

```text
AI-FormBuilder/
├── backend/
│   ├── app/
│   │   ├── api/              # Authentication, forms, upload, extraction, responses
│   │   ├── core/             # Configuration, database, and security
│   │   ├── models/           # SQLAlchemy database models
│   │   ├── schemas/          # Pydantic request and response schemas
│   │   ├── services/         # PDF extraction and AI service logic
│   │   ├── utils/            # Shared constants and helper files
│   │   └── main.py           # FastAPI application entry point
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── public/               # Public icons and static files
│   ├── src/
│   │   ├── api/              # Axios API configuration
│   │   ├── components/       # Navbar, sidebar, loader, and reusable UI
│   │   ├── layouts/          # Admin and user page layouts
│   │   ├── pages/
│   │   │   ├── admin/        # Login, dashboard, forms, builder, responses
│   │   │   └── user/         # Home, form list, form filling, success
│   │   ├── routes/           # Application routes
│   │   ├── index.css         # Global design system and animations
│   │   └── main.tsx          # React application entry point
│   ├── package.json          # Frontend dependencies and scripts
│   └── vite.config.ts        # Vite and Tailwind configuration
├── .gitignore
├── LICENSE
└── README.md
```

## Database Models

The application uses the following database tables:

- `users`: Stores admin account information and hashed passwords.
- `forms`: Stores form titles, descriptions, status, and owner information.
- `fields`: Stores every dynamic field belonging to a form.
- `documents`: Defines uploaded document information.
- `responses`: Stores submitted form values as JSON.

The tables are created automatically when the FastAPI server starts.

## Requirements

Install these tools before starting:

- Git
- Python 3.10 or newer
- Node.js 18 or newer
- npm
- A NIA API key and NIA API base URL for AI extraction

This project was verified locally with:

- Python `3.12.3`
- Node.js `22.17.0`
- npm `11.5.2`

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd AI-FormBuilder
```

Replace `<your-repository-url>` with the real Git repository URL.

### 2. Set up the backend

Move into the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate it on Linux or macOS:

```bash
source .venv/bin/activate
```

Activate it on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

### 3. Create the backend environment file

Create a file named `.env` inside the `backend` folder:

```env
APP_NAME=AI Form Builder
DEBUG=True
HOST=127.0.0.1
PORT=8000

DATABASE_URL=sqlite:///./app.db

SECRET_KEY=replace_this_with_a_long_random_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

UPLOAD_FOLDER=app/uploads
MAX_UPLOAD_SIZE=10485760

NIA_API_KEY=your_nia_api_key
NIA_BASE_URL=your_nia_api_base_url

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123
```

Important:

- Do not commit the `.env` file.
- Use a strong and private value for `SECRET_KEY`.
- Replace the NIA example values with real credentials.
- Change the default admin email and password before production use.

You can generate a random secret with:

```bash
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

### 4. Start the backend

Run this command from the `backend` folder:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The backend will be available at:

- API: `http://127.0.0.1:8000`
- Swagger documentation: `http://127.0.0.1:8000/docs`
- Health check: `http://127.0.0.1:8000/health`

The SQLite database file `backend/app.db` is created automatically.

### 5. Set up the frontend

Open a second terminal and move into the frontend folder:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open this address in your browser:

```text
http://localhost:5173
```

Keep both the backend and frontend terminals running.

## Admin Login

The default development login is:

```text
Email: admin@example.com
Password: Admin@123
```

These values come from `backend/.env`. The backend creates the default admin
account when the login endpoint is used for the first time.

If you change the credentials after the account has already been created,
delete `backend/app.db` and restart the backend to create a fresh local
database. This removes all existing local forms and responses, so only do it
when that data is not needed.

## Available Pages

### Public pages

| URL | Page |
| --- | --- |
| `/` | Landing page |
| `/forms` | Available forms |
| `/form/:id` | Fill a selected form |
| `/success` | Submission success page |

### Admin pages

| URL | Page |
| --- | --- |
| `/admin/login` | Admin login |
| `/admin/dashboard` | Dashboard statistics and quick actions |
| `/admin/create-form` | Dynamic form builder |
| `/admin/forms` | Form management |
| `/admin/responses` | Response management |

## Main API Endpoints

FastAPI also provides interactive documentation at `/docs`.

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/` | Check that the backend is running |
| `GET` | `/health` | Backend health check |
| `POST` | `/auth/login` | Log in as admin |
| `GET` | `/forms/` | Get all forms |
| `POST` | `/forms/` | Create a form |
| `GET` | `/forms/{form_id}` | Get one form and its fields |
| `DELETE` | `/forms/{form_id}` | Delete a form |
| `POST` | `/upload/` | Upload a document |
| `POST` | `/extract/{form_id}` | Extract form data using AI |
| `GET` | `/responses/` | Get all responses |
| `POST` | `/responses/` | Submit a response |
| `DELETE` | `/responses/{response_id}` | Delete a response |

## Useful Frontend Commands

Run these commands inside the `frontend` folder.

Start the development server:

```bash
npm run dev
```

Check code quality:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Testing the Complete Project

Use this simple checklist after setup:

1. Open `http://127.0.0.1:8000/health`.
2. Confirm that the response contains `"status": "healthy"`.
3. Open `http://localhost:5173`.
4. Go to the admin login page.
5. Log in with the configured admin credentials.
6. Create a form with at least one required text field.
7. Open the form from the public forms page.
8. Fill and submit it manually.
9. Confirm that the success page is displayed.
10. Open the admin responses page and check the submitted data.
11. For AI testing, upload a text-based PDF and select **Extract with AI**.
12. Confirm that extracted values appear in the correct fields.

Before committing frontend changes, run:

```bash
cd frontend
npm run lint
npm run build
```

## Work Completed in This Project

The project was built in multiple parts:

1. Created a FastAPI backend and connected it to SQLAlchemy.
2. Added users, forms, fields, documents, and responses database models.
3. Added automatic SQLite table creation.
4. Added admin login, password hashing, and JWT generation.
5. Built APIs for creating, listing, opening, and deleting forms.
6. Built dynamic form fields and live preview in React.
7. Added file upload support for PDF and common image formats.
8. Added PDF text extraction with PyMuPDF.
9. Connected extracted text to the NIA AI service.
10. Added safe parsing for AI JSON responses.
11. Added form autofill, manual editing, validation, and submission.
12. Added response listing, detail viewing, and deletion.
13. Added dashboard counts for forms and responses.
14. Rebuilt the original basic interface into a modern design system.
15. Added responsive admin navigation and public navigation.
16. Added reusable buttons, inputs, cards, loaders, and animations.
17. Added loading states, empty states, toast messages, and success feedback.
18. Verified the frontend with TypeScript build and ESLint.

## Challenges and How They Were Handled

### 1. Dynamic fields are different for every form

Each form can have a different number and type of fields. The solution was to
store fields in a separate database table and render inputs in React based on
their `field_type`.

### 2. AI output is not always perfectly formatted

AI services may return JSON inside Markdown code blocks or include extra text.
The backend asks for JSON only, removes common code-block markers, and tries to
find the JSON object before parsing it.

### 3. AI values must match dynamic labels

The backend sends the selected form's field labels and types with the document
text. The AI returns an object where each key matches a form label. The
frontend then uses those labels to place values in the correct fields.

### 4. Uploaded files need safe names

Original filenames can conflict or contain unsafe characters. The upload API
creates a UUID filename while keeping the valid file extension.

### 5. PDF and image extraction are different

Text-based PDFs can be read with PyMuPDF. Images require OCR, which is not yet
implemented in the current extractor. Image upload is accepted, but reliable
image text extraction still needs an OCR service such as Tesseract or a
vision-capable model.

### 6. The first interface was too basic

The original pages had large empty areas, inconsistent spacing, simple tables,
and no shared navigation. A common design system was added with responsive
layouts, improved typography, gradients, depth, hover interactions, reusable
navigation, and better page states. Existing API calls and form behavior were
kept unchanged during the redesign.

### 7. Frontend and backend run on different ports

The browser blocks requests unless CORS is configured correctly. FastAPI
currently allows the Vite development address on port `5173`.

### 8. Dates and response values need flexible storage

Responses can contain many different fields, so response values are stored in
a JSON column. Submission time is stored with the `Asia/Kolkata` timezone in
the current response model.

## Current Limitations

This is a development project and still has areas that should be improved
before production use:

- Image OCR is not implemented. PDF extraction works only when the PDF contains
  selectable text.
- The frontend stores the login token, but protected backend routes do not yet
  enforce JWT authentication.
- Admin routes do not yet have a frontend route guard.
- Forms are currently created with `draft` status, but there is no separate
  publish/unpublish workflow.
- Dropdown options are supported by the data model, but the current form
  builder does not provide an editor for adding those options.
- The API URL is currently fixed as `http://127.0.0.1:8000` in
  `frontend/src/api/api.ts`.
- CORS currently allows only frontend port `5173`.
- File size is present in configuration, but the upload endpoint does not yet
  enforce the maximum size.
- There are no automated backend or browser tests yet.
- Database schema migrations are not configured. Tables are created directly
  by SQLAlchemy.
- Uploaded files are stored locally instead of cloud storage.

These limitations are useful next steps for future development.

## Common Problems and Solutions

### The frontend shows a network or CORS error

Check that:

- The backend is running on `http://127.0.0.1:8000`.
- The frontend is running on port `5173`.
- `frontend/src/api/api.ts` contains the correct backend URL.
- The frontend URL is included in `allow_origins` inside
  `backend/app/main.py`.

If Vite starts on `5174` because `5173` is busy, stop the process using `5173`
and start Vite again. You can also add `http://localhost:5174` and
`http://127.0.0.1:5174` to the backend CORS list for local development.

### The backend cannot find environment settings

Make sure:

- The file is named exactly `.env`.
- It is inside the `backend` folder.
- You start Uvicorn from the `backend` folder.
- `NIA_API_KEY` and `NIA_BASE_URL` are present.

### AI extraction fails

Check that:

- The uploaded file is a text-based PDF.
- The NIA API key and base URL are correct.
- The computer has an internet connection.
- The NIA service is available.
- The backend terminal does not show an invalid JSON or HTTP error.

The AI request has a timeout of 120 seconds.

### The uploaded file cannot be found

Start the backend from the `backend` folder. The application uses the relative
upload path `app/uploads`.

### Admin login does not work

Check the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values in `backend/.env`. If the
database already contains an admin created with old credentials, either use
the old credentials or recreate the local database as explained in the
**Admin Login** section.

### A database error appears after changing a model

The project does not currently use migrations. During development, you can
stop the backend, delete `backend/app.db`, and restart it. This creates fresh
tables but permanently removes existing local data.

### `ModuleNotFoundError` appears

Activate the Python virtual environment and install requirements again:

```bash
cd backend
source .venv/bin/activate
pip install -r requirements.txt
```

On Windows, use the Windows activation command shown earlier.

### `npm run dev` or `npm run build` fails

Remove and reinstall frontend dependencies:

```bash
cd frontend
rm -rf node_modules
npm install
npm run build
```

On Windows, delete the `node_modules` folder using File Explorer or
PowerShell, then run `npm install`.

## Recommended Next Improvements

- Protect admin APIs with JWT authentication
- Add a protected-route component in React
- Add form publishing and draft management
- Add dropdown option editing
- Add OCR for image documents and scanned PDFs
- Add file-size validation
- Move API URLs to frontend environment variables
- Add PostgreSQL setup for production
- Add Alembic database migrations
- Add pagination, search, and filtering
- Add automated backend and frontend tests
- Store uploads in secure cloud storage
- Add user accounts and response ownership
- Add edit and duplicate actions for forms
- Add deployment instructions

## Security Notes

- Never commit API keys, passwords, database credentials, or `.env` files.
- Change the default admin password before deployment.
- Use HTTPS in production.
- Use a strong random JWT secret.
- Validate file content and size before production deployment.
- Protect admin endpoints with authentication before exposing the application
  publicly.
