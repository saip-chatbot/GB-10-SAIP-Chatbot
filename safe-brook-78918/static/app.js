
var chb = document.querySelector('.chatbox__support');
var ratePlace = document.querySelector('.rateSpace')
var text1 = "";
var msg4 = { name:"فريدة", message: " "};
var timer = 0;
var ynbu = "";
var numOfMsgs = 0;
var original = " ";
var counter = 0; //counter for recommended questions

class Chatbox {

   constructor() {
       this.args = {
           openButton: document.querySelector('.chatbox__button'),
           chatBox: document.querySelector('.chatbox__support'),
           sendButton: document.querySelector('.send__button'),
           closeButton: document.querySelector('#canclbtn'),

       }

       this.state = false; // chatbot is closed
       this.messages = []; // array to store msgs
   }
    display() {
     const {openButton, chatBox, sendButton, closeButton} = this.args;
     const key = "";
     openButton.addEventListener('click',listener => this.toggleState(chatBox))
     sendButton.addEventListener('click',listener => this.onSendButton(chatBox))
     closeButton.addEventListener('click',listener => this.toggleState(chatBox))
       document.getElementById("textbox").addEventListener("keyup", function(event) {
       event.preventDefault();
       if (event.keyCode === 13) { //click enter sends user input
           document.getElementById("send").click();
       }
   });
   }
    welcome(){
    var gif = '<img src="https://res.cloudinary.com/dvofa5gjl/image/upload/v1653246565/ezgif.com-gif-maker_huanl4.gif" alt="image" style="  border-top-left-radius: 20px;  border-top-right-radius: 20px;  border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">'
    let msg8 = { name:"welcomingGif", message: gif}
    this.messages.push(msg8);
    this.updateChatText(chatbox)
    }

   toggleState(chatbox) { // show or hide the box
     this.state = !this.state;

      if(this.state) {

        chatbox.classList.add('chatbox--active')

      } else {
          chatbox.classList.remove('chatbox--active')
          document.getElementById("cb").style.visibility = "visible";
      }


   }

   onSendButton(chatbox) {

      var textField = chatbox.querySelector('#textbox'); // extract user input
       let text1 = textField.value
       if (text1 == ""){
       return;
       }
       //Normalization code that removes spacial characters and emojis before sending message to the Wit.ai
       let text2 = text1.replace(/[&\/\\#,+()$~%.:*?؟!<>{}]/g, "");
       text2 = text2.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]|[\u2763\uFE0F])/g, '');
       text2 = text2.replace("🤍", "");

       let msg1 = { name:"user", message: text1 }
       this.messages.push(msg1);
       this.updateChatText(chatbox)
       textField.value = ''


var  html = '<div class="messages__item messages__item--visitor" style="display: flex; flex-direction: column-reverse; bottom:0;"><div class="chat-bubble" id="loading"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>'
const chatmessage = chatbox.querySelector('.chatbox__messages');

      html += chatmessage.innerHTML;
      chatmessage.innerHTML = html;

       if (text1 != "" && text2 == "") {//If message contain no letters or words
       let msg3 = { name:"فريدة", message: "<p>فضلًا يرجى ادخال السؤال</p>" }
       this.messages.push(msg3);
       this.updateChatText(chat)
       }


       fetch($SCRIPT_ROOT + '/predict', {
           method: 'POST',
           body: JSON.stringify({message: text2}),
           crossDomain: true,
           Headers: {
               'Content-Type': 'application/json; charset=UTF-8'
           },

   })
   //extract the response from chat.py
   .then(r => r.json())
   .then(r =>{
    let msg2 = { name:"فريدة", message:"<p>"+ r.answer +"</p>"};
    this.messages.push(msg2)
    this.updateChatText(chatbox)

    //rating reminder
    if(r.answer == "فضلًا اعد ادخال السؤال باللغة العربية" || r.answer == "آسفه لا استطيع اجابتك" || r.answer == "وعليكم السلام" || r.answer == "اهلا وسهلا" || r.answer == "مساء النور" || r.answer == "صباح النور" || r.answer == "العفو" || r.answer == "مرحبا" || r.answer == "أنا فريدة، مساعدتك الافتراضية" || r.answer == "أنا من المملكة العربية السعودية" || r.answer == "عمري ٢٥" || r.answer == "بخير الحمدلله" || r.answer == "آسفة لم افهم سؤالك، من فضلك يرجى إعادة صياغة السؤال بطريقة أخرى"){}
    else{
    timer = timer + 1;
    numOfMsgs = numOfMsgs + 1;

    if(numOfMsgs == 1){
    let msg5 = { name:"فريدة", message: "<p>يمكنك تقييم الخدمة من خلال الضغط على قيّمني في الأسفل</p>" }
    this.messages.push(msg5);
    this.updateChatText(chatbox)

    this.rate()
   }
   }

   }).catch((error) => {

   /* console.error('error:', error); */
    this.updateChatText(chatbox)

   });



