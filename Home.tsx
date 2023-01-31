import React, {useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Linking,
  SafeAreaView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { parse } from 'json2csv';
import isIterable from './utils/isiterable';
// @ts-ignore
import YAML from 'json-to-pretty-yaml';
import jsonToMysql from './lib/json2mysql';
import { scrapeList, baseUrl, getAPIRoute, getTitle, getTableName, getPostsData, getResultPath } from './lib/scrapelist';
import validator from 'email-validator';
const { width } = Dimensions.get("window");
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from '@expo/vector-icons';
import { Button, ActivityIndicator, Colors } from 'react-native-paper';
import RenderHtml from 'react-native-render-html';
import * as Clipboard from 'expo-clipboard';
const js2xmlparser = require("js2xmlparser");
import { API_SECRECY } from '@env';
import ButtonGroup from './components/buttongroup';
import { styles } from './styles/css';


interface PropsType {
    route: any;  
    navigation: any
}
  
export default function HomeScreen({ route, navigation }: PropsType) {
  const intialUrl = scrapeList.length > 0 ? scrapeList[0].url : '';
  const [url, setUrl] = useState(intialUrl);
  const [dataType, setDataType] = useState('JSON');
  const [extractData, setExtractData] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [csvData, setCSVData] = useState('');
  const [xmlData, setXMLData] = useState('');
  const [yamlData, setYAMLData] = useState('');
  const [mysqlData, setMySQLData] = useState('');
  const [goMail, setGoMail] = useState(false);
  const [mailAdd, setMailAdd] = useState('');
  const [emailerr, setEmailErr] = useState('');
  const dataEl = useRef(null);
  const emailEl = useRef(null);
  const [spinner, setSpinner] = useState(false);
  const dataTypes = ['JSON', 'CSV', 'XML', 'YAML', 'MySQL'];
  const dataSelect = scrapeList.map(item => item.url);

  useEffect(() => {
    if (route?.params?.scrape){
       let elem = scrapeList.find(item => item.id == route?.params?.scrape);
       if (elem){
          setUrl(elem.url);
       }
    }
  },[route?.params?.scrape]);
  
  function setDataNull(){
    setDataType('JSON');
    setExtractData('');
    setJsonData('');
    setCSVData('');
    setXMLData('');
    setYAMLData('');
    setMySQLData('');
  }

  function setMailInit(){
     setGoMail(false);
     setMailAdd('');
     setEmailErr('');
  }

  function selectDataType(selectedIndex: number){
    switch (selectedIndex){
      case 0:
        toJSON();
        break;
      case 1:
        toCSV();
        break;
      case 2:
        toXML(); 
        break;    
      case 3:
        toYAML();
        break;
      case 4:
        toMySQL();
        break;
      default:
        toJSON();
    }
  }
  
  function getDataFields(data: any){
    if (!isIterable(data)){
       return [];
    }
    const objElm = data[0];
    const fields = [];
    for (let key in objElm) {
       fields.push(key);
    } 
    return fields;
  }

  function toJSON(){
    if (dataType !== 'JSON'){
       setDataType('JSON');
       setMailInit();       
       if (jsonData){
          setExtractData(JSON.stringify(jsonData, null, 2));
       }
    }
  }

  function toCSV(){
    if (dataType !== 'CSV'){
       setDataType('CSV');
       setMailInit();
       if (csvData){
          setExtractData(csvData);
       }else if (jsonData){
          const fields = getDataFields(jsonData);
          const csv = parse(jsonData, {fields});
          setExtractData(csv);
          setCSVData(csv);
       }
    }
  }

  function toXML(){
     if (dataType !== 'XML'){
        setDataType('XML');
        setMailInit();       
        if (xmlData){
           setExtractData(xmlData);
        }else if (jsonData){
           const xml = js2xmlparser.parse("data", jsonData);
           setExtractData(xml);
           setXMLData(xml);
        }
     }
  }

  function toYAML(){
     if (dataType !== 'YAML'){
        setDataType('YAML');
        setMailInit();       
        if (yamlData){
           setExtractData(yamlData);
        }else if (jsonData){
           const data = YAML.stringify(jsonData);
           setExtractData(data);
           setYAMLData(data);
        }
     }
  }
  
  function toMySQL(){
     if (dataType !== 'MySQL'){
        setDataType('MySQL');
        setMailInit();       
        if (mysqlData){
           setExtractData(mysqlData);
        }else if (jsonData){
           const tableName = getTableName(url);
           const data = jsonToMysql(tableName, jsonData);
           setExtractData(data);
           setMySQLData(data);
        } 
     } 
  } 

  async function goWebScrape() {
    if (url){
       setSpinner(true);
       const apiRoute = getAPIRoute(url);
       if (apiRoute){
          try {
            const apiconfig ={
              headers: {
                 'Accept': 'application/json',
                 'Authorization': `Bearer ${API_SECRECY}`
              }   
            }
            const {data} = await axios.post(apiRoute, {url}, apiconfig);
            setScrapeData(data);
            //Add to Firestore
            const addedPath = baseUrl + '/api/addresult/' + getResultPath(url);
            await axios.post(addedPath, {data}, apiconfig);
          }catch(error){
            if ((error as any).message?.includes('status code 504')){
              await getSavedResult();
            }else{
              setExtractData('Error: ' + (error as any).message);
            }
          }
      }else{
        setDataNull();
      }
      setSpinner(false);

    }
  }

  function setScrapeData(data: any) {
    if (dataType == 'JSON'){
       setExtractData(JSON.stringify(data, null, 2));
    }else if (dataType == 'CSV'){
       const fields = getDataFields(data);
       const csv = parse(data, {fields});
       setExtractData(csv);
       setCSVData(csv);
    }else if (dataType == 'XML'){
       const xml = js2xmlparser.parse("data", data);
       setExtractData(xml);
       setXMLData(xml);
    }else if (dataType == 'YAML'){
       const yaml = YAML.stringify(data);
       setExtractData(yaml);
       setYAMLData(yaml);
    }else if (dataType == 'MySQL'){
       const tableName = getTableName(url);
       const mysql = jsonToMysql(tableName, data);
       setExtractData(mysql);
       setMySQLData(mysql);
    }
    setJsonData(data);
  }

  async function getSavedResult() {
    if (!url) {
       return; 
    }
    const savedPath = baseUrl + '/api/savedresult/' + getResultPath(url);
    try {
      const apiconfig ={
        headers: {
           'Accept': 'application/json',
           'Authorization': `Bearer ${API_SECRECY}`
        }   
      }
      const {data} = await axios.get(savedPath, apiconfig);
      setScrapeData(data);
    }catch(error){
       setExtractData('Error: ' + (error as any).message);
    }
  }

  const copyToClipboard = async (data: string) => {
    await Clipboard.setStringAsync(data);
  };

  async function handleMailSend(){
    if (!goMail){
      setGoMail(true);
      setMailAdd('');
      return;
    } 
    setEmailErr('');
    //Check if Email is filled
    if (!mailAdd.trim()){
       setEmailErr("Please type your email, the email address is required!");
       setMailAdd(prevState => prevState.trim());
       (emailEl.current as any).focus();
       return;
    }
    //Validate the email
    if (!validator.validate(mailAdd)){
      setEmailErr("This email is not a legal email.");
      (emailEl.current as any).focus();
      return;
    }
    const dataObj = {
      title: getTitle(url),
      dataSend: extractData,
      tomail: mailAdd
    }
    setSpinner(true);
    try {
      const apiconfig ={
        headers: {
           'Accept': 'application/json',
           'Authorization': `Bearer ${API_SECRECY}`
        }   
      }
      const {data} = await axios.post(baseUrl + '/api/sendmail', dataObj, apiconfig);
      axios.post(baseUrl + '/api/useradd', {email: mailAdd}, apiconfig);
      setMailInit();
    }catch(error){
      setEmailErr('Error: ' + (error as any).message);
    }
    setSpinner(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps='handled'
        scrollEnabled={true}
        style={styles.scrollView}
        >
          <SelectDropdown
            data={dataSelect}
            defaultValueByIndex={scrapeList.findIndex(item => item.url == url)}
            onSelect={(selectedItem, index) => {
              setUrl(selectedItem);
              setDataNull();
              setMailInit();
           }}
           defaultButtonText={"Please Select"}
           buttonTextAfterSelection={(selectedItem, index) => {
              return getTitle(selectedItem);
           }}         
           rowTextForSelection={(item, index) => {
              return getTitle(item);
           }}        
           buttonStyle={styles.dropdownBtnStyle}
           buttonTextStyle={styles.dropdownBtnTxtStyle}
           renderDropdownIcon={() => {
             return (
               <Ionicons name="chevron-down" color={"#444"} size={18} />
             );
           }}
           dropdownIconPosition={"right"}
           dropdownStyle={styles.dropdownDropdownStyle}
           rowStyle={styles.dropdownRowStyle}
           rowTextStyle={styles.dropdownRowTxtStyle}
          />
          <View style={[styles.horizontalView, {justifyContent: 'flex-start'}]}>
            <Text style={styles.linkStr}>Target URL:{' '}
              <Text style={{color: 'blue'}} onPress={() => Linking.openURL(url)}>
              {url}
              </Text>      
            </Text>
          </View>
         <View style={[styles.horizontalView, {justifyContent: 'center'}]}>
            <TouchableOpacity style={styles.scrapeButton} onPress={goWebScrape}> 
                <Text style={styles.scrapeButtonText}>Go</Text>
            </TouchableOpacity> 
          </View>
          <View style={[styles.horizontalView, {justifyContent: 'flex-start', paddingTop: 5}]}>
             <RenderHtml source={{ html: getPostsData(url) }} contentWidth={width*0.9} />           
          </View>
          <ButtonGroup 
            dataList={dataTypes}
            dataSelect={selectDataType}
            />          
          {(extractData && !extractData.startsWith('Error')) &&
          <View style={[styles.horizontalView, {justifyContent: 'space-between', paddingTop: 5}]}>
            <Button mode='outlined' onPress={() => (dataEl.current as any).focus()}>Copy to Clipboard</Button>
            <Button mode='outlined' onPress={() => handleMailSend()}>{goMail ? 'Send Mail': 'Mail Result'}</Button>  
          </View>
          }          
          {goMail &&
          <>
          <View style={[styles.horizontalView, {justifyContent: 'flex-start', paddingTop: 5}, styles.textAreaContainer]}>
            <TextInput
              style={{width: '100%', height: 25}}
              value={mailAdd} 
              onChangeText={text => setMailAdd(text.replace(/<\/?[^>]*>/g, ""))}
              autoCapitalize='none'
              autoComplete='email'
              keyboardType='email-address'
              placeholder='Please Type Email Address'
              ref={emailEl}
              />
          </View>
          <View>
            <Text style={{color: 'red'}}>{emailerr}</Text>
          </View>
          </>
          }          
          <View style={[styles.horizontalView, {justifyContent: 'flex-start'}, styles.textAreaContainer]}>
              <TextInput
                style={styles.textArea}
                value={extractData}
                numberOfLines={10}
                multiline={true}
                disableFullscreenUI={true}
                showSoftInputOnFocus={false}
                selectTextOnFocus
                ref={dataEl}
                onFocus={() => copyToClipboard(extractData)}
              />
          </View>
          <View
              style={{width: '100%', height: 30}}>
          </View>
      </KeyboardAwareScrollView>    
      {spinner &&
        <View style={styles.loading}>
          <ActivityIndicator size="large" animating={true} color={Colors.white} />
        </View>
      }
    </SafeAreaView>
  );

}
