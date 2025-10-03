# Team Video Chat App - Complete Guide

> **Built for Edmund Bogen Team**
> A professional video conferencing solution with whiteboard and screen sharing capabilities

---

## 📋 Table of Contents

- Quick Start
- Features Overview
- How to Use the App
- Deployment Guide
- Troubleshooting
- Technical Details

---

## 🚀 Quick Start

### What You Have

✅ **GitHub Repository**: https://github.com/edmundbogen/team-video-chat
✅ **Local Server**: Running on your Mac at `http://localhost:3000`
✅ **Deployed App**: Railway deployment (see Deployment section)

### 3-Minute Setup

1. **Start Local Server** (if not running):
   ```bash
   cd ~/team-video-chat
   npm start
   ```

2. **Open in Browser**: http://localhost:3000

3. **Create a Room**:
   - Enter your name
   - Leave room code blank (auto-generates)
   - Click "Join / Create Room"

4. **Invite Someone**:
   - Share your deployed URL + room code
   - Or open another browser window with same URL for testing

---

## 🎯 Features Overview

### Video Chat
- ✅ One-on-one HD video calls
- ✅ WebRTC peer-to-peer connection
- ✅ Mute/unmute microphone
- ✅ Start/stop video camera
- ✅ Mirror view for local video

### Interactive Whiteboard
- ✅ Drawing tools: Pen, Eraser, Line, Rectangle, Circle
- ✅ Color picker (any color)
- ✅ Brush size control (1-20px)
- ✅ Real-time synchronization
- ✅ Clear canvas option
- ✅ Touch support for tablets

### Screen Sharing
- ✅ Share entire screen or specific window
- ✅ Easy start/stop controls
- ✅ Seamless camera/screen switching
- ✅ Remote user sees your screen

### Room System
- ✅ Simple 6-character room codes
- ✅ Auto-generated or custom codes
- ✅ Connection status indicators
- ✅ Peer disconnect notifications

---

## 📖 How to Use the App

### Starting a Video Call

**Step 1: Join a Room**
1. Open the app URL
2. Enter your name (e.g., "Edmund")
3. **To create new room**: Leave room code empty
4. **To join existing room**: Enter the 6-character code
5. Click "Join / Create Room"

**Step 2: Share Room Code**
- Look at top-right corner for room code (e.g., "A3B7F2")
- Share this code with your team member
- They enter the same code to join

**Step 3: Wait for Connection**
- Status shows "Waiting for peer..."
- When someone joins, status changes to "Connected"
- Video streams appear automatically

### Using Controls

**🎤 Microphone Control**
- Click "🎤 Mute" to mute your audio
- Button turns red when muted
- Click again to unmute

**📹 Video Control**
- Click "📹 Stop Video" to turn off camera
- Your video goes black but call continues
- Click again to restart video

**🖥️ Screen Sharing**
1. Click "🖥️ Share Screen"
2. Choose which screen/window to share
3. Click "Share"
4. Remote user sees your screen
5. Click "Stop Sharing" to return to camera

**📝 Whiteboard**
1. Click "📝 Whiteboard" to open panel
2. Select a drawing tool (Pen, Eraser, etc.)
3. Choose color and brush size
4. Draw on canvas
5. Remote user sees drawings in real-time
6. Click "X" to close whiteboard

**📞 End Call**
- Click "📞 End Call"
- Confirm you want to end
- Returns to join screen

### Whiteboard Tools

| Tool | Description |
|------|-------------|
| ✏️ Pen | Free-hand drawing |
| 🧹 Eraser | Erase drawings |
| 📏 Line | Draw straight lines |
| ⬜ Rectangle | Draw rectangles |
| ⭕ Circle | Draw circles |
| 🎨 Color Picker | Choose any color |
| 📏 Brush Size | Adjust thickness (1-20) |
| 🗑️ Clear | Clear entire canvas |

---

## 🌐 Deployment Guide

### Current Deployment: Railway

**Your Deployed App**:
- Check Railway dashboard for your live URL
- Format: `https://team-video-chat-production.up.railway.app`

