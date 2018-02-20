const functions = require('firebase-functions');

const Config = require('multivocal/lib/config-simple')({
  Local: {
    und: {
      hi: ['hello','hi','howdy','greetings'],
      Response: {
        Default: [
          {
            Template: "Hello {{Val 'User/Name'}}.",
            TemplateCard: {
              title: "I bid you {{Oxford (Pick 3 Config.Local.und.hi)}}.",
              formattedText: "This is your {{ordinalize User.State.NumVisits}} visit"+
                " and your {{ordinalize Session.State.NumVisits}} comment this round."
            },
            TemplateSuggestions: [
              "{{#each (Val 'Config/Local/und/hi')}}",
              "  {{Set '_This[+]' this}}",
              "{{/each}}"
            ],
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

const Multivocal = require('multivocal');
Multivocal.setConfig( Config );

exports.webhook = functions.https.onRequest( (req,res) => {
    Multivocal.process( req, res );
});
