define([
    'jquery',
    'underscore',
    'solmiBasics',
    'helpers/helpers',
    'models/playCommon',
    'models/randomize',
    'models/frequenciesTuner',
    'views/forms',
    'views/additional'
], function ($, _, sb, helpers, playCommon, randomize, frequenciesTuner, forms, viewsAdd) {

    $('#solmi-config').append(forms.selectFieldForCentralViewScale());
    $('#solmi-config').append(forms.selectFieldForInstruments());
    $('#solmi-config').append(forms.selectFieldForRepetition());
    $('#solmi-config').append(viewsAdd.inputBaseToneLength());
    $('#solmi-config').append(forms.randomForm());

    for (var i = 1; i <= 2; i++) {
        $('.squares-3x3 .row:nth-child(' + i + ') div:first-child').css({'visibility': 'hidden'});
    }

    $('#solmi-strings form input').keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault();
        }
    });
    
    $('.noIU').click(function () {
        if(sb.noIU === false){
            sb.noIU = true;
        } else {
            sb.noIU = false;
        }
    });

    $('body').on('click', '#solmi-strings form .go', function () {
        console.log('scalesCurrent after click go: ', sb.scalesCurrent);
//        try {
        playCommon.prepareForPlay(this, 'standard');
//        } catch (e) {
//            console.error(e.message);
//            return false;
//        }
//        return false;
    });
    
    $('body').on('click', '.repeat', function () {
        console.log('scalesCurrent after click repeat: ', sb.scalesCurrent);
//        try {
        var usedStringText = $('.used-string').text();
        if(usedStringText){
            playCommon.prepareForPlay(this, 'repeat');
        }
//        } catch (e) {
//            console.error(e.message);
//            return false;
//        }
//        return false;
    });

    $('form#random .basic-go').click(function () {
        console.log('scalesCurrent after click form#random: ', sb.scalesCurrent);
//        try {
        randomize.countBasicGo();
        playCommon.prepareForPlay(this, 'random');
//        } catch (e) {
//            console.error(e.message);
//            return false;
//        }
//        return false;
    });
    
    $('form#random .basic-reset').click(function () {
        randomize.resetBasicGo();
    });
    
    $('#selection-solmistrings .go').click(function () {
        playCommon.prepareForPlay(this, 'selection-go');
    });
    $('#selection-solmistrings .add').click(function () {
        randomize.selectionAdd();
    });
    $('#selection-solmistrings .remove').click(function () {
        randomize.selectionRemove();
    });
    $('#selection-solmistrings .reset').click(function () {
        randomize.selectionReset();
    });

    $('#central-view-scale').change(function () {
        $('#all-squares .row div').css({'background-image': "none"});
        sb.centralViewScale = parseInt($(this).val());
        sb.scalesCurrent = helpers.setScalesCurrent(sb.scaleRange, sb.centralViewScale, sb.scalesCurrent);
    });

    $('#instruments').change(function () {
        sb.currentInstrument = $(this).val();
    });

    $('#repetition').change(function () {
        sb.remainingNumberOfPlaying = sb.currentNumberOfPlaying = parseInt($(this).val());
    });

    $('#base-tone-length').change(function () {
        sb.baseToneLength = parseInt($(this).val());
    });

    $('.sound-keys').change(function () {// later: remove this, action only if form is clicked
        var soundKey = $(this).val();
        sb.setSoundKeyCurrent(soundKey);
    });

    $('#frequencies-string2').after(forms.frequenciesForm);
    $('form.frequencies .start').click(function () {

        try {
            if (frequenciesTuner.tunerActive === false) {
                frequenciesTuner.tunerActive = true;
                frequenciesTuner.startTuner();
            } else {
                frequenciesTuner.tunerShowData = true;
            }
        } catch (e) {
            console.error(e.message);
            return false;
        }
        return false;
    });
    $('form.frequencies .stop').click(function () {
        try {
            frequenciesTuner.tunerShowData = false;
            console.log('solmiMain .stop frequenciesTuner', frequenciesTuner);
        } catch (e) {
            console.error(e.message);
            return false;
        }
        return false;
    });
    $('form.frequencies .reset').click(function () {
        try {
            $('#frequencies-string2').empty();
        } catch (e) {
            console.error(e.message);
            return false;
        }
        return false;
    });
//    if (hasGetUserMedia()) {
//        alert('Has getUserMedia!');
//    } else {
//        alert('getUserMedia() is not supported in your browser');
//    }

    return {};
});