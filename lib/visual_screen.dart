import 'package:eoy_frontend/environment.dart';
import 'package:eoy_frontend/home.dart';
import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
class VisualScreen extends StatefulWidget {
  const VisualScreen({super.key});

  @override
  _VisualScreenState createState() => _VisualScreenState();
}

class _VisualScreenState extends State<VisualScreen> {
  int presentCount = 0;
  int absentCount = 0;
  bool isLoading = true;
  int _currentIndex = 1; 

  @override
  void initState() {
    super.initState();
    _fetchDataFromDatabase();
  }

  Future<void> _fetchDataFromDatabase() async {
    await Future.delayed(const Duration(seconds: 2)); 

     try {
        var url = Uri.parse(
          "${Environment.serverUrl}:${Environment.port}/api/stat",
        );
        var response = await http.get(url);
        var responseData = json.decode(response.body);
        presentCount = responseData["present"];
        absentCount = responseData["absent"];
     
      } catch (e) {
        print(e.toString());
      }
    setState(()  {
       

      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    // Get the screen width and height
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    
    // Adjust padding and font sizes based on screen size
    double fontSizeTitle = screenWidth * 0.05;
    double fontSizeCount = screenWidth * 0.1;
    double pieChartHeight = screenHeight * 0.35;

    return Scaffold(
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: EdgeInsets.all(screenWidth * 0.04), 
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  // Container with margin for top space
                  Container(
                    margin: EdgeInsets.only(top: screenHeight * 0.01), 
                    child: Text(
                      'The number of presence and absence',
                      style: TextStyle(fontSize: fontSizeTitle, fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(height: 20),
                  SizedBox(
                    height: pieChartHeight,
                    child: PieChart(
                      PieChartData(
                        sections: [
                          PieChartSectionData(
                            value: presentCount.toDouble(),
                            title: "",
                            color: Colors.green,
                            radius: 60,
                            titleStyle: TextStyle(
                              fontSize: screenWidth * 0.05, 
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          PieChartSectionData(
                            value: absentCount.toDouble(),
                            title: "",
                            color: Colors.red,
                            radius: 60,
                            titleStyle: TextStyle(
                              fontSize: screenWidth * 0.05, 
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ],
                        sectionsSpace: 2,
                        centerSpaceRadius: 40,
                      ),
                    ),
                  ),
                  const SizedBox(height: 30),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Column(
                        children: [
                          Text(
                            "Present",
                            style: TextStyle(
                              fontSize: screenWidth * 0.045,
                              fontWeight: FontWeight.bold,
                              color: Colors.green,
                            ),
                          ),
                          Text(
                            "$presentCount",
                            style: TextStyle(
                              fontSize: fontSizeCount,
                              fontWeight: FontWeight.bold,
                              color: Colors.green,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          Text(
                            "Absent",
                            style: TextStyle(
                              fontSize: screenWidth * 0.045,
                              fontWeight: FontWeight.bold,
                              color: Colors.red,
                            ),
                          ),
                          Text(
                            "$absentCount",
                            style: TextStyle(
                              fontSize: fontSizeCount,
                              fontWeight: FontWeight.bold,
                              color: Colors.red,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 30),
                  ElevatedButton(
                    onPressed: _fetchDataFromDatabase,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blueAccent,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12.0),
                      ),
                      padding: EdgeInsets.symmetric(
                        vertical: screenHeight * 0.02, 
                        horizontal: screenWidth * 0.1, 
                      ),
                      elevation: 5.0,
                    ),
                    child: Text(
                      "Refresh Data",
                      style: TextStyle(
                        fontSize: screenWidth * 0.045,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
