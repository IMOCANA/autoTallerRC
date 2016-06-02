$(document).ready(function () {

    $('td').click(function(){
        var $this = $(this);
        var th='th';
        var col   = $this.index()-1;
        var row   = $this.closest('tr').index();

        $asd=$('#demoFecha').val($(this).parents("tr").find("td:eq(0)>input").val());
        $asf=$('#demoHora').val($(".border-cabecera:eq("+col+")").html()+':00:00');

        $('#fecha').text($asd.val()+' '+$asf.val());

    });
    var weekday=new Array(7);
    weekday[0]="Domingo";
    weekday[1]="Lunes";
    weekday[2]="Martes";
    weekday[3]="Miercoles";
    weekday[4]="Jueves";
    weekday[5]="Viernes";
    weekday[6]="Sábado";

    var d = new Date();

    var n = d.getDay();

    var n1 = weekday[n] ;
    var n2 = weekday[n+1];
    var n3 = weekday[n+2];

    if(n==6){
        $('.8:eq(0)>span').text(weekday[n]);
        n=0;
        $('.8:eq(1)>span').text(weekday[n]);

        $('.8:eq(2)>span').text(weekday[n+1]);

    } else if(n == 5){

        $('.8:eq(0)>span').text(weekday[n]);

        $('.8:eq(1)>span').text(weekday[n+1]);
        n=0;
        $('.8:eq(2)>span').text(weekday[n]);
    } else {
        $('.8:eq(0)>span').text(weekday[n]);

        $('.8:eq(1)>span').text(weekday[n+1]);
        $('.8:eq(2)>span').text(weekday[n+2]);
    }



    $('#calendar').datepicker({}).on('changeDate', function(e){

        var fecha =  e.format('yyyy/mm/dd') ;
        var fecha1 =  e.format('yyyy-mm-') ;
        var fecha2 =  e.format('yyyy-mm-dd') ;
        var dia =  e.format('dd') ;

        var d = new Date(fecha);
        var n = d.getDay();
        var nn = weekday[n];
        if(n =='5' ) {

            var n1 = weekday[n+1];
            n=0;
            var n2 = weekday[n];

        }else if(n=='6'){
            n=0;
            var n1 = weekday[n];
            var n2 = weekday[n+1]
        }
        else{
            var n1 = weekday[n+1];
            var n2 = weekday[n+2];
        }

        $('.8:eq(0)>span').text(nn);
        $('.8:eq(0)>input').val(fecha1+dia);
        dia++;

        $('.8:eq(1)>span').text(n1);
        $('.8:eq(1)>input').val(fecha1+dia);
        dia++;

        $('.8:eq(2)>span').text(n2);
        $('.8:eq(2)>input').val(fecha1+dia);


        $.ajax({
            url:'cita/'+fecha2,
            dataType : 'json',
            contentType: "application/x-www-form-urlencoded",
            type : 'POST',
            success: function(respuesta){


                //convertir el texto a un nuevo objeto
                console.log(respuesta);
                $('.border-body').css('background','white');

                for (var k in respuesta) {
                    var hora = respuesta[k][0];
                    var fecha = respuesta[k][1];

                    if(hora == '09:00:00') {
                        hora='9';
                    } else if(hora == '10:00:00') {
                        hora='10';

                    }
                    else if(hora == '11:00:00') {
                        hora='11';

                    }
                    else if(hora == '12:00:00') {
                        hora='12';

                    }
                    else if(hora == '13:00:00') {
                        hora='13';

                    }
                    else if(hora == '14:00:00') {
                        hora='14';

                    }
                    else if(hora == '15:00:00') {
                        hora='15';

                    }
                    else if(hora == '16:00:00') {
                        hora='16';

                    }
                    else if(hora == '17:00:00') {
                        hora='17';

                    }

                    if(hora != ''){
                        if(fecha==$(".8:eq(0)>input").val()){
                            $( "input[value="+hora+"]" ).parent("td:eq(0)").css('background','red');
                        }
                        if(fecha==$(".8:eq(1)>input").val()){
                            $( "input[value="+hora+"]" ).parent("td:eq(1)").css('background','red');
                        }
                        if(fecha==$(".8:eq(2)>input").val()){
                            $( "input[value="+hora+"]" ).parent("td:eq(2)").css('background','red');
                        }
                    }
                }
            },
            error : function(xhr, status) {
                alert('ERROR -> ');
            }
        });




    });

    $("td").click(function(){


        var rows = $('td').filter(function(){
            var color11 = $(this).css("background-color");
            if(color11=="rgb(201, 203, 207)"){
                $(this).css("background-color", "white");

                var v=true;
            }else{
                var v=false;

            }
        });


        var color = $(this).css('background-color');
        var color1 = "rgb(201, 203, 207)";
        if(color == color1 ){
            alert('sel');
            $(this).css("background-color", "rgba(201, 203, 207, 0.6)");

        } else {
            $(this).css("background-color", "rgba(201, 203, 207, 1)");

        }
    });



});
