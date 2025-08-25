# Dental Practice Storytelling Animation

A smooth scroll-triggered storytelling animation for a dental practice's "About Us" page, built with GSAP and ScrollTrigger.

## 🚀 Features

- **Scroll-triggered animations** using GSAP + ScrollTrigger
- **Layered storytelling** with dental chair, patient, dentist, and tools
- **Responsive design** that works on desktop and mobile
- **Smooth scroll scrubbing** - animations reverse when scrolling up
- **Performance optimized** with mobile-specific optimizations
- **Modular structure** with clean HTML, CSS, and JavaScript

## 📁 File Structure

```
/
├── index.html          # Main HTML structure
├── style.css           # Responsive CSS with animations
├── script.js           # GSAP ScrollTrigger animations
├── assets/             # Directory for your image assets
│   ├── clinic-background.png
│   ├── dental-chair.png
│   ├── patient.png
│   ├── dentist.png
│   ├── dental-mirror.png
│   ├── dental-probe.png
│   ├── dental-light.png
│   └── dental-suction.png
└── README.md
```

## 🎨 How to Replace Placeholder Images

1. **Prepare your dental scene image** - Take or create a high-quality image of your dental practice
2. **Slice into layers** using your preferred image editor (Photoshop, GIMP, Figma):
   - **Background**: Clinic interior (save as `clinic-background.png`)
   - **Dental Chair**: Modern dental chair (save as `dental-chair.png`)
   - **Patient**: Comfortable patient (save as `patient.png`)
   - **Dentist**: Professional dentist (save as `dentist.png`)
   - **Tools**: Individual dental instruments (save as separate PNG files)

3. **Image Requirements**:
   - Format: PNG with transparent backgrounds (except background layer)
   - Resolution: High-DPI ready (2x actual display size)
   - Optimization: Use tools like TinyPNG to reduce file size
   - Naming: Match the filenames in the HTML exactly

4. **Replace the images** in the `/assets/` directory

## 🎬 Animation Sequence

The animation unfolds in this order as users scroll:

1. **Background fades in** (0-15% scroll progress)
2. **Dental chair slides in from left** (15-30%)
3. **Patient appears and scales up** (30-45%)
4. **"Comfort First" text overlay appears** (35%)
5. **Dentist slides in from right** (45-60%)
6. **"Modern Technology" text appears** (55%)
7. **Dental tools float in one by one** (60-85%)
8. **Background reaches full opacity** (85-95%)
9. **"Expert Care" text appears** (90-100%)

## 🛠 Customization

### Adjusting Animation Timing

In `script.js`, modify the timeline positions (the numbers after the comma):

```javascript
// Example: Make dental chair appear later
mainTimeline.to("#dental-chair", {
    x: 0,
    opacity: 1,
    duration: 1.5,
    ease: "power2.out"
}, 0.5); // Change from 0.2 to 0.5
```

### Changing Animation Properties

Modify the animation properties in the `mainTimeline.to()` calls:

```javascript
// Example: Change dental chair entrance direction
gsap.set("#dental-chair", { x: -400, y: 100 }); // Add vertical offset
mainTimeline.to("#dental-chair", {
    x: 0,
    y: 0,  // Animate to final position
    opacity: 1,
    duration: 1.5,
    ease: "back.out(1.7)"  // Different easing
}, 0.2);
```

### Adding New Elements

1. Add HTML element in `index.html`:
```html
<div class="scene-layer new-element-layer" id="new-element">
    <div class="new-element">
        <img src="assets/new-element.png" alt="New element" />
    </div>
</div>
```

2. Add CSS positioning in `style.css`:
```css
.new-element {
    position: absolute;
    right: 10%;
    top: 30%;
    width: 100px;
    height: 100px;
}
```

3. Add animation in `script.js`:
```javascript
// Set initial state
gsap.set("#new-element", { opacity: 0, scale: 0 });

// Add to timeline
mainTimeline.to("#new-element", {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.7)"
}, 1.8); // Timing position
```

## 📱 Mobile Responsiveness

The animation automatically adjusts for mobile devices:

- **Simplified animations** for better performance
- **Scaled components** to fit smaller screens
- **Optimized text overlays** with smaller sizes
- **Touch-friendly interactions**

Mobile-specific CSS is handled with media queries in `style.css`.

## 🔧 Development

### Debug Mode

Add `?debug=true` to your URL to enable debug mode:
```
http://localhost:3000/?debug=true
```

This will log animation progress to the browser console.

### Performance Tips

1. **Optimize images** - Use WebP format when possible
2. **Preload critical assets** - The script includes preloading functionality
3. **Use will-change CSS property** for better GPU acceleration:
```css
.scene-layer {
    will-change: transform, opacity;
}
```

## 🌐 Browser Support

- **Modern browsers** with GSAP support (Chrome 51+, Firefox 54+, Safari 10+)
- **Mobile browsers** (iOS Safari, Chrome Mobile, Samsung Browser)
- **Graceful degradation** for older browsers

## 📦 Dependencies

- **GSAP 3.12.2** - Animation library
- **ScrollTrigger 3.12.2** - Scroll-based animation plugin

Both are loaded via CDN in the HTML file.

## 🚀 Getting Started

1. **Open `index.html`** in your browser
2. **Replace placeholder images** in the `/assets/` directory
3. **Customize animations** in `script.js` if needed
4. **Adjust styling** in `style.css` to match your brand
5. **Deploy** to your web server

## 💡 Tips for Best Results

1. **High-quality images** make a huge difference
2. **Consistent lighting** across all image layers
3. **Proper image isolation** with clean transparent backgrounds
4. **Test on various devices** for responsive behavior
5. **Optimize for Core Web Vitals** by compressing images

---

**Ready to bring your dental practice story to life!** 🦷✨