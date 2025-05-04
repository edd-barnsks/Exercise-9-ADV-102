import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StopWatchScreen = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
      let timer;
      if (isRunning) {
        timer = setInterval(() => {
          setTime((prevTime) => prevTime + 1);
        }, 1000);
      } else {
        clearInterval(timer);
      }
  
      return () => clearInterval(timer);
    }, [isRunning]);
  
    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
      setTime(0);
      setIsRunning(false);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Stopwatch</Text>
        <Text style={styles.time}>{time} s</Text>

        <TouchableOpacity style={styles.button} onPress={handleStart} disabled={isRunning}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={handleStop} disabled={!isRunning}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Root')}>
          <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>

      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  time: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  stopButton: {
    backgroundColor: "red",
  },
  resetButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    padding: 10,
  },
  backText: {
    color: "blue",
    fontSize: 16,
  },
});

export default StopWatchScreen;  