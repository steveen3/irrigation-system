

	partie 6 : microcontroleur 
	
pour cette partie nous avons décidé d'utiliser le microcontroleur esp8266  
pour faciliter de manipulation grace a son module wifi intégré contrairement a un arduino uno simple 




1. telecharger et installer arduino ide  version 1.8.19 : 

2. ouvrez arduino ide > fichier > préférences et copiez-collez le lien suivant dans le champ url du gestionnaire de cartes supplémentaires.

https://arduino.esp8266.com/stable/package_esp8266com_index.json

3. ensuite, allez dans outils> planches : "quelle que soit la planche que vous utilisez" > board manager.

4. taper sur la barre de recherche esp8266 et télécharger et installer la version 2.7.4

5.  une fois telechargé fermer le gestionnaire de carte

6. connecter la carte a votre machine via le cable usb serie 

7. choisir outils>carte et selectionner l'esp8266 
	ou encore nodemcu 1.0 esp 12e-module et spécifier le port 
	
	
NB : créer un point d'accès et connecter votre machine 
	
8.  ouvrir l'ide>exemples>firmata>standardfirmatawifi

9. dans le fichier standardfirmatawifi.ino, décommentez la ligne suivante (ligne 85) :  #define serial_debug


10. à la ligne 119, saisissez le nom de votre réseau wifi, char ssid[] = "your_network_name"; remplacez your_network_name par le nom de votre réseau wifi.
une ligne 186, saisissez le mot de passe de votre réseau wifi, char ssid[] = "your_wpa_passphrase" ; remplacez your_wpa_passphrase par le mot de passe de votre réseau wifi.

11. cliquez sur le bouton "téléverser/upload" pour télécharger le croquis standardfirmatawifi sur votre carte nodemcu.

12.  une fois le téléchargement terminé, ouvrez le moniteur série dans l'ide arduino. réglez le débit en bauds sur 9600. réinitialisez votre carte nodemcu en appuyant sur la touche « rst ». bouton. vous devriez voir la sortie dans le moniteur série indiquant l'adresse ip de votre nodemcu, indiquant que le croquis standardfirmatawifi a été téléchargé avec succès sur votre carte nodemcu. notez l'adresse ip car elle est requise à l'étape suivante.


 	après avoir configuré notre microcontroleur il s'agit maintenant d'installer les dépendences 

1. se positionner a la racine du projet et exécuter les commandes suivantes  dans le terminal : 

	npm install johnny-five,
	npm install etherport-client

2.  executer le client  arduino dans son dossier avec la commande : 

node clientArduino.js 



