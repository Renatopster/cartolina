$(function () {
    var token = document.cookie.match('GLBID=([^;]+)')[1];

    function buscarAmigos() {
        $.ajax({
            url: 'https://api.cartolafc.globo.com/auth/amigos',
            headers: {
                'X-GLB-Token': token
            },
            error: function (errorObj) {
                console.log(errorObj);
            },
            success: function (data) {
                for (var index in data.times) {
                    buscarTimeAmigo(data.times[index]);
                }
                $('.cartolina-pontuacao-parcial').remove();
                $("main").after('<div class="row cartolina-pontuacao-parcial" style="display:none">\n\
    <div class="small-24 medium-16 large-13 large-offset-2 xxlarge-9 xxlarge-offset-5 column">\n\
        <div class="row small-collapse">\n\
            <div class="small-20 column cartola-secao__titulo cartola-liga-secao__titulo">PONTUAÇÃO PARCIAL</div>\n\
            <div class="small-4 column cartola-secao__titulo cartolina-voltar" style="font-size: 1em;text-align: right;cursor:pointer">Voltar</div>\n\
        </div>\n\
        <div class="row small-collapse">\n\
            <div class="small-24 column cartolina-times-container"></div>\n\
        </div>\n\
    </div>\n\
</div>');
            }
        });
    }

    function buscarTimeAmigo(dadosTime) {
        $.ajax({
            url: 'https://api.cartolafc.globo.com/time/' + dadosTime.slug,
            success: function (data) {
                var conteudo = '<div class="row small-collapse">\n\
                    <div class="small-centered medium-24 large-24 column cartola-liga-ranking__container">\n\
                        <div>\n\
                            <div class="row small-collapse cartola-liga-ranking">\n\
                                <div class="small-6 large-4 xxlarge-3 column">\n\
                                    <a href="/#/time/' + dadosTime.slug + '" title="' + dadosTime.nome + '">\n\
                                        <img class="small-12 small-push-4 medium-15 large-12 xxlarge-20" alt="' + dadosTime.nome + '" title="' + dadosTime.nome + '" src="' + dadosTime.url_escudo_svg + '">\n\
                                        <img class="small-10 small-pull-3 medium-10 medium-push-12 large-9 large-pull-5 xxlarge-14 xxlarge-push-14 cartola-thumb__foto cartola-liga-ranking__foto" src="' + dadosTime.foto_perfil + '" alt="' + dadosTime.nome_cartola + '" title="' + dadosTime.nome_cartola + '">\n\
                                    </a>\n\
                                </div>\n\
                                <div class="small-18 large-9 xxlarge-offset-1 xxlarge-9 column">\n\
                                    <a href="/#/time/' + dadosTime.slug + '" title="' + dadosTime.nome + '">\n\
                                        <div class="cartola-liga-ranking__nome">' + dadosTime.nome + '</div>\n\
                                        <div class="cartola-liga-ranking__nome_time">' + dadosTime.nome_cartola + '</div>\n\
                                    </a>\n\
                                </div>\n\
                                <div class="small-9 large-6 xxlarge-6 column">\n\
                                    <span class="cartola-liga-ranking__pontuacao">' + data.pontos.toFixed(2) + '</span>\n\
                                    <span class="cartola-liga-ranking__pontuacao-legenda">pts</span>\n\
                                </div>\n\
                                <div class="small-9 large-5 xxlarge-5 column text__right">\n\
                                    <span class="cartola-liga-ranking__posicao">?°</span>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                    </div>\n\
                </div>';
                $('.cartolina-times-container').append(conteudo);

                $("main").hide();
                $('.cartolina-pontuacao-parcial').show();
                console.log(data);
            }
        });
    }

    function buscarProprioTime(callback) {
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

    (function inicializar() {
        if (token) {
            if ($('.cartola-card__comparar-parciais').length > 0) {
                $('.cartola-card__comparar-parciais>div:last-child').append('<div class="cartola__button cartola__button--verde cartolina-btn-comparar-amigos"><span class="cartola__button__texto">ver todos</span></div>');
            }
            buscarProprioTime(function (data) {
                $('section.cartola-ligas header').after('\n\
                    <div>\n\
                        <div>\n\
                            <a class="cartola-card cartola-card--lista cartolina-btn-comparar-amigos">\n\
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
            $('body').on('click', '.cartolina-btn-comparar-amigos', function (event) {
                event.preventDefault();
                buscarAmigos();
            });
            $('body').on('click', '.cartolina-voltar', function (event) {
                event.preventDefault();
                $('.cartolina-pontuacao-parcial').hide();
                $('main').show();
            });
        }
    }());
});