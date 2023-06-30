import React, { useRef, useEffect } from 'react';

function Sentadilla() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
  
    useEffect(() => {
      // Inicializar Mediapipe Pose
      const initMediapipePose = async () => {
        // Cargar los scripts de Mediapipe y el modelo de pose
        await Promise.all([
          import('@mediapipe/pose'),
          import('@mediapipe/drawing_utils'),
        ]);
  
        const pose = window.pose;
        const drawingUtils = window.drawingUtils;
  
        // Cargar el modelo de Mediapipe Pose
        await pose.Pose.load();
  
        // Acceder al video y al canvas mediante las referencias
        const video = videoRef.current;
        const canvas = canvasRef.current;
  
        // Acceder al stream de la cámara
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
        // Asignar el stream de la cámara al video
        video.srcObject = stream;
  
        // Función para detectar poses y dibujarlas en el canvas
        const detectPose = async () => {
          const poses = await pose.Pose.estimate(video);
  
          // Dibujar las poses en el canvas
          drawingUtils.drawConnectors(canvas, poses);
  
          // Llamar a detectPose en el siguiente frame
          requestAnimationFrame(detectPose);
        };
  
        // Llamar a detectPose para iniciar la detección de poses
        detectPose();
      };
  
      // Ejecutar la inicialización de Mediapipe Pose cuando el componente se monte
      initMediapipePose();
    }, []);
  
    return (
      <div>
        <h1>Pose Detection</h1>
        <video ref={videoRef} autoPlay playsInline muted></video>
        <canvas ref={canvasRef}></canvas>
      </div>
    );
}

export default Sentadilla;