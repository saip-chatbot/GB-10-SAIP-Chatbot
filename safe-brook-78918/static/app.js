
var chb = document.querySelector('.chatbox__support');
var header = document.querySelector('.chatbox__rate--header')
var text1 = "";
var msg4 = { name:"فريدة", message: " "};
var timer = 0;
var ynbu = "";

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
       if (event.keyCode === 13) {
           document.getElementById("send").click();
       }
   });

    }

welcome(){
let msg2 = { name:"فريدة", message: "مرحبا بك انا فريدة مساعدتك الافتراضيه ، كيف يمكنني مساعدتك؟" }
this.messages.push(msg2);
this.updateChatText(chat)
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
    timer = timer + 1;
      var textField = chatbox.querySelector('#textbox'); // extract user input
       let text1 = textField.value
       if (text1 == ""){
       return;
       }
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

       if (text1 != "" && text2 == "") {
       let msg3 = { name:"فريدة", message: "فضلًا يرجى ادخال السؤال" }
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
    let msg2 = { name:"فريدة", message: r.answer};
    this.messages.push(msg2)

    this.updateChatText(chatbox)

   }).catch((error) => {

   /* console.error('error:', error); */
    this.updateChatText(chatbox)
    textField.value = ''
   });

   setTimeout(this.rate, 5000);

   if (timer >= 2)
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
   //extract the response from chat.py
   .then(r => r.json())
   .then(r =>{
   let msg3 = { name:"recommend", message: " هل تود أن تعرف "+" "+r.recommend};
   msg4 = { name:"فريدة", message: r.rAnswer};
    this.messages.push(msg3)


    this.updateChatText(chatbox)


    textField.value = ''
   }).catch((error) => {

   /* console.error('error:', error); */
    this.updateChatText(chatbox)
    textField.value = ''
   });   }, 2000);


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
          html += '<div id="yn"><button class="ynbuttons" id ="yes" onclick="chatbox.ybutton(chatbox); chatbox.hide1()" >نعم</button><button  class="ynbuttons" onclick="chatbox.hide(); chatbox.nbutton(chatbox)">لا</button> </div>'
           html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
           }
       else if (item.name === "user")
       {
          html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
       }


     });

    const chatmessage = chb.querySelector('.chatbox__messages');
     chatmessage.innerHTML = html;
     ynbu = document.getElementById('yn');


 }

 hide()
 { ynbu.style.display = 'none'; }

 hide1()
 { ynbu.style.display = 'none'; }

rate(){
var ratebtn = '<div class="dropdown"><div class="ratebtn" id="ratebtn"><input type="image" src="https://res.cloudinary.com/hkwyud1kc/image/upload/v1647933071/901822-200_i8dodv.png" width="40%" onclick="showrate()"></div></div>'

      ratebtn += header.innerHTML;
      header.innerHTML = ratebtn;
}

custmerserv(value){
if(value == 5){
let msg2 = { name:"فريدة", message: "شكراً لك نسعد بخدمتك" }
this.messages.push(msg2);
this.updateChatText(chat);
}

if(value == 1 || value == 2 || value == 3 || value == 4 ){

let msg2 = { name:"فريدة", message: "يمكنك التواصل مع خدمة العملاء لمزيد من التفاصيل " }
this.messages.push(msg2);
this.updateChatText(chat);
}
document.getElementById("dropdown-content").style.visibility = "hidden";
document.getElementById("ratebtn").style.visibility = "visible";

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
    
        let msg7 = {name: "فريدة", message: "فضلا أخبرني كيف استطيع مساعدتك"};
        this.messages.push(msg7)
        this.updateChatText(chatbox)
    
    
        }


}


const chatbox = new Chatbox();
chatbox.display();
//chatbox.welcome();
