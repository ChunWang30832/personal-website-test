// --- 記事本功能 (使用瀏覽器 localStorage) ---
const noteArea = document.getElementById('note-area');
const localStorageKey = 'personalNoteContent';

// 載入筆記
function loadNote() {
    const savedNote = localStorage.getItem(localStorageKey);
    if (savedNote) {
        noteArea.value = savedNote;
    }
}

// 儲存筆記 (當輸入內容變更時)
noteArea.addEventListener('input', () => {
    localStorage.setItem(localStorageKey, noteArea.value);
});

// 在網頁載入時執行
document.addEventListener('DOMContentLoaded', loadNote);


// --- 番茄鐘功能 ---
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

let interval;
let isRunning = false;
let duration = 25 * 60; // 25分鐘 (秒)

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function updateTimer() {
    duration--;
    timerDisplay.textContent = formatTime(duration);

    if (duration < 0) {
        clearInterval(interval);
        timerDisplay.textContent = "時間到！";
        isRunning = false;
        startBtn.textContent = "開始";
        alert("番茄時間結束！");
        duration = 25 * 60; // 重設時間
    }
}

startBtn.addEventListener('click', () => {
    if (isRunning) {
        // 暫停
        clearInterval(interval);
        isRunning = false;
        startBtn.textContent = "繼續";
    } else {
        // 開始/繼續
        if (duration < 0) duration = 25 * 60; // 確保時間正確
        interval = setInterval(updateTimer, 1000); // 每秒更新
        isRunning = true;
        startBtn.textContent = "暫停";
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
    duration = 25 * 60; // 25分鐘
    timerDisplay.textContent = formatTime(duration);
    startBtn.textContent = "開始";
});

// 初始顯示
timerDisplay.textContent = formatTime(duration);