/// InternPulse Role System
/// 
/// Enforces structured role authorization across Student, Mentor, and Admin
library;

enum UserRole {
  student,
  mentor,
  admin;

  String get value => name;

  String get displayName {
    switch (this) {
      case UserRole.student:
        return 'Student';
      case UserRole.mentor:
        return 'Mentor';
      case UserRole.admin:
        return 'Admin';
    }
  }

  static UserRole fromString(String? value) {
    if (value == null) return UserRole.student;
    switch (value.toLowerCase().trim()) {
      case 'admin':
        return UserRole.admin;
      case 'mentor':
        return UserRole.mentor;
      case 'student':
      default:
        return UserRole.student;
    }
  }
}
