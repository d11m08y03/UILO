import 'dart:convert';
import 'dart:async';

import 'package:eoy_frontend/environment.dart';
import 'package:flutter/material.dart';
import 'package:qr_code_scanner_plus/qr_code_scanner_plus.dart';
import 'package:http/http.dart' as http;

// Simple global state manager
class AppState {
  static bool _isAnyModalOpen = false;
  static bool _isProcessing = false;
  
  static bool get isAnyModalOpen => _isAnyModalOpen;
  static bool get isProcessing => _isProcessing;
  
  static void setModalOpen(bool isOpen) {
    _isAnyModalOpen = isOpen;
    print("Modal state: $_isAnyModalOpen");
  }
  
  static void setProcessing(bool isProcessing) {
    _isProcessing = isProcessing;
    print("Processing state: $_isProcessing");
  }
  
  static void reset() {
    _isAnyModalOpen = false;
    _isProcessing = false;
    print("App state reset");
  }
}

class Home extends StatefulWidget {
  const Home({super.key});
  final String postUrl = "";
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  QRViewController? controller;
  StreamSubscription? _scanSubscription;
  bool _isScannerOpen = false;

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
              "Scan the company's QR Code to record attendance and water bottle distribution",
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
    // Prevent opening if any modal is open or scanner is already open
    if (AppState.isAnyModalOpen || _isScannerOpen) {
      print("Scanner blocked: modal=${AppState.isAnyModalOpen}, scanner=$_isScannerOpen");
      return;
    }
    
    _isScannerOpen = true;
    AppState.setModalOpen(true);

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
                      key: GlobalKey(),
                      onQRViewCreated: _onQRViewCreated,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton.icon(
                onPressed: () {
                  _cleanup();
                  Navigator.pop(context);
                },
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
    ).whenComplete(() {
      _cleanup();
    });
  }

  void _cleanup() {
    print("Cleaning up");
    _scanSubscription?.cancel();
    _scanSubscription = null;
    controller?.dispose();
    controller = null;
    _isScannerOpen = false;
    AppState.setModalOpen(false);
    AppState.setProcessing(false);
  }

  void _cleanupAfterConfirm() {
    print("Cleaning up after confirm");
    _scanSubscription?.cancel();
    _scanSubscription = null;
    controller?.dispose();
    controller = null;
    _isScannerOpen = false;
    AppState.setModalOpen(false);
    AppState.setProcessing(false);
    
    // Force garbage collection if possible
    Future.delayed(const Duration(milliseconds: 100), () {
      if (mounted) {
        setState(() {});
      }
    });
  }

  Future<void> _markCompanyFieldAsPresent(String key, String companyID) async {
    String apiUrl =
        '${Environment.serverUrl}${Environment.port}/api/$key/$companyID';

    try {
      final response = await http.get(Uri.parse(apiUrl));
      print("Marked $key for company $companyID: ${response.statusCode}");
    } catch (e) {
      print("Error marking $key for company $companyID: $e");
    }
  }

  Future<Map<String, String>> _getCompanyInfo(String companyID) async {
    String apiUrl =
        '${Environment.serverUrl}${Environment.port}/api/company/$companyID';

    Map<String, String> result = {
      'companyName': "",
      'isPresent': "",
      'hasReceivedWater': "",
    };

    try {
      final response = await http.get(Uri.parse(apiUrl));

      if (response.statusCode == 200) {
        final jsonResponse = jsonDecode(response.body);

        result["companyName"] = jsonResponse['name'].toString();
        result["isPresent"] = jsonResponse['present'].toString();
        result["hasReceivedWater"] = jsonResponse['water'].toString();
      }
    } catch (e) {
      print(e.toString());
    }

    return result;
  }

  void _onQRViewCreated(QRViewController controller) {
    print("QR View Created");
    this.controller = controller;
    
    // Cancel any existing subscription
    _scanSubscription?.cancel();
    
    _scanSubscription = controller.scannedDataStream.listen((scanData) async {
      print("QR Code detected: ${scanData.code}");
      
      // Prevent multiple processing
      if (AppState.isProcessing) {
        print("Already processing, ignoring scan");
        return;
      }
      
      // Set processing flag immediately
      AppState.setProcessing(true);
      
      // Cancel subscription immediately to prevent more scans
      await _scanSubscription?.cancel();
      _scanSubscription = null;
      
              try {
          // Stop scanner immediately
          await controller.pauseCamera();
        
        // Close scanner modal
        if (mounted) {
          Navigator.of(context).pop();
        }
        
        // Add delay to ensure modal is closed
        await Future.delayed(const Duration(milliseconds: 200));
        
        // Get company info
        Map<String, String> companyInfo = await _getCompanyInfo(scanData.code ?? "");
        
        Map<String, dynamic> scanDataMap = {
          'companyName': companyInfo["companyName"],
          'isPresent': companyInfo["isPresent"] == "true",
          'hasReceivedWater': companyInfo["hasReceivedWater"] == "true",
        };
        
        // Show result modal
        if (mounted && !AppState.isAnyModalOpen) {
          AppState.setModalOpen(true);
          await showModalBottomSheet(
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
                          title: const Text("Company has Received water bottle?"),
                          value: scanDataMap['hasReceivedWater'],
                          onChanged: (bool? value) {
                            setState(() {
                              scanDataMap['hasReceivedWater'] = value!;
                            });
                          },
                        ),
                        const SizedBox(height: 20),
                        ElevatedButton.icon(
                          onPressed: () async {
                            // Mark company fields as present
                            if (scanDataMap['isPresent']) {
                              await _markCompanyFieldAsPresent("present", scanData.code ?? "");
                            }
                            if (scanDataMap['hasReceivedWater']) {
                              await _markCompanyFieldAsPresent("water", scanData.code ?? "");
                            }
                            
                            // Clean up after confirm
                            _cleanupAfterConfirm();
                            Navigator.pop(context);
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
          ).whenComplete(() {
            print("Result modal closed, cleaning up");
            _cleanupAfterConfirm();
          });
        } else {
          // If modal couldn't be shown, reset state
          AppState.reset();
        }
        
              } catch (e) {
          print("Error processing QR scan: $e");
          _cleanupAfterConfirm();
        }
    });
  }

  void _showHelpModal(BuildContext context) {
    // Prevent opening if any modal is open
    if (AppState.isAnyModalOpen) {
      print("Help modal blocked: modal=${AppState.isAnyModalOpen}");
      return;
    }
    
    AppState.setModalOpen(true);
    
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
                onPressed: () {
                  _cleanupAfterConfirm();
                  Navigator.pop(context);
                },
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
    ).whenComplete(() {
      print("Help modal closed, cleaning up");
      _cleanupAfterConfirm();
    });
  }

  @override
  void dispose() {
    print("Widget disposing, cleaning up");
    _cleanup();
    super.dispose();
  }
}
