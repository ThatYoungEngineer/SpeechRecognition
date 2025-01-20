const Language = (lang) => {    

    const translations = {
      english: {
        chat: "Chat",
        messageScreenHeader: "Tap on mic and start recording..",
        emptyMessageText: "No messages yet...",
        messageInputPlaceholder: "Type your message...",
        send: "Send",
        submit: "Submit",
        speakString: function speakString(dateOne, timeOne, dateTwo, timeTwo, dateThree, timeThree) {
          return ` 
            Great! You've selected three potential time slots to discuss your case with an attorney.
            Here are your booked slots for the case: "Personal Injury Claim (Demo User) versus Gus Salamoun": ;
            1st slot: Dated ${dateOne}, at ${timeOne} ;
            2nd slot: Dated ${dateTwo}, at ${timeTwo} ;
            3rd slot: Dated ${dateThree}, at ${timeThree} ;
            Please review and make any necessary changes now, or click the 'Submit' button to proceed. Thank you!
          `;
        },
        success: "Success",
        formSubmittedSuccess: "Form has been submitted successfully!",
        OK: "OK",
        bookACall: "Book A Call",
        bookACallHeaderPrimary: "Schedule a Meeting with Your Attorney:",
        bookACallHeaderSecondary: "Suggest Three Appointment Slot:",
        timeSlot: "Time Slot",
        selectDate: "Select Date",
        selectTime: "Select Time",
      },
      spanish: {
        chat: "Chat",
        messageScreenHeader: "Toque el micrófono y comience a grabar...",
        emptyMessageText: "Aún no hay mensajes...",
        messageInputPlaceholder: "Escriba su mensaje...",
        send: "Enviar",
        submit: "Enviar",
        speakString: function speakString(dateOne, timeOne, dateTwo, timeTwo, dateThree, timeThree) {
          return ` 
            ¡Genial! Ha seleccionado tres horarios potenciales para discutir su caso con un abogado.
            Aquí están sus horarios reservados para el caso: "Demanda por Lesiones Personales (Usuario Demo) contra Gus Salamoun": ;
            1er horario: Fecha ${dateOne}, a las ${timeOne} ;
            2do horario: Fecha ${dateTwo}, a las ${timeTwo} ;
            3er horario: Fecha ${dateThree}, a las ${timeThree} ;
            Por favor, revise y realice los cambios necesarios ahora, o haga clic en el botón 'Enviar' para continuar. ¡Gracias!
          `;
        },
        success: "Éxito",
        formSubmittedSuccess: "¡El formulario se ha enviado con éxito!",
        OK: "Aceptar",
        bookACall: "Reservar una llamada",
        bookACallHeaderPrimary: "Agende una reunión con su abogado:",
        bookACallHeaderSecondary: "Sugerir tres horarios de cita:",
        timeSlot: "Horario",
        selectDate: "Seleccionar fecha",
        selectTime: "Seleccionar hora",
      },
    };
  
    // Return the translations for the current language
    return translations[lang] || translations.english;
  
  }
  
  export default Language