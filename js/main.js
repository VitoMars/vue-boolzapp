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
      currentContact: null,
      lastMessage: "",
      msg: "",
      searchedUser: "",
      filteredContacts: "",
   },
   methods: {
      // Metodo per settare il contatto selezionato
      setCurrentUser(contact) {
         this.currentContact = contact;
      },
      // Metodo per ottenere l'immagine del contatto selezionato
      getContactImage() {
         return `./img/avatar${this.currentContact.avatar}.jpg`;
      },
      // Metodo per ottenere la data
      getContactDate() {
         this.lastMessage = this.currentContact.messages.length - 1;
         return this.currentContact.messages[this.lastMessage].date;
      },
      // Metodo per mandare un messaggio
      sendMessage() {
         if (this.msg != "") {
            this.currentContact.messages.push({
               date: dayjs().format("DD/MM/YYYY hh:mm:ss"),
               message: this.msg,
               status: "sent",
            });
         }
         this.msg = "";
         this.scrollToEnd();
      },
      // Metodo per ricevere un messaggio dopo 1 secondo
      receiveMessage() {
         setTimeout(() => {
            this.currentContact.messages.push({
               date: dayjs().format("DD/MM/YYYY hh:mm:ss"),
               message: "Ciao 😀",
               status: "received",
            });
            this.scrollToEnd();
         }, 1000);
      },
      // Metodo per aggiornare la scrollBar dopo 100 ms
      scrollToEnd() {
         setTimeout(() => {
            var container = this.$el.querySelector(".chat-area");
            container.scrollTop = container.scrollHeight;
         }, 100);
      },
      // Metodo per cercare fra i contatti
      searchContact() {
         this.filteredContacts = this.contacts.filter((contact) =>
            contact.name.toLowerCase().includes(this.searchedUser.toLowerCase())
         );
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
   },
   // Settaggi a inizio creazione
   created() {
      this.currentContact = this.contacts[0];
      this.filteredContacts = this.contacts;
   },
});
