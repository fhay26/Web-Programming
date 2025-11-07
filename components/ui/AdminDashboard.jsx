import { Users, BookOpen, GraduationCap, ClipboardCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function AdminDashboard({ stats, onNavigate }) {
  const cards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: () => onNavigate("manage-students"),
    },
    {
      title: "Total Teachers",
      value: stats.totalTeachers,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: () => onNavigate("manage-teachers"),
    },
    {
      title: "Total Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: () => onNavigate("manage-courses"),
    },
    {
      title: "Attendance Rate",
      value: `${stats.attendanceRate}%`,
      icon: ClipboardCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      action: () => onNavigate("view-attendance"),
    },
  ];

  const quickActions = [
    { label: "Manage Students", page: "manage-students" },
    { label: "Manage Teachers", page: "manage-teachers" },
    { label: "Manage Courses", page: "manage-courses" },
    { label: "View Grades", page: "view-grades" },
    { label: "View Attendance", page: "view-attendance" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your school.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.title}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={card.action}
            >
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
            <CardDescription>Common administrative tasks</CardDescription>
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
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates in the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5" />
              <div>
                <p className="font-medium">New student enrolled</p>
                <p className="text-gray-500 text-xs">Sarah Williams joined Computer Science</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-600 mt-1.5" />
              <div>
                <p className="font-medium">Course added</p>
                <p className="text-gray-500 text-xs">Algorithms (CS301) created by Dr. Robert Brown</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-purple-600 mt-1.5" />
              <div>
                <p className="font-medium">Grades updated</p>
                <p className="text-gray-500 text-xs">20 grades posted for Data Structures</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
