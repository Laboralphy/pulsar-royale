/**
 * Classe de réaction cliente à une connexion au serveur Kaode
 */

O2.extendClass('chat', chatAbstract, {


    sUserName: 'Neo', // nom de l'utilisateur connecté
    sUserId: '1000', // identifiant de l'utilisateur connecté

    /**
     * Initialisation de l'application
     */
    init: function() {
        console.log('Initialisation du chat');
        this.connectAction();
        console.log(this.oClientSocket);

    },

    /**************************************************************
     *
     *                       A C T I O N S
     *
     * Les action sont invoqué par généralement par des actions
     * utilisateurs comme le pressage de bouton...
     **************************************************************/


    /**
     * Connection effective du client
     */
    connectAction: function() {
        if (this.oClientSocket) {
            throw new Error('Déjà connecté.');
        }

        console.log('connectAction()');

        this._connectToServer();
    },





    /*************************************************
     *
     *      P R I V A T E   M E T H O D S
     *
     *************************************************/



    /**
     * Action par défault pour tous les bouton
     * Lecture de la data-action et lancement de la methode correspondante
     */
    _actionOnClick: function(oEvent) {
        var oElem = oEvent.target;
        try {
            var $elem = $(oElem);
            var sAction = $elem.data('action');
            if (sAction) {
                this[sAction + 'Action'](oEvent);
            }
        } catch (e) {
            View.error(e);
        }
    },

    /****************************************************
     *
     * MESSAGE CLIENT VERS SERVEUR
     *
     ****************************************************/

    /**
     * Envoi d'une demande de login
     */
    send_LOGIN: function(sUserName, sID) {
        this.oClientSocket.send('LOGIN', {u: sUserName, p: sID});
    },

    /**
     * Envoi d'un message de discussion au serveur
     */
    send_T_SAY: function(sMessage) {
        this.oClientSocket.send('T_SAY', {m: sMessage, c: this.sCurrentChannel});
    },




    /****************************************************
     *
     * RECEPTION DE MESSAGES SERVEURS
     *
     ****************************************************/


    /**
     * Connexion réussie
     * On lance l'authentification
     */
    net_connect: function() {

            this.send_LOGIN(this.sUserName, this.sUserId);

            $('.chat-input > input').on('keydown', (function(oEvent) {
                console.log("chat enter");
                switch (oEvent.which) {
                    case 13:
                        this.send_T_SAY(oEvent.target.value);
                        oEvent.target.value = '';
                        break;
                }
            }).bind(this));

    },

    /**
     * Déconnexion inopinée
     */
    net_disconnect: function() {
        $('body').empty();
        View.error('Déconnecté !');
    },

    /**
     * Message de bienvenue du serveur : on est correctement identifié
     */
    net_HI: function() {
        this.oClientSocket.send('T_LIST');
    },

    /**
     * Notre connexion a été refusée
     * @param data.e string message d'erreur
     */
    net_DN: function(data) {
        View.error(data.e);
    },

    /**
     * Le serveur a envoyé une liste de canaux disponnible
     * Et pour lesquels le client à le droit de se connecter
     * @param data.c array of string : liste des canaux
     */
    net_T_LS: function(data) {
        View.setChanList(data.c);
    },

    /**
     * Nouvel arrivant dans un canal de discussion
     * @param data.u string nouvel arrivant
     * @param data.c string canal sur lequel l'arrivant arrive
     */
    net_T_CA: function(data) {
        if (data.u == this.sUserName) {
            this.sCurrentChannel = data.c;
        }
        if (!(data.c in this.oChannelUsers)) {
            this.oChannelUsers[data.c] = [];
        }
        var aChan = this.oChannelUsers[data.c];
        if (aChan.indexOf(data.u) < 0) {
            aChan.push(data.u);
        }
        View.termPrint('<b>' + data.u + '</b> arrive dans le canal <b>' + data.c + '</b>');
        if (this.sCurrentChannel == data.c) {
            View.setUserList(this.oChannelUsers[data.c]);
        }
    },

    /**
     * Un client quitte un canal de discussion
     * @param data.u string client partant
     * @param data.c string canal sur lequel le départ A lieu
     */
    net_T_CD: function(data) {
        View.termPrint('<b>' + data.u + '</b> quitte le canal <b>' + data.c + '</b>');
    },

    /**
     * Liste des utilisateur d'un canal
     * @param data.u array of string : liste
     * @param data.c string canal concerné
     */
    net_T_CL: function(data) {
        this.oChannelUsers[data.c] = data.u;
        if (this.sCurrentChannel == data.c) {
            View.setUserList(data.u);
        }
    },

    /**
     * Message de discussion
     * @param data.u string utilisateur ayant emis le message
     * @param data.c string canal sur lequel le message est diffusé
     * @param data.m string contenu du message
     * @param data.d object : objet supplémentaire pouvant contenir des données issues de plugins
     */
    net_T_CM: function(data) {
        if (data.c == this.sCurrentChannel) {
            View.termPrint('<b>' + data.u + ' : </b>' + data.m);
        }
    },

    /**
     * Message d'information du serveur'
     * @param data.c string canal sur lequel le message est diffusé
     * @param data.m string contenu du message
     */
    net_T_IM: function(data) {
        if (data.c == this.sCurrentChannel) {
            View.termPrint('<i>' + data.m + '</i>');
        }
    },


});


O2.mixin(chat, O876.Mixin.Events);
O2.mixin(chat, O876.Mixin.Data);
