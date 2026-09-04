document.addEventListener("DOMContentLoaded", () => {

    // --- 1. NAVIGATION & BURGER-MENÜ ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
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
    }


    // --- 2. ERWEITERTE LIGHTBOX MIT SLIDER-FUNKTION ---
    const lightbox = document.getElementById("lightbox");
    const lbImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("caption");

    // Wir laden alle Galerie-Bilder in ein Array, um darin blättern zu können
    const images = Array.from(document.querySelectorAll(".work-item img, .category-item img, .gallery-img"));
    let currentIndex = 0;

    // Die Lightbox-Logik wird NUR ausgeführt, wenn die Lightbox im HTML existiert
    if (lightbox && lbImg) {

        // Event-Listener für jedes Bild zum Öffnen der Lightbox
        images.forEach((img, index) => {
            img.addEventListener("click", (e) => {
                if (img.closest('.category-item')) {
                    // e.preventDefault(); // Optional: Falls auf Startseite Lightbox statt Link öffnen soll
                }
                
                currentIndex = index;
                updateLightbox();
                lightbox.style.display = "flex";
            });
        });

        // Funktion, die das Bild und den Text in der Lightbox aktualisiert
        function updateLightbox() {
            const currentImg = images[currentIndex];
            if (currentImg) {
                lbImg.src = currentImg.src;
                captionText.innerHTML = currentImg.alt || ""; // Verhindert "undefined", falls kein Alt-Tag da ist
            }
        }

        // --- 3. STEUERUNG (Pfeile & Schließen) ---

        // Klick auf den rechten Pfeil
        document.querySelector(".next")?.addEventListener("click", (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateLightbox();
        });

        // Klick auf den linken Pfeil
        document.querySelector(".prev")?.addEventListener("click", (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateLightbox();
        });

        // Schließen beim Klick auf das 'X'
        document.querySelector(".close")?.addEventListener("click", () => {
            lightbox.style.display = "none";
        });

        // Schließen beim Klick auf den dunklen Hintergrund
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

        // Touch-Gesten Steuerung
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
                const isLeftSwipe = touchstartX - touchendX > swipeThreshold;
                
                lightboxImg.classList.add(isLeftSwipe ? 'slide-out-left' : 'slide-out-right');
                
                if (isLeftSwipe) {
                    currentIndex = (currentIndex + 1) % images.length;
                } else {
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                }

                const nextImageUrl = images[currentIndex].src;
                const imgPreloader = new Image();
                imgPreloader.src = nextImageUrl;

                setTimeout(() => {
                    updateLightbox();
                    
                    lightboxImg.className = 'lightbox-content'; 
                    lightboxImg.classList.add(isLeftSwipe ? 'slide-in-right' : 'slide-in-left');
                    
                    setTimeout(() => {
                        lightboxImg.classList.remove('slide-in-right', 'slide-in-left');
                    }, 100);
                    
                }, 100);
            }
        }
    }

}); // DOMContentLoaded Ende

