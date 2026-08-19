class MentorModel {
  final String id;
  final String userId;
  final String employeeId;
  final String name;
  final String email;
  final String phone;
  final String collegeId;
  final String departmentCode;
  final String designation;
  final String? profilePhoto;
  final int assignedStudentsCount;
  final int maxCapacity;
  final DateTime createdAt;
  final DateTime updatedAt;

  const MentorModel({
    required this.id,
    required this.userId,
    required this.employeeId,
    required this.name,
    required this.email,
    required this.phone,
    required this.collegeId,
    required this.departmentCode,
    this.designation = 'Lead Coordinator',
    this.profilePhoto,
    this.assignedStudentsCount = 0,
    this.maxCapacity = 5,
    required this.createdAt,
    required this.updatedAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'userId': userId,
      'employeeId': employeeId,
      'name': name,
      'email': email,
      'phone': phone,
      'collegeId': collegeId,
      'departmentCode': departmentCode,
      'designation': designation,
      'profilePhoto': profilePhoto,
      'assignedStudentsCount': assignedStudentsCount,
      'maxCapacity': maxCapacity,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  factory MentorModel.fromMap(Map<String, dynamic> map, String id) {
    return MentorModel(
      id: id,
      userId: map['userId'] ?? '',
      employeeId: map['employeeId'] ?? '',
      name: map['name'] ?? '',
      email: map['email'] ?? '',
      phone: map['phone'] ?? '',
      collegeId: map['collegeId'] ?? '',
      departmentCode: map['departmentCode'] ?? '',
      designation: map['designation'] ?? 'Lead Coordinator',
      profilePhoto: map['profilePhoto'],
      assignedStudentsCount: map['assignedStudentsCount'] ?? 0,
      maxCapacity: map['maxCapacity'] ?? 5,
      createdAt: map['createdAt'] != null
          ? DateTime.tryParse(map['createdAt'].toString()) ?? DateTime.now()
          : DateTime.now(),
      updatedAt: map['updatedAt'] != null
          ? DateTime.tryParse(map['updatedAt'].toString()) ?? DateTime.now()
          : DateTime.now(),
    );
  }
}
