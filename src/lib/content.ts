// Wszystkie treści strony w jednym miejscu.
// To jest "baza danych" tej strony - edytuj te obiekty, żeby zaktualizować treści.
// Po zmianie po prostu commituj i wypychaj na Vercel.

export const site = {
  name: "Rudzka Akademia Rowerowa",
  description:
    "Rudzka Akademia Rowerowa - szkoła jazdy na rowerze dla dzieci, młodzieży i dorosłych. Kursy, treningi i obozy letnie.",
  keywords:
    "akademia rowerowa, jazda na rowerze, kursy rowerowe, szkoła jazdy, obozy letnie, Rudzka",
  themeColor: "#9BC41B",
  url: "https://uksrar.pl",
};

export const contact = {
  phone: "+48 602 480 400",
  phoneHref: "tel:+48602480400",
  email: "biurouksrar@gmail.com",
  emailHref: "mailto:biurouksrar@gmail.com",
};

export const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/rudzka_akademia_rowerowa/",
    icon: "instagram",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@rudzkaakademiarow",
    icon: "tiktok",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/RudzkaAkademiaRowerowa",
    icon: "facebook",
  },
];

export const navLinks = [
  { label: "O nas", href: "/#about" },
  { label: "Oferta dla dzieci i młodzieży", href: "/#oferta" },
  { label: "Galeria", href: "/#galeria" },
  { label: "Poradnik rowerowy", href: "/#news" },
  { label: "Co o nas mówią", href: "/#testimonials" },
  { label: "Wypożyczalnia", href: "/#wypozyczalnia" },
];

export type GalleryImage = {
  src: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/galeria/grupa-nad-jeziorem.jpeg",
    alt: "Zdjęcie grupowe nad jeziorem — Rudzka Akademia Rowerowa",
  },
  {
    src: "/galeria/grupa-w-gorach.jpeg",
    alt: "Grupa rowerowa w górach z rowerami MTB",
  },
  {
    src: "/galeria/grupa-w-pieninach.jpg",
    alt: "Uczestnicy wycieczki rowerowej w Pieninach",
  },
  {
    src: "/galeria/wycieczka-nad-rzeka.jpg",
    alt: "Wycieczka rowerowa nad rzeką wśród skał",
  },
  {
    src: "/galeria/selfie-na-halli.jpeg",
    alt: "Selfie grupy na hali z widokiem na góry",
  },
  {
    src: "/galeria/jazda-o-zachodzie-slonca.jpeg",
    alt: "Jazda grupowa rowerem o zachodzie słońca",
  },
  {
    src: "/galeria/vany-transportowe.jpg",
    alt: "Busy transportowe Rudzkiej Akademii Rowerowej",
  },
];

export const testimonials = [
  {
    id: "testimonial-1",
    name: "Julia Pleck",
    text: "Świetna szkoła rowerowa, dzięki cierpliwym instruktorom szybko nauczyłem się jeździć pewnie i bez stresu.",
  },
  {
    id: "testimonial-2",
    name: "Alexander Spiewack",
    text: "Mam ponad 50 lat i długo odkładałem naukę jazdy na rowerze, ale dzięki spokojnemu podejściu instruktorów w końcu się udało.",
  },
  {
    id: "testimonial-3",
    name: "Victoria Kowalski",
    text: "Na początku bardzo się stresowałam, ale instruktorzy byli super mili i teraz jazda na rowerze daje mi ogromną frajdę.",
  },
];

export const instructors = [
  {
    id: "instructor-1",
    name: "Bartłomiej Warzecha",
    description:
      "Pomysłodawca i założyciel Szkoły Pływania Posejdon, fizjoterapeuta, instruktor pływania i ratownik WOPR z wieloletnim doświadczeniem. Trener personalny, sędzia pływania oraz ratownik kwalifikowanej pierwszej pomocy.",
  },
  {
    id: "instructor-2",
    name: "Marcin Michalik",
    description:
      "Współzałożyciel Szkoły Pływania Posejdon, instruktor pływania i ratownik WOPR z wieloletnim doświadczeniem. Ratownik kwalifikowanej pierwszej pomocy, sternik motorowodny oraz specjalista w zakresie ratownictwa wodnego i powodziowego.",
  },
];

