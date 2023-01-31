import { SafeAreaView, 
    KeyboardAvoidingView, 
    Platform,
    Linking,
    View,
    Text,
    ScrollView
} from 'react-native';
import { styles } from './styles/css';

interface PropsType {
    navigation: any
}

export default function AboutApp({ navigation }: PropsType) {

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView  
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 18, lineHeight: 24}}>
                        This mobile app is considered the mobile version of <Text style={{color: 'blue', fontWeight: 'bold'}} onPress={() => Linking.openURL('https://web-scrape.vercel.app')}>Web Scraping Demonstrations</Text> to demonstrate web scraping cases and my expertise in web scraping.
                        Totally 9 scraping cases are presented at this moment, they are handled in API routes with <Text style={{color: 'blue', fontWeight: 'bold'}} onPress={() => Linking.openURL('https://nodejs.org/en/')}>node.js</Text>.
                        </Text>
                    </View> 
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 18, lineHeight: 24}}>
                        There are two main approaches to scraping the web: (1) HTTP clients to query the web and data extraction, (2) headless browsers.
                        </Text>
                    </View> 
                    <View style={{marginBottom: 10}}>
                        <Text style={{fontSize: 18, lineHeight: 24}}>
                        For the first approach, we use <Text style={{color: 'blue', fontWeight: 'bold'}} onPress={() => Linking.openURL('https://www.npmjs.com/package/cheerio')}>Cheerio</Text>, a library using jQuery on the server side, to crawl web pages. Sites, however, now become increasingly complex, and often regular HTTP crawling won't suffice anymore, but one needs a full-fledged browser engine, to get the necessary information from a site. This is particularly true for single-page applications which heavily rely on JavaScript and dynamic and asynchronous resources. Browser automation and headless browsers come to deal with the issues. Therefore we use <Text style={{color: 'blue', fontWeight: 'bold'}} onPress={() => Linking.openURL('https://pptr.dev/')}>Puppeteer</Text> to manipulate the browser programmatically. For the cases in this demonstration, we use either way depending on the actual situations of the target pages.
                        </Text>
                    </View> 
              </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

}    