   if (timer >= 1)
   {
setTimeout(() => {  var html = '<div class="messages__item messages__item--visitor" style="display: flex; flex-direction: column-reverse; bottom:0;"><div class="chat-bubble" id="loading"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>'
      html += chatmessage.innerHTML;
      chatmessage.innerHTML = html;



   fetch($SCRIPT_ROOT + '/predict', {
           method: 'POST',
           body: JSON.stringify({message: text1}),
           crossDomain: true,
           Headers: {
               'Content-Type': 'application/json; charset=UTF-8'
           },

   })
   //extract the response from chat.py to recommend question
   .then(r => r.json())
   .then(r =>{
   let msg3 = { name:"recommend", message: "<p> هل تود أن تعرف "+" "+r.recommend+"</p>"};
   msg4 = { name:"فريدة", message: "<p>"+r.rAnswer+"</p>"};
    this.messages.push(msg3)
    counter = counter + 1; // to count how many recommend questions


    this.updateChatText(chatbox)


   }).catch((error) => {

   /* console.error('error:', error); */
    this.updateChatText(chatbox)

   });   }, 3000);


   }
   }

   updateChatText(chatbox) {
    var html = " ";
     this.messages.slice().reverse().forEach(function(item, ) {
       if (item.name === "فريدة")
       {
           html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
           }
       else if (item.name === "recommend")
       {
          html += '<div id="yn"><button class="ynbuttons" id ="yes" onclick="chatbox.ybutton(chatbox); chatbox.hide()" >نعم</button><button  class="ynbuttons" onclick="chatbox.nbutton(chatbox); chatbox.hide()">لا</button> </div>'
           html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
           }
       else if (item.name === "user")
       {
          html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
       }
       else if (item.name === "welcomingGif")
       {
          html += '<img src="https://res.cloudinary.com/dvofa5gjl/image/upload/v1653246565/ezgif.com-gif-maker_huanl4.gif" alt="image" style="  border-top-left-radius: 20px;  border-top-right-radius: 20px;  border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">'
       }

     });

    const chatmessage = chb.querySelector('.chatbox__messages');
     chatmessage.innerHTML = html;
     ynbu = document.getElementById('yn');


 }

rate(){ // to show rate button
var ratebtn = '<button class="rate__button" id="ratebtn" width="35%" onclick="showrate()">قيّمني</button>'
    original = ratePlace.innerHTML;
    ratebtn += ratePlace.innerHTML;
    ratePlace.innerHTML = ratebtn;


}


 onCloseRate(){ // to close rating box
 document.getElementById("dropdown-content").style.visibility = "hidden";
 document.getElementById("ratebtn").style.visibility = "visible";
 }

hide(){ //clicked on yes button
for (let i = 0; i < counter; i++) {
 document.getElementById("yn").remove();
 }
 }

 hide1(){ //clicked on no button
for (let i = 0; i < counter; i++) {
 document.getElementById("yn").remove();
 }
 }


custmerserv(value){ //rate response after user choice

if(value == 5){
let msg2 = { name:"فريدة", message: "<p>شكراً لك نسعد بخدمتك</p>" }
this.messages.push(msg2);
this.updateChatText(chat);
}

if(value == 1 || value == 2 || value == 3 || value == 4 ){

let msg2 = { name:"فريدة", message: "<p> شكراً لكم يمكنكم التواصل مع خدمة العملاء على</p><p><a href='mailto:saip@saip.gov.sa'>saip@saip.gov.sa</a> :البريد الالكتروني</p><p><a href='tel:+966920021421'>920021421</a> :الرقم المباشر</p>" }
this.messages.push(msg2);
this.updateChatText(chat);
}

document.getElementById("dropdown-content").style.visibility = "hidden";
ratePlace.innerHTML = original

}

    ybutton(chatbox) {

        let msg5 = {name: "user", message: "نعم"};
            this.messages.push(msg5)
            this.updateChatText(chatbox)

         var  html = '<div class="messages__item messages__item--visitor" style="display: flex; flex-direction: column-reverse; bottom:0;"><div class="chat-bubble" id="loading"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>'
        const chatmessage = chb.querySelector('.chatbox__messages');

          html += chatmessage.innerHTML;
          chatmessage.innerHTML = html;


        this.messages.push(msg4)
        this.updateChatText(chatbox)


        }

            nbutton(chatbox) {

        let msg6 = {name: "user", message: "لا"};
            this.messages.push(msg6)
            this.updateChatText(chatbox)

         var  html = '<div class="messages__item messages__item--visitor" style="display: flex; flex-direction: column-reverse; bottom:0;"><div class="chat-bubble" id="loading"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>'
        const chatmessage = chb.querySelector('.chatbox__messages');

          html += chatmessage.innerHTML;
          chatmessage.innerHTML = html;

        let msg7 = {name: "فريدة", message: "<p>فضلا أخبرني كيف استطيع مساعدتك</p>"};
        this.messages.push(msg7)
        this.updateChatText(chatbox)


        }


}


const chatbox = new Chatbox();
chatbox.display();
