
import 'package:eoy_frontend/bottomNavigationBar.dart';
import 'package:flutter/material.dart';
import 'dart:async';

import 'home.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateToHome();
  }

  _navigateToHome() {
    Timer(const Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const HomeVisualScreenWrapper()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Colors.white,  
      body: Center(
        child: Image.asset('assets/images/UILO_logo.png', width: screenWidth * 0.7, // 10% of screen width
      height: screenWidth * 0.7,), 
      ),
    );
  }
}
