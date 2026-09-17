@echo off
echo ===================================================
echo [Quantum Portfolio] Building Production Bundle...
echo ===================================================

call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed with error code %ERRORLEVEL%
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ===================================================
echo [SUCCESS] Production build complete in ./dist directory!
echo ===================================================
echo.
pause
