#!/usr/bin/env python

# NOTE: The sensitivity can be adjusted by the onboard potentiometer

import time
import grovepi
import requests
import subprocess

# Connect the Grove Piezo Vibration Sensor to analog port A0
# OUT,NC,VCC,GND
piezo = 100#0 #commented out due to issues
light_sensor = 1
button = 3

STEP = 0.25 # time step
HIGH = 1000 # high signal
THRESHHOLD = 10 #threshhold resistance

grovepi.pinMode(piezo,"INPUT")
grovepi.pinMode(light_sensor,"INPUT")
grovepi.pinMode(button,"INPUT")

while True:
    try:
        #
        #Reset Button (reset sent to server)
        #
        if grovepi.digitalRead(button) == 1:
            print ("RESET (BUTTON)")
            r = requests.post("http://localhost:8080/reset",data={})
            print r.text
            file1 = open('files/file1', 'w+')
            file2 = open('files/file2', 'w+')
            file3 = open('files/file3', 'w+')

        #
        #Light Sensor
        #
        
        # Get sensor value
        sensor_value = grovepi.analogRead(light_sensor)
        # Calculate resistance of sensor in K
        resistance = (float)(1023 - sensor_value) * 10 / sensor_value

        if resistance > THRESHHOLD:
            print ("DEADMAN (LIGHT)")
            r = requests.post("http://localhost:8080/kill",data={})
            print r.text

        #
        #Vibration Sensor
        #
        
        # When vibration is detected, the sensor outputs a logic high signal
        last = grovepi.analogRead(piezo)
        time.sleep(STEP)
        current = grovepi.analogRead(piezo)
        #print last , current
        if last > HIGH and current > HIGH:
            print ("DEADMAN (VIBRATION)")
            r = requests.post("http://localhost:8080/kill",data={})
            print r.text

    except IOError:
        print ("IOError")
