import { BookOpen, Award, ClipboardCheck, Target, Calendar, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  grade: string;
  percentage: number;
  attendance: number;
  credits: number;
}

interface Grade {
  id: number;
  course: string;
  courseName: string;
  assignment: string;
  grade: string;
  score: number;
  date: string;
}

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
}

interface Stats {
  enrolledCourses: number;
  averageGrade: string;
  attendanceRate: number;
}

interface Student {
  name?: string;
  gpa?: string;
}

interface StudentDashboardV3Props {
  student: Student;
  stats: Stats;
  grades: Grade[];
  onNavigate: (page: string) => void;
}

export default function StudentDashboardV3({ student, stats, grades, onNavigate }: StudentDashboardV3Props) {
  const enrolledCourses: Course[] = [
    { id: 1, name: "Data Structures", code: "CS201", instructor: "Dr. Robert Brown", grade: "A", percentage: 92, attendance: 95, credits: 4 },
    { id: 2, name: "Calculus II", code: "MATH202", instructor: "Dr. Emily Davis", grade: "A-", percentage: 88, attendance: 90, credits: 3 },
    { id: 3, name: "Physics", code: "PHY201", instructor: "Dr. Michael Wilson", grade: "B+", percentage: 85, attendance: 87, credits: 4 },
  ];

  const recentGrades: Grade[] = [
    { id: 1, course: "Data Structures", courseName: "CS201", assignment: "Assignment 3", grade: "A", score: 95, date: "2025-11-05" },
    { id: 2, course: "Calculus II", courseName: "MATH202", assignment: "Quiz 4", grade: "A-", score: 88, date: "2025-11-04" },
    { id: 3, course: "Physics", courseName: "PHY201", assignment: "Lab Report 2", grade: "B+", score: 85, date: "2025-11-03" },
    { id: 4, course: "Data Structures", courseName: "CS201", assignment: "Quiz 3", grade: "A", score: 92, date: "2025-11-02" },
    { id: 5, course: "Calculus II", courseName: "MATH202", assignment: "Assignment 4", grade: "B+", score: 87, date: "2025-11-01" },
  ];

  const upcomingEvents: Event[] = [
    { title: "Data Structures Midterm", date: "Nov 15, 2025", time: "10:00 AM", location: "Room 204", type: "Exam" },
    { title: "Calculus Assignment Due", date: "Nov 10, 2025", time: "11:59 PM", location: "Online", type: "Assignment" },
    { title: "Physics Lab Session", date: "Nov 8, 2025", time: "2:00 PM", location: "Lab 102", type: "Lab" },
    { title: "CS Project Presentation", date: "Nov 20, 2025", time: "3:00 PM", location: "Room 305", type: "Presentation" },
  ];

  const quickStats = [
    { label: "Enrolled Courses", value: stats.enrolledCourses, icon: BookOpen },
    { label: "Average Grade", value: stats.averageGrade, icon: Award },
    { label: "Attendance", value: `${stats.attendanceRate}%`, icon: ClipboardCheck },
    { label: "GPA", value: student?.gpa || "3.8", icon: Target },
  ];

  const getGradeBadgeVariant = (grade: string) => {
    if (grade.startsWith("A")) return "default";
    if (grade.startsWith("B")) return "secondary";
    return "outline";
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-background">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enrolled Courses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">My Courses</CardTitle>
          <span className="text-sm text-muted-foreground">Spring 2025</span>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrolledCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.code}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{course.instructor}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>
                    <Badge variant={getGradeBadgeVariant(course.grade)}>
                      {course.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.percentage}%</TableCell>
                  <TableCell>
                    <Badge variant={course.attendance >= 90 ? "default" : course.attendance >= 80 ? "secondary" : "destructive"}>
                      {course.attendance}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onNavigate("view-grades")}>
                          View Grades
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onNavigate("view-attendance")}>
                          View Attendance
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Grades & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Recent Grades</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("view-grad
