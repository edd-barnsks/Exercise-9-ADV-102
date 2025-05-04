import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import HTMLView from 'react-native-htmlview';

const exercises = [
  {
    title: 'Exercise 3',
    description: `
      <p><strong>This Leads to a Login Page</strong></p>
      <ul>
        <li>Click Here!!!</li>
        <li>Deffinitely not a phishing page</li>
      </ul>
    `,
  },
  {
    title: 'Exercise 4',
    description: `
      <p><strong>Stop Watch</strong></p>
      <ul>
        <li>It's a stopwatch nothing more nothing less</li>
      </ul>
    `,
  },
  {
    title: 'Exercise 5',
    description: `
      <p><strong>Register Screen</strong></p>
      <ul>
        <li>Just and Ordinary Register screen nothing to see here move allong</li>
      </ul>
    `,
  },
  {
    title: 'Exercise 7',
    description: `
      <p><strong>Quiz Screen here!</strong></p>
      <ul>
        <li>Come! Take a quiz see how smart you really are.</li>
      </ul>
    `,
  },
];

const ExerciseScreen = ({ navigation }) => { 
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {exercises.map((exercise, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => {
            if (exercise.title === 'Exercise 3') {  
              navigation.navigate('Login');
            }
            else if (exercise.title === 'Exercise 4') {
              navigation.navigate('Stopwatch');
            }
            else if (exercise.title === 'Exercise 5') {
              navigation.navigate('Register');
            }
            else if (exercise.title === 'Exercise 7') {
              navigation.navigate('Quiz');
            }
            
          }}
        >
          <Text style={styles.title}>{exercise.title}</Text>
          <HTMLView value={exercise.description} stylesheet={htmlStyles} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: '#808080',
    padding: 0.5,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    borderWidth: 0.5,
    borderColor: '#000000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 0.5,
  },
});

const htmlStyles = {
  p: {
    marginTop: 0,
    marginBottom: 2,
    fontSize: 14,
  },
  ul: {
    marginTop: -30,
    marginBottom: 4,
    paddingLeft: 10,
  },
  li: {
    fontSize: 14,
    lineHeight: 16,
  },
};

export default ExerciseScreen;
