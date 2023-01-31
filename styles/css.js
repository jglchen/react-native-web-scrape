import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        paddingTop: 10,
        paddingHorizontal: 5
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.5,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center'
    },
    dropdownBtnStyle: {
      width: "100%",
      height: 50,
      backgroundColor: "#FFF",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#444",
    },
    dropdownBtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdownDropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdownRowStyle: {
      backgroundColor: "#EFEFEF",
      borderBottomColor: "#C5C5C5",
    },
    dropdownRowTxtStyle: { color: "#444", textAlign: "left" },
    
    horizontalView: {
      width: "100%",
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 10,
    },
    linkStr: {
      color: "#000",
      fontWeight: "bold", 
      fontSize: 16
    },
    scrapeButton: {
      alignItems: 'center',
      color: '#fff',
      borderColor: '#29de7d',
      borderRadius: 4,
      borderWidth: 1,
      backgroundColor: '#29de7d',
      width: '100%',
      paddingVertical: 8
    },
    scrapeButtonText: {
      color: '#fff',
      fontWeight: "bold", 
      fontSize: 20
    }, 
    textAreaContainer: {
      borderColor: 'lightgrey',
      borderWidth: 1,
      borderRadius: 4,
      padding: 10,
      marginTop: 10,
    },
    textArea: {
      width: '100%',
      height: 180,
    } 
});
  