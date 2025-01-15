import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import Audio from '../assets/audio/audio.mp3';

const AssemblyAI = () => {
  const [transcription, setTranscription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // const audioUrl = 'https://assembly.ai/sports_injuries.mp3'
  // const audioUrl = 'https://firebasestorage.googleapis.com/v0/b/perspectiveforge-2843b.appspot.com/o/new-test.mp3?alt=media&token=caf5c0fc-30dd-454c-be16-148a9362bab5'
  const audioUrl =
    'https://firebasestorage.googleapis.com/v0/b/perspectiveforge-2843b.appspot.com/o/testNew.mp3?alt=media&token=215461cb-41fd-4c59-bba5-9e5cc3c3b258';

  const apiKey = '0f39b7c8ae7e485c8305cfe28d747b11';

  const getTranscription = async () => {
    setIsLoading(true);

    try {
      // Step 1: Start transcription
      const response = await axios.post(
        'https://api.assemblyai.com/v2/transcript',
        {audio_url: audioUrl},
        {
          headers: {
            Authorization: apiKey,
          },
        },
      );

      const transcriptId = response.data.id;
      if (!transcription) pollTranscription(transcriptId);
    } catch (error) {
      console.error('Error during transcription request:', error);
    }
  };

  const pollTranscription = async transcriptId => {
    setIsLoading(true);
    try {
      const transcriptResponse = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
        {
          headers: {
            Authorization: apiKey,
          },
        },
      );

      if (transcriptResponse.data.status === 'completed') {
        setTranscription(transcriptResponse.data.text);
        setIsLoading(false);
      } else if (transcriptResponse.data.status === 'failed') {
        console.error('Transcription failed');
        setIsLoading(false);
      } else {
        if (!transcription) {
          setTimeout(() => {
            pollTranscription(transcriptId);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('Error during polling transcription:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    !transcription && getTranscription();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text style={{marginTop: 10, padding: 10, fontSize: 20, color: 'red'}}>Assembly AI Transcription: </Text>
          {isLoading ? (
            <Text style={{textAlign: 'center'}}>Loading...</Text>
          ) : (
            <Text style={{padding: 10}}>{transcription || 'No transcription available'}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssemblyAI;
