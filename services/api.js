let mockStudents = [
  { id: 1, name: "John Doe", email: "john@student.com", phone: "123-456-7890", enrollmentDate: "2024-01-15", major: "Computer Science", gpa: 3.8 },
  { id: 2, name: "Jane Smith", email: "jane@student.com", phone: "123-456-7891", enrollmentDate: "2024-01-16", major: "Mathematics", gpa: 3.9 },
  { id: 3, name: "Mike Johnson", email: "mike@student.com", phone: "123-456-7892", enrollmentDate: "2024-02-01", major: "Physics", gpa: 3.5 },
  { id: 4, name: "Sarah Williams", email: "sarah@student.com", phone: "123-456-7893", enrollmentDate: "2024-02-15", major: "Chemistry", gpa: 3.7 },
];

let mockTeachers = [
  { id: 1, name: "Dr. Robert Brown", email: "robert@teacher.com", phone: "234-567-8901", department: "Computer Science", subject: "Data Structures" },
  { id: 2, name: "Dr. Emily Davis", email: "emily@teacher.com", phone: "234-567-8902", department: "Mathematics", subject: "Calculus" },
  { id: 3, name: "Dr. Michael Wilson", email: "michael@teacher.com", phone: "234-567-8903", department: "Physics", subject: "Quantum Mechanics" },
];

let mockCourses = [
  { id: 1, name: "Data Structures", code: "CS201", credits: 4, teacherId: 1, teacherName: "Dr. Robert Brown", semester: "Spring 2025" },
  { id: 2, name: "Calculus II", code: "MATH202", credits: 3, teacherId: 2, teacherName: "Dr. Emily Davis", semester: "Spring 2025" },
  { id: 3, name: "Quantum Mechanics", code: "PHY301", credits: 4, teacherId: 3, teacherName: "Dr. Michael Wilson", semester: "Spring 2025" },
  { id: 4, name: "Algorithms", code: "CS301", credits: 3, teacherId: 1, teacherName: "Dr. Robert Brown", semester: "Spring 2025" },
];

let mockGrades = [
  { id: 1, studentId: 1, studentName: "John Doe", courseId: 1, courseName: "Data Structures", grade: "A", percentage: 92, semester: "Spring 2025" },
  { id: 2, studentId: 1, studentName: "John Doe", courseId: 2, courseName: "Calculus II", grade: "A-", percentage: 88, semester: "Spring 2025" },
  { id: 3, studentId: 2, studentName: "Jane Smith", courseId: 1, courseName: "Data Structures", grade: "A+", percentage: 98, semester: "Spring 2025" },
  { id: 4, studentId: 2, studentName: "Jane Smith", courseId: 2, courseName: "Calculus II", grade: "A", percentage: 95, semester: "Spring 2025" },
  { id: 5, studentId: 3, studentName: "Mike Johnson", courseId: 3, courseName: "Quantum Mechanics", grade: "B+", percentage: 85, semester: "Spring 2025" },
];

let mockAttendance = [
  { id: 1, studentId: 1, studentName: "John Doe", courseId: 1, courseName: "Data Structures", date: "2025-11-01", status: "Present" },
  { id: 2, studentId: 1, studentName: "John Doe", courseId: 1, courseName: "Data Structures", date: "2025-11-03", status: "Present" },
  { id: 3, studentId: 1, studentName: "John Doe", courseId: 1, courseName: "Data Structures", date: "2025-11-05", status: "Absent" },
  { id: 4, studentId: 2, studentName: "Jane Smith", courseId: 1, courseName: "Data Structures", date: "2025-11-01", status: "Present" },
  { id: 5, studentId: 2, studentName: "Jane Smith", courseId: 1, courseName: "Data Structures", date: "2025-11-03", status: "Present" },
  { id: 6, studentId: 3, studentName: "Mike Johnson", courseId: 3, courseName: "Quantum Mechanics", date: "2025-11-02", status: "Present" },
];

// Mock users for login
const mockUsers = [
  { id: 1, email: "admin@school.com", password: "admin123", role: "admin", name: "Admin User" },
  { id: 2, email: "robert@teacher.com", password: "teacher123", role: "teacher", name: "Dr. Robert Brown" },
  { id: 3, email: "john@student.com", password: "student123", role: "student", name: "John Doe", studentId: 1 },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authAPI = {
  login: async (email, password) => {
    await delay(500);
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, message: "Invalid credentials" };
  },
  
  logout: async () => {
    await delay(300);
    return { success: true };
  },
};

// Students API
export const studentsAPI = {
  getAll: async () => {
    await delay(500);
    return mockStudents;
  },
  
  getById: async (id) => {
    await delay(300);
    return mockStudents.find(s => s.id === id);
  },
  
  create: async (student) => {
    await delay(500);
    const newStudent = { ...student, id: Math.max(...mockStudents.map(s => s.id), 0) + 1 };
    mockStudents.push(newStudent);
    return newStudent;
  },
  
  update: async (id, student) => {
    await delay(500);
    const index = mockStudents.findIndex(s => s.id === id);
    if (index !== -1) {
      mockStudents[index] = { ...mockStudents[index], ...student };
      return mockStudents[index];
    }
    return null;
  },
  
  delete: async (id) => {
    await delay(500);
    mockStudents = mockStudents.filter(s => s.id !== id);
    return { success: true };
  },
};

