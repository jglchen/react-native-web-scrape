import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PropsType {
    dataList: string[];
    dataSelect: (idx: number) => void;
}

export default function ButtonGroup({dataList, dataSelect}: PropsType) {
    const [selection, setSelection] = useState(0);

    return (
    <View style={styles.btnGroup}>
    {dataList.map((item, index) => 
        <TouchableOpacity key={index} style={[styles.btn, selection === index ? { backgroundColor: "green" } : null]} onPress={() => {setSelection(index); dataSelect(index)}}>
            <Text style={[styles.btnText, selection === index ? { color: "white" } : null]}>{item}</Text>
        </TouchableOpacity>
    )}    
    </View>
    );

}    

const styles = StyleSheet.create({
    btnGroup: {
        flexDirection: 'row',
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#6B7280'
    },
    btn: {
        flex: 1,
        borderRightWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: '#6B7280'
    },
    btnText: {
        textAlign: 'center',
        paddingVertical: 12,
        fontSize: 15
    }
});
  
 
