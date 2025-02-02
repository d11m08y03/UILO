import 'dart:convert';

import 'package:eoy_frontend/environment.dart';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner_plus/qr_code_scanner_plus.dart'; // Import the QR scanner package
import 'package:http/http.dart' as http;

class Home extends StatefulWidget {
  const Home({super.key});
  final String postUrl = "";
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
              label: const Text("Need Help?",
                  style: TextStyle(color: Colors.blue)),
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
                child: SizedBox(
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
                  style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blueAccent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding:
                      const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
                ),
              ),
              const SizedBox(height: 20),
            ],
          ),
        );
      },
    );
  }

	void _markCompanyFieldAsPresent(String key, String companyID) async {
    String apiUrl =
        '${Environment.serverUrl}${Environment.port}/api/$key/$companyID';

    try {
      final _ = await http.get(Uri.parse(apiUrl));
    } catch (e) {
      print(e.toString());
    }
	}

  Future<Map<String, String>> _getCompanyInfo(String companyID) async {
    String apiUrl =
        '${Environment.serverUrl}${Environment.port}/api/company/$companyID';

    Map<String, String> allah = {
      'companyName': "",
      'isPresent': "",
      'hasReceivedWater': "",
      'hasReceivedLunch': "",
    };

    try {
      final response = await http.get(Uri.parse(apiUrl));

      if (response.statusCode == 200) {
        final jsonResponse = jsonDecode(response.body);

        allah["companyName"] = jsonResponse['name'].toString();
        allah["isPresent"] = jsonResponse['present'].toString();
        allah["hasReceivedWater"] = jsonResponse['water'].toString();
        allah["hasReceivedLunch"] = jsonResponse['food'].toString();
      }
    } catch (e) {
      print(e.toString());
    }

    return allah;
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) async {
      Navigator.pop(context); // Close the scanner modal

      // Fetch company info
      Map<String, String> trust = await _getCompanyInfo(scanData.code ?? "");

      Map<String, dynamic> scanDataMap = {
        'companyName': trust["companyName"],
        'isPresent': trust["isPresent"] == "true" ? true : false,
        'hasReceivedWater': trust["hasReceivedWater"] == "true" ? true : false,
        'hasReceivedLunch': trust["hasReceivedLunch"] == "true" ? true : false,
      };

      // Delay the bottom sheet to ensure everything is settled before showing it
      Future.delayed(const Duration(milliseconds: 200), () {
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
                        style: const TextStyle(
                            fontSize: 25, fontWeight: FontWeight.w600),
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
                        title:
                            const Text("Company has received lunch voucher?"),
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
													if (scanDataMap['isPresent']) {
														_markCompanyFieldAsPresent("present", scanData.code ?? "");
													}

													if (scanDataMap['hasReceivedWater']) {
														_markCompanyFieldAsPresent("water", scanData.code ?? "");
													}

													if (scanDataMap['hasReceivedLunch']) {
														_markCompanyFieldAsPresent("food", scanData.code ?? "");
													}

                          Navigator.pop(context); // Close the modal
                        },
                        icon: const Icon(Icons.check, color: Colors.white),
                        label: const Text(
                          "Confirm",
                          style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.white),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blueAccent,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          padding: const EdgeInsets.symmetric(
                              vertical: 12, horizontal: 20),
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
                  style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.white),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blueAccent,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding:
                      const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
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
