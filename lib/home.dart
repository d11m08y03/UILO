import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  // Sample data
  List<Map<String, dynamic>> data = [
    {
      'companyName': 'Pitin Corporation',
      'isPresent': false,
      'hasReceivedWater': false,
      'hasReceivedLunch': false,
    },
  ];

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;

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
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.symmetric(horizontal: screenWidth * 0.05),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(height: 60),

            // Welcome Message
            const Text(
              "Scan the company's QR Code to record attendance, water, and lunch distribution",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: 20),

            // Image Placeholder for QR Scanner
            Container(
              width: screenWidth * 0.9,
              height: screenWidth * 0.9,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.blueAccent, width: 4),
                borderRadius: BorderRadius.circular(20),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Image.asset(
                  "assets/images/qr.jpg", // Replace with your image path
                  fit: BoxFit.cover,
                ),
              ),
            ),

            const SizedBox(height: 30),

            // Button to Simulate QR Scan
            SizedBox(
              width: screenWidth * 0.8,
              height: 55,
              child: ElevatedButton(
                onPressed: () => _showDataModal(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF2377D2),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: const Text(
                  "Scan QR code",
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
            ),

            const SizedBox(height: 30),

            // Help Button
            TextButton.icon(
              onPressed: () => _showHelpModal(context),
              icon: const Icon(Icons.help_outline, color: Colors.blue),
              label: const Text("Need Help?", style: TextStyle(color: Colors.blue)),
            ),

            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  void _showHelpModal(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      backgroundColor: Colors.white,
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Icon(
                Icons.help_outline,
                size: 40,
                color: Colors.blueAccent,
              ),
              const SizedBox(height: 16),
              const Text(
                "Need Help?",
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.blueAccent,
                ),
              ),
              const SizedBox(height: 10),
              const Text(
                "If you require assistance or encounter any issues with the mobile application's functionality, please reach out to Zakariya at 58953981 or Suhail at 59039047.",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16, color: Colors.black87),
              ),
              const SizedBox(height: 20),
              ElevatedButton.icon(
                onPressed: () => Navigator.pop(context),
                icon: const Icon(Icons.close, color: Colors.white),
                label: const Text(
                  "Close",
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blueAccent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
                ),
              ),
              const SizedBox(height: 10),
            ],
          ),
        );
      },
    );
  }

  void _showDataModal(BuildContext context) {
    Map<String, dynamic> localData = Map.from(data[0]);

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      backgroundColor: Colors.white,
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(height: 10),
                  Text(
                    "${localData['companyName']}",
                    style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 20),

                  CheckboxListTile(
                    title: const Text("Company is Present?"),
                    value: localData['isPresent'],
                    onChanged: (bool? value) {
                      setState(() {
                        localData['isPresent'] = value!;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text("Company has Received water?"),
                    value: localData['hasReceivedWater'],
                    onChanged: (bool? value) {
                      setState(() {
                        localData['hasReceivedWater'] = value!;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text("Company has received lunch?"),
                    value: localData['hasReceivedLunch'],
                    onChanged: (bool? value) {
                      setState(() {
                        localData['hasReceivedLunch'] = value!;
                      });
                    },
                  ),
                  const SizedBox(height: 20),

                  ElevatedButton.icon(
                    onPressed: () {
                      setState(() {
                        data[0] = Map.from(localData);
                      });

                      print("Company Name: ${localData['companyName']}");
                      print("Is Present: ${localData['isPresent']}");
                      print("Has Received Water: ${localData['hasReceivedWater']}");
                      print("Has Received Lunch: ${localData['hasReceivedLunch']}");

                      Navigator.pop(context);
                    },
                    icon: const Icon(Icons.check, color: Colors.white),
                    label: const Text(
                      "Confirm",
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blueAccent,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }
}