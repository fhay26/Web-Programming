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

export default function StudentDashboardV3({ student, stats, grades, onNavigate }) {
  const enrolledCourses = [
    { id: 1, name: "Data Structures", code: "CS201", instructor: "Dr. Robert Brown", grade: "A", percentage: 92, attendance: 95, credits: 4 },
    { id: 2, name: "Calculus II", code: "MATH202", instructor: "Dr. Emily Davis", grade: "A-", percentage: 88, attendance: 90, credits: 3 },
    { id: 3, name: "Physics", code: "PHY201", instructor: "Dr. Michael Wilson", grade: "B+", percentage: 85, attendance: 87, credits: 4 },
  ];

  const recentGrades = [
    { id: 1, course: "Data Structures", courseName: "CS201", assignment: "Assignment 3", grade: "A", score: 95, date: "2025-11-05" },
    { id: 2, course: "Calculus II", courseName: "MATH202", assignment: "Quiz 4", grade: "A-", score: 88, date: "2025-11-04" },
    { id: 3, course: "Physics", courseName: "PHY201", assignment: "Lab Report 2", grade: "B+", score: 85, date: "2025-11-03" },
    { id: 4, course: "Data Structures", courseName: "CS201", assignment: "Quiz 3", grade: "A", score: 92, date: "2025-11-02" },
    { id: 5, course: "Calculus II", courseName: "MATH202", assignment: "Assignment 4", grade: "B+", score: 87, date: "2025-11-01" },
  ];

  const upcomingEvents = [
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

  const getGradeBadgeVariant = (grade) => {
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Grades */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Recent Grades</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("view-grades")}>
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentGrades.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{item.course}</p>
                        <Badge variant="outline" className="text-xs">{item.courseName}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.assignment}</TableCell>
                    <TableCell>
                      <Badge variant={getGradeBadgeVariant(item.grade)}>
                        {item.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.score}%</TableCell>
                    <TableCell className="text-muted-foreground">{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">{event.title}</p>
                    <Badge variant="outline" className="text-xs">{event.type}</Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>{event.date} at {event.time}</p>
                    <p>{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="h-auto p-4 justify-start"
          onClick={() => onNavigate("view-grades")}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">View All Grades</p>
              <p className="text-xs text-muted-foreground">Check your performance</p>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-4 justify-start"
          onClick={() => onNavigate("view-attendance")}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded">
              <ClipboardCheck className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">My Attendance</p>
              <p className="text-xs text-muted-foreground">Track your presence</p>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-4 justify-start"
          onClick={() => onNavigate("profile")}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded">
              <Target className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">My Profile</p>
              <p className="text-xs text-muted-foreground">View your information</p>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}
