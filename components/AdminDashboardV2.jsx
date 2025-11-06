import { Users, BookOpen, GraduationCap, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboardV2({ stats, onNavigate }) {
  const enrollmentData = [
    { month: "Jan", students: 45 },
    { month: "Feb", students: 52 },
    { month: "Mar", students: 61 },
    { month: "Apr", students: 58 },
    { month: "May", students: 67 },
    { month: "Jun", students: 73 },
  ];

  const performanceData = [
    { subject: "Math", avgScore: 85 },
    { subject: "Science", avgScore: 78 },
    { subject: "English", avgScore: 92 },
    { subject: "History", avgScore: 81 },
    { subject: "CS", avgScore: 88 },
  ];

  const departmentData = [
    { name: "Computer Science", value: 35, color: "#8b5cf6" },
    { name: "Mathematics", value: 25, color: "#3b82f6" },
    { name: "Physics", value: 20, color: "#10b981" },
    { name: "Chemistry", value: 20, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your school today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
              <div className="p-2 bg-purple-100 rounded-lg">
                <GraduationCap className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl mb-1">{stats.totalStudents}</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+12.5%</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("manage-students")}>
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Teachers</CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl mb-1">{stats.totalTeachers}</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+3.2%</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("manage-teachers")}>
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Courses</CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl mb-1">{stats.totalCourses}</div>
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <ArrowDownRight className="h-4 w-4" />
                  <span>-2.1%</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("manage-courses")}>
                View
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl mb-1">{stats.attendanceRate}%</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span>+5.4%</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("view-attendance")}>
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
            <CardDescription>Monthly enrollment over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Student distribution across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Performance by Subject</CardTitle>
            <CardDescription>Average scores across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgScore" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest updates across the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="w-2 h-2 rounded-full bg-purple-600 mt-2" />
              <div className="flex-1">
                <p className="font-medium text-sm">New Course Added</p>
                <p className="text-xs text-muted-foreground">Advanced Algorithms (CS401) created by Dr. Robert Brown</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
              <div className="flex-1">
                <p className="font-medium text-sm">Student Enrolled</p>
                <p className="text-xs text-muted-foreground">Sarah Williams joined Mathematics department</p>
                <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b">
              <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
              <div className="flex-1">
                <p className="font-medium text-sm">Grades Published</p>
                <p className="text-xs text-muted-foreground">Midterm grades posted for Data Structures (CS201)</p>
                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-600 mt-2" />
              <div className="flex-1">
                <p className="font-medium text-sm">Attendance Alert</p>
                <p className="text-xs text-muted-foreground">5 students with low attendance this week</p>
                <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Course Completion Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Spring 2025</span>
              <span className="font-medium">87%</span>
            </div>
            <Progress value={87} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Student Satisfaction</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Overall Rating</span>
              <span className="font-medium">4.5/5.0</span>
            </div>
            <Progress value={90} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Faculty Engagement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Active Teachers</span>
              <span className="font-medium">95%</span>
            </div>
            <Progress value={95} className="h-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
