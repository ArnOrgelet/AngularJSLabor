# AngularJSLabor
Labor für die Erstellung eine Anwendung von der bestehenden Praxisborse.

Diese Anwendung benötigt, dass der Anwender ein aktives Konto bei der HsKA besitzt. 
Diese gelten als Credentials - ohne was die Proxisborse unsichtbar ist - und erlaubt eine Liste von Lieblingsangebote zu speichern.

Folgende Use-Cases werden umgesetzt:
1. Anwender können ihre Anmeldedaten eingeben.
2. Ein Anwender kann sich alle Angebote eines Typs wie Praxissemester usw. anzeigen
lassen. Weiterhin darf er einen Text eingeben, anhand dessen die Treffer
serverseitig gefiltert werden. Laden Sie im Falle mobiler Clients immer nur jeweils
10 Angebote herunter und erlauben Sie dem Anwender das Blättern zu den Folgeangeboten.
Wird die Anwendung im Browser aufgeführt, dann laden Sie stets
alle Angebote herunter. Ermitteln Sie die Angebotstypen dynamisch über die RESTSchnittstelle.
Ein festes „Einprogrammieren“ ist keine Lösung.
3. Beim Klick auf den Firmennamen wird eine Detail-Information zur Firma z.B. in einem
Popup-Dialog angezeigt.
4. Beim Klick auf ein Angebot wird eine Detail-Information zum Angebot z.B. in einem
Popup-Dialog angezeigt.
5. Erlauben Sie dem Anwender auch das Filtern nach Ländern, in denen die Arbeit
durchgeführt werden soll. Da das die REST-Schnittstelle nicht unterstützt, filtern Sie
clientseitig.
6. Anwender können Angebote auf ihren eigenen Merkzettel setzen.
7. Anwender können den Merkzettel einsehen, Angebote davon entfernen oder sich
Details der Angebote anzeigen lassen.


# AngularJSLabor
Labor for thte creation of an application using the job bank of the University of Applied Science Karlsruhe.

This application need that the user owns an active account at the HsKA. 
This acts as Credentials for the access - otherwise is the job bank not reachable - and give the possibility to save favourite offers into a personal list.

1. Users can enter their credentials.
2. A user can find all items of a type as Praxissemester etc. See leave. Furthermore, he may enter a text, based on which the results
be filtered on the server side. Be sure to charge only one in the case of mobile clients down 10 properties and allow the user to scroll to the following resources.
If the application is listed in the browser, then load always all offers down. Determine the types of offer dynamically over the remaining interface.
A solid "programing" is not a solution.
3. By clicking on the company name is a detailed information on the company is as in a Pop-up dialog appears.
4. When you click on an offer a detailed information about the offer is as in a Pop-up dialog appears.
5. Allow the user also filtering for countries where the work
is to be performed. Because that does not support the REST interface, filter client side.
6. Users can place bids on their own notepad.
7. Users can view the wishlist, remove them or offers. Show details of tenders.



#Literaturverzeichnis

[AngMat] Angular Material: https://material.angularjs.org/
[BStr] Bootstrap: http://getbootstrap.com/
[AnAuth] Authentifizierung mit AngularJS: http://jasonwatmore.com/post/2014/05/26/AngularJS-Basic-HTTP-Authentication-Example.aspx
[AnB] Bootstrap-Komponenten zusammen mit AngularJS: http://angular-ui.github.io/bootstrap/
[GoMaAp] Google Maps API: https://developers.google.com/maps/
[Intr] REST-Schnittstelle zum Intranet: http://www.iwi.hs-karlsruhe.de/Intranetaccess/public/doc/REST-Schnittstelle.pdf
[OpLay] OpenLayers: http://openlayers.org/
[TB14] Tarasiewicz, Böhm: AngularJS – Eine praktische Einführung in das JavaScript-Framework, dpunkt-Verlag
