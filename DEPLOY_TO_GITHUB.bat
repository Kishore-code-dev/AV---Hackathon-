@echo off
TITLE Agentic AI Platform - Deployment Sequence
COLOR 0E

echo ========================================================
echo   GROQ AGENTIC AI PLATFORM - DEPLOYMENT ASSISTANT
echo ========================================================
echo.
echo This script will help you push your code to GitHub.
echo.

:: Check for Git
git --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/downloads
    pause
    exit /b
)

echo [1/5] Initializing Git Repository...
if not exist .git (
    git init
) else (
    echo Git already initialized.
)

echo.
echo [2/5] Staging all files...
git add .

echo.
echo [3/5] Committing changes...
git commit -m "Deploy Premium Agentic Platform v1.0"

echo.
echo [4/5] Configure Remote Repository
echo.
echo Please create a NEW repository on GitHub (https://github.com/new)
echo and copy the HTTPS URL (e.g., https://github.com/username/repo.git).
echo.
set /p REPO_URL="Paste your GitHub Repository URL here: "

if "%REPO_URL%"=="" (
    echo No URL provided. Exiting.
    pause
    exit /b
)

git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main

echo.
echo [5/5] Pushing to GitHub...
echo (You may be asked to sign in via the browser)
echo.
git push -u origin main

echo.
echo ========================================================
echo   DEPLOYMENT SUCCESSFUL!
echo ========================================================
echo.
echo Now go to Vercel.com and import this repository.
pause
