
adb disconnect 192.168.50.25:5555
adb disconnect 192.168.50.49:5555
adb disconnect 192.168.50.63:5555
adb disconnect 192.168.50.61:5555
adb connect 192.168.50.25:5555
adb connect 192.168.50.49:5555
adb connect 192.168.50.63:5555
adb connect 192.168.50.61:5555
adb -s 192.168.50.25:5555 shell wm overscan 0,0,0,0
adb -s 192.168.50.49:5555 shell wm overscan 0,0,0,0
adb -s 192.168.50.63:5555 shell wm overscan 0,0,0,0
adb -s 192.168.50.61:5555 shell wm overscan 0,0,0,0
adb -s192.168.50.25:5555 wait-for-device shell am force-stop com.kcpadselfordering.app
adb -s192.168.50.49:5555 wait-for-device shell am force-stop com.kcpadselfordering.app
adb -s192.168.50.63:5555 wait-for-device shell am force-stop com.kcpadselfordering.app
adb -s192.168.50.61:5555 wait-for-device shell am force-stop com.kcpadselfordering.app
adb -s 192.168.50.25:5555 shell wm overscan -72,0,-51,0
adb -s 192.168.50.49:5555 shell wm overscan -72,0,-51,0
adb -s 192.168.50.63:5555 shell wm overscan -72,0,-51,0
adb -s 192.168.50.61:5555 shell wm overscan -72,0,-51,0
adb -s 192.168.50.25:5555 shell am start -n com.kcpadselfordering.app/.MainActivity
adb -s 192.168.50.49:5555 shell am start -n com.kcpadselfordering.app/.MainActivity
adb -s 192.168.50.63:5555 shell am start -n com.kcpadselfordering.app/.MainActivity
adb -s 192.168.50.61:5555 shell am start -n com.kcpadselfordering.app/.MainActivity
adb disconnect 192.168.50.25:5555
adb disconnect 192.168.50.49:5555
adb disconnect 192.168.50.63:5555
adb disconnect 192.168.50.61:5555

