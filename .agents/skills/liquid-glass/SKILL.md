````text
# How to Create Liquid Glass

Liquid glass is a visual effect where a moving organic shape bends, magnifies, blurs, and refracts the content behind it. The shape does not have to be a circle. It can be an amorphous blob, a soft droplet, a stretched highlight, or a free-form refractive region.

The important part is not the shape itself. The important part is the pipeline:

1. Render the scene content into a texture
2. Build a distortion mask for the liquid shape
3. Use a shader to sample the texture with warped coordinates
4. Add blur, highlight, edge glow, and chromatic aberration
5. Drive the shape with motion so it feels alive

That is how liquid glass is made.

--------------------------------------------------------------------------------

# 1. Render the Content First

You cannot distort the DOM directly inside a shader. First, render the text, background, icons, or UI into an offscreen canvas.

```ts
const textCanvas = document.createElement("canvas")
const ctx = textCanvas.getContext("2d")

if (ctx) {
    ctx.fillStyle = "#fafafa"
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = "#1d1d1f"
    ctx.font = "700 80px system-ui"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    ctx.fillText("Liquid", width / 2, height / 2 - 40)
    ctx.fillText("Glass", width / 2, height / 2 + 40)
}
````

This canvas becomes the source texture for the effect.

---

# 2. Upload the Canvas as a WebGL Texture

Once the canvas is drawn, send it to WebGL.

```ts
const texture = gl.createTexture()

gl.bindTexture(gl.TEXTURE_2D, texture)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    textCanvas
)
```

Now the shader can read the scene as pixels.

---

# 3. Draw a Fullscreen Pass

Use one fullscreen triangle. No mesh. No geometry. No Three.js.

Vertex shader:

```glsl
#version 300 es

void main() {
    vec2 p = vec2(
        float((gl_VertexID << 1) & 2),
        float(gl_VertexID & 2)
    );

    gl_Position = vec4(
        p * 2.0 - 1.0,
        0.0,
        1.0
    );
}
```

This covers the screen in a single draw call.

---

# 4. Create an Organic Liquid Shape

Do not think in terms of a perfect circle.
Think in terms of a soft refractive region controlled by a shape field.

Use a 2D position, a radius-like scale, and a deformation factor.

```glsl
vec2 p = frag - uShapeCenter;

float dist = length(p);
float mask = smoothstep(uShapeOuter, uShapeInner, dist);
```

Then distort the field so the shape is not perfectly round.

```glsl
float wave1 = sin(p.x * 0.015 + uTime * 2.0) * 8.0;
float wave2 = cos(p.y * 0.018 - uTime * 1.4) * 6.0;
float wave3 = sin((p.x + p.y) * 0.012 + uTime * 1.8) * 5.0;

float deformation = wave1 + wave2 + wave3;
mask = smoothstep(uShapeOuter + deformation, uShapeInner + deformation, dist);
```

This is what makes the shape feel fluid instead of geometric.

---

# 5. Bend the Sampling Coordinates

The core of liquid glass is coordinate warping.

```glsl
vec2 offset = p / max(dist, 1.0);
offset *= (1.0 - mask) * uRefractionStrength * 30.0;
```

Then sample the texture at the warped position.

```glsl
vec2 uv = frag / uResolution;
vec4 baseColor = texture(uTex, uv);
vec4 refractedColor = texture(uTex, uv + offset / uResolution);
```

That is the actual glass effect.

---

# 6. Add Magnification

Liquid glass should make the underlying content slightly larger inside the shape.

```glsl
vec2 magnifiedUV =
    (frag - uShapeCenter) / uMagnification +
    uShapeCenter;

vec4 magnifiedColor =
    texture(uTex, magnifiedUV / uResolution);
```

Combine magnification with refraction for the final look.

---

# 7. Add Chromatic Aberration

Real glass splits color channels a little near the edges.

```glsl
float ca = 0.003;

float red = texture(
    uTex,
    uv + offset / uResolution * (1.0 + ca)
).r;

float green = texture(
    uTex,
    uv + offset / uResolution
).g;

float blue = texture(
    uTex,
    uv + offset / uResolution * (1.0 - ca)
).b;

vec3 color = vec3(red, green, blue);
```

This gives the effect a glass-like optical edge.

---

# 8. Add Frosted Blur

Liquid glass is not perfectly sharp.
It should have a soft, frosted interior.

```glsl
vec2 taps[5] = vec2[5](
    vec2(0.0, 0.0),
    vec2(1.0, 0.3),
    vec2(-0.6, 0.9),
    vec2(-0.9, -0.5),
    vec2(0.5, -0.9)
);

vec3 acc = vec3(0.0);

for (int i = 0; i < 5; i++) {
    vec2 o = taps[i] * uFrost * 6.0;
    acc += texture(uTex, uv + (offset + o) / uResolution).rgb;
}

vec3 frosted = acc / 5.0;
```

Mix the frosted and sharp colors together.

```glsl
color = mix(color, frosted, uFrost);
```

---

# 9. Add Lighting

Glass needs highlights and edge shine.

```glsl
vec3 lightDir = normalize(vec3(-0.35, 0.55, 0.75));
vec3 halfDir = normalize(lightDir + vec3(0.0, 0.0, 1.0));