// Teachers API
export const teachersAPI = {
  getAll: async () => {
    await delay(500);
    return mockTeachers;
  },
  
  getById: async (id) => {
    await delay(300);
    return mockTeachers.find(t => t.id === id);
  },
  
  create: async (teacher) => {
    await delay(500);
    const newTeacher = { ...teacher, id: Math.max(...mockTeachers.map(t => t.id), 0) + 1 };
    mockTeachers.push(newTeacher);
    return newTeacher;
  },
  
  update: async (id, teacher) => {
    await delay(500);
    const index = mockTeachers.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTeachers[index] = { ...mockTeachers[index], ...teacher };
      return mockTeachers[index];
    }
    return null;
  },
  
  delete: async (id) => {
    await delay(500);
    mockTeachers = mockTeachers.filter(t => t.id !== id);
    return { success: true };
  },
};

// Courses API
export const coursesAPI = {
  getAll: async () => {
    await delay(500);
    return mockCourses;
  },
  
  getById: async (id) => {
    await delay(300);
    return mockCourses.find(c => c.id === id);
  },
  
  create: async (course) => {
    await delay(500);
    const teacher = mockTeachers.find(t => t.id === course.teacherId);
    const newCourse = { 
      ...course, 
      id: Math.max(...mockCourses.map(c => c.id), 0) + 1,
      teacherName: teacher?.name || ""
    };
    mockCourses.push(newCourse);
    return newCourse;
  },
  
  update: async (id, course) => {
    await delay(500);
    const index = mockCourses.findIndex(c => c.id === id);
    if (index !== -1) {
      const teacher = mockTeachers.find(t => t.id === course.teacherId);
      mockCourses[index] = { 
        ...mockCourses[index], 
        ...course,
        teacherName: teacher?.name || mockCourses[index].teacherName
      };
      return mockCourses[index];
    }
    return null;
  },
  
  delete: async (id) => {
    await delay(500);
    mockCourses = mockCourses.filter(c => c.id !== id);
    return { success: true };
  },
};

// Grades API
export const gradesAPI = {
  getAll: async () => {
    await delay(500);
    return mockGrades;
  },
  
  getByStudentId: async (studentId) => {
    await delay(300);
    return mockGrades.filter(g => g.studentId === studentId);
  },
  
  getByCourseId: async (courseId) => {
    await delay(300);
    return mockGrades.filter(g => g.courseId === courseId);
  },
  
  create: async (grade) => {
    await delay(500);
    const student = mockStudents.find(s => s.id === grade.studentId);
    const course = mockCourses.find(c => c.id === grade.courseId);
    const newGrade = { 
      ...grade, 
      id: Math.max(...mockGrades.map(g => g.id), 0) + 1,
      studentName: student?.name || "",
      courseName: course?.name || ""
    };
    mockGrades.push(newGrade);
    return newGrade;
  },
  
  update: async (id, grade) => {
    await delay(500);
    const index = mockGrades.findIndex(g => g.id === id);
    if (index !== -1) {
      mockGrades[index] = { ...mockGrades[index], ...grade };
      return mockGrades[index];
    }
    return null;
  },
  
  delete: async (id) => {
    await delay(500);
    mockGrades = mockGrades.filter(g => g.id !== id);
    return { success: true };
  },
};

// Attendance API
export const attendanceAPI = {
  getAll: async () => {
    await delay(500);
    return mockAttendance;
  },
  
  getByStudentId: async (studentId) => {
    await delay(300);
    return mockAttendance.filter(a => a.studentId === studentId);
  },
  
  getByCourseId: async (courseId) => {
    await delay(300);
    return mockAttendance.filter(a => a.courseId === courseId);
  },
  
  create: async (attendance) => {
    await delay(500);
    const student = mockStudents.find(s => s.id === attendance.studentId);
    const course = mockCourses.find(c => c.id === attendance.courseId);
    const newAttendance = { 
      ...attendance, 
      id: Math.max(...mockAttendance.map(a => a.id), 0) + 1,
      studentName: student?.name || "",
      courseName: course?.name || ""
    };
    mockAttendance.push(newAttendance);
    return newAttendance;
  },
  
  update: async (id, attendance) => {
    await delay(500);
    const index = mockAttendance.findIndex(a => a.id === id);
    if (index !== -1) {
      mockAttendance[index] = { ...mockAttendance[index], ...attendance };
      return mockAttendance[index];
    }
    return null;
  },
  
  delete: async (id) => {
    await delay(500);
    mockAttendance = mockAttendance.filter(a => a.id !== id);
    return { success: true };
  },
};
