const app = new Vue({
   el: "#root",
   data: {
      contacts: [
         {
            name: "Michele",
            avatar: "_1",
            visible: true,
            messages: [
               {
                  date: "10/01/2020 15:30:55",
                  message: "Hai portato a spasso il cane?",
                  status: "sent",
               },
               {
                  date: "10/01/2020 15:50:00",
                  message: "Ricordati di dargli da mangiare",
                  status: "sent",
               },
               {
                  date: "10/01/2020 16:15:22",
                  message: "Tutto fatto!",
                  status: "received",
               },
            ],
         },
         {
            name: "Fabio",
            avatar: "_2",
            visible: true,
            messages: [
               {
                  date: "20/03/2020 16:30:00",
                  message: "Ciao come stai?",
                  status: "sent",
               },
               {
                  date: "20/03/2020 16:30:55",
                  message: "Bene grazie! Stasera ci vediamo?",
                  status: "received",
               },
               {
                  date: "20/03/2020 16:35:00",
                  message: "Mi piacerebbe ma devo andare a fare la spesa.",
                  status: "received",
               },
            ],
         },
         {
            name: "Samuele",
            avatar: "_3",
            visible: true,
            messages: [
               {
                  date: "28/03/2020 10:10:40",
                  message: "La Marianna va in campagna",
                  status: "received",
               },
               {
                  date: "28/03/2020 10:20:10",
                  message: "Sicuro di non aver sbagliato chat?",
                  status: "sent",
               },
               {
                  date: "28/03/2020 16:15:22",
                  message: "Ah scusa!",
                  status: "received",
               },
            ],
         },
         {
            name: "Luisa",
            avatar: "_4",
            visible: true,
            messages: [
               {
                  date: "10/01/2020 15:30:55",
                  message: "Lo sai che ha aperto una nuova pizzeria?",
                  status: "sent",
               },
               {
                  date: "10/01/2020 15:50:00",
                  message: "Si, ma preferirei andare al cinema",
                  status: "received",
               },
            ],
         },
      ],
      randomAnswers: [
         "Ciao 😀",
         "Ti amo ❤️",
         "Ahahahaha 😂",
         "Sei fantastico! 😘",
         "Ho fatto la cacca 💩",
         "Ho fatto tantissima cacca 💩💩💩",
         "Bellissima app, complimenti! 💪🏻",
         "Non vedo 🙈, non sento 🙉, non parlo 🙊",
         "Alessio sei il miglior teacher di Boolean 😘",
      ],
      currentContact: null,
      lastDate: "",
      msg: "",
      searchedUser: "",
      message: "",
   },
   methods: {
      // Metodo per settare il contatto selezionato
      setCurrentUser(contact) {
         this.currentContact = contact;
         this.scrollToEnd();
      },
      // Metodo per ottenere l'immagine del contatto selezionato
      getContactImage() {
         return `./img/avatar${this.currentContact.avatar}.jpg`;
      },
      // Metodo per ottenere la data
      getContactDate() {
         this.lastDate = this.currentContact.messages.length - 1;
         return this.currentContact.messages[this.lastDate].date;
      },
      // Metodo per mandare un messaggio
      sendMessage() {
         if (this.msg.trim() != "") {
            this.currentContact.messages.push({
               date: dayjs().format("DD/MM/YYYY hh:mm:ss"),
               message: this.msg,
               status: "sent",
            });
            this.receiveMessage();
         }
         this.msg = "";
         this.scrollToEnd();
      },
      // Metodo per ricevere un messaggio dopo 1 secondo
      receiveMessage() {
         setTimeout(() => {
            this.currentContact.messages.push({
               date: dayjs().format("DD/MM/YYYY hh:mm:ss"),
               message:
                  this.randomAnswers[
                     Math.floor(Math.random() * this.randomAnswers.length)
                  ],
               status: "received",
            });
            this.scrollToEnd();
         }, 1000);
      },
      // Metodo per aggiornare la Scroll-Bar
      scrollToEnd() {
         this.$nextTick(() => {
            const elementHtml = this.$el.querySelector(".chat-area");
            elementHtml.scrollTop = elementHtml.scrollHeight;
         });
      },
      // Metodo per cercare fra i contatti
      searchContact() {
         this.contacts.forEach((contact) => {
            if (
               contact.name
                  .toLowerCase()
                  .includes(this.searchedUser.toLowerCase())
            ) {
               contact.visible = true;
            } else {
               contact.visible = false;
            }
         });
      },
      // Metodo per far comparire il Dropdown-menu nei messaggi
      toggleDropdown(index) {
         const elDropdowns = document.querySelectorAll(".dropdown-menu");

         if (
            elDropdowns[index].style.display === "" ||
            elDropdowns[index].style.display === "none"
         ) {
            elDropdowns[index].style.display = "flex";
         } else if (elDropdowns[index].style.display === "flex") {
            elDropdowns[index].style.display = "none";
         }
      },
      // Metodo per eliminare un messaggio
      deleteMessage(index) {
         this.currentContact.messages.splice(index, 1);
      },
   },
   // Settaggi a inizio creazione
   created() {
      this.currentContact = this.contacts[0];

      // Ascoltatore per chiudere i dropdown-menu quando si clicca su un altro punto della pagina
      document.addEventListener(
         "click",
         function () {
            const elDropdowns = document.querySelectorAll(".dropdown-menu");

            elDropdowns.forEach((dropdown) => {
               if (dropdown.style.display === "flex") {
                  dropdown.style.display = "none";
               }
            });
         },
         true
      );
   },
});
