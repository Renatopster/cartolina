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

    function buscarProprioTime(token, callback) {
        $.ajax({
            url: 'https://api.cartolafc.globo.com/auth/time',
            headers: {
                'X-GLB-Token': token
            },
            error: function (errorObj) {
                console.log(errorObj);
            },
            success: function (data) {
                callback(data);
            }
        });
    }

    var token = document.cookie.match('GLBID=([^;]+)')[1];
    if (token) {
        buscarAmigos(token);
        if ($('.cartola-countdown-fechamento').length > 0) {
            buscarProprioTime(token, function (data) {
                $('section.cartola-ligas header').after('\n\
                    <div>\n\
                        <div card-liga="" liga="liga" time-id-usuario="ctrl.timeService.dadosTime.time_id">\n\
                            <a class="cartola-card cartola-card--lista" ui-sref="liga({ slug: ctrl.liga.slug })">\n\
                                <div class="cartola-card-liga-thumb">\n\
                                    <img class="cartola-card-liga-thumb__img" alt="Amigos do FB" title="Amigos do FB" src="' + data.time.foto_perfil + '">\n\
                                </div>\n\
                                <div class="row collapse">\n\
                                    <div class="medium-15 column">\n\
                                        <div class="cartola-card-liga-info">\n\
                                            <div class="cartola-card-liga-info__nome">Amigos do FB</div>\n\
                                        </div>\n\
                                    </div>\n\
                                    <div class="medium-9 column">\n\
                                        <div class="cartola-card-liga-pontuacao">\n\
                                            <span class="cartola-liga-ranking__posicao">?°</span>\n\
                                        </div>\n\
                                    </div>\n\
                                </div>\n\
                            </a>\n\
                        </div>\n\
                    </div>');
            });
        } else {
            $('.cartola-card__comparar-parciais>div:last-child').append('<div class="cartola__button cartola__button--verde" ng-click="ctrl.openComparar()"><span class="cartola__button__texto">ver todos</span></div>');
        }
    }
});