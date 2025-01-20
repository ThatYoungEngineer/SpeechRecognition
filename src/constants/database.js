import usa from '../assets/usa.png'
import spanish from '../assets/world.png'

import Language from "../components/Language"

const language = Language()

export default {
    DropDown: {
        data: [
            { label: "ENGLISH", value: 'english',  image: usa },
            { label: "SPANISH", value: 'spanish',  image: spanish },
        ]        
    },
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
