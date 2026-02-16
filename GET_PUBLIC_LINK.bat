@echo off
TITLE Groq Platform - Public Link Generator
COLOR 0B

echo ========================================================
echo   GROQ AGENTIC AI PLATFORM - PUBLIC ACCESS LINK
echo ========================================================
echo.
echo This script creates a temporary public URL for your local server.
echo Share this link with anyone to demo your hackathon project.
echo.
echo [NOTE]
echo 1. Keep this window OPEN. Closing it kills the link.
echo 2. If it asks "Are you sure you want to continue connecting", type "yes".
echo 3. The URL will appear below (look for https://....).
echo.

:: Check if server is running
netstat -ano | findstr :3000 >nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Port 3000 seems closed. Starting server in new window...
    start "Groq Server" npm run dev
    timeout /t 10
)

echo Establishing secure tunnel via Pinggy.io...
echo.
ssh -o StrictHostKeyChecking=no -p 443 -R0:localhost:3000 a.pinggy.io

echo.
echo If Pinggy failed or closed, press any key to try alternative method (Localtunnel).
pause
cls
echo Trying fallback method: Localtunnel...
call npx localtunnel --port 3000

pause
