/*
    This sketch sends the GPS and DHT22 sensors to the backend service.
    REQUIRES the following Arduino libraries:
    - DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library
    - Adafruit Unified Sensor Lib: https://github.com/adafruit/Adafruit_Sensor
    - Troyka GPS Lib: https://github.com/amperka/TroykaGPS
    - ESP82666 Software Serial Lib: https://github.com/plerup/espsoftwareserial
    - ESP8266 WiFi: https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WiFi
    - ESP8266 HTTP Client: https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266HTTPClient
*/

// library for temperature and humidity module
#include "DHT.h"
// library for software serial
#include <SoftwareSerial.h>
// library for working with GPS device
#include <TroykaGPS.h>
// library for ESP8266 WiFi
#include <ESP8266WiFi.h>
// library for sending the HTTP requests
#include <ESP8266HTTPClient.h>

#define DHTPIN D2     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

DHT dht(DHTPIN, DHTTYPE);

#define POST_DATA_RETRY_TIMES 3

// create an object for working with software Serial and transfer the TX and RX pins to it
SoftwareSerial mySerial(D7, D8, false, 256);
// serial port to which the GPS module is connected
#define GPS_SERIAL    mySerial
// Create a GPS class object and pass the GPS_SERIAL object to it.
GPS gps(GPS_SERIAL);

// set the size of the array for time, date, latitude and longitude
#define MAX_SIZE_MASS 16
#define DEVICE_ID "9838866f-44b4-4b37-8b83-c1e09a456967"
#define BACKEND_URL "http://backend.odyssey.wavesplatform.com:8080/api/metrics"
#define STASSID "Odyssey Hackathon 2019"

const char* ssid     = STASSID;

void setup() {
  Serial.begin(9600);
   
  checkOrCreateWifiConnection();

  dht.begin();
  
  // оopen the Serial connection with the GPS module at the speed of 115200 baud
  GPS_SERIAL.begin(115200);
  Serial.println(F("GPS init is OK on speed 115200"));
  // use the NMEA command NMEA-команду «$PMTK251,9600*17\r\n» to change the speed of the GPS module serial port with the control board to 9600 baud
  GPS_SERIAL.write("$PMTK251,9600*17\r\n");
  // close the Serial-connection with the GPS module
  GPS_SERIAL.end();
  // open Serial connection with GPS module at 9600 baud
  GPS_SERIAL.begin(9600);
  Serial.println(F("GPS init is OK on speed 9600"));
}

void loop() {
  checkOrCreateWifiConnection();

  char timeBuf[MAX_SIZE_MASS];
  char dateBuf[MAX_SIZE_MASS];

  float latitudeBase10, longitudeBase10, speedKm, h, t;
  bool gpsResult = getGPSData(timeBuf, dateBuf, &latitudeBase10, &longitudeBase10, &speedKm);
 if (!gpsResult) {
    Serial.println(F("Failed to read from GPS sensor!"));
  } else {
        Serial.print(F("GPS Coordinates: "));
        Serial.print(F("\tLatitude\t"));
        Serial.print(latitudeBase10, 6);
        Serial.print(F("\tLongitude\t"));
        Serial.print(longitudeBase10, 6);
        Serial.print(F("\tSpeed: "));
        Serial.print(speedKm);
        Serial.print(F("\tTime: "));
        gps.getTime(timeBuf, MAX_SIZE_MASS);
        gps.getDate(dateBuf, MAX_SIZE_MASS);
        Serial.write(timeBuf);
        Serial.print(F("\tDate: "));
        Serial.write(dateBuf);
        Serial.print(F("\t"));
  }
  
  bool dhtResult = getDHTData(&h, &t);
  if (!dhtResult) {
    Serial.println(F("Failed to read from DHT sensor!"));
  } else {
    Serial.print(F("\tHumidity: "));
    Serial.print(h);
    Serial.print(F("%\tTemperature: "));
    Serial.print(t);
    Serial.println();
  }
  
  if (gpsResult && dhtResult) {
    char datetimeBuf[100];
    char stringfBuf[100];

    sprintf(datetimeBuf, "%s %s", dateBuf, timeBuf);
    sprintf(stringfBuf, "%f", latitudeBase10);
    sendMetricWithRetries("latitude", stringfBuf, datetimeBuf);
    sprintf(stringfBuf, "%f", longitudeBase10);
    sendMetricWithRetries("longitude", stringfBuf, datetimeBuf);
    sprintf(stringfBuf, "%f", speedKm);
    sendMetricWithRetries("speedKm", stringfBuf, datetimeBuf);
    sprintf(stringfBuf, "%f", h);
    sendMetricWithRetries("humidity", stringfBuf, datetimeBuf);
    sprintf(stringfBuf, "%f", t);
    sendMetricWithRetries("temperature", stringfBuf, datetimeBuf);
    Serial.println(F("Sleep 10s"));
    delay(10000);
  } else {
    Serial.println(F("Sleep 2s"));
    delay(2000);
  }
}

