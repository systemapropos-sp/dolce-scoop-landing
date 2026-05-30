import { useRef, useEffect } from 'react';

const MAX_BLOBS = 80;

const VERTEX_SHADER = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_PASS1 = `
precision highp float;
#define MAX_BLOBS ${MAX_BLOBS}

uniform vec3 u_blobs[MAX_BLOBS];
uniform vec3 u_blobColors[MAX_BLOBS];

varying vec2 v_uv;

float circle(vec2 st, vec2 center, float radius) {
  float dist = length(st - center);
  return 1.0 - smoothstep(0.0, radius, dist);
}

vec4 sampleColor(vec2 uv) {
  vec4 color = vec4(0.0);
  for (int i = 0; i < MAX_BLOBS; i++) {
    vec3 blob = u_blobs[i];
    float c = circle(uv, blob.xy, blob.z);
    if (c > 0.0) {
      color += vec4(u_blobColors[i] * c, c);
    }
  }
  return color;
}

void main() {
  vec4 blob = sampleColor(v_uv);
  if (blob.a == 0.0) {
    gl_FragColor = vec4(0.0);
  } else {
    gl_FragColor = vec4(blob.rgb / blob.a, blob.a);
  }
}
`;

const FRAGMENT_PASS2 = `
precision highp float;

uniform sampler2D u_scene;
uniform float u_threshold;
uniform float u_time;

varying vec2 v_uv;

vec3 levelColor(vec3 color, float level) {
  float minVal = min(min(color.r, color.g), color.b);
  float maxVal = max(max(color.r, color.g), color.b);
  float range = maxVal - minVal;
  return minVal + range * level;
}

void main() {
  vec4 sample = texture2D(u_scene, v_uv);
  if (sample.a == 0.0) discard;
  
  vec3 color = levelColor(sample.rgb, u_threshold);
  float step_val = smoothstep(0.0, 0.05, sample.a);
  gl_FragColor = vec4(color * step_val, 1.0);
}
`;

interface Cell {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  homeRadius: number;
  angle: number;
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function BlobField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl!.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);

    // Create shaders and programs
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs1 = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_PASS1);
    const fs2 = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_PASS2);
    if (!vs || !fs1 || !fs2) return;

    const prog1Raw = createProgram(gl, vs, fs1);
    const vs2 = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    if (!vs2) return;
    const prog2Raw = createProgram(gl, vs2, fs2);
    if (!prog1Raw || !prog2Raw) return;
    const program1 = prog1Raw;
    const program2 = prog2Raw;

    // Create FBO
    const fbo = gl.createFramebuffer();
    const fboTexture = gl.createTexture();
    const fboSize = 512;
    gl.bindTexture(gl.TEXTURE_2D, fboTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, fboSize, fboSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fboTexture, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    // Quad vertices
    const quadVerts = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

    // Initialize cells
    const cells: Cell[] = [];
    const brandRed: [number, number, number] = [0.898, 0.082, 0.086];
    for (let i = 0; i < MAX_BLOBS; i++) {
      cells.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002,
        radius: 0.04 + Math.random() * 0.04,
        homeRadius: 0.04 + Math.random() * 0.04,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const blobsArray = new Float32Array(MAX_BLOBS * 3);
    const colorsArray = new Float32Array(MAX_BLOBS * 3);
    for (let i = 0; i < MAX_BLOBS; i++) {
      colorsArray[i * 3] = brandRed[0];
      colorsArray[i * 3 + 1] = brandRed[1];
      colorsArray[i * 3 + 2] = brandRed[2];
    }

    function updateCells() {
      const mouse = mouseRef.current;
      for (let i = 0; i < MAX_BLOBS; i++) {
        const cell = cells[i];

        // Viscosity
        cell.vx *= 0.995;
        cell.vy *= 0.995;

        // Gentle random drift
        cell.vx += (Math.random() - 0.5) * 0.0002;
        cell.vy += (Math.random() - 0.5) * 0.0002;

        // Spring attraction to home radius (slight breathing)
        const homeX = 0.3 + 0.4 * Math.sin(cell.angle + Date.now() * 0.0001 + i * 0.5);
        const homeY = 0.3 + 0.4 * Math.cos(cell.angle + Date.now() * 0.00008 + i * 0.3);
        cell.vx += (homeX - cell.x) * 0.0003;
        cell.vy += (homeY - cell.y) * 0.0003;

        // Mouse repulsion
        if (mouse.active) {
          const dx = cell.x - mouse.x;
          const dy = cell.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 0.3 && dist > 0.001) {
            const force = (0.3 - dist) * 0.008;
            cell.vx += (dx / dist) * force;
            cell.vy += (dy / dist) * force;
            cell.angle += 0.02;
          }
        }

        // Velocity limiter
        const speed = Math.sqrt(cell.vx * cell.vx + cell.vy * cell.vy);
        if (speed > 0.9) {
          cell.vx = (cell.vx / speed) * 0.9;
          cell.vy = (cell.vy / speed) * 0.9;
        }

        // Position update
        cell.x += cell.vx;
        cell.y += cell.vy;

        // Soft boundary wrap
        if (cell.x < -0.2) cell.x = 1.2;
        if (cell.x > 1.2) cell.x = -0.2;
        if (cell.y < -0.2) cell.y = 1.2;
        if (cell.y > 1.2) cell.y = -0.2;

        // Breathing radius
        cell.radius = cell.homeRadius + Math.sin(Date.now() * 0.001 + i) * 0.01;

        blobsArray[i * 3] = cell.x;
        blobsArray[i * 3 + 1] = cell.y;
        blobsArray[i * 3 + 2] = cell.radius;
      }
    }

    function drawQuad(program: WebGLProgram) {
      const aPos = gl!.getAttribLocation(program, 'a_pos');
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
      gl!.enableVertexAttribArray(aPos);
      gl!.vertexAttribPointer(aPos, 2, gl!.FLOAT, false, 0, 0);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    function render() {
      if (!gl || !canvas) return;
      const time = performance.now() * 0.001;

      updateCells();

      // Pass 1: Render blobs to FBO
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, fboSize, fboSize);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program1);

      const uBlobs1 = gl.getUniformLocation(program1, 'u_blobs');
      const uColors1 = gl.getUniformLocation(program1, 'u_blobColors');

      for (let i = 0; i < MAX_BLOBS; i++) {
        gl.uniform3f(uBlobs1, blobsArray[i * 3], blobsArray[i * 3 + 1], blobsArray[i * 3 + 2]);
      }
      for (let i = 0; i < MAX_BLOBS; i++) {
        gl.uniform3f(uColors1, colorsArray[i * 3], colorsArray[i * 3 + 1], colorsArray[i * 3 + 2]);
      }

      drawQuad(program1);

      // Pass 2: Render to screen with threshold
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program2);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboTexture);

      const uScene = gl.getUniformLocation(program2, 'u_scene');
      const uThreshold = gl.getUniformLocation(program2, 'u_threshold');
      const uTime = gl.getUniformLocation(program2, 'u_time');

      gl.uniform1i(uScene, 0);
      gl.uniform1f(uThreshold, 0.18);
      gl.uniform1f(uTime, time);

      drawQuad(program2);

      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);

    // Mouse/touch handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (touch.clientX - rect.left) / rect.width,
        y: 1 - (touch.clientY - rect.top) / rect.height,
        active: true,
      };
    };
    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouch, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouch);
      canvas.removeEventListener('touchend', handleTouchEnd);
      gl.deleteProgram(program1);
      gl.deleteProgram(program2);
      gl.deleteFramebuffer(fbo);
      gl.deleteTexture(fboTexture);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
}
