# 📚 Educational App

A modern educational platform that allows users to register, log in, and access structured learning content.  
The application supports managing courses, lessons, instructors, and student enrollments with a clean and scalable backend architecture.

---

## 🚀 Features

- 🔐 User Authentication (Login / Register)  
- 📂 Categories Management  
- 📘 Courses Management  
- 📖 Lessons System  
- 👨‍🎓 Students & 👨‍🏫 Instructors Roles  
- 📝 Enrollment System  
- ✅ Input Validation using Joi  
- 📧 Email Services using Nodemailer  
- 🪵 Logging System using Winston  
- ☁️ File Uploading using Cloudinary  

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database ORM:** Sequelize  
- **Validation:** Joi  
- **Email Service:** Nodemailer  
- **Logging:** Winston  
- **Cloud Storage:** Cloudinary  

---

## 📁 Project Structure

```bash
project/
│── controllers/
│── models/
│── routes/
│── middlewares/
│── services/
│── config/
│── utils/
│── app.js
│── server.js
```

---

## ⚙️ Installation

```bash
# clone repo
git clone https://github.com/your-username/your-repo.git

# go to project
cd your-repo

# install dependencies
npm install
```

---

## ▶️ Run the App

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file and add:

```env
# 🚀 Server Configuration
PORT=3000
NODE_ENV=development

# 🗄️ Database Configuration
DB_NAME=newdb
DB_USER=root
DB_PASSWORD=your_database_password

# 🌐 Allowed Origins (CORS)
ALLOWED_ORIGIN=http://localhost:3000,http://localhost:5173,http://localhost:5000

# 🔐 JWT Configuration
JWT_ACCESS_SECRET=your_access_secret
JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=7d

JWT_ACTIVATE_SECRET=your_activate_secret
JWT_ACTIVATE_EXPIRES_IN=10m

# 📧 Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USERNAME=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password

# ☁️ Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 🔗 Base URL
BASE_URL=http://localhost:3000
```

---

## 📌 API Modules

- Auth (Login / Register)  
- Categories  
- Courses  
- Lessons  
- Students  
- Instructors  
- Enrollments  

---

## 📬 Future Improvements

- 🎥 Video Lessons Support  
- 💬 Comments & Reviews  
- ⭐ Course Rating System  
- 📊 Progress Tracking Dashboard  

---

## 👨‍💻 Author

**Ahmed Shafiq Galal**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub! 🚀
