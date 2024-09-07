import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration, Dimensions, ScrollView } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [currentNumber, setCurrentNumber] = useState('');
    const [lastNumber, setLastNumber] = useState('');
    const [shifted, setShifted] = useState(false);

    const buttons = [
        ['SHIFT', 'ALPHA', 'MODE', 'AC'],
        ['C', 'DEL', '(', ')'],
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
        ['x^2', 'sqrt', 'sin', 'cos'],
        ['tan', 'log', 'ln', 'pi'],
    ];

    function calculator() {
        try {
            let sanitizedInput = currentNumber
                .replace('x^2', '**2')
                .replace('sqrt', 'Math.sqrt')
                .replace('sin', 'Math.sin')
                .replace('cos', 'Math.cos')
                .replace('tan', 'Math.tan')
                .replace('log', 'Math.log10')
                .replace('ln', 'Math.log')
                .replace('pi', 'Math.PI');
            
            const result = eval(sanitizedInput);
            if (typeof result === 'number') {
                setCurrentNumber(result.toString());
                setLastNumber(currentNumber + ' = ' + result);
            }
        } catch (error) {
            setCurrentNumber('Error');
            setLastNumber('');
        }
    }

    function handleInput(buttonPressed) {
        Vibration.vibrate(35);

        switch (buttonPressed) {
            case 'DEL':
                setCurrentNumber(currentNumber.slice(0, -1));
                return;
            case 'C':
            case 'AC':
                setLastNumber('');
                setCurrentNumber('');
                return;
            case '=':
                calculator();
                return;
            case 'SHIFT':
                setShifted(!shifted);
                return;
            case 'ALPHA':
                setCurrentNumber(currentNumber + 'x');
                return;
            case 'x^2':
                setCurrentNumber(currentNumber + 'x^2');
                return;
            case 'sqrt':
                setCurrentNumber(currentNumber + 'sqrt(');
                return;
            case 'sin':
            case 'cos':
            case 'tan':
                setCurrentNumber(currentNumber + buttonPressed + '(');
                return;
            case 'log':
                setCurrentNumber(currentNumber + 'log10(');
                return;
            case 'ln':
                setCurrentNumber(currentNumber + 'ln(');
                return;
            case 'pi':
                setCurrentNumber(currentNumber + 'Math.PI');
                return;
        }

        setCurrentNumber(currentNumber + buttonPressed);
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkMode ? '#1c1c1c' : '#f0f0f0',
            padding: 10,
        },
        whiteBox: {
            backgroundColor: '#ffffff',
            borderRadius: 8,
            padding: 10,
            elevation: 3,
            marginBottom: 10,
        },
        results: {
            backgroundColor: darkMode ? '#333' : '#ffffff',
            width: '100%',
            minHeight: Dimensions.get('window').height * 0.25,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: 10,
            borderRadius: 8,
            elevation: 3,
            marginBottom: 10,
        },
        resultText: {
            color: darkMode ? '#ffffff' : '#000000',
            fontSize: 36,
            fontWeight: 'bold',
        },
        historyText: {
            color: darkMode ? '#dddddd' : '#000000',
            fontSize: 18,
            marginRight: 5,
            alignSelf: 'flex-end',
        },
        buttonContainer: {
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: 8,
            elevation: 3,
            paddingBottom: 10,
        },
        buttons: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        button: {
            backgroundColor: darkMode ? '#4caf50' : '#ff80ab',
            borderColor: '#ffffff',
            borderWidth: 1,
            borderRadius: 8,
            margin: 3,
            width: '22%',
            minHeight: 50,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textButton: {
            color: darkMode ? '#ffffff' : '#000000',
            fontSize: 16,
            fontWeight: 'bold',
        },
        toggleButton: {
            backgroundColor: darkMode ? '#444' : '#e0f7fa',
            borderColor: '#ff69b4',
            borderWidth: 1,
            padding: 5,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            alignSelf: 'center',
        },
        toggleContainer: {
            alignItems: 'center',
            marginBottom: 10,
        },
    });

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={styles.toggleContainer}>
                    <TouchableOpacity style={styles.toggleButton} onPress={() => setDarkMode(!darkMode)}>
                        <Entypo
                            name={darkMode ? 'moon' : 'light-up'}
                            size={20}
                            color={darkMode ? 'white' : 'black'}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.whiteBox}>
                    <View style={styles.results}>
                        <Text style={styles.historyText}>{lastNumber}</Text>
                        <Text style={styles.resultText}>{currentNumber}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.buttons}>
                            {buttons.map((row, rowIndex) => (
                                <View key={rowIndex} style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                    {row.map((button) => (
                                        <TouchableOpacity
                                            key={button}
                                            style={styles.button}
                                            onPress={() => handleInput(button)}
                                            disabled={!button}
                                        >
                                            <Text style={styles.textButton}>{button}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
