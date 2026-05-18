@echo off
echo ================================
echo   人生 K 线 - 打包工具
echo ================================
echo.

REM 检查 Node.js 是否安装
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未检测到 Node.js
    echo.
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo 请选择要打包的平台:
echo 1. Windows
echo 2. macOS
echo 3. Linux
echo 4. 全部平台
echo.
set /p choice=请输入选项 (1-4): 

if "%choice%"=="1" (
    echo.
    echo [信息] 开始打包 Windows 版本...
    call npm run build:win
    goto :end
)

if "%choice%"=="2" (
    echo.
    echo [信息] 开始打包 macOS 版本...
    call npm run build:mac
    goto :end
)

if "%choice%"=="3" (
    echo.
    echo [信息] 开始打包 Linux 版本...
    call npm run build:linux
    goto :end
)

if "%choice%"=="4" (
    echo.
    echo [信息] 开始打包全部平台...
    call npm run build
    goto :end
)

echo [错误] 无效的选项
pause
exit /b 1

:end
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================
    echo   打包完成！
    echo ================================
    echo.
    echo 可执行文件在 dist 目录中
    echo.
    pause
)
