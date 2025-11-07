import { BookOpen, Users, ClipboardCheck, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Stats {
  totalCourses: number;
  totalStudents: number;
  pendingGrades: number;
  attendanceRate: number;
}

interface TeacherDashboardProps {
  stats: Stats;
  onNavigate: (page: string) => void;
}

interface CardItem {
  title: string;
  value: string | number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
}

interface QuickAction {
  label: string;
  page: string;
}

export default function TeacherDashboard({ stats, onNavigate }: TeacherDashboardProps) {
  const cards: CardItem[] = [
    {
      title: "My Courses",
      value: stats.totalCourses,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Grades",
      value: stats.pendingGrades,
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Attendance Rate",
      value: `${stats.attendanceRate}%`,
      icon: ClipboardCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const quickActions: QuickAction[] = [
    { label: "Manage Courses", page: "manage-courses" },
    { label: "Mark Attendance", page: "view-attendance" },
    { label: "Assign Grades", page: "view-grades" },
    { label: "View Students", page: "manage-students" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">Welcome back! Manage your courses and students.</p>
      </div>

      {/* Stats Cards */}
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

      {/* Quick Actions & My Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common teaching tasks</CardDescription>
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
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Courses you are teaching</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {["Data Structures", "Algorithms"].map((course, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{course}</p>
                  <p className="text-sm text-gray-500">
                    {course === "Data Structures" ? "CS201 - Spring 2025" : "CS301 - Spring 2025"}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Latest activities in your courses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { color: "bg-blue-600", title: "Assignment submitted", desc: "15 students submitted Data Structures Assignment 3" },
            { color: "bg-green-600", title: "Attendance marked", desc: "CS201 - November 6, 2025" },
            { color: "bg-purple-600", title: "Grades pending", desc: "10 assignments waiting for review" },
          ].map((update, idx) => (
            <div key={idx} className="flex items-start gap-3 text-sm">
              <div className={`w-2 h-2 rounded-full ${update.color} mt-1.5`} />
              <div>
                <p className="font-medium">{update.title}</p>
                <p className="text-gray-500 text-xs">{update.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
