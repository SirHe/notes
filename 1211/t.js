const { exec } = require('child_process');
const os = require('os');

const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    // 主线程
    console.log('主线程 PID:', process.pid);

    // 创建子线程
    const worker = new Worker(__filename, {
        workerData: { start: 1, end: 10 }
    });

    // 获取当前进程的 PID
    const pid = process.pid;

    // 使用 wmic 命令获取线程数量
    exec(`wmic process where ProcessId=${pid} get ThreadCount`, (err, stdout, stderr) => {

        if (err) {
            console.error(`执行命令时出错: ${err}`);
            return;
        }
        // 解析输出，获取线程数量
        const lines = stdout.trim().split('\n');
        const threadCount = lines[1].trim();
        console.log(`当前进程的线程数量: ${threadCount}`);
    });
    // 创建子进程并执行命令
    exec('node -e "console.log(process.pid, \'------\')"', (error, stdout, stderr) => {
        console.log('stdout:', process.pid);
        if (error) {
            console.error(`执行命令时出错: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });

} else {
    // 子线程
    console.log('子线程 PID:', process.pid);
}



setInterval(() => { }, 1000 * 10)