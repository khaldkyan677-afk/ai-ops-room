// 1. جلب العناصر من HTML
const newTaskInput = document.getElementById('newTaskInput');
const pendingList = document.getElementById('pendingList');
const completedList = document.getElementById('completedList');
const pendingCount = document.getElementById('pendingCount');
const completedCount = document.getElementById('completedCount');
const statusBar = document.getElementById('statusBar');

// 2. مصفوفة المهام (نقرأها من ذاكرة المتصفح، أو نبدأ بمصفوفة فارغة)
let tasks = JSON.parse(localStorage.getItem('ops_tasks')) || [];

// 3. دالة عرض المهام على الشاشة
function renderTasks() {
    // تنظيف القوائم قبل إعادة رسمها
    pendingList.innerHTML = '';
    completedList.innerHTML = '';
    
    let pending = 0;
    let completed = 0;

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';
        taskDiv.style.cssText = 'background: #2d2d2d; padding: 10px; border-radius: 6px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;';
        
        if (!task.done) {
            // مهمة معلقة
            pending++;
            taskDiv.innerHTML = `<span>${task.text}</span> <button onclick="completeTask(${index})" style="background: var(--success); padding: 4px 8px; font-size: 0.8rem;">✅</button>`;
            pendingList.appendChild(taskDiv);
        } else {
            // مهمة منجزة
            completed++;
            taskDiv.innerHTML = `<span style="text-decoration: line-through; color: #888;">${task.text}</span> <button onclick="deleteTask(${index})" style="background: var(--danger); padding: 4px 8px; font-size: 0.8rem;">🗑️</button>`;
            completedList.appendChild(taskDiv);
        }
    });

    // تحديث العدادات
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
    statusBar.textContent = `⏳ ${pending} معلقة | ✅ ${completed} منجزة | 💾 آخر حفظ: الآن`;
}

// 4. دالة حفظ المهام في ذاكرة المتصفح
function saveTasks() {
    localStorage.setItem('ops_tasks', JSON.stringify(tasks));
    renderTasks();
}

// 5. إضافة مهمة جديدة عند الضغط على Enter
newTaskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && newTaskInput.value.trim() !== '') {
        tasks.push({ text: newTaskInput.value.trim(), done: false });
        newTaskInput.value = '';
        saveTasks();
    }
});

// 6. تحويل المهمة إلى منجزة (يتم استدعاؤها من زر ✅)
window.completeTask = function(index) {
    tasks[index].done = true;
    saveTasks();
};

// 7. حذف المهمة (يتم استدعاؤها من زر 🗑️)
window.deleteTask = function(index) {
    tasks.splice(index, 1);
    saveTasks();
};

// 8. تشغيل العرض عند فتح الصفحة لأول مرة
renderTasks();

// ==========================================
// 9. تفعيل المعاينة (Iframe)
// ==========================================
const previewUrlInput = document.getElementById('previewUrlInput');
const previewFrame = document.getElementById('previewFrame');
const openNewTabBtn = document.getElementById('openNewTabBtn');

previewUrlInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && previewUrlInput.value.trim() !== '') {
        previewFrame.src = previewUrlInput.value.trim();
    }
});

openNewTabBtn.addEventListener('click', function() {
    if (previewUrlInput.value.trim() !== '') {
        window.open(previewUrlInput.value.trim(), '_blank');
    }
});

// ==========================================
// 10. أزرار النسخ (Clipboard)
// ==========================================
const copyErrorBtn = document.getElementById('copyErrorBtn');
const errorBox = document.getElementById('errorBox');
const copyAiBtn = document.getElementById('copyAiBtn');
const deepseekBox = document.getElementById('deepseekBox');
const openAiBtn = document.getElementById('openAiBtn');

// دالة مساعدة للنسخ
function copyToClipboard(text) {
    if (text.trim() === '') return;
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ تم النسخ بنجاح!'); // تنبيه بسيط للمستخدم
    });
}

copyErrorBtn.addEventListener('click', () => {
    copyToClipboard(errorBox.value);
});

copyAiBtn.addEventListener('click', () => {
    copyToClipboard(deepseekBox.value);
});

openAiBtn.addEventListener('click', () => {
    window.open('https://chat.deepseek.com', '_blank');
});
