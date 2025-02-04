import 'package:flutter/material.dart';
import 'home.dart';  // Import the Home screen
import 'visual_screen.dart';  // Import the VisualScreen screen

class HomeVisualScreenWrapper extends StatefulWidget {
  const HomeVisualScreenWrapper({super.key});

  @override
  _HomeVisualScreenWrapperState createState() => _HomeVisualScreenWrapperState();
}

class _HomeVisualScreenWrapperState extends State<HomeVisualScreenWrapper> {
  int _selectedIndex = 0;  

  final List<Widget> _screens = const [
    Home(),  
    VisualScreen(), 
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              "assets/images/UILO_logo.png",
              height: 30,
            ),
            const SizedBox(width: 8),
            const Text(
              "UILO IR 2025",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
        centerTitle: true,
        automaticallyImplyLeading: false,
      ),
      body: _screens[_selectedIndex],  
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        selectedItemColor: Colors.blueAccent,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.pie_chart),
            label: 'Visual Screen',
          ),
        ],
      ),
    );
  }


  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }
}
