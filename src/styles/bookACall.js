import COLORS from "../constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    titleBar: {
      paddingTop: '10%',
      paddingBottom: 10,
      backgroundColor: COLORS.themeColor,
    },
    titleBarText: {
      fontSize: 20,
      color: COLORS.white,
      textAlign: 'center',
      fontWeight: 600,
    },
    body: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    bodyHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: COLORS.softGray,
    },
    bodyTitleTexts: {
      fontSize: 15,
      fontWeight: 500,
      color: COLORS.black,
    },
    scrollView: {
      flex: 1,
      paddingTop: 10,
    },
    timeSlotTitle: {
      fontSize: 15,
      padding: 10,
      backgroundColor: COLORS.lightGray,
      color: COLORS.black,
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
      borderColor: COLORS.placeholder,
      marginBottom: 16,
      borderRadius: 5,
      color: COLORS.black,
    },
    submitBtnContainer: {
      paddingHorizontal: 20,
      marginTop: 30,
    },
    submitBtn: {
      width: '100%',
      backgroundColor: COLORS.themeColor,
      padding: 15,
      color: COLORS.white,
      marginBottom: 20,
      borderRadius: 5,
    },
    submit: {
      textAlign: 'center',
      color: COLORS.white,
      fontSize: 20,
      fontWeight: 600,
    },
    soundIcon: {
      height: 40,
      width: 40,
    },
    stopSoundBtn: {
      width: 40,
      height: 40,
    },
});  