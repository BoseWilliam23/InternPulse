import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../models/user_role.dart';

// Placeholder / presentation screens
import '../features/authentication/presentation/screens/login_screen.dart';
import '../features/authentication/presentation/screens/register_screen.dart';
import '../features/authentication/presentation/screens/forgot_password_screen.dart';
import '../features/authentication/presentation/screens/onboarding_screen.dart';
import '../features/student/presentation/screens/student_dashboard_screen.dart';
import '../features/student/presentation/screens/student_tasks_screen.dart';
import '../features/student/presentation/screens/student_update_progress_screen.dart';
import '../features/mentor/presentation/screens/mentor_dashboard_screen.dart';
import '../features/mentor/presentation/screens/mentor_student_monitoring_screen.dart';
import '../features/mentor/presentation/screens/mentor_at_risk_screen.dart';
import '../features/mentor/presentation/screens/mentor_activity_screen.dart';
import '../features/admin/presentation/screens/admin_dashboard_screen.dart';
import '../features/admin/presentation/screens/admin_student_management_screen.dart';
import '../features/admin/presentation/screens/admin_mentor_assignment_screen.dart';

class AppRoutes {
  AppRoutes._();

  // Auth Routes
  static const String login = '/login';
  static const String register = '/register';
  static const String forgotPassword = '/forgot-password';
  static const String onboarding = '/onboarding';

  // Student Routes
  static const String studentDashboard = '/student/dashboard';
  static const String studentTasks = '/student/tasks';
  static const String studentUpdateProgress = '/student/update-progress';

  // Mentor Routes
  static const String mentorDashboard = '/mentor/dashboard';
  static const String mentorMonitoring = '/mentor/monitoring';
  static const String mentorAtRisk = '/mentor/at-risk';
  static const String mentorLiveActivity = '/mentor/live-activity';

  // Admin Routes
  static const String adminDashboard = '/admin/dashboard';
  static const String adminStudents = '/admin/students';
  static const String adminMentorAssignment = '/admin/mentor-assignment';

  /// Helper to route to the correct landing screen based on authenticated role
  static String getInitialRouteForRole(UserRole role) {
    switch (role) {
      case UserRole.student:
        return studentDashboard;
      case UserRole.mentor:
        return mentorDashboard;
      case UserRole.admin:
        return adminDashboard;
    }
  }
}

final appRouter = GoRouter(
  initialLocation: AppRoutes.login,
  routes: [
    // Authentication Flow
    GoRoute(
      path: AppRoutes.login,
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: AppRoutes.register,
      builder: (context, state) => const RegisterScreen(),
    ),
    GoRoute(
      path: AppRoutes.forgotPassword,
      builder: (context, state) => const ForgotPasswordScreen(),
    ),
    GoRoute(
      path: AppRoutes.onboarding,
      builder: (context, state) => const OnboardingScreen(),
    ),

    // Student Flow
    GoRoute(
      path: AppRoutes.studentDashboard,
      builder: (context, state) => const StudentDashboardScreen(),
    ),
    GoRoute(
      path: AppRoutes.studentTasks,
      builder: (context, state) => const StudentTasksScreen(),
    ),
    GoRoute(
      path: AppRoutes.studentUpdateProgress,
      builder: (context, state) => const StudentUpdateProgressScreen(),
    ),

    // Mentor Flow
    GoRoute(
      path: AppRoutes.mentorDashboard,
      builder: (context, state) => const MentorDashboardScreen(),
    ),
    GoRoute(
      path: AppRoutes.mentorMonitoring,
      builder: (context, state) => const MentorStudentMonitoringScreen(),
    ),
    GoRoute(
      path: AppRoutes.mentorAtRisk,
      builder: (context, state) => const MentorAtRiskScreen(),
    ),
    GoRoute(
      path: AppRoutes.mentorLiveActivity,
      builder: (context, state) => const MentorActivityScreen(),
    ),

    // Admin Flow
    GoRoute(
      path: AppRoutes.adminDashboard,
      builder: (context, state) => const AdminDashboardScreen(),
    ),
    GoRoute(
      path: AppRoutes.adminStudents,
      builder: (context, state) => const AdminStudentManagementScreen(),
    ),
    GoRoute(
      path: AppRoutes.adminMentorAssignment,
      builder: (context, state) => const AdminMentorAssignmentScreen(),
    ),
  ],
);