// --- 5. TEXTE ALS ACCORDEON ---
const texteSammlung = {
    'modell': {
        title: "Modell und Wirklichkeit",
        author: "Andreas Moersener",
        content: "Stadtansichten und Feuerbilder sind Prautschs bevorzugtes Motiv der letzten Jahre. Seine Ölmalerei ist im Duktus skriptural bis gestisch. Sein Farbauftrag gerät zum gebändigten Experiment: Geschleudertes opaker Konsistenz, verwischte Schlieren, Überspachteltes und Pinsel zerfurchte Borke geben zuweilen die fließend-transparenten Quastwürfe des malerischen Beginnens frei oder enden auf hell glänzend modulierten Spachtelabschlüssen. Die Farbigkeit der Bilder ist chromatisch gebrochen, schlägt aber durchdringende, manchmal bis in Komplementäre spielende Farbakkorde an, vorherrschend in warm-kalt und hell-dunkel.<br><br>Ein Konglomerat abstrakter Farbwürfe in flächiger Ausdehnung oder unruhiger Agglomeration kurzer Pinselhiebe formt Straßen, Wasserwege, Grünanlagen, Hausdächer- und Fassaden bis zur Weite des Horizonts. Licht und Schatten tragen wesentlich zur Reliefbildung dieser Metropolen-Topografien aus Vogelperspektive bei.<br><br>Der Maler Prautsch zeigt uns Perspektiven, die niemals klassisch plein air mit Feldstaffelei entstanden sein könnten. Nicht Bildquelle, sondern besser Vorwand, diese sich selbst auslotende Malerei zu betreiben, sind im Internet abgelegte Satellitenfotos. Ebenso nutzt Prautsch den Film als digitales Skizzenbuch für die Bilder der Feuerserie, da schlecht vorstellbar scheint, dass der Maler unbehelligt von Einsatzkommandos in unmittelbarer Nähe eines Großbrandherdes, inmitten entzündlich schimmernder Lachen, in sengender Hitze seelenruhig und inspiriert eine Feldstaffelei installiert. Feuer, eine äußerst flüchtige, fast immaterielle, luzide Erscheinung mit Hilfe opaker Ölmalerei darstellen zu wollen, ist in technischer Hinsicht schon ein heikles Unterfangen.<br><br>Sein Atelier, ein klassischer white cube, nur von Oberlicht erhellt, verhindert den Blick auf Münsters Hafenambiente. Computer archivierte Satellitenbilder und Filme, schon an sich Modelle von Wirklichkeit, dienen als einzige Quelle, denen er das Eindringen in das Atelier erlaubt.<br><br>Bewusst vom Künstler gefiltertes Material forciert die Konzentration auf die pure Malerei und vernachlässigt rein mimetische Absichten. Prautsch wählt Motive, die sich durch Perspektive oder ihre Materialität leichter mit digitaler Hilfe erfassen lassen.<br><br>Diese gefilterten Konstrukte sind wiederum Modelle und dienen der Reflektion des Mediums Malerei und seiner Grenzen. Tafelmalerei ist als illusionistische Flächenkunst sowohl zur Simulation von Wirklichkeit als auch formal zur Erprobung verschiedenster malerischer 'Ansätze', sprich Modelle fähig. Das Medium 'Malerei' ist für Prautsch eigentlicher Modellraum zur Konstruktion von Wirklichkeit und Ort realer malerischer Aktion. Kurz gesagt, Malerei ist ihm Modell und Wirklichkeit zugleich.<br><br>Katalogtext zur Ausstellung: Modell und Wirklichkeit<br>Städtische Galerie im Rathaus Lippstadt, 2008, Andreas Moersener" }, //
    'spurensuche': {
        title: "Spurensuche - ein Ausstellungsprojekt",
        author: "Timm Ulrichs",
        content: "Jeder Stein eine Versteinerung: Gestein ist gleichsam sedimentierte und materialisierte Zeit; in den mineralischen Schichtungen schreibt die Erde ihre eigene, im Wortsinne vielschichtige Natur- und Erdgeschichte. In diesem 'Buch der Natur' zu lesen, fasziniert nicht nur die Wissenschaftler, sondern ebenso Wort- und Bildkünstler. Novalis etwa vermutete allenthalben in der Natur, auch 'in Kristallen und in Steinbildungen, (...) im Innern und Äußeren der Gebirge', Beispiele einer 'großen Chiffernschrift' der Schöpfung, und es gelte nun, 'den Schlüssel dieser Wunderschrift, die Sprachlehre derselben' aufzuspüren ('Die Lehrlinge zu Sais', 1798).<br><br>Und wer hat nicht in seiner Kindheit 'Bunte Steine' (Adalbert Stifter, 1852) gesammelt, ihrer merkwürdigen Formen und Zeichnungen wegen? 'Besonders hatte die Verwunderung kein Ende, wenn es auf einem Steine so geheimnisvoll glänzte und leuchtete und äugelte, dass man es gar nicht ergründen konnte, woher denn das wohl käme.'<br><br>Wenn Thomas Prautsch in Schaukästen des Mineralogischen Museums zweihundertfünfzig seiner Malstücke in unmittelbarer Nähe zu den Gesteinsarten präsentiert, zeigt er tatsächlich 'Wissenschaft und Kunst im Dialog', wie die Ausstellung verspricht. Ein Zwiegespräch im besten Sinne ist die Prautsche Inszenierung insofern, als beide Gesprächspartner ihre eigene Stimme behalten, auch weiterhin ihre eigene Sprache sprechen. Prautsch ahmt nicht nach; vielmehr malt er wie er immer schon malte, nur spricht er hier gewissermaßen in gleicher Lautstärke wie der Partner, mit verhaltener, leiser Stimme, was sich im kleinen Format ausdrückt, ähnlich dem der Gesteinsproben.<br><br>Und wie diese zugleich ein Ganzes und Teil eines größeren Ganzen zu sein vermögen, eignet auch den Prautschen 'Farbstücken' sowohl ein Fertiges, Ausformuliertes als auch Fragmentarisches und Skizzenhaftes – sie sind in und mit einem einzigen Zug des Pinsels oder Rakels auf dem weißen, papierenen 'Objektträger' entstanden, ohne nachträgliche Eingriffe. Die kleinen Bilder in den Erdtönen Braun, Ocker, Schwarz, aber auch in Gesteinsfarben, etwa im Blau-Violett des Amethyst, zeigen parallellaufende Malspuren, ähnlich den Farbschichten und -schichtungen, die bereits die Großformate des Malers gliedern. In den Miniaturen sind die Analogiebildungen, im Hinblick auf das (mögliche) Motiv der Mineralien, gar unmittelbarer noch und letztlich überraschender, denn obwohl und weil es nicht um Nachbildung eines Vor-Bildlichen geht, sind die Entsprechungen um so frappanter.<br><br>Was in Erdzeitaltern sich den Gesteinen einschrieb, bringt Thomas Prautsch im Handumdrehen eines kurzen Malprozesses aufs Papier, zum Verwechseln ähnlich und doch ganz anders. So gelingt ein Brückenschlag über die Zeiten, eine Harmonie 'parallel zur Natur', wie Cézanne sie als Ziel der Künste sah; das Natürliche ist im Künstlich-Künstlerischen wohl aufgehoben. Und Prautsch löst darüber hinaus auch im Stofflichen ein, was Kleist an 'Empfindungen vor Friedrichs Seelandschaft' (1810) äußerte: 'Ja, wenn man diese Landschaft mit ihrer eignen Kreide und ihrem eigenen Wasser malte (...)'<br><br>Katalogtext zur Ausstellung: Thomas Prautsch - Spurensuche<br>Mineralogisches Museum Münster, 1999, Timm Ulrichs" }, //
    'bausteine': {
        title: "Bausteine für Licht und Schatten",
        author: "Manfred Schneckenburger",
        content: "Thomas Prautsch malt, als wimmle unser Jahrhundert nicht von letzten Bildern, als wäre die Malerei nie ins Krisengerede geraten und die Wirklichkeit nicht längst zu einem 'zerbrochenen Spiegel' (Paul Virilio) zersplittert. Es ist der seltene Fall eines jungen Künstlers, der die Malkultur aus dem Ärmel zu schütteln scheint. Jedes seiner Bilder ist auch ein Bild über die Malerei und eine Untersuchung der malerischen Mittel durch sich selbst. Dennoch stellt Prautsch sein Metier nicht in Frage. Vom 'Immanenzkollaps', den ein Kritiker kürzlich der analytischen Malerei bescheinigte, ist er weit entfernt.<br><br>Er ist ein peintre pur, aber kein Purist. Malen ist für ihn kein Akt der ständigen Reduktion, bis das Bild auf sein tautologisches Gerippe – Keilrahmen, Leinwand, Farbe, Pinselzug – zurückgeschrumpft ist. Diese Bilder bestimmen sich nicht durch ein Grundkonzept, sondern durch Reichtum und Sensualität. Gewiss entzieht Prautch seinen Bildern die bunte Vielfalt der Lokal- und Primärfarben, doch er gibt ihnen mit einem Equilibrium von Nuancen und einer großen Bandbreite zwischen Hell und Dunkel ihren sinnlichen Glanz zurück.<br><br>Was Prautsch aufgreift, wird schiere Malerei. Da bleibt kein deskriptives Relikt. Anfang der 90er Jahre sind seine Bilder wie in die Farbpaste geschrieben, gespachtelt, gemalt. Sie werfen ein schwerflüssiges und doch temperamentvolles Relief auf, das die Farbe körperlich und beweglich macht. Sie verdicken die Farbe, bis sie krustig wird, ohne dass ihr Atem stockt. Seit 1992 liegt über massiveren Schichten eine luzide écriture voll Esprit. Halbtöne zwischen Blau und Grau hüllen in Lichtschleier, Tupfer setzen sprühende Lichter, Oberflächen gehen in einem abstrakten Duktus auf und erreichen doch die Illusion von Regenfeuchte und Mauerstein. Schlieren nehmen ihren freien Lauf und erscheinen doch als funkelnder Abglanz von Sonne und Schattenschlag.<br><br>Aber es genügt nicht, vor allem die perfekte Bildhaut aus Schichten, Schleiern und Nuancen zu sehen. Die Bilder sind, bei aller prozessualen Offenheit, nirgends informel aufgelöst, nirgends ein brodelndes Farblabor. Gerade weil Prautsch sie aus scripturalen Gesten entwickelt, sucht er, als Ausgleich, einen festeren Halt. Aus der Souveränität des handschriftlichen und dem autonomen Wesen des Flecks tritt eine klar gefügte Ordnung hervor. Jeder Pinselstrich ist malerischer Vollzug und baumeisterliche Stabilisierung in eins. Malgebärde und Formkonstruktion gehen Hand in Hand. Deshalb sind die Architekturmotive, die Prautsch meist zugrunde legt, keineswegs nebensächlich.<br><br>1991: Kuppeln, Türme, Fassaden, ganz frei aus dem Farbbrei modelliert, und doch von einer innerlichen Tektonik, die sogar kleinen und kleinsten Abmessungen eine federnde Monumentalität verleiht. Gewölbte Bögen und vertikale Pfeiler verstreben und verspannen das Bildformat.<br><br>Seit 1992: Perspektivisch zulaufende Steintreppen – sie vereinen Bewegung, differenzierte Oberfläche, den Wiederschein von Atmosphäre und eine deutliche Struktur. Jetzt entfaltet sich, über das kräftige Impasto hinaus, ein malerisches Spektrum vom rechtwinkligen Mauerbau mit dem Spachtel über luftige Transparenzen bis zum Lichtgeflirre goldgelber Spritzer und Wischer. Die Stufen unterlegen den Springtanz der Reflexe mit dem sicheren Tritt einer Marschkolonne – und sind doch aus dem gleichen schimmernden, entmaterialisierten Gespinst. Ein malerisches Bravourstück, wie fest und wie lose diese Textur gleichzeitig gewebt ist!<br><br>Ich will Thomas Prautsch keiner kunsthistorischen, allzu dünnen Gipfelluft aussetzen, aber entfernt erinnern die 'Treppen' doch an Monets berühmte Serie der Kathedrale von Rouen. In der Verschmelzung von kubischem Gerüst und atmosphärischem Zauber behaupten sie sogar eine eigene Polarität. Die kleineren Arbeiten, Öl auf Papier, nehmen die Kantenschärfe und messbare Tiefe wieder zurück und mildern die Struktur ins aquarellhafte Durchsichtige, Schwebende, ohne dass der horizontale Rhythmus ganz verloren geht. Sie wecken Spannung auf den nächsten Schritt.<br><br>Katalogtext zur Ausstellung: Thomas Prautsch - Malerei<br>Kunstverein des LWL-Museum für Kunst und Kultur Münster, 1996,<br>Prof. Dr. Manfred Schneckenburger" }, //
    'maler': {
        title: "Der Maler Thomas Prautsch",
        author: "Prof. Udo Scheel",
        content: "Paris – Von einem hohen Blickpunkt aus schließen sich Giebel, Dächer, Mansarden und Fensterreihen zum sprichwörtlichen Häusermeer zusammen, aus dem sich, dem Rücken eines Wales ähnlich, das Grand Palais heraushebt. Eine Sicht auf die Metropole in kühlem Indigo-Grau mit rötlich-weißen Aufhellungen und doch kein Stadtportrait in der Tradition klassischer Veduten. Thomas Prautsch denkt in Formationen und Strukturen und untersucht ihre Bildtauglichkeit im Malprozess. Die kompakte Farbmaterie markiert Kanten und Ecken, schiebt sich über sie hinaus, wirft schartige Ränder auf, modelliert Einzelformen und bindet sie zugleich in die zusammenschließende Malschicht ein. Die opake, „geknetete“, reliefartig geformte Malerei macht den komplexen Malvorgang sichtbar und wirkt bewegt und lebendig, auch in Bildzentren massiver Verdichtung.<br><br>Thomas Prautsch ist mit seinen Treppenbildern bekannt geworden. – Die Außenseiten von Körpern sind Flächen. Im Unterschied zu einem Würfel, der, auf die Fläche projiziert, eine plastisch-scheinräumliche Gestalt annimmt, bildet die Treppe eine Formation von geringer Tiefenausdehnung mit gleichmäßig fortlaufenden Formmerkmalen. Für Thomas Prautsch ist die Treppe nicht darzustellendes Objekt, sondern Grundprinzip der Gliederung und Rhythmisierung der Bildfläche.<br><br>Die geschichtete Farbe in ihrer differenzierten Chromatik gebrochener Valeurs, mit ihren gespachtelten, abreißenden Lichtfetzen und weichen, bodenlosen Dunkelheiten, mag an erstarrte Lavaströme und terrassierte Hänge erinnern. Energien aus Schmelzbränden, Eruptionen und Erstarren scheinen in Materialbehandlung und Malduktus eingeschlossen zu sein. Wohin die Assoziationen auch wandern, zu Natur – oder auch zu verlassenen Geschichtsschauplätzen, die kraftvoll-sensible Selbstbehauptung purer Malerei dominiert. In dem Maße, wie das Spiel des Lichts in variationsreichen Brechungen und Chiaro-Scuro-Abstufungen konstruktive Bildelemente formt, überspielt es sie und holt sie in die malerische Einheit des Bildes zurück.<br><br>Beim Versuch einer begrifflichen Umschreibung der Bilder von Thomas Prautsch erweist sich einmal mehr die Trennung von Was und Wie, von Motiv und Darstellung, von Vorwand und Malerei als interpretatorische Fehlkonstruktion. Vielmehr sind auch im Werk dieses Malers Wahrnehmung, Erinnerung und Bildvorstellung unauflösbar miteinander und mit dem Malprozess verflochten. Das konzeptionelle Denken in Bildern beeinflusst das explorative und selektive Sehen und umgekehrt. „Das springt mich an“, sagt der Künstler angesichts bestimmter Erscheinungen und Ansichten und hält sie zur Unterstützung des Gedächtnisses mit der Kamera fest. Ergänzt durch computerarchivierte Satellitenbilder entsteht so ein Bild-Fundus, der nicht etwa Malvorlagen bereithält, sondern als Katalysator auf den Malprozess wirkt: zündend, klärend, belebend.<br><br>In einigen Bildern reißt die opake Farbdecke auf und gibt den Blick auf die grundierte Leinwand frei. „Das ist mir sehr wichtig“, sagt der Künstler, der damit im fertigen Bild die ersten Schritte seiner Entstehung nachvollziehbar macht. Auf grundierter Leinwand sehen wir nervöse, sich kreuzende Linien, Fragmente eines graphischen Gitterwerks mit darüber gelegten transparenten Flächen und Flecken. Ansätze eines filigranen Grundrisses der Bildarchitektur – Inbesitznahme des Malgrundes – Armierung und Widerstand im Farbfluss der freien Malerei. – Von hier aus führt uns ein direkter Weg zu seinen Serien von kleinformatigen Arbeiten: Öl auf Papier. Der Maler zeigt sich hier als ein Meister aquarellhaft-leichter Versuchsanordnungen und Improvisationen von architektonisch-konstruktivem Charakter, deren grisaillehaften Farbabstufungen den Eindruck lichtdurchfluteter Schwerelosigkeit erzeugen.<br><br>„Man kann Feuer malen“, eine Erfahrung des Malers Thomas Prautsch, die William Turner in seinen Bildern „Burial at sea“ und „Das brennende Londoner Parlament“ schon früh gemacht hat. Vielleicht ist hier eine Verbindung von den zitternden Reflexen des flach über dem Horizont stehenden roten Sonnenballs zu dem heftigen Eindruck einer sich spiegelnden Feuersbrunst vorstellbar. Im Unterschied zu Turner koppelt Prautsch das Thema Feuer nicht an ein historisches Ereignis. Aus diffusem Lichtspiel und dem Kanon gebrochener Farben seiner Bildwelt wechselt Thomas Prautsch in der Gruppe der Feuerbilder zur strahlkräftigsten Farbe des Spektrums: Rot-Orange. Während alles Feste in Auflösung begriffen ist und mit ihm die Bildkonstruktion, ist es die Malerei des Rots gerade nicht. Sie bindet das flüchtig-unfassbare Element in bekannter, verdichtender Kompaktheit an die Malmaterie, an Duktus und das Bildgeviert.<br><br>Cézannes prägnante Formulierung einer „Malerei parallel zur Natur“ trifft auch auf die Arbeit des Malers Thomas Prautsch zu. Malerei dient nicht der Nachahmung, sie ist eine Kunstform. Dem faszinierenden, vibrierenden Spannungsverhältnis zwischen Flächenbezug und Raumillusion in Prautschs Bildern korrespondiert die Reibung zwischen farb-chromatischer Differenzierung und vereinheitlichendem Generalklang. Die steinernen Treppen führen nirgendwohin, wenn nicht ins Bild.<br><br>Katalogtext zur Ausstellung: Thomas Prautsch - Ansichten<br>Kunstverein Ahlen, 2012, Prof. Udo Scheel" }, //
    'schatten': {
        title: "Paris, Hamburg und ein tiefer Schatten",
        author: "Stephan Trescher",
        content: "Day and night<br><br>Meine sehr verehrten Damen und Herren,<br><br>fangen wir doch mal dort an, wo es licht und weit ist, groß und hell, in der Stadt der Lichter, der „Ville Lumières“, also: in Paris. Von dieser Stadt hat Thomas Prautsch etliche Ansichten gemalt, allesamt weit weg von touristischen Sehenswürdigkeiten – und umso sehenswerter. Meistens von einem ziemlich erhöhten Betrachterstandpunkt, wie von einem Berg, Aussichtsturm, Feldherrnhügel oder Flugzeug aus, zugleich aber mit einem die Perspektive zusammenstauchenden Teleobjektiv ausgerüstet, nimmt er charakteristische, aber selten bauhistorisch bedeutsame Teile der Stadt in den Blick, alt- wie neumodische.<br><br>Ich greife jetzt mal ein Gemälde heraus, wegen seiner schönen Lichtstimmung, die den Gepflogenheiten eines anständigen Künstlers und Bohemiens entsprechend nur die Abenddämmerung und nicht die Morgenröte sein kann – jedenfalls ist es eine tief stehende Sonne, die ihr rötlich goldenes Licht nur noch über Teile der Dächer und der obersten Stockwerke ergießt, während die Fassaden darunter schon im Dunkeln liegen. Sie stehen in heftigem Kontrast zu den Zinkdächern, die üblicherweise grau aussehen, bei dieser Beleuchtung aber, als Schatten, eher die Komplementärfarbe des Rotgoldes drumherum annehmen, also von einem an manchen Stellen bis ins Türkise reichenden Blau sind.<br><br>Dieser Farbklang ist das, was uns Betrachter sofort für das Bild einnimmt – und das Können des Malers Prautsch so unmittelbar einleuchtend vor Augen führt.<br><br>Spannend zu beobachten ist dann, wenn wir uns in eine detailliertere Betrachtung begeben, wie der Künstler auf dem Gemälde Licht und Farbe austariert, aber auch, was einem zunächst gar nicht auffällt, da der Gesamteindruck so realistisch, ja beinahe naturalistisch ist, wie breit, großzügig, ja manchmal geradezu grob sein Pinselstrich ist.<br><br>Wenn man direkt vor der Leinwand steht (die im Übrigen kein Leinwandstoff ist, sondern Nessel – aber das nur nebenbei), wenn man also aus nächster Nähe auf so ein Gemälde schaut, dann sieht man nur unterschiedlich breite Pinselstriche, eher kleinteilig und heftig bewegt, von deutlich gestischer Kraft, und einen Wechsel von flachen Partien und dick pastos aufgetragenen, reliefhaft dicken Stellen. Diese können tatsächlich ein Architekturdetail darstellen, die Kante eines Fenstersimses, einen Dachfirst oder ähnliches , sie müssen aber durchaus nicht gegenständlich begründet sein, sondern sind dann nur jene Bildbereiche, in denen sich tatsächlich das Umgebungslicht fängt und der Oberfläche ihre große Plastizität verleiht.<br><br>Darüberhinaus modelliert Prautsch aber eben durch die und mit der Farbe das räumliche Ganze, also nicht faktisch, sondern illusionistisch, das heißt: er stellt das Licht dar oder evoziert es, rein mit malerischen Mitteln. Und wiewohl man seine Pinselführung großzügig nennen kann, weil beileibe nicht jedes Fensterkreuz ganz gerade sitzt oder jeder rechter Winkel auch90 Grad hat, so ist die gesamte malerisch-kompositorische Anlage doch von erheblicher Akribie. Was man an den langen Entstehungszeiten der Gemälde ablesen kann – aber im Ergebnis eben auch an ihrem einheitlichen atmosphärischen Ausdruck, dem durch das Wechselspiel von Detailreichtum und malerischer Abstraktion erzeugten Wow - Effekt.<br><br>Wir machen jetzt einen Schritt von der Dämmerung in die Nacht und ein paar Schritte von Paris in Richtung Norden:<br><br>Hamburg ist unter Lichtaspekten eher bekannt für sein Rotlicht. Und tatsächlich finden sich auch rote Lichtpunkte auf Thomas Prautschs Panorama-Gemälde, aber nicht weil er hier die Reeperbahn in den Blick nimmt, sondern den Hafen bei Nacht und wir entsprechend auch Positionslampen, Warnlichter und Backbordleuchten ausmachen können.<br><br>Der Wechsel vom Tag zur Nacht markiert natürlich den größten Unterschied zwischen dem vorher beschriebenen Gemälde zu diesem Exemplar hier. Nachts sind alle Katzen grau, heißt es, und das gilt (mehr oder minder) auch für Gebäude.<br><br>Auch wenn man hier und dort Rot-, Rosa- und Brauntöne an Fassaden und Dächern ausmachen kann, das Gros der Architektur bewegt sich farblich zwischen fast Weiß und tiefem Schiefer. Vor allem aber sind die Zonen, die den Großteil des Gemäldes ausmachen, Wasser und Himmel, von einem alles vereinheitlichenden Blaugrau. Und auch da hat der Volksmund wieder mal recht, Blaugrau bleibt Blaugrau, da beißt die Maus keinen Faden ab, da hilft auch das ganze elektrische Licht nix.<br><br>Allerdings hilft es als Kontrastmittel dieses Bild aufs spannendste zu beleben, auch wenn nicht viel los zu sein scheint: Ganz rechts unten in der Ecke sieht man ein paar Autos entlangfahren und auf dem Wasser im Hafenbecken sind auch gerade mal zwei Schiffe und zwei Lotsenboote unterwegs.<br><br>Aber die Lichter! In den Gebäuden, an den Gebäuden, auf Kranmasten und an Schornsteinspitzen, an den Lagerhallen, auf Landungsbrücken, an Stegen und über Hausdächern: Manchmal flächig, meistens punktuell, gehören sie entweder der weißlichen Kaltlicht- und Neonfamilie an, oder, und das in der Mehrzahl, den warmen Glühbirnen- und eingefärbten Laternentönen, von buttrig Gelb über Kupferrot bis zu feurig Orange. Sie machen das Gemälde zu einem wahren Spektakel. Als direktes Licht, als diffuser Widerschein oder als Reflex auf dem Wasser, da kann die silbrig matte Spiegelung des wolkenverschleierten Mondes im brackigen Hafenbecken nicht gegen anstinken.<br><br>Hot Stuff<br><br>Wenn uns bei der Betrachtung von so viel Dunkelheit und Nässe vielleicht dann doch etwas klamm zumute geworden sein sollte, dann hilft uns ein bißchen Hot Stuff, in diesem Falle: Thomas Prautschs Feuerbilder.<br><br>An denen können wir uns wirklich wärmen, solch eine Intensität geht von ihnen aus. Als gemütlich würde ich diese Gemälde allerdings nicht bezeichnen wollen, denn der Künstler malt hier weder wildromantische Lagerfeuer, noch Grillparties im Freien und auch kein beschauliches Kaminzimmeridyll. Seinen Feuerbildern wohnt tatsächlich das rein Elementare des Feuers inne, seine Wärme und wohltuende Wirkung ebenso wie sein bedrohliches Zerstörungspotential und oft genug können wir angesichts dieser Gemälde nicht entscheiden, ob wir hier nun Zeugen einer Katastrophe werden oder eines Freudenfeuers, dazu liefert uns der Maler nicht genug gegenständliche Anhaltspunkte. Wir sehen höchstens mal ein Holzscheit, einen Ast, einen Baumstamm, der da lichterloh brennt, oft genug können wir noch nicht einmal das erkennen, vor lauter Flamme und Glut, dann ist das ganze Bild ein einziges Lodern, eine Orgie in Schwarz, Rot, Orange, Gold und Gelb.<br><br>Man meint es förmlich knistern und prasseln zu hören, vielleicht gar zu riechen. Obwohl gerade in den Gemälden ohne erkennbares brennbares Material sich der Maler wie selten sonst der Ungegenständlichkeit nähert und das Licht einmal mehr aus der reinen Farbmaterie hervorzubrechen scheint. Selbst die kleinstformatigen Bilder, die Thomas Prautsch verniedlichenderweise „Flämmchen“ nennt, möchte man nicht so richtig anfassen, aus Sorge, sich die Finger zu verbrennen.<br><br>Flüssig fließend<br><br>Aber Genug mit dem Feuer gespielt: Zur Erfrischung gibt es jetzt etwas ganz Überraschendes – vor allem für diejenigen, die Thomas Prautschs Arbeiten schon eine Weile verfolgen – denn noch bis vor kurzem gab es so etwas von ihm nicht zu sehen: Scheinbar schnell und flüchtig, jedenfalls skizzenhaft und nur mit dünnflüssiger Farbe auf Leinwand gebannte Bilder, in kaum mehr als Schwarzweiß. Nun gut, es ist auch ein bißchen Blau beigemischt und in einem Fall sogar ein paar Akzente in Rostrot. Wieder handelt es sich hierbei um Ansichten aus dem Hamburger Hafen. Aber obwohl das Schwelgen in der Farbe, in den Nuancen und im unterschiedlich dicken Farbauftrag vollkommen fehlen, obwohl die zahlreichen senkrechten Verlaufsspuren der nach unten fließenden Farbe die Motive zu verunklären drohen, schälen sich doch ganz deutlich Bildgegenstand und -Komposition heraus, sind auch die offenbar mit breiterem und trockenem Pinsel hingewischten diffusen Partien ganz klar als Himmel und Wasser zu erkennen – wie ja überhaupt im Vergleich mit den vorhin beschriebenen fertiggemalten Hamburg-Bildern auch hier noch erstaunlich viel Detailfreude und sogar imaginäre Farbigkeit drinsteckt.<br><br>Eigentlich ist es vollkommen verwunderlich, daß wir unter den ganzen Tropfspuren, in den wirren, schwarzen, mehr oder minder senkrechten Linienbündeln Krangerüste ausmachen können und in den breiteren schwarzen und weißen Streifen einmal Gebäude und ein anderes Mal optisch ineinander verkeilte Schiffsaufbauten. Aber irgendwie sind die wesentlichen Umrisslinien, die Perspektive und vor allem die Hell- und Dunkelwerte schon vorhanden. Insofern ist es vielleicht gar nicht so erstaunlich zu erfahren, daß auch unter den „normalen“, zu Ende gemalten, farbsatten Gemälden eine Untermalung liegt, die diesen Bildern ziemlich ähnelt.<br><br>Tusche<br><br>Daß aber Thomas Prautsch im Prinzip mit noch weniger Mitteln, noch größerer Zurückhaltung und in noch wesentlich kleinerem Format, realistische und räumlich äußerst suggestive Bilder zu malen versteht, zeigen seine geradezu winzigen Arbeiten in Tusche auf Papier.<br><br>In ganz wenigen Pinselstrichen in unterschiedlich stark verdünntem Schwarz, das eine Vielzahl von Grauschatttierungen annehmen kann, und dem Weiß des Papiers evoziert er  mehr als daß er es malerisch ausformuliert, Architekturen und Stadtlandschaften, die bei aller Zartheit der Pinselführung überhaupt nichts Übereiltes oder Skizzenhaftes an sich haben, sondern ganz und gar fertige Bilder sind, fest gefügt und atmosphärisch dicht.<br><br>Wer nun meint, das ließe sich nicht mehr steigern, der sieht sich getäuscht, sobald er sich Prautschs Landschaftsminiaturen zu wendet – in gewisser Weise einer glücklichen Synthese aus den akribisch genauen, großen Ölgemälden und jenen extrem zurückgenommenen und reduzierten Tusche-Winzigkeiten:<br><br>Diese Papierarbeiten sind nie größer als ein DIN A 4-Blatt, meistens erheblich kleiner. Der Farbauftrag ist weniger dicht und pastos, wirkt schneller, spontaner und nicht ganz so akribisch durchgearbeitet wie auf den großformatigen Gemälden. Vor allem aber ist das Verhältnis von Pinselstrich und malerischer Geste zum Bildformat ein anderes. Das heißt, nur weil der Maler jetzt auf kleinem und allerkleinstem Bildgrund arbeitet, ändert er doch weder Werkzeug noch Malweise grundlegend, so dass das bildliche Ergebnis, man könnte sagen: gröber wirkt, jedenfalls so, dass die Balance zwischen bedeutungsfreiem Strich, zwischen reiner Farbmaterie und Bildgegenstand sich verschiebt, und zwar eindeutig in Richtung des Abstrakten, Ungegenständlichen.<br><br>Wir befinden uns vor diesen kleinen Bildern also erst einmal in ständiger Nahsicht, ja geradezu in mikroskopischer Detailbetrachtung und müssen, was bei diesem Format erstaunlich ist, erst ein paar Schritte zurücktreten, um das Dargestellte, meistens Landschaftliches; überhaupt in Gänze erfassen zu können.<br><br>Aber selbst wenn wir das nicht tun und, beispielsweise, anstelle von dramatisch sich zusammenballenden Wolkenbergen, einem fahl daraus hervorleuchtenden, letzten Stück unbedeckten Himmels und gleißenden Spiegelungen auf dem Meer darunter, nur viele Pinselhiebe in grauen, blauen und schwarzen Tönen mit ein paar weißen Fetzen hier und einigen sandgelben Einsprengseln dort sehen, selbst dann bemerken wir, dass es Thomas Prautsch ganz genauso wie in seinen großen Gemälden glückt (was so viele Maler anstreben und so wenigen gelingt), mit malerischen Mitteln, nur mit Pinsel und Farbe, das Licht ins Bild zu bannen. Das ist keine Kleinigkeit, das grenzt an Zauberei.<br>Wohlan denn: Lassen Sie sich bezaubern!<br><br>Rede zur Eröffnung: Thomas Prautsch - Im Licht ist der Schatten tiefer<br>Kunstverein Melle, Sept. 2018, Dr. Stephan Trescher" }, //
    'aussicht': {
        title: "Aussichtsreich",
        author: "Wolfgang Türk",
        content: "Wer aus der Höhe den Blick auf die Dinge richtet, wem es vergönnt ist, die Welt von oben zu betrachten, dem beschert der Perspektivwechsel fast  zwangsläufig eine veränderte Wahrnehmung, mit der sich die Maßstäbe des Alltäglichen verschieben. Es ist nicht nur die Veränderung der Dimensionen, die vieldeutige Herabsetzung des Großen zum Kleinen, es ist auch die Zusammenschau, ja Aufhebung wenn nicht sogar Auflösung vereinzelter Details zu einem neuen Ganzen. Unerwartete Bilder entstehen, in denen tektonische Strukturen ihren ordnenden Charakter verlieren, Konturen verschwimmen, kantige Abgrenzungen organischen Formen weichen.<br><br>Thomas Prautschs Stadtansichten eint der gleiche Blickwinkel, eine leichte Schräge von oben, die Aufsicht zwar suggeriert, aber die Frontalansicht in der Andeutung immer erahnen lässt. Wasserwege, Hafenbecken, Industrieanlagen, Straßen, Parks und Gärten, Häuser, Dächer und Fassaden verdichten sich zu einer individuell geschauten Topographie, die einerseits Wiedererkennbarkeit (wie bei den Ansichten von Münster, Hamburg oder Paris), andererseits Fremdheit, ja Austauschbarkeit da suggeriert, wo dem Betrachter die Spezifik signifikanter Gebäude fehlt. Das intensive, aber durchaus reduzierte Farbspektrum dieser Arbeiten bildet die Jahreszeiten ab, veranschaulicht Tag und Nacht und zeichnet den Wechsel des Wetters von sonnendurchglänzter Helligkeit zu drohenden Gewitterstimmung nach. Atmosphärische Dichte erzielt Thomas Prautsch dabei durch ein gekonntes malerisches Wechselspiel von Licht und Schatten: Da gibt es hier  ein erleuchtetes Zimmer,  dort eine brennende Straßenlaterne oder  das Aufblitzen eines Scheinwerfers, mit denen das Dunkel der nächtlichen Szenarien durchbrochen wird; auf anderen Bildern hellt ein Sonnenstrahl den regennassen Tag auf oder ein fernes Wetterleuchten durchmisst hoffnungsreich den wolkenverhangenen Gewitterhimmel. Dieses synthetische Zusammenfinden von Farbe und Licht, das seine Inspiration durch die impressionistische Malweise widerspiegelt, überführt in den Arbeiten des Künstlers die gegenständliche Welt in einen Bereich der Formauflösung und semantischen Unbestimmtheit. Nicht mehr die mimetische Abschilderung von landschaftlicher und urbaner Wirklichkeit sondern das Einfangen ihrer flüchtigen Stimmungsvaleurs ist Anlass und künstlerische Intention.<br><br>Es ist dabei die signifikante Menschenleere in diesen Bildern, der in paradoxer Verkehrung ein Narrativ, ein erzählerisches Moment innewohnt. Fast scheint es, als ob diese verlassenen Stadtlandschaften auf ein Gewesenes zurückverweisen oder ein Kommendes ankündigen wollen – so, als gelte es, den verlassenen Raum in der Phantasie durch ein Gedankenkonstrukt des Betrachters zu kompensieren. Dieser Aspekt des Unausgesprochenen, Vieldeutigen wird besonders in dem großformatigen Gemälde Spiegelung VI deutlich, das in der für den Künstler ungewöhnlichen Nahsichtigkeit die Auswirkung eines Hochwassers in einem Münsterschen Vorort abschildert. Die drei Bildebenen werden von einer überdimensionierten Wasserfläche dominiert, in der sich die Umgebung widerspiegelt, die zugleich aber die Zugänglichkeit des dahinter liegenden Wohnhauses erschwert. Wird das Wasser gefährlich ansteigen oder findet es seinen Weg zurück in die Kanalisation? Ist das Haus ein bergender Zufluchtsort, an dem man sich – die gehisste Deutschlandfahne in der rechten Bildhälfte suggeriert es – in gemütvoller Geselligkeit weiterhin den spannenden Meisterschaftsspielen widmen kann, oder lässt ein Blick auf das vielleicht wieder ansteigende Wasser eher eine Bedrohung dieses Vorstadtidylls befürchten? Die Antwort ist der Spekulationslust des Rezipienten überlassen; eindeutig ist sie nicht.<br><br>Es ist nur folgerichtig, wenn Thomas Prautsch – die Abstraktion vorantreibend – seine motivischen Vorlagen in einer anderen Werkgruppe in Licht- und Farbphänomene überführt, ihre Provenienz weiter verunklärt und letztlich  der Erscheinung vor dem Konkreten den Vorzug gibt. Bilder von dem Mauerwerk mit den sich emporwindenden Ranken oder den moosüberwucherten, regennassen Stufen entbehren motivisch des kontextuellen Zusammenhangs, werden auf die bloße inhaltliche Andeutung reduziert und erweitern den Bildraum semantisch ins Unbestimmte: die Mauer könnte sich in unbegrenzte Höhen auftürmen, die Treppe hingegen führt zu einer geheimnisvollen Lichtquelle, der zu folgen Bedrohung oder Erleuchtung, Gefahr oder Erlösung bedeuten kann.<br><br>In Erweiterung seiner Farbpalette, die sich zuvorderst Grün- und Blautönen in vielfältigen Nuancierungen verschrieben hat, erweitert Thomas Prautsch in seinen Flammen- und Feuerbildern das Spektrum um eine Vielzahl an Rot- und Gelbtönen. Das Licht, leitmotivische Verknüpfung in seinen Arbeiten, erhält hier seinen spektakulären Auftritt. In einer lodernden Unberechenbarkeit beherrscht das Feuer das Bildganze, die Flammen züngeln empor, sie negieren alle Demarkierungen und Begrenzungen der Fläche, als gelte es von hier aus einen Weltbrand zu entfachen, gar eine Allegorie des Feuers, jene kaum domestizierbare Naturkraft, die nicht nur Wärme sondern so leicht auch Gefahr, Bedrohlichkeit und Vernichtung bedeuten kann, im Bild symbolhaft zu erfassen.<br><br>Hier wie auch in den kleinformatigen Landschaftsimpressionen von Thomas Prautsch ist Abstand in der Bildbetrachtung geboten. Pastose, oft bis zur Reliefstruktur aufgetragene Farbschichten, einmal lasierende, dann wieder gesättigte Pinselstriche nehmen sich in der Nahsicht lediglich als abstrakte Farbflächen aus, erst beim Zurücktreten verbildlichen sie gemäß der Intention des Künstlers das Spiel der Elemente – Erde, Feuer, Wasser, Luft – lassen sie sich als malerische Momentaufnahmen von Natur wahrnehmen und ausdeuten.<br><br>„Reine“ oder „pure“ Malerei nennt die Kunsttheorie eine zutiefst malerische Haltung,  die abstrakte Formen und Farben zwar absolut in den Bildraum setzt, damit zugleich aber für den Rezipienten das weite Feld individueller Assoziation und Sinndeutung öffnet und zulässt. Was ist zuerst da? Die Vorlage, das gewählte Motiv, das seine bildkünstlerische Gestalt sucht? Oder der spontan hingeworfene Pinselstrich, der zu anschließenden Deutung und Interpretation animiert? Thomas Prautschs zarte, flüchtig-ephemere Wolkenbilder, die hingestäubtem Graphitpulver ihre schwebende Existenz verdanken, sind letztlich zwar nur vereinzelte oder geballt auftretende Formen, die aber dem Betrachter aus gebührender Distanz einen Blick ins Firmament suggerieren, an dem er zum Augenzeugen eines bewegten Naturschauspiels wird.<br><br>Den Fluss der Dinge, Bewegung und Fluktuation festzuhalten, legt in Malerei und Zeichnung die Listung, die Reihung, die Multiplikation mutmaßlich bis ins Unendliche nahe; im Film ermöglicht das Medium dagegen per se die Darstellung eines Ablaufs, einer Entwicklung oder einer Chronologie. Die fast wie in einem Insektarium präsentierten Stadtansichten von Thomas Prautsch, Momentaufnahmen auf einem stereotyp sich wiederholenden Weg zwischen Wohnung und Atelier, korrespondieren mit den einzelnen Bildsequenzen in dem beigestellten Film. Durch die identische monochrome Farbigkeit in schwarz-weiß treten Tuschezeichnung und Film in einen sprechenden Dialog miteinander. Von einer im Alltag erfahrenen Wirklichkeit inspiriert, halten sie in loser Bildfolge eine Fahrt in mehr oder weniger markanten Ausschnitten fest, um sich in der Zusammenschau zu einem Kontinuum zu verdichten. In diesen Arbeiten von Thomas Prautsch verschwimmen eindringlich die Grenzen der Gattungen, da die Werke auf gänzlich unterschiedlichen Wegen zu verblüffend ähnlichen Ergebnissen kommen.<br><br>Die Objekte und Phänomene der Wirklichkeit in der impressionistischen Malweise aufzulösen, sie weiter in der Abstraktion auf elementare Formen zu reduzieren, um sie schließlich über die serielle Reihung in die laufenden Bilder des Films zu überführen – auch das mag eine Lesart sein, das vielgestaltige Werk von Thomas Prautsch in einen konsequenten künstlerischen Entwicklungsgang einzureihen. Es dokumentiert sein Kunst-Wollen, der sich stets verändernden Anschauung von Welt in immer neuen Medien habhaft zu werden und sie im Stillstand des nur einen Augenblicks verharren zu lassen, damit aber gleichsam jeglicher Zeitlichkeit zu entgehen.<br><br>Rede zur Eröffnung: Thomas Prautsch - Aussichtsreich<br>Stadtmuseum Warendorf, April 2024, Wolfgang Türk" }, //
    'preisträger': {
        title: "Preisträger des Caspar-von-Zumbusch-Preises",
        author: "H.G. Eisenhut",
        content: "Thomas Prautsch, 1965 in Frankfurt am Main geboren, nahm 1988 das Studium der Malerei an der Kunstakademie in Münster bei L. von Arseniew und Timm Ulrichs auf, erhielt 1991 seine Ernennung zum Meisterschüler und schloss 1999 das Studium mit Aushändigung des Akademiebriefes ab.<br><br>Thomas Prautsch entwickelt während des Studiums eine eigene Bildsprache, die er frühzeitig der Öffentlichkeit präsentiert. So sind seit dem Jahre 1993 seine Werke kontinuierlich auf renommierten Ausstellungen vertreten. In all diesen Werken ist formal und inhaltlich eine malerische Dichte deutlich spürbar, begonnen mit den Tusche- und Kohlezeichnungen aus den Anfängen seines Studiums, die sein Interesse an zeichnerisch-linearen Strukturen mit starken Hell/Dunkelkontrakten dokumentieren, über seinen Aufenthalt in Berlin, der künstlerisch verarbeitet zur Verdichtung des Farbmaterials im Malprozess wiederum zu Strukturen führt, die Licht und Schatten beschreiben, dann zum Treppenmotiv, von dem er selbst sagt, dass es mehrere Jahre das Gerüst seiner Malerei bildete.<br><br>Thomas Prautsch malt, was er real sieht in Verbindung mit seinem inneren Eindruck. Er beschreitet mit seiner Malerei einen Weg zwischen Gegenständlichkeit und Abstraktion. Das wird sichtbar in dem meist einfachen Kompositionen, Waagerechten und Diagonalen – es sind die Leitlinien seiner Malerei – die den Malspuren gegenüber stehen und das Bild zu einem rhythmischen Geflecht verdichten.<br><br>Sowie auch schon beim Treppenmotiv bleibt er dem Thema der Steinstrukturen in seinen weiteren Arbeiten treu. Sein Aufenthalt in Irland im Jahre 1997 konfrontiert ihn mit der Landschaft, etwas völlig Neues für ihn, der sich bisher mit der Stadtlandschaft und sich daraus ergebenden Einzelstrukturen befasst hatte. Er entdeckt eine karge Landschaft aus übereinander geschichteten Kalksteinplatten, eine scheinbar ungeordnete Struktur, die keinen Gesetzen und Regeln zu folgen scheint, und doch fasziniert ihn die Oberflächenstruktur, das endlose Durcheinander von Furchen und Rinnen mit metertiefen Brüchen und harten Verschattungen, dass er die Verarbeitung dieses Themas in seinen letzten Arbeiten darstellt, ein fließender Übergang vom starren Treppenmotiv zur amorphen natürlichen Gesetzmäßigkeit.<br><br>Preisträger-Laudatio zum Caspar-von-Zumbusch-Preis für Thomas Prautsch<br>Caspar-von-Zumbusch-Museum, Herzebrock-Clarholz, 2000, H.G. Eisenhut" 
    }
};

