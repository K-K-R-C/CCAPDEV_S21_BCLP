# Web Forum Idea: Local Travel Forum

A forum-style web application focused on Philippine travel experiences.

## Features
- View posts
- Create post (U.I.)
- User profiles
- Login/Register pages

## Languages used
- HTML
- CSS
- Javascript
- Handlebars

## Extras
- Docs folder contains our design plans/drafts for the layout of GunitaPH Travel Forum.

---

# GunitaPH

A community-driven travel forum for sharing Philippine travel experiences, tips, and stories. Built as a CCAPDEV Machine Project.

## Live Demo
[https://gunita-ph.onrender.com](https://gunita-ph.onrender.com)

### Test Accounts
| Username  | Password    |
|-----------|-------------|
| batmeow   | trestres123 |
| kaloy     | karlkarl123 |
| ventilogz | ventvent123 |
| ophiuche  | ophiophi123 |
| monami    | monamona123 |

---

## Prerequisites
Before running the project locally, make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)
- Git

---

## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/K-K-R-C/CCAPDEV_S21_BCLP.git
cd CCAPDEV_S21_BCLP
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up your environment variables
Create a `.env` file in the root of the project with the following:
MONGODB_URI=your-mongodb-connection-string
SESSION_SECRET=your-secret-key
PORT=3000

To get your MongoDB connection string:
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Under **Database Access**, create a user with read/write permissions
4. Under **Network Access**, allow connections from `0.0.0.0/0`
5. Click **Connect → Drivers** and copy the SRV connection string
6. Replace `<db_password>` with your database user's password

### 4. Seed the database
This populates the database with 5 sample users, posts, and comments:
```bash
npm run seed
```

### 5. Run the application
```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure
CCAPDEV_S21_BCLP/
├── app.js                  # Main Express server
├── seed.js                 # Sample data seeder
├── .env                    # Environment Variables
├── package.json
├── package-lock.json
├── README.md
├── model/                  # Mongoose schemas
│   ├── user.js
│   ├── post.js
│   └── comment.js
├── node_modules
├── controllers/            # Route logic (MVC)
│   ├── postController.js
│   ├── userController.js
│   └── commentController.js
├── routes/
│   └── indexRoutes.js      # All app routes
├── views/                  # Handlebars (.hbs) templates
│   ├── partials/
│   │   └── commentPartial.hbs
│   ├── index.hbs
│   ├── post.hbs
│   ├── profile.hbs
│   ├── create-post.hbs
│   ├── edit-post.hbs
│   ├── edit-comment.hbs
│   ├── edit-profile.hbs
│   ├── login.hbs
│   ├── register.hbs
│   ├── about.hbs
│   └── error.hbs
├── public/                 # Static assets
│   ├── css/
│       ├── auth.css
│       ├── forms.css
│       ├── main.css
│       ├── posts.css
│       ├── profile.css
│   ├── js/
│       └── main.js
│   ├── images/
│   └── uploads/
└── MCO1/
    └── docs                # Design plans and drafts
---

## NPM Packages Used
| Package              | Purpose                               |
|----------------------|---------------------------------------|
| `express`            | Web framework and routing             |
| `mongoose`           | MongoDB object modeling               |
| `express-handlebars` | Templating engine                     |
| `express-session`    | User session management               |
| `connect-mongo`      | Persistent session storage in MongoDB |
| `bcrypt`             | Password hashing                      |
| `multer`             | File/image upload handling            |
| `dotenv`             | Loading environment variables         |

---

## Full Feature List
- Register and log in with hashed passwords
- Persistent login sessions (stay logged in across page refreshes)
- Create, edit, and delete travel posts with image uploads
- Nested comment and reply system
- User profiles showing posts and recent comments
- Edit profile, including profile picture and cover photo
- Search posts by title, body, or hashtag
- Filter posts by destination (Luzon / Visayas / Mindanao) and travel style
- Front-end and back-end form validation
- Ownership checks — only the author can edit or delete their content

---

## Deployment Notes
This app is deployed on [Render](https://render.com). When deploying to a cloud platform, make sure to:
1. Add your environment variables (`MONGODB_URI`, `SESSION_SECRET`, `NODE_ENV=production`) in the platform's dashboard
2. Run `npm run seed` once after deployment to populate the database
3. Ensure `NODE_ENV=production` is set so session cookies work correctly over HTTPS