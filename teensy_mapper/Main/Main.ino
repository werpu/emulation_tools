#include "Joydefs.h"
#include "SerialStream.h"

SerialStream *strm;
int led = 13;
// the setup routine runs once when you press reset:
void setup() {

  pinMode(INTERNAL_LED, OUTPUT);
  Serial1.begin(57600);
  Serial.begin(9600);
  Joystick.useManualSend(true);
  Joystick.hat(-1);

  strm = new SerialStream();
}

void loop() { strm->processData(handleInput); }
