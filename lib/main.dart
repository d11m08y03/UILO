import 'package:eoy_frontend/bottomNavigationBar.dart';
import 'package:flutter/material.dart';
import 'package:eoy_frontend/home.dart';
import 'package:eoy_frontend/splash_screen.dart';
import 'package:eoy_frontend/visual_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'UILO IR 2025',
      initialRoute: '/', 
      routes: {
        '/': (context) => const SplashScreen(),
        '/home': (context) => const Home(),
        '/visual': (context) => const VisualScreen(),
        '/nav':(context) => const HomeVisualScreenWrapper()
      },
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color.fromARGB(255, 218, 218, 218)),
        useMaterial3: true,
      ),
    );
  }
}
