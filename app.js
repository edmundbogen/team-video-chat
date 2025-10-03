// WebRTC Video Chat Application
let localStream;
let remoteStream;
let peerConnection;
let dataChannel;
let screenStream;
let userName = '';
let roomId = '';
let socket;
let remotePeerId = null;

// WebRTC Configuration
const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
    ]
};

// Initialize Socket.IO
socket = io();

// DOM Elements
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const screenVideo = document.getElementById('screenVideo');
const micBtn = document.getElementById('micBtn');
const videoBtn = document.getElementById('videoBtn');
const shareScreenBtn = document.getElementById('shareScreenBtn');
const whiteboardBtn = document.getElementById('whiteboardBtn');
const endCallBtn = document.getElementById('endCallBtn');
const joinModal = document.getElementById('joinModal');
const joinBtn = document.getElementById('joinBtn');
const userNameInput = document.getElementById('userName');
const roomIdInput = document.getElementById('roomId');
const roomCodeDisplay = document.getElementById('roomCode');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const whiteboardPanel = document.getElementById('whiteboardPanel');
const screenShareContainer = document.getElementById('screenShareContainer');
const stopScreenShareBtn = document.getElementById('stopScreenShareBtn');

// Whiteboard Elements
const whiteboardCanvas = document.getElementById('whiteboardCanvas');
const ctx = whiteboardCanvas.getContext('2d');
const closeWhiteboardBtn = document.getElementById('closeWhiteboardBtn');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvas = document.getElementById('clearCanvas');

// Whiteboard Variables
let drawing = false;
let currentTool = 'pen';
let currentColor = '#000000';
let currentBrushSize = 3;

// Initialize whiteboard canvas
function initWhiteboard() {
    whiteboardCanvas.width = whiteboardPanel.offsetWidth - 30;
    whiteboardCanvas.height = whiteboardPanel.offsetHeight - 150;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}

// Join/Create Room
joinBtn.addEventListener('click', async () => {
    userName = userNameInput.value.trim() || 'Anonymous';
    roomId = roomIdInput.value.trim() || generateRoomId();

    roomCodeDisplay.textContent = roomId;
    joinModal.classList.remove('active');

    await startLocalStream();

    // Join room via signaling server
    socket.emit('join-room', roomId, userName);

    updateStatus('waiting', 'Waiting for peer...');
});

// Generate random room ID
function generateRoomId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Start local media stream
async function startLocalStream() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        localVideo.srcObject = localStream;
    } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('Could not access camera/microphone. Please check permissions.');
    }
}

// Setup WebRTC peer connection
function setupWebRTC() {
    peerConnection = new RTCPeerConnection(configuration);

    // Add local stream tracks to peer connection
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // Handle incoming tracks
    peerConnection.ontrack = event => {
        if (!remoteStream) {
            remoteStream = new MediaStream();
            remoteVideo.srcObject = remoteStream;
        }
        remoteStream.addTrack(event.track);
    };

    // Handle ICE candidates
    peerConnection.onicecandidate = event => {
        if (event.candidate && remotePeerId) {
            socket.emit('ice-candidate', {
                target: remotePeerId,
                candidate: event.candidate
            });
        }
    };

    // Setup data channel for whiteboard
    dataChannel = peerConnection.createDataChannel('whiteboard');
    dataChannel.onmessage = handleDataChannelMessage;

    peerConnection.ondatachannel = event => {
        dataChannel = event.channel;
        dataChannel.onmessage = handleDataChannelMessage;
    };

    // Connection state changes
    peerConnection.onconnectionstatechange = () => {
        console.log('Connection state:', peerConnection.connectionState);
        if (peerConnection.connectionState === 'connected') {
            updateStatus('connected', 'Connected');
        } else if (peerConnection.connectionState === 'disconnected') {
            updateStatus('disconnected', 'Disconnected');
        }
    };
}

// Microphone control
micBtn.addEventListener('click', () => {
    const audioTrack = localStream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;

    if (audioTrack.enabled) {
        micBtn.textContent = '🎤 Mute';
        micBtn.classList.add('active');
        micBtn.classList.remove('inactive');
    } else {
        micBtn.textContent = '🎤 Unmute';
        micBtn.classList.remove('active');
        micBtn.classList.add('inactive');
    }
});

// Video control
videoBtn.addEventListener('click', () => {
    const videoTrack = localStream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;

    if (videoTrack.enabled) {
        videoBtn.textContent = '📹 Stop Video';
        videoBtn.classList.add('active');
        videoBtn.classList.remove('inactive');
    } else {
        videoBtn.textContent = '📹 Start Video';
        videoBtn.classList.remove('active');
        videoBtn.classList.add('inactive');
    }
});

// Screen sharing
shareScreenBtn.addEventListener('click', async () => {
    try {
        screenStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false
        });

        screenVideo.srcObject = screenStream;
        screenShareContainer.classList.add('active');
        shareScreenBtn.classList.add('inactive');
        shareScreenBtn.textContent = '🖥️ Sharing...';

        // Replace video track with screen share
        const screenTrack = screenStream.getVideoTracks()[0];
        const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
        if (sender) {
            sender.replaceTrack(screenTrack);
        }

        // Handle screen share stop
        screenTrack.onended = () => {
            stopScreenShare();
        };
    } catch (error) {
        console.error('Error sharing screen:', error);
    }
});

stopScreenShareBtn.addEventListener('click', stopScreenShare);

