
# Hópaverkefni 2
Hópaverkefni 2 í Vefforritun 1 HÍ haust 2020. <br>
<a href="https://github.com/vefforritun/vef1-2020-h2">Fyrirmæli</a>

Annað hópverkefnið í vefforritun 1 á haustönn 2020. <br/>
Í hópinum eru;

 * **Bryndís Rósa Sigurpálsdóttir** *brs58@hi.is*,
 * **Eydís Sjöfn Kjærbo**,  *esk12@hi.is*
 * **Katarina Kekic**  *kka10@hi.is*
 * **Kristín Eva Ólafsdóttir** *keo7@hi.is*
 * **Hafþór Aron Tómasson** *hat16@hi.is*

Notendanöfnin hópameðlima á github eru ;<br/>
*bryndisrosa97* hjá Bryndísi<br/>
*eydissjofn* hjá Eydísi <br/>
*katkek* hjá Katarinu <br/>
*kristin3va* hjá Kristínu <br/>
*hafthorat* hjá Hafþór <br/>



# Verkefnið keyrt
Við gerð verkefnisins voru ýmis tól nýtt. Því er hægt að keyra verkefnið í þróunarham með því að keyra 
`NPM install` í skipanalínu i rót verkefnisins, þ.e.a.s. ef notandi hefur t.d. _nodejs_ sett upp í tölvunni. Í **package.json** er hægt að sjá hvaða tól munu þá vera sett upp,
en það eru meðal annars _eslint_, _rollup_, _stylelint_, _concurrently_, _browser-sync_ og ýmis _babel_ plugin. 

Til að keyra verkefnið er hægt að keyra `NPM run dev`, en það keyrir dev scriptuna sem er skilgreind í **package.json**. Þá mun concurrently sjá um að keyra _sass_, _sass-watch_, _rollup-watch_ og _browser-sync_ saman. Þessi samsetning skapar þægilegt umhverfi sem sameinar **.js** skrár saman sem og þýðir **.css** 

Eftir `NPM run dev` er hægt að opna síðu sem er hýst á localhost, slóðin mun líklegast vera http://localhost:3000 ef það er laust, annars er hægt að sjá hver rétt slóð er í skipanalínunni.

# Uppstilling skráa og gagna
Í rót verkefnis eru ýmis **config** skjöl sem stilla tól, ritla, plug-in og fleira. Einnig er þar þessi **README** skrá sem og **index.html** sem er upphafsíða vefsíðunnar. Gefnar voru **.gitignore**, .**.gitattributes** og **.editorconfig** og eru þær einnig geymdar í rótinni. 

Skrár sem eru notuð til þróunar á vefsíðunni og eru vöktuð af þróunartólunum eru geymdar í **src** möppu sem liggur í rótinni. Þegar átt er við þær skrár á meðan að þróunarumhverfið er í gangi eru þær túlkaðar í samsavarandi skjöl í **dist** möppu. Þar eru því þær **.js** og **.css** skrár sem vafrinn notar til að gera síðuna.

Í **src** möppunni eru möppurnar **lib**, sem geymir **.js** skrár og **styles** sem geymir **.scss**. Allar **.scss** skrár eru teknar saman í **styles.scss** svo að _node_sass_ geti tekið þær saman í **dist/styles.css**. 

Myndbönd til afspilunar eru geymdar í **videos** möppu sem er í rótinni. Inntaksgögn eru þess fyrir utan í **videos.json** skrá í rótinni. 
