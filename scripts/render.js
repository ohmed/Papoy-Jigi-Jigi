function animate() {

  if (m1 && m1.play) {

    var mesh = m1;

    var interpolation = mesh.duration / mesh.keyframes;
    
    var time = Date.now() % mesh.duration;

    mesh.keyframe = (m1.play - 1) * 5 + Math.floor( time / interpolation );

    if ( mesh.keyframe != mesh.currentKeyframe ) {

      mesh.morphTargetInfluences[ mesh.lastKeyframe ] = 0;
      mesh.morphTargetInfluences[ mesh.currentKeyframe ] = 0;
      mesh.morphTargetInfluences[ mesh.keyframe ] = 0;

      mesh.lastKeyframe = mesh.currentKeyframe;
      mesh.currentKeyframe = mesh.keyframe;

      if (mesh.keyframe == m1.play * 5) {
        m1.play = 0;
      }

    }

    mesh.morphTargetInfluences[ mesh.keyframe ] = ( time % interpolation ) / interpolation;
    mesh.morphTargetInfluences[ mesh.lastKeyframe ] = 1 - mesh.morphTargetInfluences[ mesh.keyframe ];

  }

  if (m2 && m2.play) {

    var mesh = m2;

    var interpolation = mesh.duration / mesh.keyframes;
    
    var time = Date.now() % mesh.duration;

    mesh.keyframe = (m2.play - 1) * 6 + Math.floor( time / interpolation );

    if ( mesh.keyframe != mesh.currentKeyframe ) {

      mesh.morphTargetInfluences[ mesh.lastKeyframe ] = 0;
      mesh.morphTargetInfluences[ mesh.currentKeyframe ] = 0;
      mesh.morphTargetInfluences[ mesh.keyframe ] = 0;

      mesh.lastKeyframe = mesh.currentKeyframe;
      mesh.currentKeyframe = mesh.keyframe;

      if (mesh.keyframe == m2.play * 6) {
        m2.play = 0;
      }

    }

    mesh.morphTargetInfluences[ mesh.keyframe ] = ( time % interpolation ) / interpolation;
    mesh.morphTargetInfluences[ mesh.lastKeyframe ] = 1 - mesh.morphTargetInfluences[ mesh.keyframe ];

  }

}

function render() {

  animate();
  requestAnimationFrame( render );
  renderer.render( scene, camera );
  stats.update();

}