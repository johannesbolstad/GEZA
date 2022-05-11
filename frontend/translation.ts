import * as Speech from 'expo-speech';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * A function to speak out loud the text in a given language
 *
 * @param languageToSpeak the language is the preferred language
 * @param thingToSay thingTosay is the text that will be spoken
 */
export const speakUp = (languageToSpeak: string, thingToSay: string) => {
    if (languageToSpeak === 'en') {
        Speech.speak(thingToSay, {
            language: 'en-IN'
        });
    }
    if (languageToSpeak === 'no') {
        Speech.speak(thingToSay, {
            language: 'nb-NO'
        });
    }
    if (languageToSpeak === 'fr') {
        Speech.speak(thingToSay, {
            language: 'fr-FR'
        });
    }
    if (languageToSpeak === 'es') {
        Speech.speak(thingToSay, {
            language: 'es-ES'
        });
    }
    if (languageToSpeak === 'de') {
        Speech.speak(thingToSay, {
            language: 'de-DE'
        });
    }
    if (languageToSpeak === 'عر') {
        Speech.speak(thingToSay, {
            language: 'ar-XA'
        });
    }
    if (languageToSpeak === 'ук') {
        Speech.speak(thingToSay, {
            language: 'uk-UA'
        });
    }
};

// contains all words translated into different languages.
const resources = {
    en: {
        translation: {
            //Navbar
            Home: 'Home',
            Groups: 'Groups',
            Messages: 'Messages',
            Wiki: 'Wiki',
            //Wiki categories
            'New in Norway': 'New in Norway',
            Family: 'Family',
            Health: 'Health',
            Economy: 'Economy',
            Sparetime: 'Sparetime',
            SOS: 'SOS',
            // Wiki subcategories
            Emergency: 'Emergency',
            Coronavirus: 'Coronavirus',
            Hospital: 'Hospital',
            'Useful resources': 'Useful resources',
            'Brief history': 'Brief history',
            Job: 'Job',
            Education: 'Education',
            Kindergarten: 'Kindergarten',
            School: 'School',
            // Buttons
            Continue: 'Continue',
            'register a user': 'register a user',
            'Continue without user': 'Continue without user',
            //Sign up screen
            'User Name': 'User Name',
            Location: 'Location',
            Language: 'Language',
            'Year of birth': 'Year of birth',
            'Years lived in Norway': 'Years lived in Norway',
            'Sign up': 'Sign up',
            Back: 'Back',
            Male: 'Male',
            Female: 'Female',
            Other: 'Other',

            //Make Group
            'Create new Group': 'Create new Group',
            'Choose Image': 'Choose Image',
            'Group name': 'Group name',
            Description: 'Description',
            'Select language': 'Select language',
            'Make group': 'Make group',
            Title: 'Title',

            'SHOW MORE': 'SHOW MORE',
            'SHOW LESS': 'SHOW LESS',
            'Do you want to join': 'Do you want to join',
            Cancel: 'Cancel',
            Join: 'Join',
            'Create new post': 'Create new post',
            'Emergency numbers': 'Emergency numbers',
            Comment: 'Comment',
            'Create comment': 'Create comment',
            'Write comment': 'Write comment',
            'Type a message': 'Type a message',
            'New message': 'New message',
            Search: 'Search',
            'Save changes': 'Save changes',
            'Read more': 'Read more',
            'Read less': 'Read less',
            'Write some description': 'Write some description',
            'Enter GroupPost title': 'Enter GroupPost title',
            'Create post': 'Create post',
            'Name of recipient': 'Name of recipient'
        }
    },
    ук: {
        translation: {
            //Navbar
            Home: 'Додому',
            Groups: 'Групи',
            Messages: 'Повідомлення',
            Wiki: 'Вікі',
            //Wiki categories
            'New in Norway': 'Нові в Норвегії',
            Family: "Сім'я",
            Health: "Здоров'я",
            Economy: 'Економіка',
            Sparetime: 'Вільний час',
            SOS: 'сигнал про небезпеку',
            // Wiki subcategories
            Emergency: 'Надзвичайна ситуація',
            Coronavirus: 'Коронавірус',
            Hospital: 'Лікарня',
            'Useful resources': 'Корисні ресурси',
            'Brief history': 'Коротка історія',
            Job: 'Робота',
            Education: 'Освіта',
            Kindergarten: 'дитячий садок',
            School: 'Школа',
            // Buttons
            Continue: 'Продовжуйте',
            'register a user': 'Зареєструвати користувача',
            'Continue without user': 'Продовжити без користувача',
            //Sign up screen
            'User Name': "Ім'я користувача",
            Location: 'Розташування',
            'Year of birth': 'Рік народження',
            'Years lived in Norway': 'Роки проживання у Норвегії',
            'Sign up': 'підпиши',
            Back: 'Назад',
            Male: 'Чоловічий',
            Female: 'Жіночий',
            Other: 'Інший',

            //Make Group
            'Create new Group': 'Створити нову групу',
            'Choose Image': 'Виберіть Зображення',
            'Group name': 'Назва групи',
            Description: 'Опис',
            'Select language': 'Оберіть мову',
            'Make group': 'Створити групу',
            Title: 'титул',
            'SHOW MORE': 'ПОКАЗАТИ БІЛЬШЕ',
            'SHOW LESS': 'ПОКАЗАТИ МЕНШЕ',
            'Do you want to join': 'Хочете приєднатися',
            Cancel: 'Скасувати',
            Join: 'Приєднуйтесь',
            'Create new post': 'Створити новий пост',
            'Emergency numbers': 'Номери екстреної допомоги',
            Comment: 'коментар',
            'Create comment': 'Створити коментар',
            'Write comment': 'Напишіть коментар',
            'Type a message': 'Введіть повідомлення',
            'New message': 'Нове повідомлення',
            Search: 'Пошук',
            'Save changes': 'Зберегти зміни',
            'Read more': 'Детальніше',
            'Read less': 'Читайте менше',
            'Write some description': 'Напишіть якийсь опис',
            'Enter GroupPost title': 'Введіть назву допису групи',
            'Create post': 'Створити допис',
            'Name of recipient': "Ім'я одержувача"
        }
    },
    no: {
        translation: {
            Home: 'Hjem',
            Groups: 'Grupper',
            Messages: 'Meldinger',
            Wiki: 'Wiki',
            'New in Norway': 'Ny i Norge',
            Family: 'Familie',
            Health: 'Helse',
            Economy: 'Økonomi',
            Sparetime: 'Fritid',
            // Wiki subcategories
            Emergency: 'Nødsituasjon',
            Coronavirus: 'Coronavirus',
            Hospital: 'Sykehus',
            'Useful resources': 'Nyttige ressurser',
            'Brief history': 'Kort historie',
            Job: 'Jobb',
            Education: 'Utdanning',
            Kindergarten: 'Barnehage',
            School: 'Skole',
            Continue: 'Fortsett',
            'register a user': 'Registrer en bruker',
            'Continue without user': 'fortsett uten bruker',
            'User Name': 'Brukernavn',
            Location: 'Sted',
            Language: 'Språk',
            'Year of birth': 'Fødselsår',
            'Years lived in Norway': 'Antall år i Norge',
            'Sign up': 'Registrer',
            Back: 'Tilbake',
            Male: 'Mann',
            Female: 'Kvinne',
            Other: 'Andre',
            'Create new Group': 'Opprett ny gruppe',
            'Choose Image': 'Velg bilde',
            'Group name': 'Gruppenavn',
            Description: 'Beskrivelse',
            'Select language': 'Velg språk',
            Title: 'Tittel',
            'Make group': 'Lag gruppe',
            'SHOW MORE': 'VIS MER',
            'SHOW LESS': 'VIS MINDRE',
            'Do you want to join': 'Oensker du aa bli med i',
            Cancel: 'Avbryt',
            Join: 'Bli med',
            'Create new post': 'Opprett nytt innlegg',
            'Emergency numbers': 'Nødnumre',
            Comment: 'Kommentere',
            'Create comment': 'Legg til kommentar',
            'Write comment': 'Skriv en kommentar',
            'Type a message': 'Skriv inn en melding',
            'New message': 'Ny melding',
            Search: 'Søk',
            'Save changes': 'Lagre endringer',
            'Read more': 'Les mer',
            'Read less': 'Les mindre',
            'Write some description': 'Skriv en beskrivelse',
            'Enter GroupPost title': 'Skriv inn Group Post-tittel',
            'Create post': 'Opprett innlegg',
            'Name of recipient': 'Navn på mottaker'
        }
    },
    fr: {
        translation: {
            Home: 'Maison',
            Groups: 'Groupes',
            Messages: 'Messages',
            Wiki: 'Wiki',
            'New in Norway': 'Nouveau en Norvège',
            Family: 'Famille',
            Health: 'Santé',
            Economy: 'Économie',
            Sparetime: 'Temps libre',
            // Wiki subcategories
            Emergency: 'Urgence',
            Coronavirus: 'Coronavirus',
            Hospital: 'Hôpital',
            'Useful resources': 'Ressources utiles',
            'Brief history': 'Bref historique',
            Job: 'Emploi',
            Education: 'Éducation',
            Kindergarten: "Jardin d'enfants",
            School: "L'école",
            Continue: 'Continuez',
            'register a user': 'Enregistrer un utilisateur',
            'Continue without user': 'Continuer sans utilisateur',
            'User Name': "Nom d'utilisateur",
            Location: 'Lieu',
            Language: 'Langue',
            'Year of birth': 'Année de naissance',
            'Years lived in Norway': 'Des années en Norvège',
            'Sign up': "S'inscrire",
            Back: 'Arrière',
            Male: 'Mâle',
            Female: 'Femelle',
            Other: 'Autre',
            'Create new Group': 'Créer un nouveau groupe',
            'Choose Image': 'Choisir une image',
            'Group name': 'Nom de groupe',
            Description: 'La description',
            'Select language': 'Choisir la langue',
            'Make group': 'Créer un groupe',
            Title: 'Titre',
            'SHOW MORE': 'MONTRE PLUS',
            'SHOW LESS': 'MONTRER MOINS',
            'Do you want to join': 'Veux tu rejoindre',
            Cancel: 'Annuler',
            Join: 'Rejoindre',
            'Create new post': 'Créer un nouveau message',
            'Emergency numbers': "Numéros d'urgence",
            Comment: 'Commenter',
            'Create comment': 'Créer un commentaire',
            'Write comment': 'Rédiger un commentaire',
            'Type a message': 'Tapez un message',
            'New message': 'Nouveau message',
            Search: 'Recherche',
            'Save changes': 'Sauvegarder les modifications',
            'Read more': 'Lire la suite',
            'Read less': 'Lire moins',
            'Write some description': 'Rédigez une description',
            'Enter GroupPost title': 'Entrez le titre de GroupPost',
            'Create post': 'Créer un message',
            'Name of recipient': 'Nom du récipient'
        }
    },

    es: {
        translation: {
            Home: 'Casa',
            Groups: 'Grupos',
            Messages: 'Mensajes',
            Wiki: 'Wiki',
            'New in Norway': 'Nuevo en Noruega',
            Family: 'Familia',
            Health: 'Salud',
            Economy: 'Economía',
            Sparetime: 'Tiempo libre',
            // Wiki subcategories
            Emergency: 'Emergencia',
            Coronavirus: 'Coronavirus',
            Hospital: 'Hospital',
            'Useful resources': 'Recursos útiles',
            'Brief history': 'Breve historia',
            Job: 'Trabajo',
            Education: 'Educación',
            Kindergarten: 'Jardín de infancia',
            School: 'Colegio',
            Continue: 'Continuar',
            'register a user': 'Registrar un usuario',
            'Continue without user': 'Registrar sin usuario',
            'User Name': 'Nombre de usuario',
            Location: 'La localización',
            Language: 'Idioma',
            'Year of birth': 'Año de nacimiento',
            'Years lived in Norway': 'Años vividos en Noruega',
            'Sign up': 'Inscribirse',
            Back: 'Atrás',
            Male: 'Masculino',
            Female: 'Masculina',
            Other: 'Otro',
            'Create new Group': 'Crear nuevo grupo',
            'Choose Image': 'elegir imagen',
            'Group name': 'Nombre del grupo',
            Description: 'Descripción',
            'Select language': 'Elegir el idioma',
            'Make group': 'crear grupo',
            Title: 'Título',
            'SHOW MORE': 'MOSTRAR MÁS',
            'SHOW LESS': 'MUESTRA MENOS',
            'Do you want to join': 'Quieres unirte',
            Cancel: 'Cancelar',
            Join: 'Entrar',
            'Create new post': 'Crear nueva publicación',
            'Emergency numbers': 'Números de emergencia',
            Comment: 'Comentario',
            'Create comment': 'Crear comentario',
            'Write comment': 'escribir comentario',
            'Type a message': 'Escriba un mensaje',
            'New message': 'Nuevo mensaje',
            Search: 'Búsqueda',
            'Save changes': 'Guardar cambios',
            'Read more': 'Lee mas',
            'Read less': 'Leer menos',
            'Write some description': 'Escribe alguna descripción',
            'Enter GroupPost title':
                'Ingrese el título de la publicación del grupo',
            'Create post': 'Crear publicación',
            'Name of recipient': 'Nombre del destinatario'
        }
    },
    عر: {
        translation: {
            Home: 'مسكن',
            Groups: 'مجموعات',
            Messages: 'رسائل',
            Wiki: 'ويكي',
            //Wiki categories
            'New in Norway': 'جديد في النرويج',
            Family: 'الأسرة',
            Health: 'الصحة',
            Economy: 'اقتصاد',
            Sparetime: 'وقت الفراغ',
            SOS: 'نِدَاءُ اسْتِغَاثَة',
            // Wiki subcategories
            Emergency: 'طارئ',
            Coronavirus: 'فيروس كورونا',
            Hospital: 'مستشفى',
            'Useful resources': 'موارد مفيدة',
            'Brief history': 'نبذة تاريخية',
            Job: 'وظيفة',
            Education: 'تعليم',
            Kindergarten: 'روضة أطفال',
            School: 'مدرسة',
            Continue: 'يكمل',
            'register a user': 'تسجيل مستخدم',
            'Continue without user': 'تواصل بدون مستخدم',
            'User Name': 'اسم المستخدم',
            Location: 'موقع',
            Language: 'لغة',
            'Year of birth': 'سنة الميلاد',
            'Years lived in Norway': 'عاش سنوات في النرويج',
            'Sign up': 'اشتراك',
            Back: 'خلف',
            Male: 'ذكر',
            Female: 'أنثى',
            Other: 'آخر',
            'Create new Group': 'إنشاء مجموعة جديدة',
            'Choose Image': 'اختر صورة',
            'Group name': 'أسم المجموعة',
            Description: 'وصف',
            'Select language': 'اختار اللغة',
            'Make group': 'اصنع مجموعة',
            Title: 'عنوان',
            'SHOW MORE': 'أظهر المزيد',
            'SHOW LESS': 'تظهر أقل',
            'Do you want to join': 'هل تود الانضمام',
            Cancel: 'يلغي',
            Join: 'ينضم',
            'Create new post': 'إنشاء منشور جديد',
            'Emergency numbers': 'أرقام الطوارئ',
            Comment: 'تعليق',
            'Create comment': 'إنشاء تعليق',
            'Write comment': 'اكتب تعليق',
            'Type a message': 'اكتب رسالة',
            'New message': 'رسالة جديدة',
            Search: 'بحث',
            'Save changes': 'احفظ التغييرات',
            'Read more': 'اقرأ أكثر',
            'Read less': 'أقرأ أقل',
            'Create post': 'إنشاء وظيفة',
            'Enter GroupPost title': 'أدخل عنوان GroupPost',
            'Write some description': 'اكتب بعض الوصف',
            'Name of recipient': 'اسم المستلم'
        }
    },
    de: {
        translation: {
            Home: 'Zuhause',
            Groups: 'Gruppen',
            Messages: 'Nachrichten',
            Wiki: 'Wiki',
            'New in Norway': 'Neu in Norwegen',
            Family: 'Familie',
            Health: 'Die Gesundheit',
            Economy: 'Wirtschaft',
            Sparetime: 'Freizeit',
            // Wiki subcategories
            Emergency: 'Notfall',
            Coronavirus: 'Coronavirus',
            Hospital: 'Krankenhaus',
            'Useful resources': 'Nützliche Ressourcen',
            'Brief history': 'Kurze Geschichte',
            Job: 'Arbeit',
            Education: 'Bildung',
            Kindergarten: 'Kindergarten',
            School: 'Schule',
            Continue: 'Fortsetzen',
            'register a user': 'Registrieren Sie einen Benutzer',
            'Continue without user': 'Ohne Benutzer fortfahren',
            'User Name': 'Nutzername',
            Location: 'Standort',
            Language: 'Sprache',
            'Year of birth': 'Geburtsjahr',
            'Years lived in Norway': 'Jahre in Norwegen gelebt',
            'Sign up': 'Anmelden',
            Back: 'Zurück',
            Male: 'Männlich',
            Female: 'Weiblich',
            Other: 'Andere',
            'Create new Group': 'Neue Gruppe erstellen',
            'Choose Image': 'Wählen Sie Bild',
            'Group name': 'Gruppenname',
            Description: 'Beschreibung',
            'Select language': 'Select language',
            'Make group': 'Gruppe machen',
            Title: 'Titel',
            'SHOW MORE': 'ZEIG MEHR',
            'SHOW LESS': 'ZEIGE WENIGER',
            'Do you want to join': 'Wollen Sie der Gruppe betreiten: ',
            Cancel: 'Abbrechen',
            Join: 'Beitreten',
            'Create new post': 'Neuen Beitrag schreiben',
            'Emergency numbers': 'Notrufnummern',
            Comment: 'Kommentar',
            'Create comment': 'Kommentar erstellen',
            'Write comment': 'Kommentar schreiben',
            'Type a message': 'Geben Sie eine Nachricht ein',
            'New message': 'Neue Meldung',
            Search: 'Suche',
            'Save changes': 'Änderungen speichern',
            'Read more': 'Weiterlesen',
            'Read less': 'Lese weniger',
            'Create post': 'Beitrag schreiben',
            'Write some description': 'Schreiben Sie eine Beschreibung',
            'Enter GroupPost title': 'Gruppenpost-Titel eingeben',
            'Name of recipient': 'Name des Empfängers'
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // the default language
    fallbackLng: 'en', //english will be used as language, if other language not found
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
