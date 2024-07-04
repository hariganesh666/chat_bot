// import React, { useEffect, useState } from "react";
// import { inputIntents, model } from "../training-data";

// function Chatbot() {
//   const [message, setMessage] = useState([]);
//   const [input, setInput] = useState("");
//   const [selectIntent, setSelectIntent] = useState("");

//   useEffect(() => {
//     // setTimeout(() => processInput("hello"), 1000);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     setMessage((message) => [{ author: "user", text: input }, ...message]);
//     setInput("");
//     processInput(input);
//   };

//   const normalizeString = (input) => {
//     return input
//       .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
//       .trim()
//       .toLowerCase();
//   };

//   const generatorResponse = (intent) => {
//     if (model.responses && model.responses[intent]) {
//       const responses = model.responses[intent];
//       const randomIndex = Math.floor(Math.random() * responses.length);
//       return responses[randomIndex].answer;
//     }
//     return "I'm sorry, i don't understand. Can you repharase the question?";
//   };

//   const proceedResponse = () => {
//     switch (selectIntent) {
//       case "orderTracking":
//         return "Your order have been delivered";
//       case "shippingInformation":
//         return "Your order have been shipped. it will be delivered in 3 days";
//       case "cancelOrder":
//         return "Your order have been canceleed successfully";
//       case "feedbackSubmission":
//         return "Your feedback have submitted successfully";
//       default:
//         return "I can't able to process your response.";
//     }
//   };
//   const processInput = (input) => {
//     const normalizedString = normalizeString(input).toLowerCase();

//     if (selectIntent) {
//       const response = proceedResponse();
//       setMessage((message) => [{ author: "bot", text: response, ...message }]);
//       setSelectIntent("")
//       return;
//     }
//     const intent = matchIntent(normalizedString);

//     const response = generatorResponse(intent);

//     setMessage((message) => [{ author: "bot", text: response }, ...message]);

//     if (inputIntents.includes(intent)) {
//       setSelectIntent(intent);
//     }
//   };

//   const matchIntent = (input) => {
//     if (model.intents) {
//       for (const [intent, patterns] of Object.entries(model.intents)) {
//         for (const pattern of patterns) {
//           const patternWords = pattern.toLowerCase().split(" ");
//           if (patternWords.every((word) => input.includes(word))) {
//             return intent;
//           }
//         }
//       }
//     }
//     return null; // Return null or handle no match case appropriately
//   };

//   return (
//     <div className="chatbot">
//       <div className="chatbot-header">
//         <button>img</button> chatbot
//       </div>
//       <div className="messages">
//         {message.map((mes, i) => (
//           <div key={mes.text + i} className={`message ${mes.author}`}>
//             {mes.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type Your Query"
//           wrap="soft"
//         />
//         <button type="submit" disabled={input.length === 0}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Chatbot;
import React, { useEffect, useState } from "react";
import { inputIntents, model } from "../training-data";

function Chatbot() {
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  const [selectIntent, setSelectIntent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessage((messages) => [{ author: "user", text: input }, ...messages]);
    setInput("");
    processInput(input);
  };

  const normalizeString = (input) => {
    return input
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .trim()
      .toLowerCase();
  };

  const generatorResponse = (intent) => {
    if (model.responses && model.responses[intent]) {
      const responses = model.responses[intent];
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex].answer;
    }
    return "I'm sorry, I don't understand. Can you rephrase the question?";
  };

  const proceedResponse = () => {
    switch (selectIntent) {
      case "orderTracking":
        return "Your order has been delivered";
      case "shippingInformation":
        return "Your order has been shipped and will be delivered in 3 days";
      case "cancelOrder":
        return "Your order has been canceled successfully";
      case "feedbackSubmission":
        return "Your feedback has been submitted successfully";
      default:
        return "I can't process your response.";
    }
  };

  const queriesAnswered = () => {
    setTimeout(() => {
      setMessage((message) => [
        { author: "bot", text: "Say hi to restart your chat" },
        {
          author: "bot",
          text: "Thank you for using our bot",
        },
        {
          author: "bot",
          text: "Feel free to ping me if you have any other queries",
        },
        { author: "bot", text: "I hope your query have been resolved" },
        ...message,
      ]);
      // setTimeout(() => setActive(false), 5000);
    }, 2000);
  };

  const processInput = (input) => {
    const normalizedInput = normalizeString(input);
    const intent = matchIntent(normalizedInput);

    if (intent && inputIntents.includes(intent)) {
      setSelectIntent(intent);
    }

    if(intent === "bye"){
      queriesAnswered()
    }

    if (selectIntent) {
      const response = proceedResponse();
      setMessage((messages) => [{ author: "bot", text: response }, ...messages]);
      setSelectIntent(""); // Reset selectIntent after processing
    } else {
      const response = generatorResponse(intent);
      setMessage((messages) => [{ author: "bot", text: response }, ...messages]);
    }


  };

  const matchIntent = (input) => {
    if (model.intents) {
      for (const [intent, patterns] of Object.entries(model.intents)) {
        for (const pattern of patterns) {
          const patternWords = pattern.toLowerCase().split(" ");
          if (patternWords.every((word) => input.includes(word))) {
            return intent;
          }
        }
      }
    }
    return null; // Return null or handle no match case appropriately
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <button>img</button> Chatbot
      </div>
      <div className="messages">
        {message.map((msg, index) => (
          <div key={index} className={`message ${msg.author}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type Your Query"
          wrap="soft"
        />
        <button type="submit" disabled={input.length === 0}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
