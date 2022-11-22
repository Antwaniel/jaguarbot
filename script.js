var $messages = $('.messages-content'),
    d, h, m,
    i = 0;



  // estabelcer mensaje de bienvenida al cargar la pagina
$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});


//funcion para actualizar la barra de navegacion vertical
function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}


//establecer la hora y fecha a los mensajes
function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
  }
}


//insertar mensaje de usuario y respuesta porn parte de la IA
function insertMessage() {


  //obtener el valor del textarea
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  //insertar mensaje de usuario al div
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();

  //funcion que ejecutara codigo despues de x cantidad de tiempo
  setTimeout(function() {

  //ajax para asincronia de respuestas
    $.ajax({
      url: 'message.php',
      type: 'POST',
      data: 'text=' + msg,
      success: function(result) {

        if ($('.message-input').val() != '') {
          return false;
        }
        //cargar animacion
        $('<div class="message loading new"><figure class="avatar"><img src="img/jaguar.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
        updateScrollbar();
        
        //ejecutar el codigo siguiente despues de x cantidad de tiempo
        setTimeout(function() {
          //remover la animacion de carga de mensaje
          $('.message.loading').remove();
          //insertar mensaje del bot en el div, establecer hora, fecha y actualizar barra vertical
          $('<div class="message new"><figure class="avatar"><img src="img/jaguar.png" /></figure>' +result + '</div>').appendTo($('.mCSB_container')).addClass('new');
          setDate();
          updateScrollbar();
          i++;
        }, 1000 + (Math.random() * 20) * 100);
      
       // $('.message.loading').remove();
       // $('<div class="message new"><figure class="avatar"><img src="img/jaguar.png" /></figure>' + result + '</div>').appendTo($('.mCSB_container')).addClass('new');
        //setDate();
        //updateScrollbar();
         // $replay = '<div class="bot-inbox inbox"><div class="icon"><i class="fas fa-user"></i></div><div class="msg-header"><p>' + result + '</p></div></div>';
          //$(".form").append($replay);
          // cuando el chat baja, la barra de desplazamiento llega automáticamente al final
          //$(".form").scrollTop($(".form")[0].scrollHeight);
      }
  });
    ///fakeMessage();
  }, 100 + (Math.random() * 20) * 100);
}


//insertar mensaje de usuario si de da click en el boton
$('.message-submit').click(function() {
  insertMessage();
});


//insertar mensaje de usuario si se presiona la tecla "Enter"
$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})


//Mensaje de bienvenida(Se establece al cargar la pagina)
var Fake = [
  'Hola, soy JaguarBot, en que puedo ayudarte?',
]

//Codigo que inserta el primer mensaje de la IA
function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="img/jaguar.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="img/jaguar.png" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}

$('.button').click(function(){
  $('.menu .items span').toggleClass('active');
   $('.menu .button').toggleClass('active');
});
