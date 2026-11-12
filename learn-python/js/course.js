
/* =========================================
   SWYPYY.PY
   Course Progress System
========================================= */

"use strict";

const COURSE_CONFIG = {
    totalModules: 8,
    totalLessons: 86,

    moduleLessons: {
        1: 8,
        2: 10,
        3: 10,
        4: 11,
        5: 11,
        6: 12,
        7: 14,
        8: 10
    },

    storageKey: "swypyy_python_course_progress"
};


/* =========================================
   STORAGE
========================================= */

function getCourseProgress() {
    try {
        const saved = localStorage.getItem(COURSE_CONFIG.storageKey);

        if (!saved) {
            return {};
        }

        const parsed = JSON.parse(saved);

        return parsed && typeof parsed === "object" && !Array.isArray(parsed)
            ? parsed
            : {};

    } catch (error) {
        console.error("Could not load course progress:", error);
        return {};
    }
}


function saveCourseProgress(progress) {
    try {
        localStorage.setItem(
            COURSE_CONFIG.storageKey,
            JSON.stringify(progress)
        );

        return true;

    } catch (error) {
        console.error("Could not save course progress:", error);
        return false;
    }
}


/* =========================================
   LESSON COMPLETION
========================================= */

function isLessonCompleted(moduleNumber, lessonNumber) {
    const progress = getCourseProgress();
    const moduleKey = `module-${moduleNumber}`;

    return Array.isArray(progress[moduleKey]) &&
        progress[moduleKey].includes(Number(lessonNumber));
}


function markLessonCompleted(moduleNumber, lessonNumber) {
    const module = Number(moduleNumber);
    const lesson = Number(lessonNumber);

    if (
        !Number.isInteger(module) ||
        !Number.isInteger(lesson) ||
        !COURSE_CONFIG.moduleLessons[module] ||
        lesson < 1 ||
        lesson > COURSE_CONFIG.moduleLessons[module]
    ) {
        console.error("Invalid module or lesson number.");
        return false;
    }

    const progress = getCourseProgress();
    const moduleKey = `module-${module}`;

    if (!Array.isArray(progress[moduleKey])) {
        progress[moduleKey] = [];
    }

    if (!progress[moduleKey].includes(lesson)) {
        progress[moduleKey].push(lesson);
        progress[moduleKey].sort((a, b) => a - b);
    }

    const saved = saveCourseProgress(progress);

    if (saved) {
        updateCourseProgress();
    }

    return saved;
}


function unmarkLessonCompleted(moduleNumber, lessonNumber) {
    const progress = getCourseProgress();
    const moduleKey = `module-${moduleNumber}`;

    if (!Array.isArray(progress[moduleKey])) {
        return;
    }

    progress[moduleKey] = progress[moduleKey].filter(
        number => number !== Number(lessonNumber)
    );

    saveCourseProgress(progress);
    updateCourseProgress();
}


/* =========================================
   COURSE STATISTICS
========================================= */

function getCompletedLessonCount() {
    const progress = getCourseProgress();

    let completed = 0;

    for (let module = 1; module <= COURSE_CONFIG.totalModules; module++) {
        const moduleKey = `module-${module}`;
        const lessons = Array.isArray(progress[moduleKey])
            ? progress[moduleKey]
            : [];

        const validLessons = new Set(
            lessons.filter(number =>
                Number.isInteger(number) &&
                number >= 1 &&
                number <= COURSE_CONFIG.moduleLessons[module]
            )
        );

        completed += validLessons.size;
    }

    return completed;
}


function getModuleCompletedCount(moduleNumber) {
    const progress = getCourseProgress();
    const moduleKey = `module-${moduleNumber}`;

    const lessons = Array.isArray(progress[moduleKey])
        ? progress[moduleKey]
        : [];

    const validLessons = new Set(
        lessons.filter(number =>
            Number.isInteger(number) &&
            number >= 1 &&
            number <= COURSE_CONFIG.moduleLessons[moduleNumber]
        )
    );

    return validLessons.size;
}


/* =========================================
   UPDATE MAIN PROGRESS
========================================= */

function updateCourseProgress() {
    const completed = getCompletedLessonCount();

    const percentage = Math.round(
        (completed / COURSE_CONFIG.totalLessons) * 100
    );

    const percentageElement = document.getElementById(
        "progress-percentage"
    );

    const completedElement = document.getElementById(
        "completed-count"
    );

    const progressBar = document.getElementById(
        "course-progress-bar"
    );

    const messageElement = document.getElementById(
        "progress-message"
    );

    if (percentageElement) {
        percentageElement.textContent = `${percentage}%`;
    }

    if (completedElement) {
        completedElement.textContent = completed;
    }

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }

    if (messageElement) {
        if (completed === 0) {
            messageElement.textContent = "Your journey starts here.";
        } else if (completed === COURSE_CONFIG.totalLessons) {
            messageElement.textContent = "You completed the entire course!";
        } else {
            messageElement.textContent = "Keep learning. You're making progress!";
        }
    }

    updateModuleProgress();

    return {
        completed,
        total: COURSE_CONFIG.totalLessons,
        percentage
    };
}


/* =========================================
   UPDATE MODULE PROGRESS
========================================= */

function updateModuleProgress() {
    for (
        let module = 1;
        module <= COURSE_CONFIG.totalModules;
        module++
    ) {
        const completed = getModuleCompletedCount(module);
        const total = COURSE_CONFIG.moduleLessons[module];

        const percentage = Math.round(
            (completed / total) * 100
        );

        const progressBar = document.querySelector(
            `[data-module-progress="${module}"]`
        );

        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    }
}


/* =========================================
   MODULE INFORMATION
========================================= */

function getModuleProgress(moduleNumber) {
    const total = COURSE_CONFIG.moduleLessons[moduleNumber];

    if (!total) {
        return null;
    }

    const completed = getModuleCompletedCount(moduleNumber);

    return {
        module: Number(moduleNumber),
        completed,
        total,
        percentage: Math.round((completed / total) * 100)
    };
}


/* =========================================
   INITIALISE COURSE
========================================= */

function initialiseCourse() {
    updateCourseProgress();

    console.log("Swypyy.py course progress loaded.");
}


/* =========================================
   START
========================================= */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initialiseCourse
    );
} else {
    initialiseCourse();
}


/* =========================================
   PUBLIC COURSE API
========================================= */

window.SwypyyCourse = Object.freeze({
    getProgress: getCourseProgress,
    saveProgress: saveCourseProgress,

    isLessonCompleted,
    markLessonCompleted,
    unmarkLessonCompleted,

    getCompletedLessonCount,
    getModuleCompletedCount,
    getModuleProgress,

    updateCourseProgress
});
      
