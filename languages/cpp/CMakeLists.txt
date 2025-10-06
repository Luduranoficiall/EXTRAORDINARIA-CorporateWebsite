cmake_minimum_required(VERSION 3.10)
project(hello_cpp VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(hello_cpp src/main.cpp)

add_executable(stats stats.cpp)

option(BUILD_TESTS "Build tests and run sample data" ON)
if(BUILD_TESTS)
	add_custom_target(run_stats
		COMMAND ${CMAKE_COMMAND} -E echo "Running stats with sample data"
		COMMAND stats ${CMAKE_SOURCE_DIR}/test_data.csv
		DEPENDS stats
	)
endif()
