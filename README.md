# Better Terrain for GeoFS 4.0
This is a browser modification script (Userscript) designed to enhance the visual fidelity of GeoFS 4.0 by replacing default environmental assets with high-resolution satellite alternatives. It also optimizes the user interface by removing native advertising containers.

## What the Script Does:
GeoFS runs on a 3D globe rendering engine called Cesium. By default, the game loads its own imagery and terrain data layers. This script automates two major improvements:

⬩➤Imagery Upgrading: It bypasses the standard map provider and injects high-resolution Google Satellite or Bing Maps imagery directly into the rendering engine.

⬩➤Interface Cleanup: It runs a background check to identify and remove ad banners, providing a clean, distraction-free cockpit view.

## How the Logic Works:

### 1. The Initialization Check:
The script cannot run the exact microsecond the webpage opens because the game engine takes time to load its core files. To handle this, the script sets up a repetitive background timer that checks 
the website's memory every single second. It looks for four specific milestones: the GeoFS game engine, the API framework, the 3D map viewer, and the Cesium library.

If any of these are missing, the script simply stands by. The moment all four systems are confirmed active, the script turns off its own timer to save CPU power and moves to the next step.

### 2. Preparing the New Maps:
Map engines display the world using an automated grid system. The world map is sliced into billions of tiny square images called "tiles." As you fly your aircraft, the script tells the engine to fetch 
these tiles from Google's map servers instead of the default ones.

Google organizes these map tiles across four identical servers to handle massive internet traffic. The script is designed to cycle through these different servers automatically. This ensures your 
browser downloads map pieces efficiently without triggering server speed caps, allowing you to zoom in incredibly close before the image softens.

### 3. Safe Layer Management:
In older versions of map scripts, loading a massive new imagery layer would freeze the engine for a split second, causing the entire globe to crash into a solid black screen. To prevent this, the 
script uses a modern asynchronous loading feature. It forces the computer to completely finish preparing the new Google map layer in the background before trying to display it.

Once the new map is ready, it is added to the game's layer stack. Because map engines work like a stack of transparent papers, a new layer would naturally sit on top and cover up the runways, flight 
data, and aircraft UI. The script immediately uses a positioning command to slide the new map to the very bottom of the stack, keeping the game elements perfectly visible on top of the new terrain.

### 5. Interface Optimization:
Finally, the script starts a separate, permanent three-second background loop dedicated to interface cleanup. It scans the page's HTML structure for specific markers linked to advertising spaces (like Google AdSense blocks or sidebar banners).

Whenever it identifies one of these blocks, it updates its styling rules to completely hide it from the viewport. It repeats this process every three seconds to catch any new ad placements that might try to pop up during long cross-country flights.

---

 ✈︎ Developed by @Likelyblaze 🇧🇩. Free to use and modify. ✈︎ 

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
