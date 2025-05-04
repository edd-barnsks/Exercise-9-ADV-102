import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, ImageBackground } from 'react-native';

const QuizScreen = ({ navigation }) => {
    const [numQuestions, setNumQuestions] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);

    const fetchQuestions = async () => {
        if (numQuestions < 10 || numQuestions > 30) {
            alert("Please enter a number between 10 and 30.");
            return;
        }

        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&type=multiple`);
            const data = await response.json();
            if (data.results) {
                setQuestions(data.results);
                setCurrentQuestionIndex(0);
                setScore(0);
                setQuizStarted(true);
                setQuizFinished(false);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handleAnswer = (selectedAnswer) => {
        const correctAnswer = questions[currentQuestionIndex].correct_answer;
        if (selectedAnswer === correctAnswer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizFinished(true);
        }
    };

    return (
<ImageBackground 
    source={
        quizFinished 
            ? require('../assets/results_background.png')
            : quizStarted 
                ? require('../assets/quiz_background.png')
                : require('../assets/start_backround.png')
    } 
    style={styles.background}
    resizeMode="contain"
>
         
            
        <View style={styles.overlay}>
            {!quizStarted ? (
                <> <View style={styles.formContainer}>
                    <Text style={styles.title}>Enter number of questions (10-30):</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={numQuestions}
                        onChangeText={setNumQuestions}
                        placeholder="Enter a number"
                    />
                    </View>
                    <TouchableOpacity style={styles.startButton} onPress={fetchQuestions}>
                        <Text style={styles.startButtonText}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Root')}>
                        <Text style={styles.backText}>Back to Home</Text>
                    </TouchableOpacity>
                </>
            ) : !quizFinished ? (
                <View>
                    <Text style={styles.question}>
                        Question {currentQuestionIndex + 1}/{questions.length}:
                    </Text>
                    <Text style={styles.questionText}>
                        {questions[currentQuestionIndex].question.replace(/&quot;|&#039;/g, "'")}
                    </Text>
                    <FlatList
                        data={[...questions[currentQuestionIndex].incorrect_answers, questions[currentQuestionIndex].correct_answer].sort()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.answerButton} onPress={() => handleAnswer(item)}>
                                <Text style={styles.answerText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            ) : (
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultsTitle}>Quiz Complete!</Text>
                    <Text style={styles.resultsScore}>Your score: {score}/{questions.length}</Text>
                    <TouchableOpacity style={styles.startButton} onPress={() => setQuizStarted(false)}>
                        <Text style={styles.startButtonText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Root')}>
                        <Text style={styles.backText}>Back to Home</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: '100%',
        height: '100%',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '200',
        height: 40,
        borderColor: 'black',
        backgroundColor: 'rgb(255, 255, 255)',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    startButton: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    startButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    question: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 2,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    questionText: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center',
        marginBottom: 10,
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    answerButton: {
        backgroundColor: '#2ecc71',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    answerText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    resultsScore: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textShadowColor: 'white',
        textShadowOffset: { width: 2, height: 2 }, 
        textShadowRadius: 3,
    },
    resultsTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        textShadowColor: 'white',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    resultsContainer: {
        position: 'absolute',
        top: '38%',
        left: '50%',
        transform: [{ translateX: -120 }, { translateY: -60 }],
        width: 200,
        alignItems: 'center',
        elevation: 5,
    },
    backButton: {
        marginTop: 10,
        padding: 10,
    },
    backText: {
        color: 'blue',
        fontSize: 16,
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    }
});

export default QuizScreen;
