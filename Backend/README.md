# agroDigital

1.  esp8266Node

        les différentes fonctionnalités sont les suivantes

        --> connection a l'esp8266 via le module wifi
        --> recuperation des données du capteur (soil moisture sensor) et envoie au serveur
        --> definition de deux méthodes allumerPpompe() et eteindrePompe() pour ouvrir et fermer le relais

2.  serverNode

        les différentes fonctionnalités sont les suivantes

        --> creation d'un compte
        --> authentification
        --> parametrage de la plante
        --> comparaison du seuil d'humiditité
        --> visualiser infos en temps réel
        --> declencher arrosage manuellement
        ---> visualiser historique
        --> desactiver système d'arrosage automatique
