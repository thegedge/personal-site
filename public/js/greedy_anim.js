$(function() {
  // Our grid of data, where 0 means "no face"
  var grid = {
    size: 50,  // actual size of a grid cell, in pixels
    width: 15,
    height: 5,
    data: [
      1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3, 3, 2, 2,
      1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3, 2, 2, 2,
      1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 3, 2, 2, 3, 3,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 0,
      1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0,
    ],
    styles: {
      0: {fill: 'url(#emptyPattern)'},
      1: {fill: '#22aa22'},
      2: {fill: '#2288ff'},
      3: {fill: '#ffcc22'},
    }
  };

  var s = Snap('#greedy_anim');

  // Create all of our faces
  var gridElem = s.group().attr('class', 'grid');
  grid.data.forEach(function(elem, index) {
    var x = Math.floor(index % grid.width);
    var y = Math.floor(index / grid.width);
    gridElem.rect(grid.size*x, grid.size*y, grid.size, grid.size)
            .attr(grid.styles[elem]);
  });

  // The quads constructed by greedy meshing
  var faces = [
    {x: 0, y: 0, width: 2, height: 5},
    {x: 4, y: 0, width: 7, height: 1},
    {x: 11, y: 0, width: 2, height: 1},
    {x: 13, y: 0, width: 2, height: 2},
    {x: 5, y: 1, width: 5, height: 1},
    {x: 10, y: 1, width: 2, height: 1},
    {x: 12, y: 1, width: 1, height: 2},
    {x: 2, y: 2, width: 1, height: 3},
    {x: 8, y: 2, width: 2, height: 2},
    {x: 10, y: 2, width: 1, height: 2},
    {x: 11, y: 2, width: 1, height: 1},
    {x: 13, y: 2, width: 2, height: 1},
    {x: 3, y: 3, width: 5, height: 1},
    {x: 11, y: 3, width: 2, height: 1},
    {x: 13, y: 3, width: 1, height: 1},
    {x: 3, y: 4, width: 1, height: 1},
    {x: 9, y: 4, width: 4, height: 1},
  ];

  // Create a animation callback chain for the faces. This animation chain
  // iterates through all of the faces, showing each, one by one. Each
  // animation expands the width of the height, followed by expanding the
  // height (if greater than 1). Add a little bounce to indicate the algorithm
  // hit a different voxel / empty face.
  var facesElem = s.group().attr('class', 'faces');
  var animateChain = (function(finalCallback) {
    var faceIndex = this;
    var face = faces[faceIndex];
    if(face) {
      var faceElem = facesElem.rect(grid.size*face.x, grid.size*face.y, 0, grid.size);
      faceElem.animate(
          {width: grid.size*face.width},
          2000, mina.bounce,
          function() {
            if(face.height > 1) {
              faceElem.animate({height: grid.size*face.height},
                               2000, mina.bounce,
                               animateChain.bind(faceIndex + 1, finalCallback));
            } else {
              animateChain.bind(faceIndex + 1)();
            }
          });
    } else if(finalCallback) {
      finalCallback();
    }
  });

  setTimeout(animateChain.bind(0), 1000);
});
