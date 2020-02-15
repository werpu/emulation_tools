//#include "SerialStream.h"
/**
 * serial stream class which handles the gritty
 * fifo buffered details of our joystick stream
 */
SerialStream::SerialStream() {
  this->pos = 0;
  this->startSeq = 0;
  this->sequenceProcessing = false;
}

/**
 * check if we are in a mode for waiting for the next 255 255
 * combination, in this case all data is dropped
 */
boolean SerialStream::isInRecovery(byte currByte) {
  boolean ret = (currByte != INPUT_START && !this->sequenceProcessing);
  if (ret)
    this->startSeq = 0;
  return ret;
}

/**
 * determine in the stream if we have a start sequence
 * a start sequence usually is two 255 bytes in series,
 * a combination which can never happen with a joystick signal stream
 */
boolean SerialStream::isStartSequence(byte currByte) {
  // handle new beginning

  if (currByte == INPUT_START && this->startSeq == 0 &&
      !this->sequenceProcessing) {
    this->startSeq++;
    return true;
  }

  if (currByte == INPUT_START && this->startSeq == 1 &&
      !this->sequenceProcessing) {
    this->sequenceProcessing = true;
    this->pos = 0;
    return true;
  }

  this->startSeq = 0;
  return false;
}

/**
 * resets all buffers to a pristine state
 * which then waits for the next proper signal
 */
void SerialStream::resetBuffers() {
  this->pos = 0;
  this->sequenceProcessing = false;
}

void SerialStream::processData(void process(byte *)) {

  // TODO there might be a better way
  // via read until (read until the buffer is full or a stopbyte is reached
  // dropping the stopbyte)
  while (Serial1.available() > 0) {

    byte currByte = Serial1.read();

    //  idea... we start every input sequence with two <INPUT_START> bytes
    //  which are then followed by 4 data bytes with the input data to process
    //  now if something goes wrong we can recover
    //  by just waiting for the next <INPUT_START> <INPUT_START> sequence

    //  we are either in a recovery state or in a start sequence state
    //  we drop this byte and hope for the next to work out
    if (this->isInRecovery(currByte) || this->isStartSequence(currByte)) {
      break;
    }

    this->input[this->pos] = currByte;
    this->pos++;
    if (this->pos >= 6) { // 6 bytes of data read lets process
      if (this->sequenceProcessing) {
        this->resetBuffers();
        process(this->input);
      } else {
        this->resetBuffers();
      }
    }
  }
}
