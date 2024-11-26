#include <stdio.h>

// 定义一个函数类型
typedef void (*InnerFunction)();

// 外部函数，返回一个函数指针
InnerFunction outerFunction() {
    // 局部变量
    auto int localVar = 10;

    // 内部函数
    void innerFunction() {
        printf("Local variable value: %d\n", localVar);
    }

    // 返回内部函数的指针
    return innerFunction;
}

int main() {
    // 调用外部函数，获取内部函数的指针
    InnerFunction func = outerFunction();

    // 调用内部函数
    func();

    return 0;
}