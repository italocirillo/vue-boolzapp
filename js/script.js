const { createApp } = Vue;
const dt = luxon.DateTime;
// const oraAttuale = dt.now().setLocale('it').toLocaleString(dt.TIME_SIMPLE);


createApp({
    data() {
        return {
            // ARRAY OGGETTI
            contatti: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            // FINE ARRAY OGGETTI
            contattoSelezionato: 0,
            messaggioDaInviare: "",
            ricercaUtente: "",
            arrayContattiCercati: [],
            oraAttuale: "",
            messaggioAttivo: false,
            menuMessaggioAttivo: false,
            messaggioCliccato: 0,
        }
    },
    methods: {

        // Messaggio da inviare 
        inviaMessaggio() {
            this.prelevaOraAttuale();
            nuovoOggettoMessaggio = {
                date: this.oraAttuale,
                message: this.messaggioDaInviare,
                status: 'sent'
            }
            this.contatti[this.contattoSelezionato].messages.push({ ...nuovoOggettoMessaggio });
            this.messaggioDaInviare = "";
            const contattoCheDeveRispondere = this.contattoSelezionato;
            // Timeout prima di ricevere il messaggio
            setTimeout(() => {
                this.riceviMessaggio(contattoCheDeveRispondere);
            }, 1000);
            setTimeout(this.scrollaChat, 1001);
        },

        // Messaggio da ricevere
        riceviMessaggio(contattoCheDeveRispondere) {
            this.prelevaOraAttuale();
            nuovoOggettoMessaggioRicevuto = {
                date: this.oraAttuale,
                message: 'ok',
                status: 'received'
            }
            this.contatti[contattoCheDeveRispondere].messages.push({ ...nuovoOggettoMessaggioRicevuto });
            // Sposta in cima
            this.contatti = this.spostaChat(this.contatti, this.contatti[contattoCheDeveRispondere]);
            this.contattoSelezionato = 0;
        },

        // Scrolla chat
        scrollaChat() {
            const storicoChat = document.querySelector(".storico-chat");
            storicoChat.scrollTop = storicoChat.scrollHeight;
        },

        // Ricerca Contatti
        eseguiRicerca() {
            // Crea un array di contatti che iniziano con quello digitato nella barra di ricerca dell'utente
            this.arrayContattiCercati = this.contatti.filter(
                contatto => contatto.name.toLowerCase().startsWith(this.ricercaUtente.toLowerCase())
            );
            // Rendo visibili solo i contatti ricercati
            for (let i = 0; i < this.contatti.length; i++) {
                if (this.arrayContattiCercati.includes(this.contatti[i])) {
                    this.contatti[i].visible = true;
                } else {
                    this.contatti[i].visible = false;
                }
            }
        },

        //FormattaData
        formattaData(stringaData) {
            let data = dt.fromFormat(stringaData, "dd/MM/yyyy HH:mm:ss");
            if (dt.now().toLocaleString(dt.DATE_SHORT) === data.toLocaleString(dt.DATE_SHORT)) {
                return data.toFormat("HH:mm");
            } else {
                return data.toFormat("'il ' dd/MM/yyyy 'alle' HH:mm");
            }
        },

        // Preleva ora dall'oggetto
        prelevaOraAttuale() {
            this.oraAttuale = dt.now().toFormat("dd/MM/yyyy HH:mm:ss");
        },

        //Sposta chat
        spostaChat(array, elementoDaSpostare) {
            const indice = array.indexOf(elementoDaSpostare);
            array.splice(indice, 1);
            array.unshift(elementoDaSpostare);
            return array;
        },

        //Cancella Messaggio
        cancellaMessaggio(indexDaRimuovere) {
            this.contatti[this.contattoSelezionato].messages.splice(indexDaRimuovere, 1);
            this.messaggioAttivo = false;
        },
    },

}).mount('#app')