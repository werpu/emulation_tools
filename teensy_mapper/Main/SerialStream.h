#include "Joydefs.h"
#include "SPI.h"

/**
 * serial stream class which handles the gritty
 * fifo buffered details of our joystick stream
 */

class SerialStream {

private:
  int pos = 0;
  int startSeq = 0;
  boolean sequenceProcessing;
  byte input[10];

  boolean isStartSequence(byte currByte);
  boolean isInRecovery(byte currByte);
  void resetBuffers();

public:
  SerialStream();
  void processData(void process(byte[]));
};
