import { BookOpen, Users, Award, Clock, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function TeacherDashboardV2({ stats, onNavigate }) {
  const attendanceData = [
    { week: "Week 1", rate: 92 },
    { week: "Week 2", rate: 88 },
    { week: "Week 3", rate: 95 },
    { week: "Week 4", rate: 90 },
  ];

  const gradeDistribution = [
    { grade: "A", count: 15 },
    { grade: "B", count: 22 },
    { grade: "C", count: 18 },
    { grade: "D", count: 5 },
    { grade: "F", count: 2 },
  ];

  const myCourses = [
    { id: 1, name: "Data Structures", code: "CS201", students: 45, completion: 75 },
    { id: 2, name: "Algorithms", code: "CS301", students: 38, completion: 60 },
  ];

  const upcomingClasses = [
    { course: "Data Structures", time: "10:00 AM", room: "Room 204", day: "Today" },
    { course: "Algorithms", time: "2:00 PM", room: "Room 305", day: "Today" },
    { course: "Data Structures", time: "10:00 AM", room: "Room 204", day: "Tomorrow" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-1">Teacher Dashboard</h1>
        <p className="text-muted-foreground">Manage your courses, students, and track performance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">My Courses</CardTitle>
              <BookOpen className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{stats.totalCourses}</div>
            <p className="text-xs opacity-80">Active this semester</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{stats.totalStudents}</div>
            <p className="text-xs opacity-80">Across all courses</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
              <Award className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{stats.pendingGrades}</div>
            <p className="text-xs opacity-80">Assignments to review</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <TrendingUp className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{stats.attendanceRate}%</div>
            <p className="text-xs opacity-80">Average this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>
            <CardDescription>Attendance rate over the past 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Current semester grade breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* My Courses and Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Courses you're teaching this semester</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myCourses.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{course.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{course.code}</Badge>
                      <span className="text-sm text-muted-foreground">{course.students} students</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onNavigate("manage-courses")}>
                    View
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Course Progress</span>
                    <span className="font-medium">{course.completion}%</span>
                  </div>
                  <Progress value={course.completion} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your schedule for the next 48 hours</CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingClasses.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                <div className="p-2 bg-background rounded">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{item.course}</p>
                    <Badge variant="outline" className="text-xs">{item.day}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{item.time}</span>
                    <span>•</span>
                    <span>{item.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("view-grades")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold">Grade Assignments</p>
                <p className="text-sm text-muted-foreground">{stats.pendingGrades} pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("view-attendance")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">Mark Attendance</p>
                <p className="text-sm text-muted-foreground">Track student presence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("manage-students")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">View Students</p>
                <p className="text-sm text-muted-foreground">{stats.totalStudents} enrolled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
