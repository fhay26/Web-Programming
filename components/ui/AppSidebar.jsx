import { Home, Users, BookOpen, UserCheck, Award, ClipboardCheck, User, LogOut, GraduationCap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Avatar, AvatarFallback } from "./ui/avatar";

export default function AppSidebar({ user, currentPage, onNavigate, onLogout }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const adminMenuItems = [
    { icon: Home, label: "Dashboard", page: "dashboard" },
    { icon: Users, label: "Students", page: "manage-students" },
    { icon: UserCheck, label: "Teachers", page: "manage-teachers" },
    { icon: BookOpen, label: "Courses", page: "manage-courses" },
    { icon: Award, label: "Grades", page: "view-grades" },
    { icon: ClipboardCheck, label: "Attendance", page: "view-attendance" },
  ];

  const teacherMenuItems = [
    { icon: Home, label: "Dashboard", page: "dashboard" },
    { icon: BookOpen, label: "My Courses", page: "manage-courses" },
    { icon: Users, label: "Students", page: "manage-students" },
    { icon: Award, label: "Grades", page: "view-grades" },
    { icon: ClipboardCheck, label: "Attendance", page: "view-attendance" },
  ];

  const studentMenuItems = [
    { icon: Home, label: "Dashboard", page: "dashboard" },
    { icon: Award, label: "My Grades", page: "view-grades" },
    { icon: ClipboardCheck, label: "My Attendance", page: "view-attendance" },
  ];

  const menuItems = 
    user.role === "admin" ? adminMenuItems :
    user.role === "teacher" ? teacherMenuItems :
    studentMenuItems;

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">EduManage</h2>
            <p className="text-xs text-muted-foreground">Student Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.page}>
                    <SidebarMenuButton
                      onClick={() => onNavigate(item.page)}
                      isActive={currentPage === item.page}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onNavigate("profile")}
                  isActive={currentPage === "profile"}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onLogout}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
