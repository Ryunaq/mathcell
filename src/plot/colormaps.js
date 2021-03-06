
// data from lib/matplotlib/_cm.py with clipping to [0,1] as for CSS

var colormaps = {

  gray: { r: [ [ x => x, [0,1] ] ],
          g: [ [ x => x, [0,1] ] ],
          b: [ [ x => x, [0,1] ] ] },

  spring: { r: [ [ x => 1, [0,1] ] ],
            g: [ [ x => x, [0,1] ] ],
            b: [ [ x => 1 - x, [0,1] ] ] },

  summer: { r: [ [ x => x, [0,1] ] ],
            g: [ [ x => (x+1)/2, [0,1] ] ],
            b: [ [ x => .4, [0,1] ] ] },

  autumn: { r: [ [ x => 1, [0,1] ] ],
            g: [ [ x => x, [0,1] ] ],
            b: [ [ x => 0, [0,1] ] ] },

  winter: { r: [ [ x => 0, [0,1] ] ],
            g: [ [ x => x, [0,1] ] ],
            b: [ [ x => 1 - x/2, [0,1] ] ] },

  cool: { r: [ [ x => x, [0,1] ] ],
          g: [ [ x => 1 - x, [0,1] ] ],
          b: [ [ x => 1, [0,1] ] ] },

  hot: { r: [ [ lerp( [0,.0416], [.365079,1] ), [0,.365079] ], [ x => 1, [.365079,1] ] ],
         g: [ [ x => 0, [0,.365079] ], [ lerp( [.365079,0], [.746032,1] ), [.365079,.746032] ],
              [ x => 1, [.746032,1] ] ],
         b: [ [ x => 0, [0,.746032] ], [ lerp( [.746032,0], [1,1] ), [.746032,1] ] ] },

  copper: { r: [ [ lerp( [0,0], [.809524,1] ), [0,.809524] ], [ x => 1, [.809524,1] ] ],
            g: [ [ x => .7812*x, [0,1] ] ],
            b: [ [ x => .4975*x, [0,1] ] ] },

  hsv: { r: [ [ x => hueToColor(x).r, [0,1] ] ],
         g: [ [ x => hueToColor(x).g, [0,1] ] ],
         b: [ [ x => hueToColor(x).b, [0,1] ] ] },

  ocean: { r: [ [ x => 0, [0,.667] ], [ x => 3*x - 2, [.667,1] ] ],
           g: [ [ x => Math.abs( (3*x-1)/2 ), [0,1] ] ],
           b: [ [ x => x, [0,1] ] ] },

  rainbow: { r: [ [ x => Math.abs( 2*x - 1/2 ), [0,.75] ], [ x => 1, [.75,1] ] ],
             g: [ [ x => Math.sin( Math.PI*x ), [0,1] ] ],
             b: [ [ x => Math.cos( Math.PI/2*x ), [0,1] ] ] },

  jet: { r: [ [ x => 0, [0,.35] ], [ lerp( [.35,0], [.66,1] ), [.35,.66] ],
              [ x => 1, [.66,.89] ], [ lerp( [.89,1], [1,.5] ), [.89,1] ] ],
         g: [ [ x => 0, [0,.125] ], [ lerp( [.125,0], [.375,1] ), [.125,.375] ],
              [ x => 1, [.375,.64] ], [ lerp( [.64,1], [.91,0] ), [.64,.91] ],
              [ x => 0, [.91,1] ] ],
         b: [ [ lerp( [0,.5], [.11,1] ), [0,.11] ], [ x => 1, [.11,.34] ],
              [ lerp( [.34,1], [.65,0] ), [.34,.65] ], [ x => 0, [.65,1] ] ] }

}

