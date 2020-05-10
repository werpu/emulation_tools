

// the hid seems to expect different angle
// values with x and y reverted
// according to the jstest, need to investigate
// why, but using y on the x angle signals works
// and vice versa

int oldXAngle = -1;
int oldYAngle = -1;

XPaddle* paddle1 = new XPaddle();




int handleCornerConditions(int defaultVal) {
   if(oldYAngle == 0 && oldXAngle == 90) {
    return 45;
  }      
      
  if(oldYAngle == 0 && oldXAngle == 270) {
    return 315;
  }      
      
  if(oldYAngle == 180 && oldXAngle == 90) {
    return 135;
  }      
      
  if(oldYAngle == 180 && oldXAngle == 270) {
    return 225;
  }      
  
  return oldYAngle != -1 ? oldYAngle : (oldXAngle != -1 ? oldXAngle : defaultVal);
}


int xHatValueToAngle(int value) {
  oldXAngle = value == -1 ? 270 : (value == 0 ? -1 : 90);

  return handleCornerConditions(oldXAngle);
}

int yHatValueToAngle(int value) {

  oldYAngle = value == -1 ? 0 : (value == 0 ? -1 : 180);

  return handleCornerConditions(oldYAngle);
}



void noop() {
  
}
/*
 * Joystick signal transformation
 */
boolean handleJoySignals(int ev_type, int value) {
  (value == 1 || value == -1) && ev_type != SYN ? digitalWrite(led, HIGH) : 
    ((value == 0 && ev_type != SYN) ? digitalWrite(led, LOW) : noop());
  switch (ev_type) {
    case HAT_0Y:
      Joystick.hat(yHatValueToAngle(value));
      return true;
  
    case HAT_0X:
      Joystick.hat(xHatValueToAngle(value));
      return true;
  
    case BTN_SOUTH:
      Joystick.button(2, value);
      return true;
  
    case BTN_EAST:
      Joystick.button(3, value);
      return true;
  
    case BTN_WEST:
      Joystick.button(1, value);
      return true;
  
    case BTN_NORTH:
      Joystick.button(4, value);
      return true;
  
    case BTN_TL:
      Joystick.button(5, value);
      return true;
  
    case BTN_TR:
      Joystick.button(6, value);
      return true;
  
    case BTN_THUMBL:
      Joystick.button(11, value);
      return true;
  
    case BTN_THUMBR:
      Joystick.button(12, value);
      return true;
  
    case BTN_TL2:
      Joystick.button(7, value);
      return true;
  
    case BTN_TR2:
      Joystick.button(8, value);
      return true;
  
    case BTN_SELECT:
      Joystick.button(9, value);
      return true;
  
    case BTN_START:
      Joystick.button(10, value);
      return true;
  
    case ABS_Y:
      Joystick.Y(value * 4);
      return true;
  
    case ABS_X:
      Joystick.X(value * 4);
      return true;
  
    case ABS_RY:
      Joystick.Z(value * 4);
      return true;
  
    case ABS_RX:
      Joystick.Zrotate(value * 4);
      return true;

    case SYN:
      Joystick.send_now();
      return true;
  }
  return false;
}
/**
* dual handling
* mouse and paddle signals are translated both into abs and rel values
* to cover both, spinners and pads (spinners are ev rel pads are ev abs with values between
* 0 and 255 with the middle being 127)
*/
boolean handleMouseSignals(int ev_type, int value) {
    switch(ev_type) {
      case REL_X:
        Mouse.move(value, 0);
        return true;
      case REL_Y:
        Mouse.move(0, value);
        return true;   
      case MOUSE_BTN_LEFT:
        if (value >= 1) {
          Mouse.press(MOUSE_LEFT); 
        } else {
          Mouse.release(MOUSE_LEFT);
        }  
        return true; 
      case MOUSE_BTN_MIDDLE:
        if (value >= 1) {
          Mouse.press(MOUSE_MIDDLE); 
        } else {
          Mouse.release(MOUSE_MIDDLE);
        }  
        return true; 
      case MOUSE_BTN_RIGHT:
        if (value >= 1) {
          Mouse.press(MOUSE_RIGHT); 
        } else {
          Mouse.release(MOUSE_RIGHT);
        }  
        return true; 
      //TODO other buttons
    
    }
    return false;
}

/**
 * central input output multiplexer
 * we simply check for valid inputs then move
 * the values in a proper combination into the attached
 * joystick
 */
void handleInput(byte input[]) {
  boolean isNegative = input[3] & 0x1;
  int value = (input[4] << 8) | input[5];
  if (isNegative)
    value = -1 * value;
  int ev_s_type = input[1] << 8 | input[2];
  int ev_type = input[0];

  if (ev_type != 2 && handleJoySignals(ev_s_type, value)) {
    return;
  } else if(handleMouseSignals(ev_s_type, value)) {
    return;  
  }
  // else part different devices like mouse etc...
}
