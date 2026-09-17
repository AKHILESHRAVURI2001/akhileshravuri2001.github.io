@echo off
echo ===================================================
echo [Quantum Portfolio] Deploying to GitHub Pages...
echo ===================================================

echo [1/3] Building production bundle...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed. Deployment aborted.
    pause
    exit /b %ERRORLEVEL%
)

echo [2/3] Staging git changes...
git add .

echo [3/3] Committing and pushing to main...
set /p commitMsg="Enter commit message (or press enter for default): "
if "%commitMsg%"=="" set commitMsg=feat: update quantum portfolio

git commit -m "%commitMsg%"
git push origin main

echo.
echo ===================================================
echo [SUCCESS] Pushed to GitHub! 
echo GitHub Actions is now publishing to https://akhileshravuri2001.github.io
echo ===================================================
echo.
pause
