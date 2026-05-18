@echo off
echo ================================
echo   人生 K 线 - Electron 桌面版
echo ================================
echo.

REM 检查 Node.js 是否安装
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未检测到 Node.js
    echo.
    echo 请先安装 Node.js: https://nodejs.org/
    echo 建议安装 LTS 版本
    echo.
    pause
    exit /b 1
)

echo [信息] Node.js 已安装
echo.

REM 检查 node_modules 是否存在
if not exist "node_modules" (
    echo [信息] 首次运行，正在安装依赖...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [错误] 依赖安装失败
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [成功] 依赖安装完成
    echo.
)

echo [信息] 启动应用...
echo.
call npm start

pause
