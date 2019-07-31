

$(function(){
    //Cached selectors
    var jokeButton = $('#joke-button');
    var jokeResetButton = $('#joke-reset-button');
    var jokesList = $('#jokes-list');
    var reaction = $('#reaction');
    var jokeLoader = $('#joke-loader');

    var jokeCount =0;
    var yesCount = 0;
    var noCount = 0;

    jokeLoader.hide();
    jokeResetButton.hide();
  
    //Events
    jokeButton.on('click',async function(e){
      //Do the magic here
     
       $('.imahe').remove();
        await generateJoke();
        
        
      
    });
  


    
    jokeResetButton.on('click',async function(){
     await $('.content').remove();
      await $('.imahe').remove();
      await $('h4').remove();
      jokeCount = 0;
      yesCount = 0;
      noCount = 0;
      $('#joke-button').prop('disabled', false);
      jokeResetButton.hide();
    });

      function generateJoke(){
        var joke
       
        JOKE_SERVICE.get()
                    
                    .then(function(res){

                       joke = res;
                      
                  
                })
       JOKE_SERVICE.answer() 
                .then(function(res){

                  var ansimage = res.image;

                  var li=
                      
                  `
                  <div class="content">
                  <li >
                    <div>
                      <h2> "${joke}"  </h2>
                      <img class="jokeimage" src="${ansimage}" alt="">
                      
                     </div> 
                  </li>
                  </div>
                  `
                  jokesList.append(li);
                })
                  .then(function(){
                    jokeCount++;

                    if(jokeCount===5){
                      $('#joke-button').prop('disabled', true);
                      jokeResetButton.show();
                      generateAnswer();
                        if(yesCount >= 3){
                          $('.jokeimage').append("CONGRATULATION YOU ARE SO LUCKY");
                        }else
                        if(noCount >=3){
                          $('.jokeimage').append("SORRY YOU ARE NOT LUCKY");
                        }
                    }else{
                     // $('.finalmes').remove();
                     
                    }


                })
      }

      function generateAnswer(){
              JOKE_SERVICE.answer()
              .then(function(res){
                var ansimage = res.image;
                var ansans = res.forced;
                var answer = res.answer;
                
                
                  var li=
                  `
                  <div>
                  <img class="imahe" src="${ansimage}" alt="">
                 
                  </div>
                  `
                reaction.append(li);
                if(answer === "yes"){
                  yesCount++;

                }else
                if(answer === "no"){
                  noCount++;
                }
                console.log(yesCount);
                console.log(noCount);

              })
      }
  })