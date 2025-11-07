import { BookOpen, Award, ClipboardCheck, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export default function StudentDashboard({ student, stats, grades, onNavigate }) {
  const cards = [
    {
      title: "Enrolled Courses",
      value: stats.enrolledCourses,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Average Grade",
      value: stats.averageGrade,
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Attendance Rate",
      value: `${stats.attendanceRate}%`,
      icon: ClipboardCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "GPA",
      value: student?.gpa || "N/A",
      icon: User,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const quickActions = [
    { label: "View My Grades", page: "view-grades" },
    { label: "View Attendance", page: "view-attendance" },
    { label: "My Profile", page: "profile" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Welcome back, {student?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">{card.title}</CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{card.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access your information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action) => (
              <Button
                key={action.page}
                variant="outline"
                className="w-full justify-start"
                onClick={() => onNavigate(action.page)}
              >
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Your grades this semester</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {grades.slice(0, 3).map((grade) => (
              <div key={grade.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{grade.courseName}</span>
                  <span className="text-sm">{grade.grade} ({grade.percentage}%)</span>
                </div>
                <Progress value={grade.percentage} className="h-2" />
              </div>
            ))}
            {grades.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No grades available yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Important dates and deadlines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5" />
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">Data Structures - Midterm Exam</p>
                <span className="text-gray-500">Nov 15, 2025</span>
              </div>
              <p className="text-gray-500 text-xs">Room 204, 10:00 AM</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-green-600 mt-1.5" />
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">Calculus - Assignment Due</p>
                <span className="text-gray-500">Nov 10, 2025</span>
              </div>
              <p className="text-gray-500 text-xs">Submit online by 11:59 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5" />
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">Academic Advising Session</p>
                <span className="text-gray-500">Nov 12, 2025</span>
              </div>
              <p className="text-gray-500 text-xs">Meet with your advisor</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
