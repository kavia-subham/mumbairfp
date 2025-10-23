/**
 * Minimal i18n utility with in-memory dictionary and simple t() translator.
 * Supported: English (en), Hindi (hi), Marathi (mr)
 */
const dict = {
  en: {
    app_title: 'Maharashtra AI Agents Platform',
    app_tagline: 'AI coach for citizen services (web, chat, voice)',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    logout: 'Logout',
    welcome: 'Welcome',
    type_message: 'Type your message',
    send: 'Send',
    language: 'Language',
    upload_document: 'Upload Document',
    choose_file: 'Choose file',
    uploading: 'Uploading...',
    extracted_data: 'Extracted Data',
    feedback: 'Feedback',
    rating: 'Rating',
    submit: 'Submit',
    voice_placeholder_title: 'Voice Input (placeholder)',
    start_simulation: 'Start Simulation',
    stop_simulation: 'Stop Simulation',
    recognized_text: 'Recognized text',
    accessibility: 'Accessibility',
    increase_text: 'Increase text size',
    decrease_text: 'Decrease text size',
  },
  hi: {
    app_title: 'महाराष्ट्र एआई एजेंट्स प्लेटफ़ॉर्म',
    app_tagline: 'नागरिक सेवाओं के लिए एआई कोच (वेब, चैट, वॉइस)',
    username: 'उपयोगकर्ता नाम',
    password: 'पासवर्ड',
    login: 'लॉग इन',
    logout: 'लॉग आउट',
    welcome: 'स्वागत है',
    type_message: 'अपना संदेश लिखें',
    send: 'भेजें',
    language: 'भाषा',
    upload_document: 'दस्तावेज़ अपलोड करें',
    choose_file: 'फ़ाइल चुनें',
    uploading: 'अपलोड हो रहा है...',
    extracted_data: 'निकाला गया डेटा',
    feedback: 'प्रतिक्रिया',
    rating: 'रेटिंग',
    submit: 'जमा करें',
    voice_placeholder_title: 'वॉइस इनपुट (placeholder)',
    start_simulation: 'सिमुलेशन शुरू करें',
    stop_simulation: 'सिमुलेशन रोकें',
    recognized_text: 'पहचाना गया पाठ',
    accessibility: 'सुगम्यता',
    increase_text: 'टेक्स्ट बड़ा करें',
    decrease_text: 'टेक्स्ट छोटा करें',
  },
  mr: {
    app_title: 'महाराष्ट्र एआय एजंट्स प्लॅटफॉर्म',
    app_tagline: 'नागरिक सेवांसाठी एआय कोच (वेब, चॅट, व्हॉईस)',
    username: 'वापरकर्तानाव',
    password: 'पासवर्ड',
    login: 'लॉगिन',
    logout: 'लॉगआऊट',
    welcome: 'स्वागत आहे',
    type_message: 'आपला संदेश टाईप करा',
    send: 'पाठवा',
    language: 'भाषा',
    upload_document: 'दस्तऐवज अपलोड',
    choose_file: 'फाइल निवडा',
    uploading: 'अपलोड करत आहे...',
    extracted_data: 'काढलेला डेटा',
    feedback: 'अभिप्राय',
    rating: 'रेटिंग',
    submit: 'सबमिट',
    voice_placeholder_title: 'व्हॉईस इनपुट (placeholder)',
    start_simulation: 'सिम्युलेशन सुरू करा',
    stop_simulation: 'सिम्युलेशन थांबवा',
    recognized_text: 'ओळखलेला मजकूर',
    accessibility: 'सुलभता',
    increase_text: 'मजकूर वाढवा',
    decrease_text: 'मजकूर कमी करा',
  }
};

let current = 'en';

// PUBLIC_INTERFACE
export function setLang(l) { if (dict[l]) current = l; }
// PUBLIC_INTERFACE
export function getLang() { return current; }
// PUBLIC_INTERFACE
export function t(key) { return (dict[current] && dict[current][key]) || key; }

export const languages = dict;
