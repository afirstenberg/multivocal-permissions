const functions = require('firebase-functions');
const Multivocal = require('multivocal');

const Config = new Multivocal.Config.Simple({
  Local: {
    und: {
      hi: ['hello','hi','howdy','greetings'],
      Response: {
        Default: [
          {
            Template: {
              Text: "Hello {{Val 'User/Name'}}.",
              Card: {
                title: "I bid you {{Oxford (Pick 3 Config.Local.und.hi)}}.",
                formattedText: "This is your {{ordinalize User.State.NumVisits}} visit"+
                " and your {{ordinalize Session.State.NumVisits}} comment this round."
              },
              Suggestions: [
                "{{#each (Val 'Config/Local/und/hi')}}",
                "  {{Set '_This[+]' this}}",
                "{{/each}}"
              ]
            },
            ShouldClose: false
          }
        ]
      },
      Requirements: {
        Default: 'User/Name'
      },
      Suffix: {
        Default: [
          "Cat got your tongue?",
          "What do you have to say?",
          "Anything to say?",
          "Any thoughts?"
        ]
      }
    }
  }
});


exports.webhook = functions.https.onRequest( (req,res) => {
    Multivocal.process( req, res );
});
