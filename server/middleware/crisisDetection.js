const crisisWords = [
  "suicide",
  "kill myself",
  "want to die",
  "self harm",
  "end my life"
];

const crisisDetection = (req, res, next) => {
  const message = req.body.message?.toLowerCase();

  if (crisisWords.some(word => message.includes(word))) {
    return res.json({
      reply: `
I'm really sorry you're feeling this way.

Please contact:
📞 Kiran Helpline (India): 1800-599-0019
📞 iCall: +91 9152987821

You are not alone.
`
    });
  }

  next();
};

module.exports = crisisDetection;
