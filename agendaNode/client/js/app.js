$(function() {
  $.post('/validar','',(response)=>{
    if(response!='ok'){
      alert("No se ha iniciado sesion");
      window.location.href='index.html';
    }else{

          class EventManager {
              constructor() {
                this.urlBase = "/events"
                this.obtenerDataInicial()
                this.inicializarFormulario()
                this.guardarEvento()
                this.cerrarSesion()
              }

              concederAcceso(){
                $.post('/validar','',(response)=>{
                  if(response=='ok'){
                    this.urlBase = "/events"
                    this.obtenerDataInicial()
                    this.inicializarFormulario()
                    this.guardarEvento()
                    this.cerrarSesion()
                  }else{
                    window.location.href='index.html';
                  }
                })
              }

              cerrarSesion(){
                $('.logout-container').on('click',function(){
                  $.post('/cerrar','',(response)=>{
                    window.location.href='index.html';
                  })
                })
              }



              obtenerDataInicial() {
                  let url = this.urlBase + "/all"
                  $.get(url, (response) => {
                      this.inicializarCalendario(response)
                  })
              }

              eliminarEvento(evento) {
                  let eventId = evento.id
                  $.post('/events/delete/'+eventId, {id: eventId}, (response) => {
                      alert(response)
                      window.location.href="main.html";
                  })
              }

              guardarEvento() {
                $('.addButton').on('click', (ev) => {
                    ev.preventDefault()
                    let nombre = $('#titulo').val(),
                    start = $('#start_date').val(),
                    title = $('#titulo').val(),
                    end = '',
                    h_start=$('#start_hour').val(),
                    h_end=$('#end_hour').val();

                    if (!$('#allDay').is(':checked')) {
                        end = $('#end_date').val()
                        h_start = $('#start_hour').val()
                        h_end = $('#end_hour').val()
                        start = start + 'T' + h_start
                        end = end + 'T' + h_end
                    }
                    let url = this.urlBase + "/new"
                    if (title != "" && start != "") {
                        let ev = {
                            title: title,
                            start: start,
                            end: end
                        }
                        $.post(url, ev, (response) => {
                            alert(response)
                            window.location.href="main.html";
                        })
                        $('.calendario').fullCalendar('renderEvent', ev)
                    } else {
                        alert("Complete los campos obligatorios para el evento")
                    }
                })

              }

              inicializarFormulario() {
                  $('#start_date, #titulo, #end_date').val('');
                  $('#start_date, #end_date').datepicker({
                      dateFormat: "yy-mm-dd"
                  });
                  $('.timepicker').timepicker({
                      timeFormat: 'HH:mm:ss',
                      interval: 30,
                      minTime: '5',
                      maxTime: '23:59:59',
                      defaultTime: '',
                      startTime: '5:00',
                      dynamic: false,
                      dropdown: true,
                      scrollbar: true
                  });
                  $('#allDay').on('change', function(){
                      if (this.checked) {
                          $('.timepicker, #end_date').attr("disabled", "disabled")
                      }else {
                          $('.timepicker, #end_date').removeAttr("disabled")
                      }
                  })
              }
              actualizarEvento(evento){

                let url = this.urlBase+"/update";
                let eventoEnd;
                if(evento.end!=null){
                  eventoEnd=evento.end.format('YYYY-MM-DD')+"T"+evento.end.format('HH:mm:ss');
                }else{
                  eventoEnd=evento.end;
                }
                let ev = {
                    id: evento.id,
                    title: evento.title,
                    start: evento.start.format('YYYY-MM-DD')+"T"+evento.start.format('HH:mm:ss'),
                    end: eventoEnd
                }
                $.post(url, ev, (response) => {
                    alert(response);
                    window.location.href="main.html";
                })
              }

              inicializarCalendario(eventos) {
                var hoy=moment().format('YYYY,MM,D');
                  $('.calendario').fullCalendar({
                      header: {
                          left: 'prev,next today',
                          center: 'title',
                          right: 'month,agendaWeek,basicDay'
                      },
                      defaultDate: hoy,
                      navLinks: true,
                      editable: true,
                      eventLimit: true,
                      droppable: true,
                      dragRevertDuration: 0,
                      timeFormat: 'H:mm',
                      eventDrop: (event) => {
                          this.actualizarEvento(event)
                      },
                      eventDragStart: (event,jsEvent) => {
                          $('.delete').find('img').attr('src', "img/trash-open.png");
                          $('.delete').css('background-color', '#a70f19')
                      },
                      eventDragStop: (event,jsEvent) => {
                          var trashEl = $('.delete');
                          var ofs = trashEl.offset();
                          var x1 = ofs.left;
                          var x2 = ofs.left + trashEl.outerWidth(true);
                          var y1 = ofs.top;
                          var y2 = ofs.top + trashEl.outerHeight(true);
                          if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                              jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                                  this.eliminarEvento(event)
                                  $('.calendario').fullCalendar('removeEvents', event.id);
                              }
                          },
                        events: eventos
                      })
                  }
              }

              const Manager = new EventManager()

    }
  })
});