function openTextModal(id) {
    const data = texteSammlung[id];
    const modal = document.getElementById('textModal');
    if (data && modal) {
        document.getElementById('modalTitle').innerText = data.title;
        document.getElementById('modalAuthor').innerText = data.author;
        document.getElementById('modalFullText').innerHTML = data.content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeTextModal() {
    const modal = document.getElementById('textModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// ==========================================================================
// RUHIGES, SANFTES EINBLENDEN NACH LAYOUT-STABILISIERUNG
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-img');

    images.forEach(img => {
        const revealImage = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    img.classList.add('is-loaded');
                });
            });
        };

        if (img.complete) {
            revealImage();
        } else {
            img.addEventListener('load', revealImage);
            img.addEventListener('error', revealImage);
        }
    });
});

// ==========================================================================
// Lightbox für Ausstellungen
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
  
    const lightbox = document.getElementById('exhibition-lightbox');
    const lightboxImg = document.getElementById('exhibition-lightbox-img');
    const closeBtn = document.querySelector('.exhibition-lightbox-close');
    const triggers = document.querySelectorAll('.exhibition-lightbox-trigger');
  
    // 1. Öffnen der Lightbox beim Klick auf ein Ausstellungsbild
    triggers.forEach(trigger => {
      trigger.addEventListener('click', function() {
        lightboxImg.src = this.src; // Quelle des geklickten Bildes übernehmen
        lightbox.classList.add('active'); // Lightbox anzeigen
        document.body.style.overflow = 'hidden'; // Scrollen auf der Hauptseite verhindern
      });
    });
  
    // 2. Schließen-Funktion (wird mehrfach wiederverwendet)
    function closeExhibitionLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = ''; // Scrollen wieder aktivieren
      lightboxImg.src = ''; // Bildquelle leeren (spart Ressourcen)
    }
  
    // 3. Schließen beim Klick auf das Kreuz
    closeBtn.addEventListener('click', closeExhibitionLightbox);
  
    // 4. Schließen beim Klick auf den Hintergrund ODER das Bild
    lightbox.addEventListener('click', function(e) {
      // Schließt immer, egal ob auf den Hintergrund oder das Bild geklickt wird
      closeExhibitionLightbox();
    });
  });

// ==========================================================================
// E-MAIL-SPAMSCHUTZ (ZENTRAL)
// ==========================================================================
document.addEventListener("DOMContentLoaded", function () {
    var user = "mail";
    var domain = "thomasprautsch.de";
    var email = user + "@" + domain;
    var emailLink = '<a href="mailto:' + email + '">' + email + '</a>';

    // 1. Kontakt-Button (z. B. Startseite)
    var kontakt = document.getElementById("email-protection-kontakt");
    if (kontakt) {
        kontakt.href = "mailto:" + email;
        kontakt.innerHTML = "✉ " + email;
    }

    // 2. Impressum
    var impressum = document.getElementById("email-protection-impressum");
    if (impressum) {
        impressum.innerHTML = emailLink;
    }

    // 3. Datenschutz & weitere Vorkommen
    ["email-protection-1", "email-protection-2"].forEach(function (id) {
        var element = document.getElementById(id);
        if (element) {
            element.innerHTML = emailLink;
        }
    });
});