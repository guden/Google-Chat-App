/**
 * Google Bard responds to messages sent from the chat room.
 *
 */
exports.CodebeesChat = function CodebeesChat(req, res) {
  if (req.method === 'GET' || !req.body.message) {
    res.send('Hello! This function is meant to be used in a Codebees' Google Chat ' +
      'Room.');
  }

  const sender = req.body.message.sender.displayName;
  const image = req.body.message.sender.avatarUrl;

  const data = createMessage(sender, image);

  res.send(data);
};

/**
 * Creates a card with two widgets.
 * @param {string} displayName the sender's display name
 * @param {string} imageUrl the URL for the sender's avatar
 * @return {Object} a card with the user's avatar.
 */
function createMessage(displayName, imageUrl) {
  const cardHeader = {
    title: `Hello ${displayName}!`,
  };

  const avatarWidget = {
    textParagraph: {text: 'Your avatar picture: '},
  };

  const avatarImageWidget = {
    image: {imageUrl},
  };

  const avatarSection = {
    widgets: [
      avatarWidget,
      avatarImageWidget,
    ],
  };

  return {
    cardsV2: [{
      cardId: 'avatarCard',
      card: {
        name: 'Avatar Card',
        header: cardHeader,
        sections: [avatarSection],
      }
    }],
  };
}
