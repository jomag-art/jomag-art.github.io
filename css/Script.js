// --- 1. NAVIGATION & BURGER-MENÜ ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

// Toggle-Funktion für das Burger-Menü
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Menü automatisch schließen, wenn ein Link geklickt wird
document.querySelectorAll(".nav-link").forEach(link => 
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    })
);


// --- 2. ERWEITERTE LIGHTBOX MIT SLIDER-FUNKTION ---
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("caption");

// Wir laden alle Galerie-Bilder in ein Array, um darin blättern zu können
// Es erkennt sowohl die Vorschaubilder auf der Startseite als auch die in den Kategorien
const images = Array.from(document.querySelectorAll(".work-item img, .category-item img, .gallery-img"));
let currentIndex = 0;

// Event-Listener für jedes Bild zum Öffnen der Lightbox
images.forEach((img, index) => {
    img.addEventListener("click", (e) => {
        // Verhindert, dass bei Kategorie-Links (Startseite) die Seite sofort wechselt
        if (img.closest('.category-item')) {
            // Wenn du willst, dass man auf der Startseite direkt zur HTML-Seite kommt, 
            // entferne das e.preventDefault(). Wenn die Lightbox dort auch kommen soll, lass es so.
            // e.preventDefault(); 
        }
        
        currentIndex = index;
        updateLightbox();
        lightbox.style.display = "flex";
    });
});

// Funktion, die das Bild und den Text in der Lightbox aktualisiert
function updateLightbox() {
    const currentImg = images[currentIndex];
    lbImg.src = currentImg.src;
    captionText.innerHTML = currentImg.alt; // Nutzt den Alt-Tag als Beschriftung
}

// --- 3. STEUERUNG (Pfeile & Schließen) ---

// Klick auf den rechten Pfeil (Nächstes Bild)
document.querySelector(".next")?.addEventListener("click", (e) => {
    e.stopPropagation(); // Verhindert, dass die Lightbox schließt
    currentIndex = (currentIndex + 1) % images.length; // Geht am Ende wieder zu Bild 0
    updateLightbox();
});

// Klick auf den linken Pfeil (Vorheriges Bild)
document.querySelector(".prev")?.addEventListener("click", (e) => {
    e.stopPropagation(); // Verhindert, dass die Lightbox schließt
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Geht am Anfang zum letzten Bild
    updateLightbox();
});

// Schließen beim Klick auf das 'X'
document.querySelector(".close")?.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Schließen beim Klick auf den dunklen Hintergrund (aber nicht auf das Bild selbst)
lightbox.addEventListener("click", (e) => {
    if (e.target !== lbImg && e.target !== document.querySelector(".next") && e.target !== document.querySelector(".prev")) {
        lightbox.style.display = "none";
    }
});

// --- 4. TASTATUR-STEUERUNG ---
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
        if (e.key === "ArrowRight") {
            currentIndex = (currentIndex + 1) % images.length;
            updateLightbox();
        }
        if (e.key === "ArrowLeft") {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightbox();
        }
        if (e.key === "Escape") {
            lightbox.style.display = "none";
        }
    }
});

let touchstartX = 0;
let touchendX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchstartX = e.changedTouches[0].clientX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    touchendX = e.changedTouches[0].clientX;
    handleSwipeGesture();
}, { passive: true });

function handleSwipeGesture() {
    const swipeThreshold = 50; 
    const lightboxImg = document.querySelector('.lightbox-content');
    if (!lightboxImg) return;
    
    if (Math.abs(touchstartX - touchendX) > swipeThreshold) {
        // Richtung bestimmen: nach links oder nach rechts gewischt?
        const isLeftSwipe = touchstartX - touchendX > swipeThreshold;
        
        // 1. Altes Bild rausfliegen lassen
        lightboxImg.classList.add(isLeftSwipe ? 'slide-out-left' : 'slide-out-right');
        
        // 2. Nach der Animation (180ms) das Bild wechseln und neu reinfliegen lassen
        setTimeout(() => {
            if (isLeftSwipe) {
                currentIndex = (currentIndex + 1) % images.length;
            } else {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            }
            
            // Bild wechseln
            updateLightbox();
            
            // Alte Animationsklassen entfernen und Einflug-Klasse setzen
            lightboxImg.className = 'lightbox-content'; 
            lightboxImg.classList.add(isLeftSwipe ? 'slide-in-right' : 'slide-in-left');
            
            // Nach dem Einflug (180ms) die Einflug-Klasse für den nächsten Swipe säubern
            setTimeout(() => {
                lightboxImg.classList.remove('slide-in-right', 'slide-in-left');
            }, 180);
            
        }, 180);
    }
}

