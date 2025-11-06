import React from "react";
import "./style.css";

const HomePage = () => {
  const goToDashboard = (role) => {
    // You can replace this with navigation logic (e.g., React Router)
    console.log(`Redirecting to ${role} dashboard...`);
  };

  return (
    <div>
      <header>
        <h1>Student Management System</h1>
      </header>

      <main className="role-container">
        <div className="role-card" id="student-card">
          <h2>Student</h2>
          <p>Access grades, attendance, activities, and profile.</p>
          <button onClick={() => goToDashboard("student")}>
            Login as Student
          </button>
        </div>

        <div className="role-card" id="teacher-card">
          <h2>Teacher</h2>
          <p>Manage classes, grades, and attendance records.</p>
          <button onClick={() => goToDashboard("teacher")}>
            Login as Teacher
          </button>
        </div>

        <div className="role-card" id="admin-card">
          <h2>Admin</h2>
          <p>Manage enrollments, users, and reports.</p>
          <button onClick={() => goToDashboard("admin")}>
            Login as Admin
          </button>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Student Management System</p>
      </footer>
    </div>
  );
};

export default HomePage;