export type NewsPost = {
  slug: string;
  title: string;
  date: string; // ISO
  displayDate: string;
  author: string;
  excerpt: string;
  image?: string;
  contentHtml: string;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "5-wskazowek-na-pierwszy-oboz-rowerowy",
    title: "5 podstawowych wskazówek na Twój pierwszy obóz rowerowy",
    date: "2026-05-08",
    displayDate: "8 maja 2026",
    author: "Rudzka Akademia Rowerowa",
    excerpt:
      "Udział w pierwszym obozie rowerowym może być jednocześnie ekscytujący i nieco stresujący. Wielu rowerzystów zastanawia się, czy będą wystarczająco przygotowani...",
    contentHtml: `
<p>Udział w pierwszym obozie rowerowym może być jednocześnie ekscytujący i nieco stresujący. Wielu rowerzystów zastanawia się, czy będą wystarczająco przygotowani, czy dadzą radę w grupie i czego się spodziewać. Dobra wiadomość jest taka, że obozy rowerowe są tworzone po to, aby pomagać w rozwoju, a nie po to, aby wymagać perfekcji.</p>
<p>Przy odpowiednim przygotowaniu Twój pierwszy obóz może stać się jednym z najbardziej wartościowych doświadczeń w Twojej rowerowej drodze.</p>
<h2>1. Skup się na przygotowaniu, nie na perfekcji</h2>
<p>Nie musisz być w szczytowej formie wyścigowej, aby dobrze wykorzystać obóz rowerowy. Większość obozów uwzględnia różne poziomy zaawansowania i dostosowuje treningi do uczestników.</p>
<p>Najlepszym przygotowaniem jest regularność. Jazda w tygodniach poprzedzających obóz pomoże organizmowi przyzwyczaić się do kilku dni z rzędu na rowerze. Nawet krótsze treningi w tygodniu mogą zrobić dużą różnicę.</p>
<p>Warto również poćwiczyć:</p>
<ul>
<li>jazdę w grupie</li>
<li>utrzymywanie równego tempa na podjazdach</li>
<li>jedzenie i picie podczas jazdy</li>
<li>dłuższe przebywanie w siodle</li>
</ul>
<p>Celem jest pewność i komfort, a nie maksymalna prędkość.</p>
<h2>2. Zadbaj o regenerację</h2>
<p>Wielu rowerzystów popełnia błąd, koncentrując się wyłącznie na objętości treningu podczas obozu. W rzeczywistości regeneracja jest równie ważna.</p>
<p>Sen, nawodnienie i odżywianie bezpośrednio wpływają na wydajność i komfort. Kolejne dni jazdy obciążają organizm, a nawyki regeneracyjne decydują o tym, jak dobrze się adaptujesz.</p>
<p>Proste strategie regeneracyjne obejmują:</p>
<ul>
<li>regularne picie wody w ciągu dnia</li>
<li>spożywanie węglowodanów i białka po treningu</li>
<li>lekkie rozciąganie wieczorem</li>
<li>odpowiednią ilość snu</li>
</ul>
<p>Doświadczeni kolarze często mówią, że regeneracja zaczyna się w momencie zakończenia jazdy.</p>
<h2>3. Jedź we własnym tempie</h2>
<p>Jedną z najważniejszych lekcji w kolarstwie jest nauka unikania ciągłego porównywania się z innymi.</p>
<p>Na obozie zawsze znajdą się osoby, które jadą szybciej lub pokonują dłuższe dystanse. To normalne. Próba dorównania im zbyt wcześnie może prowadzić do zmęczenia i frustracji.</p>
<p>Najlepsze doświadczenia z obozu mają ci, którzy skupiają się na stabilnym postępie i własnej satysfakcji. Trenerzy i przewodnicy zazwyczaj wolą uczestników, którzy mądrze gospodarują siłami niż tych, którzy przesadzają już pierwszego dnia.</p>
<h2>4. Zabierz odpowiedni sprzęt</h2>
<p>Dobrze przygotowany rower sprawia, że całe doświadczenie jest płynniejsze i bezpieczniejsze. Przed obozem warto sprawdzić:</p>
<ul>
<li>stan i ciśnienie opon</li>
<li>działanie hamulców</li>
<li>zużycie i smarowanie łańcucha</li>
<li>pracę przerzutek</li>
<li>komfort siodła</li>
</ul>
<p>Warto też spakować podstawowe rzeczy:</p>
<ul>
<li>zapasową dętkę lub zestaw naprawczy do systemu bezdętkowego</li>
<li>multitool</li>
<li>jedzenie na trasę</li>
<li>lekką kurtkę przeciwdeszczową</li>
<li>okulary przeciwsłoneczne i krem z filtrem</li>
</ul>
<p>Komfort często okazuje się ważniejszy, niż wielu początkujących się spodziewa.</p>
<h2>5. Otwórz się na doświadczenie społeczne</h2>
<p>Obozy rowerowe to nie tylko trening. To także spotkanie ludzi, którzy dzielą tę samą pasję do jazdy.</p>
<p>Niektóre z najlepszych momentów zdarzają się poza rowerem, podczas posiłków, przerw na kawę czy rozmów po długich trasach. Te relacje często stają się ważną częścią tego, co sprawia, że kolarstwo daje tyle satysfakcji.</p>
<p>Otwartość, wsparcie i ciekawość innych mogą sprawić, że doświadczenie będzie znacznie bardziej wartościowe niż skupianie się wyłącznie na wynikach.</p>
<h2>Podsumowanie</h2>
<p>Twój pierwszy obóz rowerowy nie polega na udowadnianiu siły. Chodzi o naukę, odkrywanie i czerpanie radości z procesu stawania się lepszym rowerzystą.</p>
<p>Każdy doświadczony kolarz kiedyś był początkującym, który czuł niepewność przed swoim pierwszym obozem. Najważniejsze jest to, aby pojawić się z gotowością do jazdy, nauki i czerpania radości z doświadczenia.</p>
<p>Forma może poprawić się na wiele miesięcy, ale wspomnienia i pewność siebie często zostają na znacznie dłużej.</p>
`,
  },
  {
    slug: "dlaczego-oboz-rowerowy-zmieni-twoje-podejscie",
    title: "Dlaczego obóz rowerowy może zmienić Twoje podejście do jazdy",
    date: "2026-05-07",
    displayDate: "7 maja 2026",
    author: "Rudzka Akademia Rowerowa",
    excerpt:
      "Dla wielu rowerzystów trening w pojedynkę w pewnym momencie osiąga granicę. Motywacja spada, rutyna staje się powtarzalna, a postępy zwalniają...",
    contentHtml: `
<p>Dla wielu rowerzystów trening w pojedynkę w pewnym momencie osiąga granicę. Motywacja spada, rutyna staje się powtarzalna, a postępy zwalniają. Obóz rowerowy oferuje coś innego, możliwość poprawy kondycji, rozwijania umiejętności i ponownego odkrycia radości z jazdy w skoncentrowanym i wspierającym środowisku.</p>
<p>Niezależnie od tego, czy jesteś początkującym, który chce zyskać pewność siebie, czy doświadczonym kolarzem dążącym do kolejnego poziomu, obóz rowerowy może być jedną z najbardziej wartościowych inwestycji w rozwój.</p>
<h2>Ustrukturyzowany trening bez stresu</h2>
<p>Jedną z największych zalet obozu rowerowego jest jasna struktura. Zamiast planować trasy, zarządzać treningami czy martwić się logistyką, uczestnicy mogą skupić się wyłącznie na jeździe.</p>
<p>Większość obozów jest zaprojektowana tak, aby łączyć wymagające treningi z regeneracją, coachingiem i żywieniem. Taka struktura pozwala trenować efektywniej, jednocześnie zmniejszając zmęczenie psychiczne związane z samodzielnym planowaniem.</p>
<p>Trening w dedykowanym środowisku pozwala również rozwijać regularność. Kolejne dni na rowerze budują wytrzymałość i adaptację w sposób, którego pojedyncze weekendowe przejazdy często nie zapewniają.</p>
<h2>Szybszy rozwój umiejętności</h2>
<p>Obozy rowerowe to nie tylko kondycja, ale także nauka. Jazda z doświadczonymi trenerami i silniejszymi kolarzami daje natychmiastową informację zwrotną i praktyczne doświadczenie.</p>
<p>Uczestnicy często poprawiają:</p>
<ul>
<li>technikę podjazdów</li>
<li>pewność na zjazdach</li>
<li>jazdę w grupie</li>
<li>pokonywanie zakrętów i kontrolę roweru</li>
<li>tempo i zarządzanie energią</li>
</ul>
<p>Te niewielkie poprawki mogą sprawić, że jazda staje się płynniejsza, bezpieczniejsza i bardziej przyjemna.</p>
<p>Wielu rowerzystów jest zaskoczonych tym, jak szybko rośnie pewność siebie podczas kilku dni jazdy w wspierającej grupie.</p>
<h2>Motywacja dzięki społeczności</h2>
<p>Obozy rowerowe łączą ludzi o wspólnej pasji. To poczucie wspólnoty może być niezwykle motywujące.</p>
<p>Trening w grupie tworzy pozytywną energię. Rowerzyści wspierają się podczas trudnych podjazdów, wspólnie świętują osiągnięcia i często budują relacje, które trwają długo po zakończeniu obozu.</p>
<p>Badania nad ćwiczeniami grupowymi pokazują, że środowisko społeczne zwiększa przyjemność i zaangażowanie w aktywność fizyczną (Yorks i in., 2017). W obozach rowerowych ta dynamika często pomaga uczestnikom przekraczać własne granice.</p>
<h2>Mentalny reset i przygoda</h2>
<p>Współczesne życie często zdominowane jest przez ekrany, harmonogramy i ciągłe rozproszenia. Obozy rowerowe oferują rzadką okazję do odłączenia się od codziennego stresu i skupienia na ruchu, naturze i regeneracji.</p>
<p>Długie przejazdy przez malownicze krajobrazy dają poczucie jasności umysłu, które wielu rowerzystów opisuje jako terapeutyczne. Połączenie wysiłku fizycznego, środowiska naturalnego i kontaktu społecznego może znacząco poprawić nastrój i obniżyć poziom stresu.</p>
<p>Dla wielu uczestników doświadczenie to bardziej przypomina aktywny wypoczynek niż trening.</p>
<h2>Nauka znaczenia regeneracji i żywienia</h2>
<p>Dobry obóz rowerowy uczy, że wydajność to nie tylko jazda na rowerze. Równie ważne są regeneracja, sen, nawodnienie i odżywianie.</p>
<p>Rowerzyści często wyjeżdżają z obozu z lepszym zrozumieniem:</p>
<ul>
<li>żywienia przed i w trakcie jazdy</li>
<li>strategii regeneracji</li>
<li>nawyków nawodnienia</li>
<li>zarządzania intensywnością treningu</li>
</ul>
<p>Te lekcje często prowadzą do długoterminowej poprawy wyników po powrocie do domu.</p>
<h2>Tworzenie trwałych wspomnień</h2>
<p>Poza korzyściami treningowymi obozy rowerowe tworzą niezapomniane doświadczenia. Uczestnicy pamiętają górskie podjazdy, wczesne poranki, przerwy na kawę, wspólne posiłki i poczucie satysfakcji po trudnych trasach.</p>
<p>Takie doświadczenia często na nowo rozpalają pasję do jazdy na rowerze. Wiele osób wraca do domu nie tylko silniejszych, ale też bardziej zmotywowanych.</p>
<h2>Podsumowanie</h2>
<p>Obóz rowerowy to więcej niż tydzień treningu. To okazja do nauki, rozwoju, budowania relacji i regeneracji.</p>
<p>Połączenie struktury treningowej, wsparcia ekspertów, społeczności i pięknego otoczenia tworzy środowisko, w którym rowerzyści mogą rozwijać się zarówno fizycznie, jak i mentalnie.</p>
<p>Czasem kilka dni na rowerze może zmienić sposób, w jaki jeździsz, na wiele lat.</p>
`,
  },
  {
    slug: "korzysci-z-jazdy-na-rowerze-razem",
    title: "Korzyści z jazdy na rowerze razem!",
    date: "2026-04-28",
    displayDate: "28 kwietnia 2026",
    author: "Rudzka Akademia Rowerowa",
    excerpt:
      "Jazda na rowerze często postrzegana jest jako aktywność indywidualna. Jednak wspólna jazda może przekształcić rower w coś znacznie bardziej wartościowego...",
    contentHtml: `
<p>Jazda na rowerze często postrzegana jest jako aktywność indywidualna, okazja do oczyszczenia umysłu, podjęcia wyzwania lub po prostu przemieszczania się z miejsca na miejsce. Jednak wspólna jazda może przekształcić rower w coś znacznie bardziej wartościowego. Niezależnie od tego, czy jeździsz z przyjaciółmi, rodziną, partnerem czy lokalnym klubem rowerowym, wspólne pedałowanie przynosi korzyści fizyczne, psychiczne i społeczne, które wykraczają daleko poza samą aktywność fizyczną.</p>
<h3>Większa motywacja i regularność</h3>
<p>Jedną z największych zalet wspólnej jazdy jest odpowiedzialność wobec innych. Łatwiej jest utrzymać regularność treningów, gdy ktoś na nas czeka. Wspólne przejazdy tworzą strukturę i motywację, szczególnie w dni, gdy brakuje energii lub pogoda nie zachęca do wyjścia.</p>
<p>Badania konsekwentnie pokazują, że ludzie częściej utrzymują aktywność fizyczną, gdy ćwiczą w środowisku społecznym. Wsparcie społeczne zwiększa zarówno przyjemność, jak i długoterminową regularność aktywności fizycznej (Carron, Hausenblas i Mack, 1996).</p>
<p>Partnerzy rowerowi wzajemnie motywują się także do rozwoju. Spokojne weekendowe przejazdy mogą z czasem przerodzić się w dłuższe wyprawy, większą pewność siebie i lepszą kondycję.</p>
<h3>Lepsze samopoczucie psychiczne</h3>
<p>Jazda na rowerze wiąże się ze zmniejszeniem stresu, poprawą nastroju oraz obniżeniem poziomu lęku i depresji. Dodanie elementu społecznego wzmacnia te efekty.</p>
<p>Wspólne doświadczenia tworzą więzi emocjonalne. Rozmowy podczas jazdy, wspólne osiągnięcia i pokonywanie trudności pomagają naturalnie budować relacje. W przeciwieństwie do rozmów twarzą w twarz w kawiarni, jazda obok siebie często sprawia, że komunikacja staje się łatwiejsza i bardziej swobodna.</p>
<p>Aktywność na świeżym powietrzu w grupie jest szczególnie korzystna dla zdrowia psychicznego, ponieważ łączy ruch, świeże powietrze, światło słoneczne i kontakt społeczny, wszystkie czynniki powiązane z dobrostanem psychicznym (Pretty i in., 2005).</p>
<h3>Większe bezpieczeństwo i pewność siebie</h3>
<p>Jazda w grupie może również zwiększać bezpieczeństwo. Kierowcy częściej zauważają grupy rowerzystów niż pojedyncze osoby. W nieznanych miejscach wspólna jazda zmniejsza stres związany z nawigacją i ewentualnymi problemami technicznymi.</p>
<p>Dla początkujących jazda grupowa oferuje wspierające środowisko do budowania pewności siebie. Mniej doświadczeni rowerzyści mogą uczyć się zasad ruchu drogowego, tempa jazdy, techniki oraz podstaw serwisowania roweru od bardziej doświadczonych uczestników.</p>
<h3>Silniejsze relacje</h3>
<p>Niewiele aktywności tak naturalnie tworzy czas wysokiej jakości jak wspólna jazda na rowerze. Telefony są odłożone, rozpraszacze znikają, a wszyscy dzielą tę samą trasę.</p>
<p>Pary często wykorzystują jazdę na rowerze jako sposób na aktywne spędzanie czasu razem. Rodziny zamieniają przejażdżki w małe przygody, a przyjaciele mogą się ponownie zbliżyć bez formalnych planów. Wspólne doświadczenia fizyczne wzmacniają zaufanie i współpracę, ponieważ ludzie dążą do wspólnego celu.</p>
<p>Dłuższe trasy tworzą także wspomnienia, nieoczekiwaną pogodę, piękne widoki, postoje w kawiarniach czy momenty zmęczenia, które później stają się historiami.</p>
<h3>Bardziej zrównoważony styl życia</h3>
<p>Wspólna jazda na rowerze może sprzyjać bardziej ekologicznym nawykom. Gdy społeczności normalizują rower jako środek transportu i rekreacji, ludzie częściej rezygnują z samochodu na krótkich dystansach.</p>
<p>Kultura jazdy grupowej promuje zrównoważony rozwój, lokalną eksplorację i zdrowsze życie miejskie. Miasta z silną kulturą rowerową często charakteryzują się mniejszymi korkami i lepszym zdrowiem publicznym (Pucher i Buehler, 2010).</p>
<h3>Rower buduje społeczność</h3>
<p>Być może największą korzyścią wspólnej jazdy jest poczucie przynależności. Lokalne grupy rowerowe często stają się społecznościami, w których ludzie w różnym wieku i o różnych doświadczeniach łączą się dzięki wspólnej pasji.</p>
<p>Takie społeczności zapewniają wsparcie, przyjaźń i motywację wykraczającą poza samą jazdę. Dla wielu osób wspólne przejazdy stają się ważnym elementem życia społecznego.</p>
<p><strong>Podsumowanie</strong></p>
<p>Wspólna jazda na rowerze to coś więcej niż aktywność fizyczna. Łączy ruch, rozmowę, przygodę i relacje w sposób, który rzadko oferują inne formy aktywności. Niezależnie od tego, czy jest to krótka wieczorna przejażdżka z przyjaciółmi, czy dłuższa wyprawa z klubem rowerowym, jazda razem poprawia zdrowie, wzmacnia relacje i sprawia, że ruch staje się czymś, na co naprawdę się czeka.</p>
<p>Czasem najważniejsze w jeździe na rowerze nie jest cel, ale to, kto jedzie obok nas.</p>
`,
  },
];

export const faq = [
  {
    question: "Dla kogo są Wasze obozy i wycieczki?",
    answer:
      "Organizujemy wycieczki rowerowe oraz obozy letnie dla dzieci i młodzieży, a także wydarzenia dla osób dorosłych. Celem jest wspólna jazda, aktywność na świeżym powietrzu i budowanie rowerowej społeczności.",
  },
  {
    question: "Jak zapisać się na wydarzenie?",
    answer:
      "Terminy znajdziesz w kalendarzu na stronie. Aby zapisać się na wydarzenie, napisz na biurouksrar@gmail.com albo skorzystaj z formularza kontaktowego. Możesz też zadzwonić pod +48 602 480 400.",
  },
  {
    question: "Czy można wypożyczyć przyczepę rowerową?",
    answer:
      "Tak. Przyczepę rowerową możesz zarezerwować bezpośrednio na stronie — sprawdź dostępność w kalendarzu i złóż rezerwację. W razie pytań napisz lub zadzwoń, chętnie pomożemy.",
  },
];
