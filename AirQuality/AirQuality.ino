/* 
 *  아두이노 공기 측정 및 시각화(AirQualityTool)
 *  SkyLightQP(하늘빛QP).
 *  
 *  참고 코드
 *  [ 먼지 센서 측정 값 -> ug/m^3 ]
 *  http://wiki.seeedstudio.com/Grove-Dust_Sensor/
 *  https://blog.naver.com/issugroup/221004961500 
 */
 
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

#define DHTPIN 5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

#define DUSTPIN 15

// delay (ms, 1000ms = 1s)
#define REQUEST_DELAY 300000
#define SAMPLETIME_DELAY 5000

String token = "token"; 
String host = "localhost";
String port = "3000";

unsigned long duration;
unsigned long starttime;
unsigned long lowpulseoccupancy = 0;
float ratio = 0;
float concentration = 0;
float pcsPerCF = 0;
float ugm3 = 0;

void setup() {
  Serial.begin(115200);
  pinMode(DUSTPIN,INPUT);
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
  delay(5000);
}

void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  getDustValue();

  if(ugm3 > 0.01) {
    HTTPClient http;
    Serial.print("Request Ready...");
    http.begin("http://" + (String)host + ":" + (String)port + "/arduino/" + (String)t + "/" + (String)h + "/" + (String)ugm3 + "/" + (String)token);
    int httpCode = http.GET();
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println("Requested! " + payload);
    } else { 
      Serial.println("Request error!"); 
    }
    http.end();
  } else { 
    Serial.println("DustSensor doesn't ready.");
  }
  
  delay(REQUEST_DELAY);
}

void getDustValue(){
  duration = pulseIn(DUSTPIN, LOW); 
  lowpulseoccupancy = lowpulseoccupancy+duration;

  if ((millis()-starttime) >= SAMPLETIME_DELAY)  {
    ratio = lowpulseoccupancy/(SAMPLETIME_DELAY*10.0);
    concentration = 1.1*pow(ratio,3)-3.8*pow(ratio,2)+520*ratio+0.62;
    pcsPerCF = concentration * 100;
    ugm3 = pcsPerCF / 13000;
    if (ugm3 > 0.01) {
      lowpulseoccupancy = 0;
      starttime = millis();    
    }
  }
}

