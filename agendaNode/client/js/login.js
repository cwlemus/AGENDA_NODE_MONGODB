$('.loginButton').on('click', function(event) {
    var nombreUsuario = $('#user').val();
    var pass = $('#pass').val();
    if (nombreUsuario != "" && pass != "") {
        $.post('/login',{user: nombreUsuario, pass: pass}, function(response) {
            if (response != "noValido") {
                window.location.href = "http://localhost:8082/main.html";
            }else{
              alert("Correo o password no son validos");
            }

        })
    } else {
        alert("Complete todos los campos")
    }
});
