# Team Video Chat App 🎥

A professional video conferencing application built for the Edmund Bogen Team with WebRTC, featuring:
- ✅ One-on-one HD video calls
- ✅ Interactive whiteboard
- ✅ Screen sharing
- ✅ Mute/unmute audio and video
- ✅ Real-time collaboration

## Features

### 📹 Video Chat
- High-quality peer-to-peer video calls using WebRTC
- Mirror view for local video (like Zoom)
- Mute/unmute microphone
- Start/stop video

### 📝 Interactive Whiteboard
- Drawing tools (pen, eraser, line, rectangle, circle)
- Customizable colors and brush sizes
- Real-time synchronization between peers
- Clear canvas option
- Touch support for tablets

### 🖥️ Screen Sharing
- Share your entire screen or specific windows
- Easy start/stop controls
- Seamless switching between camera and screen share

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup

1. **Install dependencies:**
   ```bash
   cd ~/team-video-chat
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open the application:**
   - Open your browser and go to: `http://localhost:3000`
   - For testing, open another browser window/tab with the same URL

## How to Use

### Starting a Call

1. **Enter your name** in the modal dialog
2. **Room options:**
   - Leave room code empty to create a new room
   - Enter an existing room code to join a specific room
3. Click "Join / Create Room"
4. **Share the room code** displayed in the header with your team member
5. When another person joins with the same room code, the video call will automatically connect

### Controls

- **🎤 Mute/Unmute**: Toggle your microphone
- **📹 Stop/Start Video**: Toggle your camera
- **🖥️ Share Screen**: Share your screen or window
- **📝 Whiteboard**: Open collaborative whiteboard
- **📞 End Call**: Disconnect and return to lobby

### Whiteboard Features

- **Drawing Tools:**
  - ✏️ Pen - Free hand drawing
  - 🧹 Eraser - Remove drawings
  - 📏 Line - Draw straight lines
  - ⬜ Rectangle - Draw rectangles
  - ⭕ Circle - Draw circles

- **Customization:**
  - Color picker for custom colors
  - Brush size slider (1-20px)
  - Clear canvas button

- **Collaboration:**
  - All drawings sync in real-time
  - Both users can draw simultaneously

## Technical Details

### Architecture
- **Frontend**: Vanilla JavaScript with WebRTC
- **Backend**: Node.js + Express + Socket.IO
- **Communication**: WebRTC for video/audio, Socket.IO for signaling

### WebRTC Flow
1. User joins a room via Socket.IO
2. Signaling server exchanges SDP offers/answers
3. ICE candidates are exchanged for NAT traversal
4. Peer-to-peer connection is established
5. Media streams (video/audio) flow directly between peers

### Network Requirements
- **Ports**: 3000 (HTTP), WebRTC uses dynamic ports
- **Firewall**: Allow WebRTC traffic (UDP)
- **STUN Servers**: Using Google's public STUN servers

## Development

### Running in Development Mode
```bash
npm run dev  # Uses nodemon for auto-restart
```

### File Structure
```
team-video-chat/
├── index.html      # Main UI
├── app.js          # Client-side WebRTC logic
├── server.js       # Signaling server
├── package.json    # Dependencies
└── README.md       # Documentation
```

## Deployment

### 🚀 Quick Deploy to Render (FREE - Recommended)

**Render provides free hosting with HTTPS built-in!**

1. **Go to**: https://render.com
2. **Sign up** (free account)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub account
5. Select the **team-video-chat** repository
6. Render will auto-detect the settings from `render.yaml`
7. Click **"Create Web Service"**
8. Wait 2-3 minutes for deployment
9. **Share your URL**: `https://team-video-chat-XXXXX.onrender.com`

✅ **Done!** Your team can now access it from anywhere with HTTPS!

### 🌐 Alternative: Deploy to Railway (FREE)

1. **Go to**: https://railway.app
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose **team-video-chat**
5. Click **"Deploy Now"**
6. Get your URL and share with team

### 💻 Local Network (No Deployment)

For testing on your local network:
```bash
# Find your IP address
ifconfig | grep "inet " | grep -v 127.0.0.1

# Share this URL with team members on same network:
http://YOUR_IP:3000
```

### ⚠️ Important Notes for Web Deployment

1. **HTTPS Required**: WebRTC requires HTTPS in production
   - Render and Railway provide this automatically ✅
   - GitHub Pages won't work (needs Node.js server)

2. **Free Tier Limitations:**
   - Render: App sleeps after 15 min of inactivity (takes ~30s to wake up)
   - Railway: 500 hours/month free
   - Both have HTTPS and work great for team use!

3. **TURN Server** (Optional - for strict firewalls):
   - Most users work fine with just STUN
   - If connections fail, add TURN server
   - Options: Twilio, Xirsys, or self-hosted coturn

## Browser Compatibility

✅ Chrome 74+
✅ Firefox 66+
✅ Safari 12.1+
✅ Edge 79+

## Troubleshooting

### Camera/Microphone Not Working
- Check browser permissions
- Ensure no other app is using the devices
- Try reloading the page

### Connection Issues
- Check firewall settings
- Ensure both users are on stable internet
- Try using different browsers

### Whiteboard Not Syncing
- Check that both users are in the same room
- Refresh the page and reconnect

## Security Notes

- All video/audio is peer-to-peer (not stored on server)
- Whiteboard data passes through signaling server
- For sensitive calls, deploy your own TURN server
- Consider implementing authentication for production

## Future Enhancements

- [ ] Multi-user support (3+ participants)
- [ ] Chat messages
- [ ] Recording functionality
- [ ] Virtual backgrounds
- [ ] File sharing
- [ ] Meeting scheduling

## Support

For issues or questions, contact the Edmund Bogen Team.

## License

MIT License - Created for Edmund Bogen Team

---

**Built with ❤️ for the Edmund Bogen Team**
