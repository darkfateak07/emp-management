@echo off
REM Start Backend
start cmd /k "cd /d d:\abhinav\AK\projects\entires\backend && npm start"

REM Wait 3 seconds
timeout /t 3

REM Start Frontend
start cmd /k "cd /d d:\abhinav\AK\projects\entires\frontend && python -m http.server 8000"

REM Wait 2 seconds
timeout /t 2

REM Open Browser
start http://localhost:8000

echo.
echo All services started!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:8000
echo.
