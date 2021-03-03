
adb disconnect 192.168.50.25:5555
adb disconnect 192.168.50.49:5555
adb disconnect 192.168.50.63:5555
adb disconnect 192.168.50.61:5555
adb connect 192.168.50.25:5555
adb connect 192.168.50.49:5555
adb connect 192.168.50.63:5555
adb connect 192.168.50.61:5555
start adb -s 192.168.50.25:5555 shell reboot

start adb -s 192.168.50.49:5555 shell reboot

start adb -s 192.168.50.63:5555 shell reboot

start adb -s 192.168.50.61:5555 shell reboot

timeout /t 2
taskkill /im adb.exe

adb disconnect 192.168.50.25:5555
adb disconnect 192.168.50.49:5555
adb disconnect 192.168.50.63:5555
adb disconnect 192.168.50.61:5555