void checkOrCreateWifiConnection() {
  if (WiFi.status() != WL_CONNECTED) {
    // We start by connecting to a WiFi network
    Serial.println();
    Serial.println();
    Serial.print(F("Connecting to "));
    Serial.println(ssid);
    
    /* Explicitly set the ESP8266 to be a WiFi-client, otherwise, it by default,
     would try to act as both a client and an access-point and could cause
     network-issues with your other WiFi-devices on your WiFi-network. */
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, "");
  
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(F("."));
    }
  
    Serial.println(F(""));
    Serial.println(F("WiFi connected"));
    Serial.println(F("IP address: "));
    Serial.println(WiFi.localIP());
  }
}

bool getGPSData(char* time, char* date, float* latitudeBase10, float* longitudeBase10, float* speedKm) {
  if (gps.available()) {
    gps.readParsing();
    switch(gps.getState()) {
      case GPS_OK:
        *latitudeBase10 = gps.getLatitudeBase10();
        *longitudeBase10 = gps.getLongitudeBase10();
        *speedKm = gps.getSpeedKm();
        gps.getTime(time, MAX_SIZE_MASS);
        gps.getDate(date, MAX_SIZE_MASS);
        return true;
        break;
      case GPS_ERROR_DATA:
        Serial.println(F("GPS error data"));
        break;
      case GPS_ERROR_SAT:
        Serial.println(F("GPS no connect to satellites !!!"));
        break;
    }
  }
  return false;
}

void sendMetricWithRetries(char* type, char* value, char* datetime) {
  sendMetricWithRetries(type, value, datetime, 0);
}

void sendMetricWithRetries(char* type, char* value, char* datetime, int times) {
  checkOrCreateWifiConnection();
  Serial.printf("Send the request to send metric %s = %s at %s\n", type, value, datetime);
  bool result = sendMetric(type, value, datetime);
  if (!result) {
    if (times < POST_DATA_RETRY_TIMES) {
      Serial.printf("Retry the request to send metric %s = %s at %s\n", type, value, datetime);
      sendMetricWithRetries(type, value, datetime, times + 1);
    } else {
      Serial.printf("Failed to make the request to send metric %s = %s at %s\n", type, value, datetime);      
    }
  }
}

bool sendMetric(char* type, char* value, char* datetime) {
  HTTPClient http;
  http.begin(BACKEND_URL);
  http.addHeader(F("Content-Type"), F("application/x-www-form-urlencoded"));
  char paramsBuf[200];
  sprintf(paramsBuf, "type=%s&value=%s&deviceId=%s&createDate=%s", type, value, DEVICE_ID, datetime);
  int httpCode = http.POST(paramsBuf);
  http.end();
  Serial.println(httpCode);
  return httpCode == HTTP_CODE_OK;
}

bool getDHTData(float *h, float *t) {
  // Reading temperature or humidity takes about 250 milliseconds!
  // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
  *h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  *t = dht.readTemperature();
  
  // Check if any reads failed and exit early (to try again).
  if (isnan(*h) || isnan(*t)) {
    return false;
  }
  return true;
}