**How to Access Railway:**
1. Go to: https://railway.app
2. Login with your account
3. Click on "team-video-chat" project
4. See deployment status and logs
5. Copy public URL from settings

### Deployment Status Check

**Railway Dashboard Shows:**
- ✅ **Build Status**: Success/Failed
- ✅ **Deploy Status**: Active/Crashed
- ✅ **Logs**: Server messages
- ✅ **URL**: Your public link

**Healthy Server Logs Should Show:**
```
🚀 Team Video Chat Server running on http://localhost:3000
📹 Open the app in multiple browser windows to test
```

### Updating the App

**When You Make Changes:**

1. **Edit files locally**
2. **Commit changes**:
   ```bash
   cd ~/team-video-chat
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Railway auto-deploys** from GitHub
4. Wait 2-3 minutes for new version

### Alternative Deployment: Render

**If Railway has issues, use Render:**

1. Go to: https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select "team-video-chat" repo
5. Click "Create Web Service"
6. Get URL: `https://team-video-chat-XXXXX.onrender.com`

---

## 🔧 Troubleshooting

### Camera/Microphone Not Working

**Problem**: Can't access camera or mic

**Solutions**:
1. Check browser permissions (click lock icon in address bar)
2. Allow camera/microphone access
3. Close other apps using camera (Zoom, FaceTime, etc.)
4. Refresh page and try again
5. Try different browser (Chrome works best)

### Connection Won't Establish

**Problem**: "Waiting for peer..." doesn't change

**Solutions**:
1. Verify both users entered SAME room code
2. Check both users are on deployed URL (not localhost)
3. Refresh both browsers
4. Try creating new room code
5. Check firewall/network isn't blocking WebRTC

### Video is Black

**Problem**: See black screen instead of video

**Solutions**:
1. Check if video is stopped (button should say "Start Video")
2. Click "Start Video" button
4. Grant browser camera permissions
5. Check camera works in other apps
6. Try refreshing page

### Whiteboard Not Syncing

**Problem**: Drawings don't appear on other side

**Solutions**:
1. Verify connection status shows "Connected"
2. Both users should have whiteboard open
3. Try closing and reopening whiteboard
4. Refresh and reconnect

### Screen Share Not Working

**Problem**: Can't share screen

**Solutions**:
1. Chrome/Edge work best (Safari has limitations)
2. Grant screen recording permissions on Mac:
   - System Settings → Privacy & Security → Screen Recording
   - Enable your browser
3. Try sharing specific window instead of entire screen
4. Refresh page and try again

### Railway App Not Loading

**Problem**: Deployed URL shows error

**Solutions**:
1. Check Railway dashboard for:
   - Build errors in logs
   - Deploy status (should be "Active")
2. Look for error messages in deploy logs
3. Try redeploying:
   - Settings → "Redeploy"
4. Check if app "fell asleep" (free tier)
   - Just refresh URL to wake it up (~30 seconds)

---

## 💻 Technical Details

### File Structure

```
team-video-chat/
├── index.html          # Main UI interface
├── app.js              # WebRTC client logic
├── server.js           # Node.js signaling server
├── package.json        # Dependencies & scripts
├── render.yaml         # Render deployment config
├── README.md           # Technical documentation
└── .gitignore          # Git ignore rules
```

### Technologies Used

| Technology | Purpose |
|------------|---------|
| WebRTC | Peer-to-peer video/audio streaming |
| Socket.IO | Real-time signaling & whiteboard sync |
| Node.js + Express | Backend server |
| Canvas API | Whiteboard drawing |
| MediaStream API | Screen sharing |

### How It Works

**1. Connection Flow**:
```
User A joins room → Signaling server creates room
User B joins same room → Server notifies User A
User A sends WebRTC offer → via Socket.IO
User B sends WebRTC answer → via Socket.IO
Exchange ICE candidates → NAT traversal
P2P connection established → Direct video/audio stream
```

**2. Video/Audio**:
- Peer-to-peer connection (not through server)
- Uses STUN servers for NAT traversal
- No recording/storage (privacy)

