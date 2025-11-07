import { BookOpen, Award, ClipboardCheck, Target, Calendar, Bell, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function StudentDashboardV2({ student, stats, grades, onNavigate }) {
  const performanceData = [
    { week: "W1", gpa: 3.5 },
    { week: "W2", gpa: 3.6 },
    { week: "W3", gpa: 3.7 },
    { week: "W4", gpa: 3.8 },
  ];

  const skillsData = [
    { subject: "Math", score: 85 },
    { subject: "Science", score: 78 },
    { subject: "English", score: 92 },
    { subject: "History", score: 81 },
    { subject: "CS", score: 88 },
  ];

  const upcomingEvents = [
    { title: "Data Structures Midterm", date: "Nov 15", type: "exam", color: "red" },
    { title: "Calculus Assignment Due", date: "Nov 10", type: "assignment", color: "blue" },
    { title: "Physics Lab Session", date: "Nov 8", type: "lab", color: "green" },
  ];

  const recentGrades = [
    { course: "Data Structures", assignment: "Assignment 3", grade: "A", score: 95 },
    { course: "Calculus II", assignment: "Quiz 2", grade: "A-", score: 88 },
    { course: "Physics", assignment: "Lab Report 1", grade: "B+", score: 85 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-1">Welcome back, {student?.name?.split(' ')[0] || 'Student'}!</h1>
        <p className="text-muted-foreground">Here's an overview of your academic progress.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{stats.enrolledCourses}</div>
            <p className="text-xs opacity-80">Spring 2025 Semester</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <Award className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{stats.averageGrade}</div>
            <p className="text-xs opacity-80">Current semester</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <ClipboardCheck className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{stats.attendanceRate}%</div>
            <p className="text-xs opacity-80">Overall attendance</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">GPA</CardTitle>
              <Target className="h-5 w-5 opacity-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{student?.gpa || "3.8"}</div>
            <p className="text-xs opacity-80">Cumulative GPA</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>GPA Trend</CardTitle>
            <CardDescription>Your academic performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 4]} />
                <Tooltip />
                <Line type="monotone" dataKey="gpa" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your scores across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={skillsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Grades and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Your latest assignment scores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentGrades.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{item.course}</p>
                    <p className="text-xs text-muted-foreground">{item.assignment}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">{item.grade}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{item.score}%</p>
                  </div>
                </div>
                <Progress value={item.score} className="h-1.5" />
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => onNavigate("view-grades")}>
              View All Grades
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Important dates and deadlines</CardDescription>
              </div>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                <div className={`p-2 bg-${event.color}-100 rounded`}>
                  <Calendar className={`h-4 w-4 text-${event.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{event.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{event.date}</Badge>
                    <span className="text-xs text-muted-foreground capitalize">{event.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("view-grades")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold">View All Grades</p>
                <p className="text-sm text-muted-foreground">Check your scores</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("view-attendance")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ClipboardCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">My Attendance</p>
                <p className="text-sm text-muted-foreground">Track your presence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate("profile")}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">My Profile</p>
                <p className="text-sm text-muted-foreground">View your info</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
