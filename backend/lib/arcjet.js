import arcjet,{tokenBucket , shield , detectBot} from "@arcjet/node";

import dotenv from "dotenv";
dotenv.config();

export const aj = arcjet({
    key: process.env.ARCJET_KEY, // Replace with your actual API key
    rules: [
    shield({mode: 'LIVE'}),
    tokenBucket({
        mode: 'LIVE',
        interval: 10, // every 10 seconds we refill
        refillRate: 5, // refill 5 tokens
        capacity: 10,
    }),
    detectBot({
      mode: 'LIVE',
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, so we dont want to block the search engine bots 
      ],
    }),
  ]
});
