/* 
NOTE: The Trello client library has been included as a Managed Resource.  To include the client library in your own code, you would include jQuery and then

<script src="https://api.trello.com/1/client.js?key=your_application_key">...

See https://trello.com/docs for a list of available API URLs

The API development board is at https://trello.com/api

The &dummy=.js part of the managed resource URL is required per http://doc.jsfiddle.net/basic/introduction.html#add-resources
*/
$(document).ready(function(){
var onAuthorize = function() {
    updateLoggedIn();
    $("#output").empty();
    
    Trello.members.get("me", function(member){
        $("#fullName").text(member.fullName);
    
        var $cards = $("<div>")
            .text("Loading Cards...")
            .appendTo("#output");

        // Output a list of all of the cards that the member 
        // is assigned to
        Trello.get("/boards/lWxQDtB2/cards", function(cards) {
            $cards.empty();
            $.each(cards, function(ix, card) {
                //$("<a>")
                //.attr({href: card.url, target: "trello"})
                $("<button>")
                .attr({href: "#", target: "trello"})
                .addClass("card")
                .text(card.name)
                .appendTo($cards)
                .click(function(){
                    var userstory = prompt("Please edit your userstory:", "Enter new userstory");
  
                    Trello.put("cards/" + card.id + "", { name: userstory })
                    
                });
            });  
        });
    });

};

var updateLoggedIn = function() {
    var isLoggedIn = Trello.authorized();
    $("#loggedout").toggle(!isLoggedIn);
    $("#loggedin").toggle(isLoggedIn);        
};
    
var logout = function() {
    Trello.deauthorize();
    updateLoggedIn();
};
                          
Trello.authorize({
    interactive:false,
    success: onAuthorize,
});

$("#connectLink")
.click(function(){
    Trello.authorize({
        type: "popup",
        success: onAuthorize,
        scope: { write: true, read: true }
    })
});
    
$("#disconnect").click(logout);
})