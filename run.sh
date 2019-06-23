rm -rf temp && mkdir temp
rm -rf build && mkdir build
./step1.sh
node step2.js
./step3.sh
