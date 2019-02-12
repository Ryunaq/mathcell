
function MathCell( id, inputs, config={} ) {

  function labeledInteract( input ) {

    var label = 'label' in input ? input.label : '';
    if ( label.length === 1 ) label = `<i>${label}</i>`;

    return `
<div style="white-space: nowrap">
<div style="min-width: .5in; display: inline-block">${label}</div>
<div style="width: 100%; display: inline-block; white-space: nowrap">
  ${interact( id, input )} </div>
</div>`;

  }

  function tableOfInputs( inputs ) {

    var t = '';

    inputs.forEach( row => {

      t += '<tr>';
      row.forEach( column => {

        t += '<td>';
        if ( Array.isArray(column) )  t += tableOfInputs( column );
        else t += labeledInteract( column );
        t += '</td>';

      } );
      t += '</tr>';

    } );

    return `
<table style="width: 100%; line-height: inherit">
${t}
</table>`;

  }

  var s = '';
  // process array of dictionaries
  for ( var i = 0 ; i < inputs.length ; i++ ) {

    var input = inputs[i];

    if ( Array.isArray(input) ) s += tableOfInputs( input );
    else s += labeledInteract( input );

  }

  s += `
<div style="height: .25in"></div>
<div id=${id}wrapper style="width: 100%; flex: 1; position: relative">`;

  var outputIndex = 1;

  function tableOfOutputs( outputs ) {

    var t = '';

    outputs.forEach( row => {

      t += '<tr>';
      row.forEach( column => {

        if ( Array.isArray(column) )  t += tableOfOutputs( column );
        else {
          t += `
<td id=${id}output${outputIndex} style="width: ${100/outputs[0].length}%; height: ${100/outputs.length}%"></td>`;
          outputIndex++;
        }

      } );
      t += '</tr>';

    } );

    return `
<table style="width: 100%; height: 100%">
${t}
</table>`;

  }

  if ( 'multipleOutputs' in config ) s += tableOfOutputs( config.multipleOutputs );

  else s += `
<div id=${id}output style="width: 100%; height: 100%"></div>`;

  s += `
</div>`;

  var cell = document.createRange().createContextualFragment( s )
  document.getElementById( id ).appendChild( cell );

}


function interact( id, input ) {

  switch ( input.type ) {

    case 'slider':

      var name = 'name' in input ? input.name : '';
      var min = 'min' in input ? input.min : 0;
      var max = 'max' in input ? input.max : 1;
      var step = 'step' in input ? input.step : .01;
      var value = 'default' in input ? input.default : min;

      return `
<input id=${id + name} type=range min=${min} max=${max} step=${step} value=${value}
       style="vertical-align: middle; width: calc(100% - 1.2in)"
       onchange="${id + name}Box.value=${id + name}.value;${id}.update('${id}')"/>
<input id=${id + name}Box type=number min=${min} max=${max} step=${step} value=${value}
       title="" style="width: .5in"
       onchange="${id + name}.value=${id + name}Box.value;${id}.update('${id}')"/>`;

    case 'buttons':

      var name = 'name' in input ? input.name : '';
      var values = 'values' in input ? input.values : [1,2,3];
      var labels = 'labels' in input ? input.labels : false;
      var select = 'default' in input ? input.default : values[0];

      var style = input.width ? 'style="width: ' + input.width + '"' : '';

      var s = '';
      for ( var i = 0 ; i < values.length ; i++ )
        s += `
<input id=${id + name}_${i} name=${id + name} type=radio
       value=${values[i]} ${ values[i] === select ? 'checked' : '' }
       onchange="${id}.update('${id}')"/>
<label for=${id + name}_${i} ${style}> ${ labels ? labels[i] : values[i] } </label> &nbsp; </input>`;

      return s;

    case 'number':

      var name = 'name' in input ? input.name : '';
      var min = 'min' in input ? input.min : 0;
      var max = 'max' in input ? input.max : 1;
      var step = 'step' in input ? input.step : .01;
      var value = 'default' in input ? input.default : min;

      return `
<input id=${id + name} type=number min=${min} max=${max} step=${step} value=${value}
       style="width: 1in" title="" onload=this.onchange
       onchange="if (+this.value < +this.min) this.value=this.min;
                 if (+this.value > +this.max) this.value=this.max;${id}.update('${id}')"/>`;

    case 'checkbox':

      var name = 'name' in input ? input.name : '';
      var checked = 'default' in input ? input.default : '';

      return `
<input id=${id + name} type=checkbox ${ checked ? 'checked' : '' }
       onchange="${id}.update('${id}')"/>`;

    default:

      return 'Unsupported input type';

  }

}


function graphic( id, data, config ) {

  switch ( config.type ) {

    case 'svg':

      return svgPlot( id, data, config );

    case 'threejs':

      return threejsPlot( id, data, config );

    case 'x3d':

      return x3dPlot( id, data, config );

    case 'text':

      // need JSON stringify to render objects
      // explicit double quotes removed by default
      // if needed in output use &quot;

      var center = config.center ? 'text-align: center' : '';

      return `<div style="white-space: nowrap; overflow-x: auto; ${center}">
              ${JSON.stringify( data ).replace( /\"/g, '' )} </div>`;

    case 'matrix':

      s = '<table class="matrix" style="width: 95%; margin: auto; \
                                        line-height: 1.5; text-align: center">';

      for ( var i = 0 ; i < data.length ; i++ ) {
        s += '<tr>';
        for ( var j = 0 ; j < data[i].length ; j++ ) {
          s += '<td>' + data[i][j] + '</td>';
        }
        s += '</tr>';
      }

      return s + '</table>';

    default:

      return 'Unsupported graphic type';

  }

}


function generateId() {

  return 'id' + Math.floor( 10**10 * Math.random() );

}


function getVariable( id, name ) {

  // plus sign invokes Number object to ensure numeric result
  // input type already validated on creation

  var input = document.getElementById( id + name );

  if ( input ) switch ( input.type ) {

    case 'number':
    case 'range':

      return +input.value;

    case 'checkbox':

      return input.checked;

  } else {

    var value = document.querySelector( 'input[name=' + id + name + ']:checked' ).value;

    if ( isNaN(value) ) return value;
    else return +value;

  }

}


function setLimit( id, name, end, value ) {

  var input = document.getElementById( id + name );

  switch( end ) {

    case 'min' :

      input.min = value;
      if ( input.value < value ) input.value = value;
      break;

    case 'max' :

      input.max = value;
      if ( input.value > value ) input.value = value;

  }

  if ( input.type === 'range' ) {
    // update slider box
    var box = document.getElementById( id + name + 'Box' );
    box.min = input.min;
    box.max = input.max;
    box.value = input.value;
  }

}


function evaluate( id, data, config ) {

  var outputs = document.querySelectorAll( '[id^=' + id + 'output]' );

  if ( outputs.length === 1 ) {

    var output = outputs[0];
    output.innerHTML = graphic( id, data, config );
    if ( config.type === 'threejs' ) iOSFix( output );

  } else {

    for ( var i = 0 ; i < outputs.length ; i ++ ) {

      var output = outputs[i];
      var n = output.id.substr( output.id.indexOf('output') + 6 );

      var c = Array.isArray(config) ? config[i] : config;
      c.output = n;

      output.innerHTML = graphic( id, data[i], c );
      if ( config.type === 'threejs' ) iOSFix( output );

    }

  }

  function iOSFix( output ) {

    var iframe = output.children[0];

    if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {
      iframe.style.width = getComputedStyle( iframe ).width;
      iframe.style.height = getComputedStyle( iframe ).height;
    }

  }

}

