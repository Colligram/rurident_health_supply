# Image Slicing Guide for Dental Storytelling Animation

## 🎨 How to Prepare Your Dental Scene

### Step 1: Source Image Requirements

Your source image should include:
- **Dental chair** (preferably modern, well-lit)
- **Patient** (comfortable, relaxed position)
- **Dentist** (professional, caring demeanor)
- **Dental tools** (various instruments visible)
- **Clinical background** (clean, modern dental office)

### Step 2: Image Slicing Process

#### Using Photoshop:
1. **Open your source image**
2. **Create separate layers** for each element:
   - Background layer (clinic interior)
   - Dental chair layer
   - Patient layer
   - Dentist layer
   - Individual tool layers
3. **Use selection tools** (Magic Wand, Pen Tool, Quick Selection)
4. **Cut each element** to its own layer
5. **Export each layer** as PNG with transparency

#### Using GIMP (Free Alternative):
1. **Open source image**
2. **Duplicate background layer** for each element
3. **Use selection tools** to isolate elements
4. **Delete unwanted areas** on each layer
5. **Export as PNG** with transparency enabled

#### Using Figma (Web-based):
1. **Import your image**
2. **Use vector selection tools**
3. **Create separate frames** for each element
4. **Export each frame** as PNG

### Step 3: File Naming Convention

Save your sliced images with these exact names:

```
assets/
├── clinic-background.png     # Full clinic interior
├── dental-chair.png         # Isolated dental chair
├── patient.png              # Patient figure only
├── dentist.png              # Dentist figure only
├── dental-mirror.png        # Dental mirror tool
├── dental-probe.png         # Dental probe/explorer
├── dental-light.png         # Overhead dental light
└── dental-suction.png       # Suction device
```

### Step 4: Image Specifications

#### Resolution:
- **Desktop**: 1920x1080 base resolution
- **Retina/HiDPI**: 2x scale (3840x2160)
- **Mobile optimization**: Provide smaller versions if needed

#### Format Guidelines:
- **PNG with transparency** for all elements except background
- **JPEG for background** if file size is a concern
- **WebP format** for modern browsers (optional optimization)

#### File Size Optimization:
- Use tools like [TinyPNG](https://tinypng.com/)
- Target: <200KB per image for web
- Maintain quality for professional appearance

### Step 5: Layer Positioning Tips

When slicing, consider final positioning:

1. **Dental Chair**: Should be positioned left-center
2. **Patient**: Should align naturally with the chair
3. **Dentist**: Should be positioned right-side, standing
4. **Tools**: Should be scattered around the scene naturally
5. **Background**: Should complement all elements

### Step 6: Quality Checklist

Before using your sliced images:

- [ ] **Clean edges** - No rough or pixelated cutouts
- [ ] **Consistent lighting** - All elements match the original lighting
- [ ] **Proper shadows** - Include natural shadows where appropriate
- [ ] **Transparent backgrounds** - All non-background elements have transparency
- [ ] **Appropriate resolution** - High enough for your target display sizes
- [ ] **Optimized file sizes** - Compressed without quality loss

## 🖼 Alternative: Using Stock Images

If you don't have a suitable source image, you can use stock photos:

### Recommended Stock Photo Sites:
- **Shutterstock** - High-quality dental imagery
- **Getty Images** - Professional medical photography
- **Adobe Stock** - Integrated with design tools
- **Unsplash** - Free high-quality photos (limited dental content)

### Search Terms:
- "modern dental office"
- "dental examination"
- "dentist patient consultation"
- "dental equipment tools"
- "dental clinic interior"

### Combining Multiple Stock Images:
1. **Download separate images** for each element
2. **Ensure consistent style** (lighting, color temperature)
3. **Match perspectives** for realistic composition
4. **Blend lighting and shadows** in your editor

## 🎭 Creating SVG Versions (Advanced)

For even more control and smaller file sizes:

### Benefits of SVG:
- **Infinitely scalable** without quality loss
- **Smaller file sizes** for simple graphics
- **Easy to modify** colors and styles with CSS
- **Better performance** for simple shapes

### When to Use SVG:
- **Simplified/stylized** dental illustrations
- **Icon-based tools** rather than photorealistic
- **Brand-consistent** graphic style
- **Performance-critical** applications

### Tools for SVG Creation:
- **Adobe Illustrator** - Professional vector graphics
- **Inkscape** - Free vector graphics editor
- **Figma** - Web-based design with SVG export
- **Adobe XD** - UI/UX design with vector support

## 🚀 Quick Start Template

Don't have images ready? Start with these placeholder approaches:

### Option 1: CSS-Based Placeholders
The current CSS includes placeholder styling that shows colored rectangles with labels.

### Option 2: Simple Shape Graphics
Create basic shapes in your image editor:
- Rectangle for dental chair
- Circle for patient head
- Simple figure for dentist
- Basic shapes for tools

### Option 3: Icon Fonts
Use dental-themed icon fonts:
- **Font Awesome** (limited dental icons)
- **Medical Icons** from icon libraries
- **Custom SVG icons** from design resources

---

**Remember**: The animation works with any images - start simple and upgrade to professional photography later! 🎨