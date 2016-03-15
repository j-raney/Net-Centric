$(document).ready(function(){
    $("#fader").click(function(){
        $(this).fadeOut(1000).fadeIn(1000);
    });
    
    var isPlaying = false;
    $("html").keypress(function(m){
        if(m.keyCode == 32 && !isPlaying){
            $("body").append('<iframe width="640" height="360" src="https://www.youtube.com/embed/YTy9v9a7Tmo?autoplay=1&loop=1"></iframe>');
            isPlaying = true;
        }
        else if(m.keyCode == 32 && isPlaying){
            $("iframe").remove(); 
            isPlaying = false;
        }
    });
    var isSans = true;
    $("button").click(function(){
        if(isSans){
            $("#sansToWingdings").css({"font-family": 'Wingdings'});
            isSans = false;
        }
        else{
            $("#sansToWingdings").css({"font-family": 'Comic Sans MS'});
            isSans = true;
        }
    });
});