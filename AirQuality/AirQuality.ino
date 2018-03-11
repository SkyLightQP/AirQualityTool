#include <Adafruit_Sensor.h>

#include <DHT.h>
#include <DHT_U.h>

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

#define DHTPIN 5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

String token = "token";
int ms = 10000;
String url = "http://localhost:3000";

HTTPClient http;

void setup() {
  Serial.begin(115200);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(WiFi.SSID());
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  dht.begin();
}

void loop(){
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  http.begin(url + "/arduino/" + (String)t + "/" + (String)h + "/" + token);
  int httpCode = http.GET();  
  if (httpCode > 0) {
     String payload = http.getString();
     Serial.println("Requested! " + payload);
  }
  delay(ms);
}
