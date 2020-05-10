#define PADDLE_MIN 0x0
#define PADDLE_MAX 0xff
#define PADDLE_DEFAULT 127


class XPaddle {
    private:
        int paddlePos = 127;

    public:
        XPaddle();
        void moveRel(int relMovement);
};