// --- Texte als accordeon ---
const texteSammlung = {
    'modell': {
        title: "Modell und Wirklichkeit",
        author: "Andreas Moersener",
        content: "Stadtansichten und Feuerbilder sind Prautschs bevorzugtes Motiv der letzten Jahre. Seine Ölmalerei ist im Duktus skriptural bis gestisch. Sein Farbauftrag gerät zum gebändigten Experiment: Geschleudertes opaker Konsistenz, verwischte Schlieren, Überspachteltes und Pinsel zerfurchte Borke geben zuweilen die fließend-transparenten Quastwürfe des malerischen Beginnens frei oder enden auf hell glänzend modulierten Spachtelabschlüssen. Die Farbigkeit der Bilder ist chromatisch gebrochen, schlägt aber durchdringende, manchmal bis in Komplementäre spielende Farbakkorde an, vorherrschend in warm-kalt und hell-dunkel.<br><br>Ein Konglomerat abstrakter Farbwürfe in flächiger Ausdehnung oder unruhiger Agglomeration kurzer Pinselhiebe formt Straßen, Wasserwege, Grünanlagen, Hausdächer- und Fassaden bis zur Weite des Horizonts. Licht und Schatten tragen wesentlich zur Reliefbildung dieser Metropolen-Topografien aus Vogelperspektive bei.<br><br>Der Maler Prautsch zeigt uns Perspektiven, die niemals klassisch plein air mit Feldstaffelei entstanden sein könnten. Nicht Bildquelle, sondern besser Vorwand, diese sich selbst auslotende Malerei zu betreiben, sind im Internet abgelegte Satellitenfotos. Ebenso nutzt Prautsch den Film als digitales Skizzenbuch für die Bilder der Feuerserie, da schlecht vorstellbar scheint, dass der Maler unbehelligt von Einsatzkommandos in unmittelbarer Nähe eines Großbrandherdes, inmitten entzündlich schimmernder Lachen, in sengender Hitze seelenruhig und inspiriert eine Feldstaffelei installiert. Feuer, eine äußerst flüchtige, fast immaterielle, luzide Erscheinung mit Hilfe opaker Ölmalerei darstellen zu wollen, ist in technischer Hinsicht schon ein heikles Unterfangen.<br><br>Sein Atelier, ein klassischer white cube, nur von Oberlicht erhellt, verhindert den Blick auf Münsters Hafenambiente. Computer archivierte Satellitenbilder und Filme, schon an sich Modelle von Wirklichkeit, dienen als einzige Quelle, denen er das Eindringen in das Atelier erlaubt.<br><br>Bewusst vom Künstler gefiltertes Material forciert die Konzentration auf die pure Malerei und vernachlässigt rein mimetische Absichten. Prautsch wählt Motive, die sich durch Perspektive oder ihre Materialität leichter mit digitaler Hilfe erfassen lassen.<br><br>Diese gefilterten Konstrukte sind wiederum Modelle und dienen der Reflektion des Mediums Malerei und seiner Grenzen. Tafelmalerei ist als illusionistische Flächenkunst sowohl zur Simulation von Wirklichkeit als auch formal zur Erprobung verschiedenster malerischer 'Ansätze', sprich Modelle fähig. Das Medium 'Malerei' ist für Prautsch eigentlicher Modellraum zur Konstruktion von Wirklichkeit und Ort realer malerischer Aktion. Kurz gesagt, Malerei ist ihm Modell und Wirklichkeit zugleich."    },
    'spurensuche': {
        title: "Spurensuche - ein Ausstellungsprojekt",
        author: "Timm Ulrichs",
        content: "Jeder Stein eine Versteinerung: Gestein ist gleichsam sedimentierte und materialisierte Zeit; in den mineralischen Schichtungen schreibt die Erde ihre eigene, im Wortsinne vielschichtige Natur- und Erdgeschichte. In diesem 'Buch der Natur' zu lesen, fasziniert nicht nur die Wissenschaftler, sondern ebenso Wort- und Bildkünstler. Novalis etwa vermutete allenthalben in der Natur, auch 'in Kristallen und in Steinbildungen, (...) im Innern und Äußeren der Gebirge', Beispiele einer 'großen Chiffernschrift' der Schöpfung, und es gelte nun, 'den Schlüssel dieser Wunderschrift, die Sprachlehre derselben' aufzuspüren ('Die Lehrlinge zu Sais', 1798).<br><br>Und wer hat nicht in seiner Kindheit 'Bunte Steine' (Adalbert Stifter, 1852) gesammelt, ihrer merkwürdigen Formen und Zeichnungen wegen? 'Besonders hatte die Verwunderung kein Ende, wenn es auf einem Steine so geheimnisvoll glänzte und leuchtete und äugelte, dass man es gar nicht ergründen konnte, woher denn das wohl käme.'<br><br>Wenn Thomas Prautsch in Schaukästen des Mineralogischen Museums zweihundertfünfzig seiner Malstücke in unmittelbarer Nähe zu den Gesteinsarten präsentiert, zeigt er tatsächlich 'Wissenschaft und Kunst im Dialog', wie die Ausstellung verspricht. Ein Zwiegespräch im besten Sinne ist die Prautsche Inszenierung insofern, als beide Gesprächspartner ihre eigene Stimme behalten, auch weiterhin ihre eigene Sprache sprechen. Prautsch ahmt nicht nach; vielmehr malt er wie er immer schon malte, nur spricht er hier gewissermaßen in gleicher Lautstärke wie der Partner, mit verhaltener, leiser Stimme, was sich im kleinen Format ausdrückt, ähnlich dem der Gesteinsproben.<br><br>Und wie diese zugleich ein Ganzes und Teil eines größeren Ganzen zu sein vermögen, eignet auch den Prautschen 'Farbstücken' sowohl ein Fertiges, Ausformuliertes als auch Fragmentarisches und Skizzenhaftes – sie sind in und mit einem einzigen Zug des Pinsels oder Rakels auf dem weißen, papierenen 'Objektträger' entstanden, ohne nachträgliche Eingriffe. Die kleinen Bilder in den Erdtönen Braun, Ocker, Schwarz, aber auch in Gesteinsfarben, etwa im Blau-Violett des Amethyst, zeigen parallellaufende Malspuren, ähnlich den Farbschichten und -schichtungen, die bereits die Großformate des Malers gliedern. In den Miniaturen sind die Analogiebildungen, im Hinblick auf das (mögliche) Motiv der Mineralien, gar unmittelbarer noch und letztlich überraschender, denn obwohl und weil es nicht um Nachbildung eines Vor-Bildlichen geht, sind die Entsprechungen um so frappanter.<br><br>Was in Erdzeitaltern sich den Gesteinen einschrieb, bringt Thomas Prautsch im Handumdrehen eines kurzen Malprozesses aufs Papier, zum Verwechseln ähnlich und doch ganz anders. So gelingt ein Brückenschlag über die Zeiten, eine Harmonie 'parallel zur Natur', wie Cézanne sie als Ziel der Künste sah; das Natürliche ist im Künstlich-Künstlerischen wohl aufgehoben. Und Prautsch löst darüber hinaus auch im Stofflichen ein, was Kleist an 'Empfindungen vor Friedrichs Seelandschaft' (1810) äußerte: 'Ja, wenn man diese Landschaft mit ihrer eignen Kreide und ihrem eigenen Wasser malte (...)'"    },
    'bausteine': {
        title: "Bausteine für Licht und Schatten",
        author: "Manfred Schneckenburger",
        content: "Thomas Prautsch malt, als wimmle unser Jahrhundert nicht von letzten Bildern, als wäre die Malerei nie ins Krisengerede geraten und die Wirklichkeit nicht längst zu einem 'zerbrochenen Spiegel' (Paul Virilio) zersplittert. Es ist der seltene Fall eines jungen Künstlers, der die Malkultur aus dem Ärmel zu schütteln scheint. Jedes seiner Bilder ist auch ein Bild über die Malerei und eine Untersuchung der malerischen Mittel durch sich selbst. Dennoch stellt Prautsch sein Metier nicht in Frage. Vom 'Immanenzkollaps', den ein Kritiker kürzlich der analytischen Malerei bescheinigte, ist er weit entfernt.<br><br>Er ist ein peintre pur, aber kein Purist. Malen ist für ihn kein Akt der ständigen Reduktion, bis das Bild auf sein tautologisches Gerippe – Keilrahmen, Leinwand, Farbe, Pinselzug – zurückgeschrumpft ist. Diese Bilder bestimmen sich nicht durch ein Grundkonzept, sondern durch Reichtum und Sensualität. Gewiss entzieht Prautch seinen Bildern die bunte Vielfalt der Lokal- und Primärfarben, doch er gibt ihnen mit einem Equilibrium von Nuancen und einer großen Bandbreite zwischen Hell und Dunkel ihren sinnlichen Glanz zurück.<br><br>Was Prautsch aufgreift, wird schiere Malerei. Da bleibt kein deskriptives Relikt. Anfang der 90er Jahre sind seine Bilder wie in die Farbpaste geschrieben, gespachtelt, gemalt. Sie werfen ein schwerflüssiges und doch temperamentvolles Relief auf, das die Farbe körperlich und beweglich macht. Sie verdicken die Farbe, bis sie krustig wird, ohne dass ihr Atem stockt. Seit 1992 liegt über massiveren Schichten eine luzide écriture voll Esprit. Halbtöne zwischen Blau und Grau hüllen in Lichtschleier, Tupfer setzen sprühende Lichter, Oberflächen gehen in einem abstrakten Duktus auf und erreichen doch die Illusion von Regenfeuchte und Mauerstein. Schlieren nehmen ihren freien Lauf und erscheinen doch als funkelnder Abglanz von Sonne und Schattenschlag.<br><br>Aber es genügt nicht, vor allem die perfekte Bildhaut aus Schichten, Schleiern und Nuancen zu sehen. Die Bilder sind, bei aller prozessualen Offenheit, nirgends informel aufgelöst, nirgends ein brodelndes Farblabor. Gerade weil Prautsch sie aus scripturalen Gesten entwickelt, sucht er, als Ausgleich, einen festeren Halt. Aus der Souveränität des handschriftlichen und dem autonomen Wesen des Flecks tritt eine klar gefügte Ordnung hervor. Jeder Pinselstrich ist malerischer Vollzug und baumeisterliche Stabilisierung in eins. Malgebärde und Formkonstruktion gehen Hand in Hand. Deshalb sind die Architekturmotive, die Prautsch meist zugrunde legt, keineswegs nebensächlich.<br><br>1991: Kuppeln, Türme, Fassaden, ganz frei aus dem Farbbrei modelliert, und doch von einer innerlichen Tektonik, die sogar kleinen und kleinsten Abmessungen eine federnde Monumentalität verleiht. Gewölbte Bögen und vertikale Pfeiler verstreben und verspannen das Bildformat.<br><br>Seit 1992: Perspektivisch zulaufende Steintreppen – sie vereinen Bewegung, differenzierte Oberfläche, den Wiederschein von Atmosphäre und eine deutliche Struktur. Jetzt entfaltet sich, über das kräftige Impasto hinaus, ein malerisches Spektrum vom rechtwinkligen Mauerbau mit dem Spachtel über luftige Transparenzen bis zum Lichtgeflirre goldgelber Spritzer und Wischer. Die Stufen unterlegen den Springtanz der Reflexe mit dem sicheren Tritt einer Marschkolonne – und sind doch aus dem gleichen schimmernden, entmaterialisierten Gespinst. Ein malerisches Bravourstück, wie fest und wie lose diese Textur gleichzeitig gewebt ist!<br><br>Ich will Thomas Prautsch keiner kunsthistorischen, allzu dünnen Gipfelluft aussetzen, aber entfernt erinnern die 'Treppen' doch an Monets berühmte Serie der Kathedrale von Rouen. In der Verschmelzung von kubischem Gerüst und atmosphärischem Zauber behaupten sie sogar eine eigene Polarität. Die kleineren Arbeiten, Öl auf Papier, nehmen die Kantenschärfe und messbare Tiefe wieder zurück und mildern die Struktur ins aquarellhafte Durchsichtige, Schwebende, ohne dass der horizontale Rhythmus ganz verloren geht. Sie wecken Spannung auf den nächsten Schritt."    },
    'maler': {
        title: "Der Maler Thomas Prautsch",
        author: "Prof. Udo Scheel",
        content: "Paris – Von einem hohen Blickpunkt aus schließen sich Giebel, Dächer, Mansarden und Fensterreihen zum sprichwörtlichen Häusermeer zusammen, aus dem sich, dem Rücken eines Wales ähnlich, das Grand Palais heraushebt. Eine Sicht auf die Metropole in kühlem Indigo-Grau mit rötlich-weißen Aufhellungen und doch kein Stadtportrait in der Tradition klassischer Veduten. Thomas Prautsch denkt in Formationen und Strukturen und untersucht ihre Bildtauglichkeit im Malprozess. Die kompakte Farbmaterie markiert Kanten und Ecken, schiebt sich über sie hinaus, wirft schartige Ränder auf, modelliert Einzelformen und bindet sie zugleich in die zusammenschließende Malschicht ein. Die opake, „geknetete“, reliefartig geformte Malerei macht den komplexen Malvorgang sichtbar und wirkt bewegt und lebendig, auch in Bildzentren massiver Verdichtung.<br><br>Thomas Prautsch ist mit seinen Treppenbildern bekannt geworden. – Die Außenseiten von Körpern sind Flächen. Im Unterschied zu einem Würfel, der, auf die Fläche projiziert, eine plastisch-scheinräumliche Gestalt annimmt, bildet die Treppe eine Formation von geringer Tiefenausdehnung mit gleichmäßig fortlaufenden Formmerkmalen. Für Thomas Prautsch ist die Treppe nicht darzustellendes Objekt, sondern Grundprinzip der Gliederung und Rhythmisierung der Bildfläche.<br><br>Die geschichtete Farbe in ihrer differenzierten Chromatik gebrochener Valeurs, mit ihren gespachtelten, abreißenden Lichtfetzen und weichen, bodenlosen Dunkelheiten, mag an erstarrte Lavaströme und terrassierte Hänge erinnern. Energien aus Schmelzbränden, Eruptionen und Erstarren scheinen in Materialbehandlung und Malduktus eingeschlossen zu sein. Wohin die Assoziationen auch wandern, zu Natur – oder auch zu verlassenen Geschichtsschauplätzen, die kraftvoll-sensible Selbstbehauptung purer Malerei dominiert. In dem Maße, wie das Spiel des Lichts in variationsreichen Brechungen und Chiaro-Scuro-Abstufungen konstruktive Bildelemente formt, überspielt es sie und holt sie in die malerische Einheit des Bildes zurück.<br><br>Beim Versuch einer begrifflichen Umschreibung der Bilder von Thomas Prautsch erweist sich einmal mehr die Trennung von Was und Wie, von Motiv und Darstellung, von Vorwand und Malerei als interpretatorische Fehlkonstruktion. Vielmehr sind auch im Werk dieses Malers Wahrnehmung, Erinnerung und Bildvorstellung unauflösbar miteinander und mit dem Malprozess verflochten. Das konzeptionelle Denken in Bildern beeinflusst das explorative und selektive Sehen und umgekehrt. „Das springt mich an“, sagt der Künstler angesichts bestimmter Erscheinungen und Ansichten und hält sie zur Unterstützung des Gedächtnisses mit der Kamera fest. Ergänzt durch computerarchivierte Satellitenbilder entsteht so ein Bild-Fundus, der nicht etwa Malvorlagen bereithält, sondern als Katalysator auf den Malprozess wirkt: zündend, klärend, belebend.<br><br>In einigen Bildern reißt die opake Farbdecke auf und gibt den Blick auf die grundierte Leinwand frei. „Das ist mir sehr wichtig“, sagt der Künstler, der damit im fertigen Bild die ersten Schritte seiner Entstehung nachvollziehbar macht. Auf grundierter Leinwand sehen wir nervöse, sich kreuzende Linien, Fragmente eines graphischen Gitterwerks mit darüber gelegten transparenten Flächen und Flecken. Ansätze eines filigranen Grundrisses der Bildarchitektur – Inbesitznahme des Malgrundes – Armierung und Widerstand im Farbfluss der freien Malerei. – Von hier aus führt uns ein direkter Weg zu seinen Serien von kleinformatigen Arbeiten: Öl auf Papier. Der Maler zeigt sich hier als ein Meister aquarellhaft-leichter Versuchsanordnungen und Improvisationen von architektonisch-konstruktivem Charakter, deren grisaillehaften Farbabstufungen den Eindruck lichtdurchfluteter Schwerelosigkeit erzeugen.<br><br>„Man kann Feuer malen“, eine Erfahrung des Malers Thomas Prautsch, die William Turner in seinen Bildern „Burial at sea“ und „Das brennende Londoner Parlament“ schon früh gemacht hat. Vielleicht ist hier eine Verbindung von den zitternden Reflexen des flach über dem Horizont stehenden roten Sonnenballs zu dem heftigen Eindruck einer sich spiegelnden Feuersbrunst vorstellbar. Im Unterschied zu Turner koppelt Prautsch das Thema Feuer nicht an ein historisches Ereignis. Aus diffusem Lichtspiel und dem Kanon gebrochener Farben seiner Bildwelt wechselt Thomas Prautsch in der Gruppe der Feuerbilder zur strahlkräftigsten Farbe des Spektrums: Rot-Orange. Während alles Feste in Auflösung begriffen ist und mit ihm die Bildkonstruktion, ist es die Malerei des Rots gerade nicht. Sie bindet das flüchtig-unfassbare Element in bekannter, verdichtender Kompaktheit an die Malmaterie, an Duktus und das Bildgeviert.<br><br>Cézannes prägnante Formulierung einer „Malerei parallel zur Natur“ trifft auch auf die Arbeit des Malers Thomas Prautsch zu. Malerei dient nicht der Nachahmung, sie ist eine Kunstform. Dem faszinierenden, vibrierenden Spannungsverhältnis zwischen Flächenbezug und Raumillusion in Prautschs Bildern korrespondiert die Reibung zwischen farb-chromatischer Differenzierung und vereinheitlichendem Generalklang. Die steinernen Treppen führen nirgendwohin, wenn nicht ins Bild." }, //
    'aussicht': {
        title: "Aussichtsreich",
        author: "Wolfgang Türk",
        content: "Wer aus der Höhe den Blick auf die Dinge richtet, wem es vergönnt ist, die Welt von oben zu betrachten, dem beschert der Perspektivwechsel fast  zwangsläufig eine veränderte Wahrnehmung, mit der sich die Maßstäbe des Alltäglichen verschieben. Es ist nicht nur die Veränderung der Dimensionen, die vieldeutige Herabsetzung des Großen zum Kleinen, es ist auch die Zusammenschau, ja Aufhebung wenn nicht sogar Auflösung vereinzelter Details zu einem neuen Ganzen. Unerwartete Bilder entstehen, in denen tektonische Strukturen ihren ordnenden Charakter verlieren, Konturen verschwimmen, kantige Abgrenzungen organischen Formen weichen.<br><br>Thomas Prautschs Stadtansichten eint der gleiche Blickwinkel, eine leichte Schräge von oben, die Aufsicht zwar suggeriert, aber die Frontalansicht in der Andeutung immer erahnen lässt. Wasserwege, Hafenbecken, Industrieanlagen, Straßen, Parks und Gärten, Häuser, Dächer und Fassaden verdichten sich zu einer individuell geschauten Topographie, die einerseits Wiedererkennbarkeit (wie bei den Ansichten von Münster, Hamburg oder Paris), andererseits Fremdheit, ja Austauschbarkeit da suggeriert, wo dem Betrachter die Spezifik signifikanter Gebäude fehlt. Das intensive, aber durchaus reduzierte Farbspektrum dieser Arbeiten bildet die Jahreszeiten ab, veranschaulicht Tag und Nacht und zeichnet den Wechsel des Wetters von sonnendurchglänzter Helligkeit zu drohenden Gewitterstimmung nach. Atmosphärische Dichte erzielt Thomas Prautsch dabei durch ein gekonntes malerisches Wechselspiel von Licht und Schatten: Da gibt es hier  ein erleuchtetes Zimmer,  dort eine brennende Straßenlaterne oder  das Aufblitzen eines Scheinwerfers, mit denen das Dunkel der nächtlichen Szenarien durchbrochen wird; auf anderen Bildern hellt ein Sonnenstrahl den regennassen Tag auf oder ein fernes Wetterleuchten durchmisst hoffnungsreich den wolkenverhangenen Gewitterhimmel. Dieses synthetische Zusammenfinden von Farbe und Licht, das seine Inspiration durch die impressionistische Malweise widerspiegelt, überführt in den Arbeiten des Künstlers die gegenständliche Welt in einen Bereich der Formauflösung und semantischen Unbestimmtheit. Nicht mehr die mimetische Abschilderung von landschaftlicher und urbaner Wirklichkeit sondern das Einfangen ihrer flüchtigen Stimmungsvaleurs ist Anlass und künstlerische Intention.<br><br>Es ist dabei die signifikante Menschenleere in diesen Bildern, der in paradoxer Verkehrung ein Narrativ, ein erzählerisches Moment innewohnt. Fast scheint es, als ob diese verlassenen Stadtlandschaften auf ein Gewesenes zurückverweisen oder ein Kommendes ankündigen wollen – so, als gelte es, den verlassenen Raum in der Phantasie durch ein Gedankenkonstrukt des Betrachters zu kompensieren. Dieser Aspekt des Unausgesprochenen, Vieldeutigen wird besonders in dem großformatigen Gemälde Spiegelung VI deutlich, das in der für den Künstler ungewöhnlichen Nahsichtigkeit die Auswirkung eines Hochwassers in einem Münsterschen Vorort abschildert. Die drei Bildebenen werden von einer überdimensionierten Wasserfläche dominiert, in der sich die Umgebung widerspiegelt, die zugleich aber die Zugänglichkeit des dahinter liegenden Wohnhauses erschwert. Wird das Wasser gefährlich ansteigen oder findet es seinen Weg zurück in die Kanalisation? Ist das Haus ein bergender Zufluchtsort, an dem man sich – die gehisste Deutschlandfahne in der rechten Bildhälfte suggeriert es – in gemütvoller Geselligkeit weiterhin den spannenden Meisterschaftsspielen widmen kann, oder lässt ein Blick auf das vielleicht wieder ansteigende Wasser eher eine Bedrohung dieses Vorstadtidylls befürchten? Die Antwort ist der Spekulationslust des Rezipienten überlassen; eindeutig ist sie nicht.<br><br>Es ist nur folgerichtig, wenn Thomas Prautsch – die Abstraktion vorantreibend – seine motivischen Vorlagen in einer anderen Werkgruppe in Licht- und Farbphänomene überführt, ihre Provenienz weiter verunklärt und letztlich  der Erscheinung vor dem Konkreten den Vorzug gibt. Bilder von dem Mauerwerk mit den sich emporwindenden Ranken oder den moosüberwucherten, regennassen Stufen entbehren motivisch des kontextuellen Zusammenhangs, werden auf die bloße inhaltliche Andeutung reduziert und erweitern den Bildraum semantisch ins Unbestimmte: die Mauer könnte sich in unbegrenzte Höhen auftürmen, die Treppe hingegen führt zu einer geheimnisvollen Lichtquelle, der zu folgen Bedrohung oder Erleuchtung, Gefahr oder Erlösung bedeuten kann.<br><br>In Erweiterung seiner Farbpalette, die sich zuvorderst Grün- und Blautönen in vielfältigen Nuancierungen verschrieben hat, erweitert Thomas Prautsch in seinen Flammen- und Feuerbildern das Spektrum um eine Vielzahl an Rot- und Gelbtönen. Das Licht, leitmotivische Verknüpfung in seinen Arbeiten, erhält hier seinen spektakulären Auftritt. In einer lodernden Unberechenbarkeit beherrscht das Feuer das Bildganze, die Flammen züngeln empor, sie negieren alle Demarkierungen und Begrenzungen der Fläche, als gelte es von hier aus einen Weltbrand zu entfachen, gar eine Allegorie des Feuers, jene kaum domestizierbare Naturkraft, die nicht nur Wärme sondern so leicht auch Gefahr, Bedrohlichkeit und Vernichtung bedeuten kann, im Bild symbolhaft zu erfassen.<br><br>Hier wie auch in den kleinformatigen Landschaftsimpressionen von Thomas Prautsch ist Abstand in der Bildbetrachtung geboten. Pastose, oft bis zur Reliefstruktur aufgetragene Farbschichten, einmal lasierende, dann wieder gesättigte Pinselstriche nehmen sich in der Nahsicht lediglich als abstrakte Farbflächen aus, erst beim Zurücktreten verbildlichen sie gemäß der Intention des Künstlers das Spiel der Elemente – Erde, Feuer, Wasser, Luft – lassen sie sich als malerische Momentaufnahmen von Natur wahrnehmen und ausdeuten.<br><br>„Reine“ oder „pure“ Malerei nennt die Kunsttheorie eine zutiefst malerische Haltung,  die abstrakte Formen und Farben zwar absolut in den Bildraum setzt, damit zugleich aber für den Rezipienten das weite Feld individueller Assoziation und Sinndeutung öffnet und zulässt. Was ist zuerst da? Die Vorlage, das gewählte Motiv, das seine bildkünstlerische Gestalt sucht? Oder der spontan hingeworfene Pinselstrich, der zu anschließenden Deutung und Interpretation animiert? Thomas Prautschs zarte, flüchtig-ephemere Wolkenbilder, die hingestäubtem Graphitpulver ihre schwebende Existenz verdanken, sind letztlich zwar nur vereinzelte oder geballt auftretende Formen, die aber dem Betrachter aus gebührender Distanz einen Blick ins Firmament suggerieren, an dem er zum Augenzeugen eines bewegten Naturschauspiels wird.<br><br>Den Fluss der Dinge, Bewegung und Fluktuation festzuhalten, legt in Malerei und Zeichnung die Listung, die Reihung, die Multiplikation mutmaßlich bis ins Unendliche nahe; im Film ermöglicht das Medium dagegen per se die Darstellung eines Ablaufs, einer Entwicklung oder einer Chronologie. Die fast wie in einem Insektarium präsentierten Stadtansichten von Thomas Prautsch, Momentaufnahmen auf einem stereotyp sich wiederholenden Weg zwischen Wohnung und Atelier, korrespondieren mit den einzelnen Bildsequenzen in dem beigestellten Film. Durch die identische monochrome Farbigkeit in schwarz-weiß treten Tuschezeichnung und Film in einen sprechenden Dialog miteinander. Von einer im Alltag erfahrenen Wirklichkeit inspiriert, halten sie in loser Bildfolge eine Fahrt in mehr oder weniger markanten Ausschnitten fest, um sich in der Zusammenschau zu einem Kontinuum zu verdichten. In diesen Arbeiten von Thomas Prautsch verschwimmen eindringlich die Grenzen der Gattungen, da die Werke auf gänzlich unterschiedlichen Wegen zu verblüffend ähnlichen Ergebnissen kommen.<br><br>Die Objekte und Phänomene der Wirklichkeit in der impressionistischen Malweise aufzulösen, sie weiter in der Abstraktion auf elementare Formen zu reduzieren, um sie schließlich über die serielle Reihung in die laufenden Bilder des Films zu überführen – auch das mag eine Lesart sein, das vielgestaltige Werk von Thomas Prautsch in einen konsequenten künstlerischen Entwicklungsgang einzureihen. Es dokumentiert sein Kunst-Wollen, der sich stets verändernden Anschauung von Welt in immer neuen Medien habhaft zu werden und sie im Stillstand des nur einen Augenblicks verharren zu lassen, damit aber gleichsam jeglicher Zeitlichkeit zu entgehen." },
    'preisträger': {
        title: "Preisträger des Caspar-von-Zumbusch-Preises",
        author: "H.G. Eisenhut",
        content: "Thomas Prautsch, 1965 in Frankfurt am Main geboren, nahm 1988 das Studium der Malerei an der Kunstakademie in Münster bei L. von Arseniew und Timm Ulrichs auf, erhielt 1991 seine Ernennung zum Meisterschüler und schloss 1999 das Studium mit Aushändigung des Akademiebriefes ab.<br><br>Thomas Prautsch entwickelt während des Studiums eine eigene Bildsprache, die er frühzeitig der Öffentlichkeit präsentiert. So sind seit dem Jahre 1993 seine Werke kontinuierlich auf renommierten Ausstellungen vertreten. In all diesen Werken ist formal und inhaltlich eine malerische Dichte deutlich spürbar, begonnen mit den Tusche- und Kohlezeichnungen aus den Anfängen seines Studiums, die sein Interesse an zeichnerisch-linearen Strukturen mit starken Hell/Dunkelkontrakten dokumentieren, über seinen Aufenthalt in Berlin, der künstlerisch verarbeitet zur Verdichtung des Farbmaterials im Malprozess wiederum zu Strukturen führt, die Licht und Schatten beschreiben, dann zum Treppenmotiv, von dem er selbst sagt, dass es mehrere Jahre das Gerüst seiner Malerei bildete.<br><br>Thomas Prautsch malt, was er real sieht in Verbindung mit seinem inneren Eindruck. Er beschreitet mit seiner Malerei einen Weg zwischen Gegenständlichkeit und Abstraktion. Das wird sichtbar in dem meist einfachen Kompositionen, Waagerechten und Diagonalen – es sind die Leitlinien seiner Malerei – die den Malspuren gegenüber stehen und das Bild zu einem rhythmischen Geflecht verdichten.<br><br>Sowie auch schon beim Treppenmotiv bleibt er dem Thema der Steinstrukturen in seinen weiteren Arbeiten treu. Sein Aufenthalt in Irland im Jahre 1997 konfrontiert ihn mit der Landschaft, etwas völlig Neues für ihn, der sich bisher mit der Stadtlandschaft und sich daraus ergebenden Einzelstrukturen befasst hatte. Er entdeckt eine karge Landschaft aus übereinander geschichteten Kalksteinplatten, eine scheinbar ungeordnete Struktur, die keinen Gesetzen und Regeln zu folgen scheint, und doch fasziniert ihn die Oberflächenstruktur, das endlose Durcheinander von Furchen und Rinnen mit metertiefen Brüchen und harten Verschattungen, dass er die Verarbeitung dieses Themas in seinen letzten Arbeiten darstellt, ein fließender Übergang vom starren Treppenmotiv zur amorphen natürlichen Gesetzmäßigkeit."
    }
};

function openTextModal(id) {
    const data = texteSammlung[id];
    if (data) {
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalAuthor').innerText = data.author;
        document.getElementById('modalFullText').innerHTML = data.content;
        document.getElementById('textModal').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeTextModal() {
    document.getElementById('textModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}