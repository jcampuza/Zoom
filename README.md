### zoom

I created this small utility in order to add zooming functionality to images on a page, due to a need
in a recent project.

Can still use some customization/generalization, and cannot be used on IE (Object.assign isn't supported).

Supported options

```javascript
{
  duration: Number default 500, // How long to spend transitioning between zoomed view and unzoomed view [optional]
  selector: String || NodeList || HTMLElement || default '.img-zoom', // The selector or element/s to add zooming to
  zoomFactor: Number default 2 // How much to magnify images on hover/touch 
}
```