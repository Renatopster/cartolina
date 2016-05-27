$(function () {
        if ($('.cartola-countdown-fechamento').length > 0) {
            //inserir link para comparação com amigos 
        } else {
            $('.cartola-card__comparar-parciais>div:last-child').append('<div class="cartola__button cartola__button--verde" ng-click="ctrl.openComparar()"><span class="cartola__button__texto">ver todos</span></div>');
        }
});