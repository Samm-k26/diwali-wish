@echo off
title Diwali Wish - GitHub Push
echo ================================================================
echo   Diwali Wish Greeting - Pushing all files to GitHub Pages
echo ================================================================
echo.
echo Target Repository: https://github.com/Samm-k26/diwali-wish.git
echo.
cd /d "C:\Users\Samyak Khobragade\.gemini\antigravity\scratch\diwali-wish"
git config http.postBuffer 524288000
git config http.version HTTP/1.1
git push -u origin main --force
echo.
if %ERRORLEVEL% EQU 0 (
    echo ================================================================
    echo   [SUCCESS] All files uploaded to GitHub successfully!
    echo.
    echo   Wait 1-2 minutes for GitHub Pages to refresh, then visit:
    echo   https://samm-k26.github.io/diwali-wish/
    echo ================================================================
) else (
    echo ================================================================
    echo   [FAILED] Push could not be completed.
    echo   If GitHub login window or browser opened, please authorize it.
    echo ================================================================
)
echo.
pause
