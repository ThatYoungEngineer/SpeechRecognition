import React, { useState } from 'react';
import COLORS from '../constants/colors';
import { StyleSheet } from 'react-native';
import { useGlobal } from '../context/GlobalContext';
import { SelectCountry } from 'react-native-element-dropdown';
import Database from '../constants/database';

const Dropdown = () => {

    const {globalLanguage, updateGlobalLanguage} = useGlobal()
    const [value, setValue] = useState(globalLanguage)
    
    const data = Database.DropDown.data

    const updateValue = (item) => {
        setValue(prev => item.value)
        updateGlobalLanguage(item.value)
    }

    return (
        <SelectCountry
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            iconColor={COLORS.primary}
            imageStyle={styles.imageStyle}
            data={data}
            maxHeight={200}
            labelField="label"
            valueField="value"
            imageField="image"
            placeholder=""
            searchPlaceholder="Search..."
            value={value}
            onChange={item => updateValue(item)}
            itemTextStyle={styles.itemText}
            closeModalWhenSelectedItem
            confirmSelectItemStyle={styles.confirmSelectItemStyle}
        />
    )
}

const styles = StyleSheet.create({
    dropdown: {
      margin: 0,
      padding: 5,
      borderColor: COLORS.lightGray,
      borderWidth: 0.5
    },
    placeholderStyle: {
      fontSize: 12
    },
    itemText: {
      fontSize: 16,
      color: COLORS.black,
    },
    selectedTextStyle: {
      color: COLORS.primary,
      fontSize: 10,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    imageStyle: {
      width: 12,
      height: 12,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 12,
    },
});

export default Dropdown

// renderLeftIcon={() => (
//     <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
// )}
