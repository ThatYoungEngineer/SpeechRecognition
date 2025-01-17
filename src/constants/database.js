import Language from "./language"

const language = Language()

export default {
    BookACall: {
        initialFormData: {
        timeSlot1Date: '', 
        timeSlot2Date: '', 
        timeSlot3Date: '', 
        timeSlot1Time: '', 
        timeSlot2Time: '', 
        timeSlot3Time: ''
        },
        disabledFormFields: function disabledFormFields(formData) {
            return Object.values(formData).some(value => value === '')
        },
        timeSlots: [
            {
                id: 1,
                title: language.timeSlot,
                date: language.selectDate,
                time: language.selectTime,
            },
            {
                id: 2,
                title: language.timeSlot,
                date: language.selectDate,
                time: language.selectTime,
            },
            {
                id: 3,
                title: language.timeSlot,
                date: language.selectDate,
                time: language.selectTime,
            }
        ]
    }
}
