/*
    아두이노 공기 측정 및 시각화(AirQualityTool)
    SkyLightQP(하늘빛QP).

    참고 코드
    [ 먼지 센서 측정 값 -> ug/m^3 ]
    http://wiki.seeedstudio.com/Grove-Dust_Sensor/
    https://blog.naver.com/issugroup/221004961500
*/

#include "./config.h"
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

const int DHTPIN = 4; // D2
const int DUSTPIN = 5; // D1

DHT dht(DHTPIN, DHT11);

const int REQUEST_DELAY = 60000;
const int SAMPLETIME_DELAY = 5000;

const String token = TOKEN;
const String host = HOST;
const String port = PORT;

unsigned long duration;
unsigned long starttime;
unsigned long lowpulseoccupancy = 0;
float ratio = 0;
float concentration = 0;
float pcsPerCF = 0;
float ugm3 = 0;

void setup() {
  Serial.begin(115200);

  pinMode(DUSTPIN, INPUT);

  dht.begin();

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("WIFI SSID : ");
  Serial.println(WiFi.SSID());
  Serial.print("IP : ");
  Serial.println(WiFi.localIP());

  lowpulseoccupancy = 0;
  starttime = millis();
  delay(1000);
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("DHT sensor error!");
    delay(1000);
    return;
  }

  getDustValue();

  if (ugm3 >= 1) {
    HTTPClient http;

    Serial.println("Request Ready...");

    http.begin("http://" +
               host + ":" +
               port + "/graph/push/" +
               (String)temperature + "/" +
               (String)humidity + "/" +
               (String)ugm3);
    http.addHeader("X-AQT-Token", token);

    int httpCode = http.POST("");
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println("Requested! " + payload);
    } else {
      Serial.println("Request error!");
    }
    http.end();
  }

  delay(REQUEST_DELAY);
}

void getDustValue() {
  duration = pulseIn(DUSTPIN, LOW);
  lowpulseoccupancy = lowpulseoccupancy + duration;

  if ((millis() - starttime) >= SAMPLETIME_DELAY)  {
    ratio = lowpulseoccupancy / (SAMPLETIME_DELAY * 10.0);
    concentration = 1.1 * pow(ratio, 3) - 3.8 * pow(ratio, 2) + 520 * ratio + 0.62;
    pcsPerCF = concentration * 100;
    ugm3 = pcsPerCF / 13000;
    if (ugm3 >= 0.01) {
      lowpulseoccupancy = 0;
      starttime = millis();
    }
  } else {
    Serial.println("DustSensor doesn't ready.");
  }
}
