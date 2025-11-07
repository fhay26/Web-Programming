import { Users, BookOpen, GraduationCap, TrendingUp, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function AdminDashboardV3({ stats, onNavigate }) {
  const recentStudents = [
    { id: 1, name: "John Doe", email: "john@student.com", major: "Computer Science", enrollmentDate: "2024-01-15", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@student.com", major: "Mathematics", enrollmentDate: "2024-01-16", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike@student.com", major: "Physics", enrollmentDate: "2024-02-01", status: "Active" },
    { id: 4, name: "Sarah Williams", email: "sarah@student.com", major: "Chemistry", enrollmentDate: "2024-02-15", status: "Active" },
    { id: 5, name: "Tom Brown", email: "tom@student.com", major: "Biology", enrollmentDate: "2024-02-20", status: "Pending" },
  ];

  const activeCourses = [
    { id: 1, name: "Data Structures", code: "CS201", teacher: "Dr. Robert Brown", students: 45, capacity: 50 },
    { id: 2, name: "Calculus II", code: "MATH202", teacher: "Dr. Emily Davis", students: 38, capacity: 40 },
    { id: 3, name: "Quantum Mechanics", code: "PHY301", teacher: "Dr. Michael Wilson", students: 32, capacity: 35 },
    { id: 4, name: "Algorithms", code: "CS301", teacher: "Dr. Robert Brown", students: 41, capacity: 45 },
    { id: 5, name: "Linear Algebra", code: "MATH301", teacher: "Dr. Emily Davis", students: 28, capacity: 40 },
  ];

  const systemStats = [
    { label: "Total Students", value: stats.totalStudents, change: "+12.5%", trend: "up", icon: GraduationCap },
    { label: "Total Teachers", value: stats.totalTeachers, change: "+3.2%", trend: "up", icon: Users },
    { label: "Active Courses", value: stats.totalCourses, change: "-2.1%", trend: "down", icon: BookOpen },
    { label: "Attendance Rate", value: `${stats.attendanceRate}%`, change: "+5.4%", trend: "up", icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-background">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <span className={`text-xs flex items-center ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Students - Takes 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Recent Student Enrollments</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("manage-students")}>
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Major</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-muted-foreground">{student.email}</TableCell>
                    <TableCell>{student.major}</TableCell>
                    <TableCell className="text-muted-foreground">{student.enrollmentDate}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                        {student.status}
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">New course added</p>
                  <p className="text-xs text-muted-foreground">Advanced Algorithms (CS401)</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="w-2 h-2 rounded-full bg-green-600 mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Student enrolled</p>
                  <p className="text-xs text-muted-foreground">Sarah Williams - Mathematics</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="w-2 h-2 rounded-full bg-purple-600 mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Grades published</p>
                  <p className="text-xs text-muted-foreground">Data Structures Midterm</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b">
                <div className="w-2 h-2 rounded-full bg-orange-600 mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Attendance alert</p>
                  <p className="text-xs text-muted-foreground">5 students low attendance</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-600 mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Teacher added</p>
                  <p className="text-xs text-muted-foreground">Dr. Jennifer Lee - Chemistry</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Courses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Active Courses</CardTitle>
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
                <TableHead>Instructor</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeCourses.map((course) => {
                const utilization = (course.students / course.capacity) * 100;
                return (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.code}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{course.teacher}</TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>{course.capacity}</TableCell>
                    <TableCell>
                      <Badge variant={utilization >= 90 ? "destructive" : utilization >= 75 ? "default" : "secondary"}>
                        {utilization >= 90 ? "Full" : utilization >= 75 ? "Almost Full" : "Available"}
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Students</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
