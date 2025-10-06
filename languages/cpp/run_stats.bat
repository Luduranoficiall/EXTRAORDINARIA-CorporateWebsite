@echo off
echo Running stats.exe on test_data.csv
if exist stats.exe (
  stats.exe test_data.csv
) else (
  echo Build the project using CMake and run the executable.
)
pause
