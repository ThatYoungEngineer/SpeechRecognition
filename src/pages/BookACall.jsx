import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native'

import COLORS from '../constants/colors';

import Tts from 'react-native-tts';

 const BookACall = () => {

    const initialFormData = {
        timeSlot1Date: '', 
        timeSlot2Date: '', 
        timeSlot3Date: '', 
        timeSlot1Time: '', 
        timeSlot2Time: '', 
        timeSlot3Time: ''
    }
    const [formData, setFormData] = useState(initialFormData)

    const [isSpeaking, setIsSpeaking] = useState(false)
    
    const disabled =                         
    formData.timeSlot1Date === '' ||
    formData.timeSlot1Time === '' ||
    formData.timeSlot2Date === '' ||
    formData.timeSlot2Time === '' ||
    formData.timeSlot3Date === '' ||
    formData.timeSlot3Time === '' ;

    const speakString = `
        Great! You've selected three potential time slots to discuss your case with an attorney.
        Here are your booked slots for the case: "Personal Injury Claim (Demo User) versus Gus Salamoun": ;
        1st slot: Dated ${formData.timeSlot1Date}, at ${formData.timeSlot1Time} ;
        2nd slot: Dated ${formData.timeSlot2Date}, at ${formData.timeSlot2Time} ;
        3rd slot: Dated ${formData.timeSlot3Date}, at ${formData.timeSlot3Time} ;
        Please review and make any necessary changes now, or click the 'Submit' button to proceed. Thank you!
    `

    const timeSlots = [
        {
            id: 1,
            title: "Time Slot",
            date: "Select Date",
            time: "Select Time",
        },
        {
            id: 2,
            title: "Time Slot",
            date: "Select Date",
            time: "Select Time",
        },
        {
            id: 3,
            title: "Time Slot",
            date: "Select Date",
            time: "Select Time",
        }
    ]

    useEffect(() => {
        Tts.getInitStatus().then(() => {
            Tts.setDefaultLanguage('en-US')
            Tts.setDefaultRate(0.53);
        });
        Tts.addEventListener('tts-finish', (event) => {setIsSpeaking(false); Tts.stop() });      
    }, [])

    const handleChangeDate = (event, id) => {
        let value = event.nativeEvent.text
        setFormData((prevData) => ({
            ...prevData,
            [`timeSlot${id}Date`]: value,
        }));
    }
    const handleChangeTime = (event, id) => {
        let value = event.nativeEvent.text
        setFormData((prevData) => ({
            ...prevData,
            [`timeSlot${id}Time`]: value,
        }));
    }
    const handleSubmit = () => {
        Alert.alert(
            "Success",
            "Form has been submitted successfully!",
            [
                {
                    text: "Ok",
                    onPress: () => setFormData(initialFormData),
                },
            ]
        )
    }

    const speak = async () => {
        if(isSpeaking) {
            return
        } else {
            setIsSpeaking(true)
            Platform.OS === "ios" ?
                Tts.speak(speakString, {
                    iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
                    rate: 0.525,
                })
            : Tts.setDucking(true); 
            Tts.setDefaultPitch(1);
            Tts.speak(speakString, {
                androidParams: {
                  KEY_PARAM_PAN: 0,
                  KEY_PARAM_VOLUME: 1,
                  KEY_PARAM_STREAM: 'STREAM_MUSIC',
                },
            })
        }
    }

    const stop = () => {
        Tts.stop()
        setTimeout(() => {
            setIsSpeaking(false)
        }, 500);
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.bodyHeader}>
                    <View style={styles.bodyTitle}>
                        <Text style={styles.bodyTitleTexts} >Schedule a Meeting with Your Attorney: </Text>
                        <Text style={styles.bodyTitleTexts}>Suggest Three Appointment Slot: </Text>
                    </View>
                    {!isSpeaking ?
                        <TouchableOpacity 
                            disabled={ disabled || isSpeaking}
                            style={{opacity: (disabled || isSpeaking) ? 0.1 : 1}}
                            onPress={speak}
                        >
                            <Image
                                source={require('../assets/volume.png')}
                                style={styles.soundIcon}
                            />
                        </TouchableOpacity>
                    :  <TouchableOpacity 
                            onPress={stop}
                            style={styles.stopBtn}
                        >
                            <Text style={styles.stopText}>Stop</Text>
                        </TouchableOpacity>
                    }
                </View>
                <ScrollView style={styles.scrollView}>
                    {timeSlots.map((timeSlot, index) => (
                        <View key={timeSlot.id || index} style={styles.timeSlot}>
                            <Text style={styles.timeSlotTitle}>{timeSlot.title} <Text style={styles.requiredIcon}> *</Text> </Text>
                            <View style={styles.inputsContainer}>
                                <TextInput value={formData[`timeSlot${timeSlot.id}Date`]}  placeholder={timeSlot.date} style={styles.input} onChange={(e) => handleChangeDate(e, timeSlot.id)} />
                                <TextInput value={formData[`timeSlot${timeSlot.id}Time`]} placeholder={timeSlot.time} style={styles.input} onChange={(e) => handleChangeTime(e, timeSlot.id)} />
                            </View>
                        </View>
                    ))}
                    <View style={styles.submitBtnContainer}>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={disabled || isSpeaking}
                            style={{
                                ...styles.submitBtn,
                                opacity: (disabled || isSpeaking) ? 0.5 : 1
                            }}
                        > 
                            <Text style={styles.submit}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
   )
 }

 export default BookACall

 const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    titleBar: {
        paddingTop: '10%',
        paddingBottom: 10,
        backgroundColor: COLORS.themeColor
    },
    titleBarText: {
        fontSize: 20,
        color: COLORS.white,
        textAlign: 'center',
        fontWeight: 600
    },
    body: {
        flex: 1, 
        backgroundColor: COLORS.white, 
    },
    bodyHeader: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.softGray,
    },
    bodyTitleTexts: {
        fontSize: 15,
        fontWeight: 500,
    },
    scrollView: {
        flex: 1,
        paddingTop: 10
    },
    timeSlotTitle: {
        fontSize: 15,
        padding: 10,
        backgroundColor: '#ddd'
    },
    inputsContainer: {
        padding: 20,
        paddingBottom: 0,
        backgroundColor: COLORS.white,
    },
    requiredIcon: {
        color: COLORS.red,
        fontSize: 18,
    },
    input: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#888',
        marginBottom: 16,
        borderRadius: 5
    },
    submitBtnContainer: {
        paddingHorizontal: 20,
        marginTop: 50
    },
    submitBtn: {
        width: '100%',
        backgroundColor: COLORS.themeColor,
        padding: 15,
        color: COLORS.white ,
        marginBottom: 20,
        borderRadius: 5
    },
    submit: {
        textAlign: 'center',
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 600
    },
    soundIcon: {
        height: 40,
        width: 40,
    },
    stopBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: COLORS.red,
        borderRadius: 50
    },
    stopText: {
        fontSize: 20,
        alignSelf: 'center',
        verticalAlign: 'middle',
        textAlign: 'center',
        color: COLORS.themeColor
    },    
})