**3. Whiteboard**:
- Canvas HTML5 element
- Drawing events sent via Socket.IO or DataChannel
- Synchronized in real-time

**4. Screen Sharing**:
- Uses `getDisplayMedia()` API
- Replaces video track temporarily
- Restores camera when stopped

### Network Requirements

**Ports**:
- HTTP: 3000 (or Railway-assigned)
- WebRTC: Dynamic (handled by STUN)

**STUN Servers** (for NAT traversal):
- `stun.l.google.com:19302`
- `stun1.l.google.com:19302`

**Firewall**:
- Allow WebRTC traffic (UDP)
- HTTPS required for production

### Browser Support

| Browser | Support |
|---------|---------|
| Chrome 74+ | ✅ Full support |
| Firefox 66+ | ✅ Full support |
| Safari 12.1+ | ⚠️ Limited screen share |
| Edge 79+ | ✅ Full support |

---

## 📞 Quick Reference Commands

### Local Development

```bash
# Start server
cd ~/team-video-chat
npm start

# Install dependencies (if needed)
npm install

# Stop server
# Press Ctrl+C in terminal
```

### Git Operations

```bash
# Check status
cd ~/team-video-chat
git status

# Commit changes
git add .
git commit -m "Your message"
git push

# View remote
git remote -v
```

### Useful URLs

- **GitHub Repo**: https://github.com/edmundbogen/team-video-chat
- **Railway Dashboard**: https://railway.app/dashboard
- **Render Dashboard**: https://dashboard.render.com
- **Local App**: http://localhost:3000

---

## 🎓 Usage Tips

### For Best Video Quality

1. ✅ Use wired internet (ethernet) if possible
2. ✅ Close unnecessary browser tabs
3. ✅ Use Chrome for best compatibility
4. ✅ Ensure good lighting for camera
5. ✅ Test connection before important calls

### For Whiteboard Collaboration

1. ✅ Agree on who draws first to avoid confusion
2. ✅ Use different colors for each person
3. ✅ Clear canvas when starting new topic
4. ✅ Use "Line" tool for diagrams
5. ✅ Screenshot important drawings

### Room Code Best Practices

1. ✅ Create new room for each meeting
2. ✅ Share code via secure channel (text, email)
3. ✅ Use custom codes for recurring meetings
4. ✅ Don't reuse codes from previous days

---

## 🔐 Privacy & Security

**What's Private**:
- ✅ Video/audio streams (peer-to-peer, not recorded)
- ✅ No user accounts or login required
- ✅ Rooms expire when users leave

**What Goes Through Server**:
- ⚠️ Signaling data (connection setup)
- ⚠️ Whiteboard drawings
- ⚠️ Room codes

**For Sensitive Meetings**:
- Deploy your own instance
- Use VPN if needed
- Don't share room codes publicly

---

## 📝 Notes & Reminders

### Important Points

- Free tier Railway app sleeps after 15 min inactivity (wakes in ~30s)
- WebRTC requires HTTPS in production (Railway provides this)
- Maximum 2 users per room (one-on-one design)
- No call recording feature (by design for privacy)

### Future Enhancements (Possible)

- [ ] Multi-user support (3+ people)
- [ ] Text chat
- [ ] File sharing
- [ ] Recording capability
- [ ] Virtual backgrounds
- [ ] Meeting scheduling

---

## 🆘 Getting Help

**If You Need to Rebuild/Modify**:

1. Open Terminal
2. Navigate to project: `cd ~/team-video-chat`
3. Files to edit:
   - `index.html` - UI/styling
   - `app.js` - Client logic
   - `server.js` - Server logic
4. Test locally before pushing
5. Commit and push to auto-deploy

**Contact**:
- Check GitHub Issues for common problems
- Review logs in Railway dashboard
- Re-run this conversation with Claude Code for updates

---

**Created**: October 2025
**Last Updated**: October 2025
**Version**: 1.0.0
**Technology**: WebRTC + Socket.IO + Node.js
