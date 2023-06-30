import React, { useEffect, useRef } from 'react';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { POSE_CONNECTIONS } from '@mediapipe/drawing_utils';
import { ControlPanel, StaticText, Toggle, Slider } from '@mediapipe/control_utils';


function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}


const MediapipePoseComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const controlsRef = useRef(null);
  const fpsControlRef = useRef(null);
  const poseRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const controlsElement = controlsRef.current;
    const canvasCtx = canvas.getContext('2d');
    const fpsControl = fpsControlRef.current;

    const onResultsPose = (results) => {
      document.body.classList.add('loaded');
      fpsControl.tick();

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: (data) => {
          const x0 = canvas.width * data.from.x;
          const y0 = canvas.height * data.from.y;
          const x1 = canvas.width * data.to.x;
          const y1 = canvas.height * data.to.y;

          const z0 = clamp(data.from.z + 0.5, 0, 1);
          const z1 = clamp(data.to.z + 0.5, 0, 1);

          const gradient = canvasCtx.createLinearGradient(x0, y0, x1, y1);
          gradient.addColorStop(0, `rgba(0, ${255 * z0}, ${255 * (1 - z0)}, 1)`);
          gradient.addColorStop(1.0, `rgba(0, ${255 * z1}, ${255 * (1 - z1)}, 1)`);
          return gradient;
        }
      });

      // Dibujar los landmarks utilizando la función drawLandmarks
      drawLandmarks(canvasCtx, results.poseLandmarks, {
        color: (data) => {
          const z = clamp(data.from.z + 0.5, 0, 1);
          return `rgba(0, ${255 * z}, ${255 * (1 - z)}, 1)`;
        }
      });

      canvasCtx.restore();
    };

    const initMediapipePose = async () => {
      poseRef.current = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.2/${file}`,
      });
      await poseRef.current.setOptions({
        selfieMode: true,
        upperBodyOnly: false,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      poseRef.current.onResults(onResultsPose);

      cameraRef.current = new Camera(video, {
        onFrame: async () => {
          await poseRef.current.send({ image: video });
        },
        width: 480,
        height: 480,
      });
      cameraRef.current.start();

      // Configurar los controles utilizando la librería @mediapipe/control_utils
      const controlPanel = new ControlPanel(controlsElement, {
        selfieMode: true,
        upperBodyOnly: false,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      if (controlsElement){

      
      controlPanel.add([
        new StaticText({ title: 'MediaPipe Pose' }),
        fpsControl,
        new Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
        new Toggle({ title: 'Upper-body Only', field: 'upperBodyOnly' }),
        new Toggle({ title: 'Smooth Landmarks', field: 'smoothLandmarks' }),
        new Slider({
          title: 'Min Detection Confidence',
          field: 'minDetectionConfidence',
          range: [0, 1],
          step: 0.01,
        }),
        new Slider({
          title: 'Min Tracking Confidence',
          field: 'minTrackingConfidence',
          range: [0, 1],
          step: 0.01,
        }),
      ]);
    }
      
      controlPanel.on((options) => {
        video.classList.toggle('selfie', options.selfieMode);
        poseRef.current.setOptions(options);
      });
    };

    initMediapipePose();
  }, []);

  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <article className="panel is-info">
            <p className="panel-heading">Webcam Input</p>
            <div className="panel-block">
              <video ref={videoRef} className="input_video5" />
            </div>
          </article>
        </div>
        <div className="column">
          <article className="panel is-info">
            <p className="panel-heading">Mediapipe Pose Detection</p>
            <div className="panel-block">
              <canvas ref={canvasRef} className="output5" width="480px" height="480px" />
            </div>
          </article>
        </div>
      </div>
      <div className="loading">
        <div className="spinner" />
      </div>
      <div style={{ visibility: 'hidden' }} className="control5" ref={controlsRef} />
    </div>
  );
};

export default MediapipePoseComponent;