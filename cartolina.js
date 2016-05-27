$(function () {
    function buscarAmigos(token) {
        $.ajax({
            url: 'https://api.cartolafc.globo.com/auth/amigos',
            headers: {
                'X-GLB-Token': token
            },
            error: function (errorObj) {
                console.log(errorObj);
            },
            success: function (data) {
                console.log(data);
            }
        });
    }

    var token = document.cookie.match('GLBID=([^;]+)')[1];
    if (token) {
        buscarAmigos(token);
        if ($('.cartola-countdown-fechamento').length > 0) {
            //inserir link para comparação com amigos 
        } else {
            $('.cartola-card__comparar-parciais>div:last-child').append('<div class="cartola__button cartola__button--verde" ng-click="ctrl.openComparar()"><span class="cartola__button__texto">ver todos</span></div>');
        }
    }
});