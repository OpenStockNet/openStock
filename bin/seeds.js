const mongoose = require("mongoose");
const Category = require("../models/Category.model");
const App = require("../models/App.model");

mongoose.connect("mongodb://localhost/openstock", { useNewUrlParser: true });

/* const categories = [
  {
    name: "Browser",
    icon: "/images/categories/iconBrowser.svg",
  },
  {
    name: "Search Engine",
    icon: "/images/categories/iconSearchEngine.svg",
  },
  {
    name: "Messenger",
    icon: "/images/categories/iconMessenger.svg",
  },
  {
    name: "E-Mail Provider",
    icon: "/images/categories/iconEMail.svg",
  },
  {
    name: "Online Streaming",
    icon: "/images/categories/iconOnlineStreaming.svg",
  },
  {
    name: "Navigation",
    icon: "/images/categories/iconNavigation.svg",
  },
]; */

const apps = [
  // BROWSERS ////////////////////////////////////////////////////////////

  {
    logo: "/images/logos/logoFirefox.svg",
    name: "Firefox",
    description:
      "Mozilla Firefox, or simply Firefox, is a free and open-source web browser developed by the Mozilla Foundation and its subsidiary, Mozilla Corporation. Firefox uses the Gecko layout engine to render web pages, which implements current and anticipated web standards. Firefox shows you how many data-collecting trackers are blocked with Enhanced Tracking Protection. It's alerts you if we know your information is a part of another company’s data breach and makes the passwords you save in Firefox secure and available on all your devices.",
    category: "5ec3f4b4acf2b8e9dd1a3388",
    website: "https://www.mozilla.org/",
    device: ["iOS", "Android", "Desktop"],
  },

  {
    logo: "/images/logos/logoBrave.svg",
    name: "Brave",
    description:
      "Brave is a free and open-source web browser developed by Brave Software, Inc. based on the Chromium web browser. It blocks ads and website trackers, and provides a way for users to send cryptocurrency contributions in the form of Basic Attention Tokens to websites and content creators. Brave shields your privacy by blocking data-grabbing ads and trackers allowing you to browse freely. Blocking harmful ads and trackers means a faster Internet",
    category: "5ec3f4b4acf2b8e9dd1a3388",
    website: "https://brave.com/",
    device: ["iOS", "Android", "Desktop"],
  },

  {
    logo: "/images/logos/logoDuckDuckGo.svg",
    name: "Duck Duck Go",
    description:
      "DuckDuckGo Privacy Browser is an open-source web browser that has built-in ad and tracker blocking. It emphasises protecting searchers' privacy and avoiding the filter bubble of personalised search results. DuckDuckGo distinguishes itself from other search engines by not profiling its users and by showing all users the same search results for a given search term.",
    category: "5ec3f4b4acf2b8e9dd1a3388",
    website: "https://duckduckgo.com/",
    device: ["iOS", "Android", "Desktop"],
  },

  {
    logo: "/images/logos/logoVivaldi.svg",
    name: "Vivaldi",
    description:
      "Vivaldi is a freeware, cross-platform web browser developed by Vivaldi Technologies. The new Vivaldi browser protects you from trackers, blocks unwanted ads, and puts you in control with unique built-in features. Websites you visit, cookies and temporary files will not be stored by Vivaldi when you browse in a Private Window.",
    category: "5ec3f4b4acf2b8e9dd1a3388",
    website: "https://vivaldi.com/",
    device: ["Desktop"],
  },

  {
    logo: "/images/logos/logoTor.svg",
    name: "Tor",
    description:
      "Tor is free and open-source software for enabling anonymous communication. Tor directs Internet traffic through a free, worldwide, volunteer overlay network consisting of more than seven thousand relays to conceal a user's location and usage from anyone conducting network surveillance or traffic analysis. Using Tor makes it more difficult to trace Internet activity to the user: this includes visits to Web sites, online posts, instant messages, and other communication forms. Tor is intended use is to protect the personal privacy of its users, as well as their freedom and ability to conduct confidential communication by keeping their Internet activities unmonitored.",
    category: "5ec3f4b4acf2b8e9dd1a3388",
    website: "https://www.torproject.org/",
    device: ["Android", "Desktop"],
  },

  {
    logo: "/images/logos/logoBromite.svg",
    name: "Bromite",
    description:
      "Bromite is a Chromium-based browser with privacy and security enhancements, built-in adblocking and DNS over HTTPS support; it includes patches from ungoogled-chromium and other privacy-focused projects. It's main goal is to provide a no-clutter browsing experience without privacy-invasive features and with the addition of a fast ad-blocking engine. They use a minimal UI changes are applied to help curbing the idea of browser as an advertisement platform.",
    category: "5ec3f4b4acf2b8e9dd1a3388",
    website: "https://www.bromite.org/",
    device: ["Android"],
  },

  // SEARCH ENGINE ////////////////////////////////////////////////////////////

  {
    logo: "/images/logos/logoStartpage.svg",
    name: "Startpage",
    description:
      "Uses Google technology without the tracking, to provide an anonymous and smooth browsing experience. It offers robust search results, customizable settings, and leading consumer privacy protection features. The experience is very straight-forward and their search results are consistently more relevant than other private search engines. Startpage does exceptionally well in the area of user privacy. It does not track, log any user data or share information with third parties. Lastly, Startpage offers a very useful private browsing feature called “Anonymous View.” With this proxy feature, users can view images, videos, news, and entire websites with no tracking or trace.",
    category: "5ec3f4b4acf2b8e9dd1a3389",
    website: "https://startpage.com/",
    device: ["In browser"],
  },

  {
    logo: "/images/logos/logoSearx.svg",
    name: "Searx",
    description:
      "Searx is an open-source, self-hostable, metasearch engine, aggregating the results of other search engines while not storing information about its users. It gathers results from popular search engines and combines them and removes any identifying data from your request so that Google and other sites receive the search phrase as an anonymous request. Searx is also available as a Firefox extension so can use it without navigating to the Searx.me homepage.",
    category: "5ec3f4b4acf2b8e9dd1a3389",
    website: "https://searx.me/",
    device: ["In browser"],
  },

  {
    logo: "/images/logos/logoDuckDuckGo.svg",
    name: "Duck Duck Go - Search",
    description:
      "The best known service that markets itself as a private search engine, DuckDuckGo is a powerful metasearch tool that gathers results from over 400 sources, including Yahoo, Bing, and Wikipedia. It's not as private as others since it saves search histories, although it claims that such saving is “non-personal” and aggregate, so that your searches can’t be tied directly to you. In addition, it makes money from commissions paid by affiliate e-commerce sites like Amazon and eBay.",
    category: "5ec3f4b4acf2b8e9dd1a3389",
    website: "https://duckduckgo.com/",
    device: ["In browser"],
  },

  {
    logo: "/images/logos/logoEcosia.svg",
    name: "Ecosia",
    description:
      "Ecosia is a green search engine that donates at least 80% of its profits from search ad revenue and online shopping to a reforestation program, currently in Burkina Faso. In November 2015 Ecosia celebrated 3 million planted trees and $5 Million donated for the environment. Ecosia is also available on mobile, find the app in the Google Play Store or the iOS App Store.",
    category: "5ec3f4b4acf2b8e9dd1a3389",
    website: "https://www.ecosia.org/",
    device: ["iOS", "Android", "Desktop"],
  },

  {
    logo: "/images/logos/logoQwant.svg",
    name: "Qwant",
    description:
      "Qwant is a European web search engine, launched in July 2013 and operated from Paris. It is the only EU-based search engine with its own indexing engine. It claims not to employ user tracking and doesn't personalize search results in order to avoid trapping users in a filter bubble. It is available in 13 languages.",
    category: "5ec3f4b4acf2b8e9dd1a3389",
    website: "https://www.qwant.com/",
    device: ["iOS", "Android", "Desktop", "In browser"],
  },

  {
    logo: "/images/logos/logoSwisscows.svg",
    name: "Swisscows",
    description:
      "Swisscows is the data-safe search engine and the absolute alternative to Google. Swisscows does not monitor and does not store any data. In addition, Swisscows is family-friendly and child-friendly, unlike Startpage and Duckduckgo. Swisscows does not provide any results with pornographic content.",
    category: "5ec3f4b4acf2b8e9dd1a3389",
    website: "https://swisscows.com/",
    device: ["iOS", "Android", "In browser"],
  },

  // MESSENGER ////////////////////////////////////////////////////////////

  {
    logo: "/images/logos/logoSignal.svg",
    name: "Signal",
    description:
      "Signal is a mobile app developed by Signal Messenger LLC. The app provides instant messaging, as well as voice and video calling. All communications are state-of-the-art end-to-end encrypted (powered by the open source Signal Protocol) keeping your conversations secure. There are no ads, no affiliate marketers, and no creepy tracking in Signal.",
    category: "5ec3f4b4acf2b8e9dd1a338a",
    website: "https://signal.org/",
    device: ["iOS", "Android", "Desktop", "In browser"],
  },

  {
    logo: "/images/logos/logoTelegram.svg",
    name: "Telegram",
    description:
      "Telegram is a messaging app created by former Small VK iconVK creators with a focus on speed and security. It's superfast, simple and free. It is like SMS, but more powerful. You can send messages, photos and videos to people who are in your phone contacts (and have Telegram). You can also create groups for up to 20000 people or channels for unlimited subscribers.",
    category: "5ec3f4b4acf2b8e9dd1a338a",
    website: "https://telegram.org/",
    device: ["iOS", "Android", "Desktop"],
  },

  {
    logo: "/images/logos/logoTox.svg",
    name: "Tox",
    description:
      "Tox is built with the idea that you can keep up with friends and family without having your privacy violated. While other big-name services require you to pay to unlock features, Tox is free in both price, and in liberty. That is, you're free to do whatever you wish with Tox..",
    category: "5ec3f4b4acf2b8e9dd1a338a",
    website: "https://tox.chat/",
    device: ["iOS", "Android", "Desktop"],
  },

  {
    logo: "/images/logos/logoRiotIm.svg",
    name: "Riot.im",
    description:
      "Riot is an opensource interoperable app running on Web, iOS and Android. It is built around chat rooms, both public and private and provides messaging, filesharing, voice and video conferencing (beta on Android and web), integrations to tools like GitHub, Jira, Jenkins and much more soon. Riot is built on the Small Matrix.org iconMatrix.org open standard which provides bridges to other systems such as Slack, IRC and a lot more soon. One can use the hosted service or run their own.",
    category: "5ec3f4b4acf2b8e9dd1a338a",
    website: "https://about.riot.im/",
    device: ["iOS", "Android", "Desktop", "In browser"],
  },

  {
    logo: "/images/logos/logoJitsi.svg",
    name: "Jitsi",
    description:
      "Jitsi (previously SIP Communicator) is an audio/video and chat communicator with full encryption that supports protocols such as SIP, XMPP/Jabber, ICQ/AIM, Windows Live, Yahoo!, GTalk/Hangouts extensions, as well as OTR, ZRTP, etc. It can handle every firewall, and has many other useful features. Jitsi is completely open source / free software, and is freely available under the terms of the GNU Lesser General Public License. It can run on your own server.",
    category: "5ec3f4b4acf2b8e9dd1a338a",
    website: "https://jitsi.org/",
    device: ["iOS", "Android", "In browser"],
  },

  {
    logo: "/images/logos/logoMatrixOrg.svg",
    name: "Matrix.org",
    description:
      "Matrix defines a set of open APIs for decentralised communication, suitable for securely publishing, persisting and subscribing to data over a global open federation of servers with no single point of control. Uses include Instant Messaging (IM), Voice over IP (VoIP) signalling, Internet of Things (IoT) communication, and bridging together existing communication silos - providing the basis of a new open real-time communication ecosystem.",
    category: "5ec3f4b4acf2b8e9dd1a338a",
    website: "https://matrix.org/",
    device: ["iOS", "Android", "Desktop", "In browser"],
  },

  // E-MAIL PROVIDER ////////////////////////////////////////////////////////////

  {
    logo: "/images/logos/logoProtonMail.svg",
    name: "ProtonMail",
    description:
      "ProtonMail is an end-to-end encrypted email service founded in 2013 at the CERN research facility by Andy Yen, Jason Stockman, and Wei Sun. ProtonMail uses client-side encryption to protect email content and user data before they are sent to ProtonMail servers, unlike other common email providers such as Gmail and Outlook.com. The service can be accessed through a webmail client, the Tor network, or dedicated iOS and Android apps.",
    category: "5ec3f4b4acf2b8e9dd1a338b",
    website: "https://protonmail.com/",
    device: ["iOS", "Android", "In browser"],
  },
  {
    logo: "/images/logos/logoThunderbird.svg",
    name: "Thunderbird",
    description:
      "Thunderbird is a free, open source, cross-platform email, newsgroup, news feed, and chat (XMPP, IRC, Twitter) client developed by the Thunderbird community, and previously by the Mozilla Foundation. One of the core principles of Thunderbird is the use and promotion of open standards - this focus is a rejection of our world of closed platforms and services that can’t communicate with each other. We want our users to have freedom and choice in how they communicate.",
    category: "5ec3f4b4acf2b8e9dd1a338b",
    website: "https://www.thunderbird.net",
    device: ["In browser"],
  },

  {
    logo: "/images/logos/logoZohoMail.svg",
    name: "Zoho Mail",
    description:
      "Zoho Mail is a webmail service built with the needs of a modern business in mind. It provides features for business users to communicate effectively while catering to the customization and mailbox management needs of IT administrators. Additionally, Zoho Mail is integrated with 20+ other Zoho applications. Zoho Mail is also available as Email and Calendar app for Android and iOS. Schedule your day better with calendar and organize your contacts easily.",
    category: "5ec3f4b4acf2b8e9dd1a338b",
    website: "https://www.zoho.com/mail/",
    device: ["iOS", "Android", "Desktop", "In browser"],
  },

  {
    logo: "/images/logos/logoYandexMail.svg",
    name: "Yandex.Mail",
    description:
      "Yandex.Mail for mobile is an inbox in your pocket which provides secure protection from spam and viruses. You can use Mail without an internet connection. For example, if you lose your connection in the metro, you can continue reading your messages and reply to them. When you're back online, those messages will be automatically sent. The app supports using several inboxes at the same time, including Yandex.Mail for domains. You can read all your messages on one device by switching between profiles.",
    category: "5ec3f4b4acf2b8e9dd1a338b",
    website: "https://mail.yandex.com/",
    device: ["iOS", "Android"],
  },

  {
    logo: "/images/logos/logoPosteo.svg",
    name: "Posteo",
    description:
      "Posteo.de is an email provider that focuses on anonymous, secure, and private email. Their servers are powered by 100% sustainable energy. Web- and IMAP-based email service. 2GB cost 1€/month. Information is hosted on encrypted hard drives. Electricity from renewable resources is used.",
    category: "5ec3f4b4acf2b8e9dd1a338b",
    website: "https://posteo.de/en",
    device: ["In browser"],
  },

  {
    logo: "/images/logos/logoFastmail.svg",
    name: "Fastmail",
    description:
      "Fastmail provides one of the most secure and reliable email environments in the industry. Rock Solid Reliability. More safety. It's a secure email that uses webmail, IMAP, POP and SMTP. It has secure DAV file access, FTP and LDAP access to Address Book",
    category: "5ec3f4b4acf2b8e9dd1a338b",
    website: "https://www.fastmail.com/",
    device: ["iOS", "Android", "In browser"],
  },

  // ONLINE STREAMING ////////////////////////////////////////////////////////////

  {
    logo: "/images/logos/logoStremio.svg",
    name: "Stremio",
    description:
      "Media center allowing to watch movies, series, YouTube channels instantly. You can watch in HD, with subtitles, and easily cast any file to TV through DLNA, Chromecast, AppleTV! Stremio also gives you notifications for new episodes / movies.",
    category: "5ec3f4b4acf2b8e9dd1a338c",
    website: "https://www.stremio.com/",
    device: ["Desktop"],
  },

  {
    logo: "/images/logos/logoPlutoTV.svg",
    name: "PlutoTV",
    description:
      "Pluto TV is the leading free-streaming TV service in America, which is now gradually conquering the European market. In collaboration with major TV stations, film studios, publishers and digital media companies. It offers more than 100 live channels as well as thousands of films and series on demand. Pluto TV is available on all mobile, internet and TV streaming devices. Millions of viewers tune in every month to watch premium news, television programs, films, digital trend series and formats from the areas of sport, lifestyle and much more. to see. Pluto TV is headquartered in Los Angeles and has offices in New York, Silicon Valley, Chicago and Berlin.",
    category: "5ec3f4b4acf2b8e9dd1a338c",
    website: "https://www.de-landing.corp.pluto.tv/",
    device: ["iOS", "Android", "Desktop"],
  },

  {
    logo: "/images/logos/logoTubiTV.svg",
    name: "Tubi TV",
    description:
      "Movies and Television Free. Watch thousands of hit movies and TV series for free. Tubi is 100% legal unlimited streaming, with no credit cards and no subscription required. Choose what you want to watch, when you want to watch it, with fewer ads than regular TV. Tubi is the largest free streaming service featuring award-winning movies and TV series. There is something for everybody; from comedy to drama, kids to classics, and niche favorites such as Korean dramas, anime, and British series.",
    category: "5ec3f4b4acf2b8e9dd1a338c",
    website: "https://gdpr.tubi.tv/",
    device: ["iOS", "Android", "Desktop"],
  },

  {
    logo: "/images/logos/logoSnagfilms.svg",
    name: "Snagfilms",
    description:
      "SnagFilms is committed to finding the world's most compelling independent films, whether from established heavyweights or first-time filmmakers, and making them available to the wide audience these titles deserve. SnagFilm is a website where you can watch full-length documentary and narrative films for free, but we're also a platform that lets you snag a film and put it anywhere on the web. With a library of over 3,000 films, and rapidly growing, you're bound to find films that resonate with your interests. We make it easy for you to find a film that shines a light on a cause you care about. You can then open a virtual movie theater on any web site, so any one can watch your favorite SnagFilms for free.",
    category: "5ec3f4b4acf2b8e9dd1a338c",
    website: "http://www.snagfilms.com/",
    device: ["Desktop"],
  },

  {
    logo: "/images/logos/logoPlayary.svg",
    name: "Playary",
    description:
      "Watch video clips from youtube and listen music. Playary collects and organizes music videos from Youtube and serves with music player UI. Our song database is growing day by day. We add new musics and albums every day. Playary Movies collects best short films around the internet. We will provide nice looking UI to watch films. Playary has Playary for Artist program. Playary for Artists is platform to connect with fans, share your sounds, and grow your audience. Playary for Podcasters is platform to share your podcasts, and grow your audience.",
    category: "5ec3f4b4acf2b8e9dd1a338c",
    website: "https://www.playary.com/",
    device: ["Desktop"],
  },

  {
    logo: "/images/logos/logoBast.svg",
    name: "Bast",
    description:
      "Welcome to the simplest way to discover the latest top trending viral videos that the Internet (YouTube) has to offer. Bast, named after the ancient god of entertainment (Bastat), uses advanced algorithms to round up the most watched viral videos and allow you to see what's trending before anyone else. You can watch the tendring and viral videos of the web and filter them. You can save videos to a favorites list and watch them later and also share videos through Facebook, Twitter, Google and more.",
    category: "5ec3f4b4acf2b8e9dd1a338c",
    website: "http://screechstudios.com/bast/",
    device: ["Android", "Desktop"],
  },

  // NAVIGATION ////////////////////////////////////////////////////////////

  {
    logo: "/images/logos/logoMapbox.svg",
    name: "Mapbox",
    description:
      "Mapbox makes it easy to design beautiful custom maps, and fast to integrate them into websites and mobile applications using Open Street Map data. Mapbox is the location data platform for mobile and web applications. We provide building blocks to add location features like maps, search, and navigation into any experience you create. Through the apps Mapbox powers, we reach more than 600 million people each month.",
    category: "5ec3f4b4acf2b8e9dd1a338d",
    website: "https://www.mapbox.com/navigation/",
    device: ["In browser"],
  },

  {
    logo: "/images/logos/logoOpenStreetMap.svg",
    name: "OpenStreetMap",
    description:
      "OpenStreetMap is a project aimed squarely at creating and providing free geographic data such as street maps to anyone who wants them. It is a free editable map of the whole world. It is made by people like you. It allows you to view, edit and use geographical data in a collaborative way from anywhere on Earth.",
    category: "5ec3f4b4acf2b8e9dd1a338d",
    website: "https://www.openstreetmap.org/#map=6/51.317/10.448",
    device: ["In browser"],
  },

  {
    logo: "/images/logos/logoLeaflet.svg",
    name: "Leaflet",
    description:
      "Leaflet is a modern open-source JavaScript library for mobile-friendly interactive maps. It is developed by Vladimir Agafonkin with a team of dedicated contributors. Weighing just about 28 KB of JS code, it has all the features most developers ever need for online maps. Leaflet is designed with simplicity, performance and usability in mind. It works efficiently across all major desktop and mobile platforms out of the box, taking advantage of HTML5 and CSS3 on modern browsers while still being accessible on older ones. It can be extended with many plugins, has a beautiful, easy to use and well-documented API and a simple, readable source code that is a joy to contribute to.",
    category: "5ec3f4b4acf2b8e9dd1a338d",
    website: "https://leafletjs.com/",
    device: ["In browser"],
  },

  {
    logo: "/images/logos/logoMapCat.svg",
    name: "MAPCAT.com",
    description:
      "Watch your location-based data come to life. Mapcat offers mapping services to any business size. Easy installation to any platform; public websites, internal systems or mobile applications. You can make advanced searchs and POI management, have multi-profile directions and Geocoding and reverse geocoding. It's a fast map matching with data services.",
    category: "5ec3f4b4acf2b8e9dd1a338d",
    website: "https://www.mapcat.com/",
    device: ["In browser"],
  },

  {
    logo: "/images/logos/logoMapsMe.svg",
    name: "MAPS.ME",
    description:
      "MAPS.ME offers the quickest offline maps of all the countries of the world. Travel with full confidence: wherever you are, MAPS.ME addresses all your offline mapping needs. You can get a map of any country and any place you can think of, from the largest cities to small villages all over the world.",
    category: "5ec3f4b4acf2b8e9dd1a338d",
    website: "https://maps.me/",
    device: ["iOS", "Android"],
  },

  {
    logo: "/images/logos/logo2GIS.svg",
    name: "2GIS",
    description:
      "2GIS provides 3D-maps of 180+ cities, contacts of 1.5 million companies, car routing and public transport routes and and more! 2GIS is a complete and up-to-date directory of organizations with detailed cities' maps. 2GIS — Offline maps and business listings. Verified information about restaurants, bars, hotels and any location with photo and review. Helpful travel guide. Navigation: get car directions, public transport routes including metro.",
    category: "5ec3f4b4acf2b8e9dd1a338d",
    website: "https://2gis.ae/dubai",
    device: ["iOS", "Android"],
  },
];

function dbSeed() {
  /* categories.forEach((category) => {
    Category.create(category).catch((error) => console.log(error));
  }); */
  apps.forEach((app) => {
    App.create(app).catch((error) => console.log(error));
  });
}
dbSeed();
