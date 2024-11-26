const fn = async () => {
    throw new Error('error')
}

try {
    fn()
} catch (error) {
    console.log('try catch error', error)
}

// class MyPromise {
//     constructor(executor) {
//         executor()
//     }
// }


try {
    new Promise((resolve, reject) => {
        throw new Error("error");
    }).catch((error) => {
        console.log("promise error", error);
    });
} catch (error) {
    console.log("try catch error", error);
}

// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         throw new Error("error");
//     })
// }).catch((error) => {
//     console.log("promise error", error);
// });

// process.on('uncaughtException', (err) => {
//     console.error('There was an uncaught error', err);
//     // 进行必要的清理工作后退出进程
//     process.exit(1);
// });
// process.on('unhandledRejection', (reason, promise) => {
//     console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//     // 进行必要的清理工作后退出进程
//     process.exit(1);
// });

// new Promise((resolve, reject) => {
//     a.b = 1
// }).catch((err) => {
//     console.log('err', err)
// })