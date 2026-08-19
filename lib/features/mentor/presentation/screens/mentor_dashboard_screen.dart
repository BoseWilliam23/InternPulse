import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../app/router.dart';
import '../../../../core/theme/color_schemes.dart';
import '../../../../shared/widgets/pulse_stat_card.dart';

class MentorDashboardScreen extends StatelessWidget {
  const MentorDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PulseColors.background,
      appBar: AppBar(
        title: const Text('Mentor Portal • SMVEC'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout_rounded),
            onPressed: () => context.go(AppRoutes.login),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Real-Time Cohort Overview',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
            ),
            const SizedBox(height: 16),
            LayoutBuilder(
              builder: (context, constraints) {
                final isWide = constraints.maxWidth > 600;
                return GridView.count(
                  crossAxisCount: isWide ? 4 : 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  children: [
                    PulseStatCard(
                      title: 'Total Students',
                      value: '24',
                      icon: Icons.people_alt_outlined,
                      onTap: () => context.push(AppRoutes.mentorMonitoring),
                    ),
                    PulseStatCard(
                      title: 'Active Interns',
                      value: '21',
                      icon: Icons.check_circle_outline,
                      iconColor: PulseColors.success,
                    ),
                    PulseStatCard(
                      title: 'At-Risk Interns',
                      value: '3',
                      icon: Icons.warning_amber_rounded,
                      iconColor: PulseColors.error,
                      iconBackgroundColor: PulseColors.errorContainer,
                      onTap: () => context.push(AppRoutes.mentorAtRisk),
                    ),
                    PulseStatCard(
                      title: 'Live Activity Stream',
                      value: '12 Updates',
                      icon: Icons.bolt_rounded,
                      iconColor: PulseColors.primary,
                      onTap: () => context.push(AppRoutes.mentorLiveActivity),
                    ),
                  ],
                );
              },
            ),
            const SizedBox(height: 24),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () => context.push(AppRoutes.mentorMonitoring),
                    icon: const Icon(Icons.people_outline),
                    label: const Text('Student Monitoring'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: () => context.push(AppRoutes.mentorAtRisk),
                    icon: const Icon(Icons.warning_amber_rounded),
                    label: const Text('View At-Risk Students'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class MentorStudentMonitoringScreen extends StatelessWidget {
  const MentorStudentMonitoringScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PulseColors.background,
      appBar: AppBar(title: const Text('Student Monitoring')),
      body: const Center(child: Text('Live Cohort Stream & Filters (SMVEC)')),
    );
  }
}

class MentorAtRiskScreen extends StatelessWidget {
  const MentorAtRiskScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PulseColors.background,
      appBar: AppBar(title: const Text('At-Risk Students')),
      body: const Center(child: Text('Inactive & Delayed Students Triggering Alerts')),
    );
  }
}

class MentorActivityScreen extends StatelessWidget {
  const MentorActivityScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PulseColors.background,
      appBar: AppBar(title: const Text('Live Activity Stream')),
      body: const Center(child: Text('Real-Time Firestore Activity Feed')),
    );
  }
}
