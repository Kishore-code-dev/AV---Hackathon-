@echo off
TITLE Agentic AI Platform - Direct Cloud Deployment
COLOR 0A

echo ========================================================
echo   GROQ AGENTIC AI PLATFORM - INSTANT DEPLOYMENT
echo ========================================================
echo.
echo Since Git is not detected, we will deploy directly to the cloud.
echo.
echo [INSTRUCTIONS]
echo 1. The browser will open to log in to Vercel.
echo 2. Come back here and press ENTER to confirm defaults.
echo 3. Wait for the 'Production' link.
echo.
echo Initializing upload sequence...
echo.

call npm run deploy

echo.
echo ========================================================
echo   DEPLOYMENT COMPLETE
echo ========================================================
pause