function stopScreenShare() {
    if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
        screenStream = null;
        screenShareContainer.classList.remove('active');
        shareScreenBtn.classList.remove('inactive');
        shareScreenBtn.textContent = '🖥️ Share Screen';

        // Restore video track
        const videoTrack = localStream.getVideoTracks()[0];
        const sender = peerConnection.getSenders().find(s => s.track.kind === 'video');
        if (sender) {
            sender.replaceTrack(videoTrack);
        }
    }
}

// Whiteboard toggle
whiteboardBtn.addEventListener('click', () => {
    whiteboardPanel.classList.toggle('active');
    if (whiteboardPanel.classList.contains('active')) {
        initWhiteboard();
    }
});

closeWhiteboardBtn.addEventListener('click', () => {
    whiteboardPanel.classList.remove('active');
});

// Whiteboard drawing
whiteboardCanvas.addEventListener('mousedown', startDrawing);
whiteboardCanvas.addEventListener('mousemove', draw);
whiteboardCanvas.addEventListener('mouseup', stopDrawing);
whiteboardCanvas.addEventListener('mouseout', stopDrawing);

// Touch support
whiteboardCanvas.addEventListener('touchstart', handleTouchStart);
whiteboardCanvas.addEventListener('touchmove', handleTouchMove);
whiteboardCanvas.addEventListener('touchend', stopDrawing);

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = whiteboardCanvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    startDrawing({ offsetX: x, offsetY: y });
}

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = whiteboardCanvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    draw({ offsetX: x, offsetY: y });
}

function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    if (!drawing) return;

    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor;
    ctx.lineWidth = currentBrushSize;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    // Send drawing data to peer via socket
    const drawData = {
        type: 'draw',
        x: e.offsetX,
        y: e.offsetY,
        color: ctx.strokeStyle,
        size: ctx.lineWidth,
        tool: currentTool
    };

    if (dataChannel && dataChannel.readyState === 'open') {
        dataChannel.send(JSON.stringify(drawData));
    } else {
        socket.emit('whiteboard-data', drawData);
    }
}

function stopDrawing() {
    drawing = false;
}

// Whiteboard tools
document.querySelectorAll('[data-tool]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-tool]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTool = btn.dataset.tool;
    });
});

colorPicker.addEventListener('change', (e) => {
    currentColor = e.target.value;
});

brushSize.addEventListener('input', (e) => {
    currentBrushSize = e.target.value;
});

clearCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, whiteboardCanvas.width, whiteboardCanvas.height);
    const clearData = { type: 'clear' };

    if (dataChannel && dataChannel.readyState === 'open') {
        dataChannel.send(JSON.stringify(clearData));
    } else {
        socket.emit('whiteboard-data', clearData);
    }
});

// Handle data channel messages
function handleDataChannelMessage(event) {
    const data = JSON.parse(event.data);

    if (data.type === 'draw') {
        ctx.strokeStyle = data.color;
        ctx.lineWidth = data.size;
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
    } else if (data.type === 'clear') {
        ctx.clearRect(0, 0, whiteboardCanvas.width, whiteboardCanvas.height);
    }
}

// End call
endCallBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to end the call?')) {
        endCall();
    }
});

function endCall() {
    // Stop all tracks
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }
    if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
    }

    // Close peer connection
    if (peerConnection) {
        peerConnection.close();
    }

    // Reset UI
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    screenVideo.srcObject = null;
    screenShareContainer.classList.remove('active');
    whiteboardPanel.classList.remove('active');

    updateStatus('disconnected', 'Disconnected');
    joinModal.classList.add('active');
    roomIdInput.value = '';
}

// Update connection status
function updateStatus(status, text) {
    statusDot.className = 'status-dot';
    if (status === 'connected') {
        statusDot.classList.add('connected');
    }
    statusText.textContent = text;
}

// Handle window resize for whiteboard
window.addEventListener('resize', () => {
    if (whiteboardPanel.classList.contains('active')) {
        initWhiteboard();
    }
});

// Socket.IO event handlers
socket.on('user-joined', async (data) => {
    console.log('User joined:', data.userName);
    remotePeerId = data.userId;

    // Create offer for the new user
    setupWebRTC();
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit('offer', {
        target: remotePeerId,
        offer: offer
    });

    updateStatus('connected', `Connected to ${data.userName}`);
});

socket.on('existing-users', async (users) => {
    if (users.length > 0) {
        remotePeerId = users[0];
        setupWebRTC();
    }
});

socket.on('offer', async (data) => {
    console.log('Received offer');
    remotePeerId = data.sender;

    if (!peerConnection) {
        setupWebRTC();
    }

    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit('answer', {
        target: remotePeerId,
        answer: answer
    });

    updateStatus('connected', 'Connected');
});

socket.on('answer', async (data) => {
    console.log('Received answer');
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    updateStatus('connected', 'Connected');
});

socket.on('ice-candidate', async (data) => {
    console.log('Received ICE candidate');
    try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    } catch (error) {
        console.error('Error adding ICE candidate:', error);
    }
});

socket.on('user-left', (data) => {
    console.log('User left:', data.userName);
    updateStatus('disconnected', 'Peer disconnected');
    remotePeerId = null;

    if (remoteStream) {
        remoteStream.getTracks().forEach(track => track.stop());
        remoteVideo.srcObject = null;
    }
});

socket.on('whiteboard-data', (data) => {
    handleDataChannelMessage({ data: JSON.stringify(data) });
});

console.log('Team Video Chat App Initialized');
console.log('🚀 Connected to signaling server');
