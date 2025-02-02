import 'package:flutter/material.dart';
import 'package:qr_code_scanner_plus/qr_code_scanner_plus.dart'; // Import the QR scanner package

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  QRViewController? controller;
  final GlobalKey qrKey = GlobalKey(); // QR Scanner Key

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
            const Text(
              "Scan the company's QR Code to record attendance, water, and lunch distribution",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
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
                  "assets/images/qr.jpg", 
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(height: 30),
            SizedBox(
              width: screenWidth * 0.8,
              height: 55,
              child: ElevatedButton(
                onPressed: () => _openQRScanner(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF2377D2),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: const Text(
                  "Scan QR Code",
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
            ),
            const SizedBox(height: 30),
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

 
  void _openQRScanner(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      backgroundColor: Colors.white,
      builder: (context) {
        final screenHeight = MediaQuery.of(context).size.height;
        final screenWidth = MediaQuery.of(context).size.width;

        return SizedBox(
          height: screenHeight * 0.85,
          width: double.infinity,
          child: Column(
            children: [
              const SizedBox(height: 10),
           
              const SizedBox(height: 10),
              Expanded(
                child: Container(
                  width: screenWidth * 0.95,
               
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(15),
                    child: QRView(
                      key: qrKey,
                      onQRViewCreated: _onQRViewCreated,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton.icon(
                onPressed: () => Navigator.pop(context), 
                label: const Text(
                  "Return to Home",
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color:Colors.white),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blueAccent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
                ),
              ),
              const SizedBox(height: 20),
            ],
          ),
        );
      },
    );
  }

 
void _onQRViewCreated(QRViewController controller) {
  this.controller = controller;
  controller.scannedDataStream.listen((scanData) {
    Navigator.pop(context); // Close the scanner modal
    
    Map<String, dynamic> scanDataMap = {
      'companyName': scanData.code, 
      'isPresent': true, // 
      'hasReceivedWater': false, 
      'hasReceivedLunch': false, 
    };

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
                    "${scanDataMap['companyName']}",
                    style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 20),

                  CheckboxListTile(
                    title: const Text("Company is Present?"),
                    value: scanDataMap['isPresent'],
                    onChanged: (bool? value) {
                      setState(() {
                        scanDataMap['isPresent'] = value!;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text("Company has Received water?"),
                    value: scanDataMap['hasReceivedWater'],
                    onChanged: (bool? value) {
                      setState(() {
                        scanDataMap['hasReceivedWater'] = value!;
                      });
                    },
                  ),
                  CheckboxListTile(
                    title: const Text("Company has received lunch?"),
                    value: scanDataMap['hasReceivedLunch'],
                    onChanged: (bool? value) {
                      setState(() {
                        scanDataMap['hasReceivedLunch'] = value!;
                      });
                    },
                  ),
                  const SizedBox(height: 20),

                  ElevatedButton.icon(
                    onPressed: () {
                      print("Company Name: ${scanDataMap['companyName']}");
                      print("Is Present: ${scanDataMap['isPresent']}");
                      print("Has Received Water: ${scanDataMap['hasReceivedWater']}");
                      print("Has Received Lunch: ${scanDataMap['hasReceivedLunch']}");

                      Navigator.pop(context); // Close the modal
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
  });
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
                "If you need help, please contact Zakariya at 58953981 or Suhail at 59039047.",
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

  @override
  void dispose() {
    controller?.dispose();
    super.dispose();
  }
}
