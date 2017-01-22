'use strict';

function div_color(){
    audio_start({
      'id': 'boop',
    });

    document.getElementById('box').style.background =
      '#'
      + (4 + random_integer({
          'max': 5,
        }))
      + (4 + random_integer({
          'max': 5,
        }))
      + (4 + random_integer({
          'max': 5,
        }));
}

function reset(){
    if(storage_reset({
      'bests': true,
    })){
        update_best();
    }
}

function start(){
    start_time = new Date().getTime();
    change_time = random_integer({
      'max': 9000,
    }) + 999;
    timer = window.setTimeout(
      div_color,
      change_time
    );

    document.getElementById('box').style.background = '#000';

    document.getElementById('start-button').onclick = stop;
    document.getElementById('start-button').value = 'Stop Timer [ESC]';
}

function stop(){
    if(timer !== 0){
        var final_time = -(change_time - (new Date().getTime() - start_time));
        clearTimeout(timer);

        if(final_time > 0){
            storage_data['time'] = final_time;
            storage_save();
            update_best();
        }

        document.getElementById('result').innerHTML = final_time > 0
          ? '+' + final_time + 'ms'
          : 'Too soon :(';
        timer = 0;
    }

    document.getElementById('start-button').onclick = start;
    document.getElementById('start-button').value = 'Start Timer [H]';
}

function update_best(){
    document.getElementById('best').innerHTML = '+' + storage_info['time']['best'] + 'ms';
}

var change_time = 0;
var start_time = 0;
var timer = 0;

window.onload = function(e){
    input_init({
      'keybinds': {
        27: {
          'todo': stop,
        },
        72: {
          'todo': function(){
              stop();
              start();
          },
        },
      },
    });
    storage_init({
      'data': {
        'time': {
          'default': 99999999,
          'type': -1,
        },
      },
      'prefix': 'ReactionTest.htm-',
    });
    audio_init();
    audio_create({
      'id': 'boop',
      'properties': {
        'duration': .1,
        'volume': .1,
      },
    });

    update_best();
    document.getElementById('reset').onclick = reset;
    document.getElementById('start-button').onclick = start;
};
