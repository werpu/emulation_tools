

XPaddle::XPaddle(){}

void XPaddle::moveRel(int relMovement) {
    this->paddlePos = this->paddlePos + relMovement;
    if(this->paddlePos < PADDLE_MIN) {
        this->paddlePos =  PADDLE_MIN;
    }
    if(this->paddlePos > PADDLE_MAX) {
        this->paddlePos = PADDLE_MAX;
    }
}
