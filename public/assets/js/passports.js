$(".signup-form").submit(function(event){
    event.preventDefault();
    console.log("button ready for signup");

    var femail = $("input#email").val().trim();
    var fpword = $("input#pword").val().trim();
    var fusername = $("input#username").val().trim();

    if (!femail || !fpword)
    {
        return;
    }

    var udata = {
        email: femail,
        pword: fpword,
        username: fusername 
    };

    SignUpUser(udata);
    $("input#email").val("");
    $("input#pword").val("");
    $("input#username").val("");

    function SignUpUser(udata){
        $.ajax("/api/signup",{
            type: "POST",
            data: udata
        }).then(function(data){
            window.location.replace(data);
        }).catch(handleLoginError);
    }

    function handleLoginError(err){
        console.log("error message");
    }
});

$("#login-form").submit(function(event){
    event.preventDefault();
    console.log("Going to Login");

    var femail = $("input#email").val().trim();
    var fpword = $("input#pword").val().trim();

    if(!femail || !fpword)
    {
        return;
    }

    var ldata = {
        email: femail,
        pword: fpword
    };

    console.log(ldata);
    
    LogInUser(femail,fpword);
    $("input#email").val("");
    $("input#pword").val("");

    function LogInUser(femail,pword){
        $.ajax("/api/login",{
            type: "POST",
            data: ldata
        }).then(function(data){
            // $("#login-btn").css("display","none");
            // $("#logout-btn").css("display","block");
            sessionStorage.setItem("lstatus", JSON.stringify({status: true}));
            window.location.replace(data);
        }).catch(function(err){
            console.log(err);
        })
    }
});

lbutton();

function lbutton(){
    var lstatus = sessionStorage.getItem("lstatus");
    console.log(lstatus);
    if(lstatus == null)
    {
        console.log("working");
        $("#login-btn").css("display","block");
        $("#logout-btn").css("display","none");
    }
    else
    {
        var lstatus_stg = JSON.parse(lstatus);
        if(lstatus_stg.status === true)
        {
            $("#login-btn").css("display","none");
            $("#logout-btn").css("display","block");
        }
        else
        {
            $("#login-btn").css("display","block");
            $("#logout-btn").css("display","none");
        }
    }
};

$("#logout-btn").on("click", function(event){
    event.preventDefault();
    window.location = "/logout";
    sessionStorage.setItem("lstatus", JSON.stringify({status: false}));
});