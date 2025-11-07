import { BookOpen, Users, Award, Clock, ArrowUpRight, MoreHorizontal, Calendar } from "lucide-react";
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

export default function TeacherDashboardV3({ stats, onNavigate }) {
  const myCourses = [
    { id: 1, name: "Data Structures", code: "CS201", students: 45, avgGrade: 85, attendance: 92, nextClass: "Today 10:00 AM" },
    { id: 2, name: "Algorithms", code: "CS301", students: 38, avgGrade: 88, attendance: 87, nextClass: "Today 2:00 PM" },
  ];

  const pendingGradesData = [
    { id: 1, student: "John Doe", course: "CS201", assignment: "Assignment 3", submittedDate: "2025-11-05", status: "Pending" },
    { id: 2, student: "Jane Smith", course: "CS201", assignment: "Assignment 3", submittedDate: "2025-11-05", status: "Pending" },
    { id: 3, student: "Mike Johnson", course: "CS301", assignment: "Lab Report 2", submittedDate: "2025-11-04", status: "Pending" },
    { id: 4, student: "Sarah Williams", course: "CS301", assignment: "Lab Report 2", submittedDate: "2025-11-04", status: "Pending" },
    { id: 5, student: "Tom Brown", course: "CS201", assignment: "Quiz 4", submittedDate: "2025-11-03", status: "Pending" },
  ];

  const upcomingClasses = [
    { course: "Data Structures", code: "CS201", time: "10:00 AM - 11:30 AM", room: "Room 204", day: "Today", students: 45 },
    { course: "Algorithms", code: "CS301", time: "2:00 PM - 3:30 PM", room: "Room 305", day: "Today", students: 38 },
    { course: "Data Structures", code: "CS201", time: "10:00 AM - 11:30 AM", room: "Room 204", day: "Tomorrow", students: 45 },
    { course: "Algorithms Lab", code: "CS301L", time: "3:00 PM - 5:00 PM", room: "Lab 102", day: "Tomorrow", students: 38 },
  ];

  const quickStats = [
    { label: "My Courses", value: stats.totalCourses, icon: BookOpen },
    { label: "Total Students", value: stats.totalStudents, icon: Users },
    { label: "Pending Grades", value: stats.pendingGrades, icon: Award },
    { label: "Avg Attendance", value: `${stats.attendanceRate}%`, icon: Clock },
  ];

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

      {/* My Courses Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">My Courses</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onNavigate("manage-courses")}>
            View All
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Avg Grade</TableHead>
                <TableHead>Attendance</TableHead>
                <TableHead>Next Class</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{course.code}</Badge>
                  </TableCell>
                  <TableCell>{course.students}</TableCell>
                  <TableCell>
                    <Badge variant={course.avgGrade >= 85 ? "default" : "secondary"}>
                      {course.avgGrade}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={course.attendance >= 90 ? "default" : course.attendance >= 80 ? "secondary" : "destructive"}>
                      {course.attendance}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{course.nextClass}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onNavigate("view-attendance")}>
                          Mark Attendance
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onNavigate("view-grades")}>
                          View Grades
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
        {/* Pending Grades */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Pending Grades</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("view-grades")}>
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingGradesData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.student}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.course}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.assignment}</TableCell>
                    <TableCell className="text-muted-foreground">{item.submittedDate}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">Grade</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((item, index) => (
                <div key={index} className="flex gap-3 p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex flex-col items-center justify-center px-3 py-2 bg-primary/10 rounded">
                    <Clock className="h-4 w-4 text-primary mb-1" />
                    <span className="text-xs font-medium">{item.day}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.course}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{item.code}</Badge>
                      <span className="text-xs text-muted-foreground">{item.room}</span>
                      <span className="text-xs text-muted-foreground">• {item.students} students</span>
                    </div>
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
          onClick={() => onNavigate("view-attendance")}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Mark Attendance</p>
              <p className="text-xs text-muted-foreground">Track student presence</p>
            </div>
          </div>
        </Button>

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
              <p className="font-semibold text-sm">Grade Assignments</p>
              <p className="text-xs text-muted-foreground">{stats.pendingGrades} pending reviews</p>
            </div>
          </div>
        </Button>

        <Button
          variant="outline"
          className="h-auto p-4 justify-start"
          onClick={() => onNavigate("manage-students")}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">View Students</p>
              <p className="text-xs text-muted-foreground">{stats.totalStudents} total enrolled</p>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
}
