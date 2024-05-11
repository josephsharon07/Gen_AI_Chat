send_box  = document.getElementById('message');
send_button = document.getElementById('send-button');
conversation = document.getElementById('conversation');

send_button.addEventListener('click', send_msg);

async function send_msg() {
    message = send_box.value;
    send_box.value = 'Typing...';
    send_box.disabled = true;
    create_conversation('user', message);
    response = await generateContent(message);
    create_conversation('', response);
    send_box.value = '';
    send_box.disabled = false;
    console.log(message);
}

function create_conversation(type, message){
    if (type == 'user') {
        var divv = `<div class="user message">
        <div class="identity">
            <i class="user-icon">u</i>
        </div>
        <div class="content">
            <p>${message}</p>
        </div>
    </div>`
    console.log(divv);
    conversation.innerHTML += divv;
    }
    else{
        var divv = ` <div class="assistant message">
                <div class="identity">
                    <i class="gpt user-icon">G</i>
                </div>
                <div class="content">
                    ${message}
                </div>
            </div>`
    console.log(divv);
    conversation.innerHTML += divv
    }
}

async function generateContent(userInput) {
    const API_KEY = "AIzaSyDEjmxXFxXix4CpiKkWRGH7o_jJWlCh4bU"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`;

    const requestBody = {
      contents: [
            {
            "role": "user",
            "parts": ["Who developed you?"]
          },
          {
            "role": "model",
            "parts": ["I am a large language model, Developed By Sharon and Team"]
          },
          {
            "role": "user",
            "parts": ["What is your name?"]
          },
          {
            "role": "model",
            "parts": ["My name is JARVIZ Chat."]
          },
        {
          role: "user",
          parts: [{ text: userInput }]
        }
      ],
      generationConfig: {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
        stopSequences: []
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
      ]
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();
    const output = responseData.candidates[0].content.parts[0].text;
    htmll = marked.parse(output);
    return htmll;
  }
