const mqtt = require('mqtt');

// Définir l'URL du broker MQTT
const brokerUrl = 'mqtt://broker.example.com'; // Remplacez par l'URL de votre broker MQTT

// Se connecter au broker MQTT
const client = mqtt.connect(brokerUrl);

// Événement déclenché lorsque la connexion est établie
client.on('connect', function () {
    console.log('Connecté au broker MQTT');

    // Souscription à un topic
    client.subscribe('topic1', function (err) {
        if (!err) {
            console.log('Abonné au topic1');
        }
    });

    // Publication de messages
    client.publish('topic2', 'Hello MQTT', function () {
        console.log('Message publié sur topic2');
    });
});

// Événement déclenché lorsqu'un message est reçu
client.on('message', function (topic, message) {
    console.log('Message reçu sur le topic:', topic, 'avec le contenu:', message.toString());
});

// Gestion des erreurs
client.on('error', function (error) {
    console.error('Erreur survenue:', error);
});