float ndh = max(dot(normal, halfDir), 0.0);
float specular = pow(ndh, 90.0) * 0.9;
float fresnel = pow(1.0 - max(normal.z, 0.0), 2.5);

color += specular;
color += fresnel * 0.16;
```

This makes the liquid surface feel shiny and dimensional.

---

# 10. Add Edge Glow

The border of the shape should catch light.

```glsl
float edge = smoothstep(uEdgeWidth, 0.0, abs(dist - uShapeBoundary));
color += edge * 0.25;
```

The edge glow is what makes the blob feel like translucent glass.

---

# 11. Drive the Shape with Motion

Liquid glass must respond to cursor movement.

Do not attach it directly to the pointer.
Use spring motion so it lags behind.

```ts
vx += (targetX - x) * stiffness * dt
vy += (targetY - y) * stiffness * dt

const damping = Math.exp(-14 * dt)
vx *= damping
vy *= damping

x += vx * dt
y += vy * dt
```

This makes the movement feel soft and organic.

---

# 12. Stretch the Shape When Moving Fast

Fast motion should deform the liquid shape.

```ts
const speed = Math.hypot(vx, vy)
const stretchTarget = Math.min(speed / 4500, 0.45)

stretch += (stretchTarget - stretch) * 0.12
```

Use this stretch to elongate the shape in the shader.

```glsl
vec2 dir = normalize(uMotionDir);
vec2 tangent = vec2(dir.y, -dir.x);

float along = dot(p, dir) / (1.0 + uStretch);
float across = dot(p, tangent) * (1.0 + uStretch * 0.5);

p = dir * along + tangent * across;
```

That is what makes it feel like a moving droplet.

---

# 13. Add Wobble

After the shape slows down, it should wobble for a moment.

```ts
const wobbleTarget = Math.min(speed / 2200, 1.0)

wobbleVel += (wobbleTarget - wobble) * 40.0 * dt
wobbleVel *= Math.exp(-4.2 * dt)
wobble += wobbleVel * dt
```

Use wobble to slightly distort the shape boundary.

```glsl
float wobbleShape =
sin(angle * 3.0 + uTime * 2.1) * 0.03 +
sin(angle * 5.0 - uTime * 3.3) * 0.02 +
sin(angle * 7.0 + uTime * 4.7) * 0.01;
```

This gives the surface a living liquid motion.

---

# 14. Add Ripples

Clicks should send waves through the image.

Store ripple events in CPU memory.

```ts
type Ripple = {
    x: number
    y: number
    t0: number
    amp: number
}

const ripples: Ripple[] = []

function addRipple(x: number, y: number) {
    ripples.push({
        x,
        y,
        t0: performance.now() / 1000,
        amp: 1
    })

    if (ripples.length > 8) {
        ripples.shift()
    }
}
```

Then in the shader, convert each ripple into a moving wave packet.

```glsl
float x = (dist - front) / 90.0;
float wave = sin(x * 6.2831) * exp(-x * x * 3.0);
offset += direction * wave * attenuation;
```

This makes the liquid react when clicked.

---

# 15. Add Idle Motion

If the user does nothing, the effect should still feel alive.

```ts
tx = canvas.width * (0.5 + 0.24 * Math.sin(idleTime * 0.43))
ty = canvas.height * (0.52 + 0.16 * Math.sin(idleTime * 0.61 + 1.3))
```

That keeps the scene from feeling dead.

---

# 16. Put It All Together in React

Create a client component with a canvas inside a full-size container.

```tsx
"use client"

import { useEffect, useRef } from "react"

export function LiquidGlass() {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        const gl = canvas.getContext("webgl2", {
            alpha: false,
            antialias: false,
            depth: false,
            stencil: false,
            powerPreference: "high-performance",
        })

        if (!gl) return

        // 1. Create shaders
        // 2. Create texture from offscreen canvas
        // 3. Set uniforms
        // 4. Run animation loop
        // 5. Update motion, stretch, wobble, and ripples
        // 6. Draw fullscreen triangle each frame
    }, [])

    return (
        <div
            ref={containerRef}
            className="relative h-full w-full overflow-hidden"
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full touch-none select-none"
            />
        </div>
    )
}
```

---

# 17. Basic Usage

```tsx
import { LiquidGlass } from "@/components/ui/liquid-glass"

export default function Page() {
    return (
        <main className="fixed inset-0">
            <LiquidGlass />
        </main>
    )
}
```

The parent must have a real size.
Use `fixed inset-0`, `h-svh`, or another full-screen layout.

---

# 18. What the Props Control

```tsx
<LiquidGlass
    text={["Hello", "World"]}
    subText="Dark Theme"
    tagline="Sleek and minimal"
    backgroundColor="#0a0a0a"
    textColor="#ffffff"
    lensRadius={170}
    magnification={1.2}
    refraction={0.55}
    frost={0.18}
/>
```

* `lensRadius` controls the size of the liquid region
* `magnification` controls how much the middle zooms
* `refraction` controls how strongly the image bends
* `frost` controls blur and softness
* `backgroundColor` controls the base scene tone
* `textColor` controls the typography color

---

# Final Mental Model

Think of liquid glass as a flowing distortion layer, not a circle.

The simplest formula is:

Content texture
+
Organic shape field
+
Shader distortion
+
Magnification
+
Blur
+
Lighting
+
Motion physics
+
Ripples

That is how you create liquid glass.

```
```