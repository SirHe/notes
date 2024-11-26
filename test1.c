#include <stdio.h>

int *outerFunction()
{
    int localVar = 10;
    return &localVar;
}

int main()
{
    int *p = outerFunction();

    printf("Local variable value: %d\n", *p);

    return 0;
}