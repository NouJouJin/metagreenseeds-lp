/**
 * MetaGreen Seeds - JavaScript
 * 初心者向けプログラムLPのインタラクティブ機能
 */

// ===================================
// ローディング画面の制御
// ===================================
window.addEventListener('load', function() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 500);
});

// ===================================
// パーティクルエフェクトの生成
// ===================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// ===================================
// スクロールアニメーション
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// ヘッダーのスクロール制御
// ===================================
let lastScrollTop = 0;

function initHeaderScroll() {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.getElementById('header');
        
        if (!header) return;
        
        // スクロール方向に応じてヘッダーを表示/非表示
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        // スクロール位置に応じて背景の透明度を調整
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===================================
// FAQ アコーディオン
// ===================================
function initFAQAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // 他のFAQを閉じる
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // クリックしたFAQをトグル
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ===================================
// クイズのインタラクション
// ===================================
function initQuizInteraction() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    const feedbackElement = document.getElementById('quiz-feedback');
    
    if (!quizOptions.length || !feedbackElement) return;

    quizOptions.forEach(button => {
        button.addEventListener('click', function() {
            // 他のボタンの選択状態をリセット
            quizOptions.forEach(btn => btn.style.borderWidth = '2px');

            // クリックしたボタンを強調
            this.style.borderWidth = '4px';

            if (this.textContent === 'NFT') {
                feedbackElement.textContent = '🎉 大正解！これがNFTです！コミュニティでは毎日こんなクイズが出ますよ！';
                feedbackElement.className = 'quiz-feedback correct';
            } else {
                feedbackElement.textContent = '🤔 惜しい！もう一度考えてみよう！';
                feedbackElement.className = 'quiz-feedback incorrect';
            }
        });
    });
}

// ===================================
// スムーススクロール
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// CTAボタンのアニメーション
// ===================================
function initCTAAnimations() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // パルスアニメーション
    setInterval(() => {
        ctaButtons.forEach(btn => {
            btn.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                btn.style.animation = '';
            }, 500);
        });
    }, 5000);
}

// ===================================
// カウントアップアニメーション
// ===================================
function animateValue(element, start, end, duration) {
    if (!element) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + '名以上';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function initMemberCountAnimation() {
    const memberCountElement = document.querySelector('.member-count strong');
    if (!memberCountElement) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(memberCountElement, 0, 1200, 2000);
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(memberCountElement);
}

// ===================================
// ポイントカードのホバーエフェクト
// ===================================
function initActivityAnimations() {
    document.querySelectorAll('.activity-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.activity-icon');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.activity-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
}

// ===================================
// プログレスステップのアニメーション
// ===================================
function initProgressAnimations() {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.style.animationDelay = `${index * 0.2}s`;
        step.style.animation = 'bounceIn 0.6s ease forwards';
    });
}

// ===================================
// 動的スタイルの追加
// ===================================
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .activity-icon {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// コンソールメッセージ
// ===================================
function showConsoleMessage() {
    console.log('%c🌱 MetaGreen Seeds へようこそ！', 'color: #4CAF50; font-size: 20px; font-weight: bold;');
    console.log('%cあなたの成長の種を一緒に育てましょう！', 'color: #2E7D32; font-size: 14px;');
    console.log('%cDiscordで待っています → https://discord.gg/hyw3AkKa8e', 'color: #666; font-size: 12px;');
}

// ===================================
// タイピングエフェクト（オプション）
// ===================================
function typeWriter(element, text, speed = 50) {
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ===================================
// ページロード時のアニメーション初期化
// ===================================
function initPageLoadAnimations() {
    // ヒーローセクションのテキストアニメーション
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 1s ease';
    }
    
    // セクションの遅延表示
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===================================
// モバイルメニュー（将来の拡張用）
// ===================================
function initMobileMenu() {
    // モバイルメニューの実装（必要に応じて追加）
}

// ===================================
// フォーム検証（将来の拡張用）
// ===================================
function initFormValidation() {
    // フォーム検証の実装（必要に応じて追加）
}

// ===================================
// アナリティクストラッキング（将来の拡張用）
// ===================================
function trackEvent(category, action, label) {
    // Google Analytics等のイベントトラッキング
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// ===================================
// メイン初期化関数
// ===================================
function init() {
    // パーティクルエフェクト
    createParticles();
    
    // スクロールアニメーション
    initScrollAnimations();
    
    // ヘッダー制御
    initHeaderScroll();
    
    // FAQアコーディオン
    initFAQAccordion();

     // クイズのインタラクションを追加
    initQuizInteraction(); // ← この行を追加
    
    // スムーススクロール
    initSmoothScroll();
    
    // CTAアニメーション
    initCTAAnimations();
    
    // メンバー数カウントアップ
    initMemberCountAnimation();
    
    // アクティビティアニメーション
    initActivityAnimations();
    
    // プログレスアニメーション
    initProgressAnimations();
    
    // 動的スタイル追加
    addDynamicStyles();
    
    // ページロードアニメーション
    initPageLoadAnimations();
    
    // コンソールメッセージ
    showConsoleMessage();
}

// ===================================
// DOMContentLoaded イベント
// ===================================
document.addEventListener('DOMContentLoaded', init);

// ===================================
// ユーティリティ関数
// ===================================

// デバウンス関数（パフォーマンス最適化用）
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// スロットル関数（パフォーマンス最適化用）
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 要素の存在確認
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

// クッキーの取得
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// クッキーの設定
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// ===================================
// パフォーマンス最適化
// ===================================

// 画像の遅延読み込み
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// エラーハンドリング
// ===================================
window.addEventListener('error', function(e) {
    console.error('エラーが発生しました:', e.message);
    // 本番環境では、エラーログをサーバーに送信する処理を追加
});

// ===================================
// ブラウザ対応チェック
// ===================================
function checkBrowserSupport() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        smoothScroll: 'scrollBehavior' in document.documentElement.style,
        cssGrid: CSS.supports('display', 'grid'),
        customProperties: CSS.supports('--test', '0')
    };

    // 非対応ブラウザへの対処
    if (!features.intersectionObserver) {
        console.warn('IntersectionObserver is not supported. Falling back to scroll events.');
        // フォールバック処理
    }

    return features;
}

// ===================================
// リサイズイベントの最適化
// ===================================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // リサイズ完了後の処理
        handleResize();
    }, 250);
});

function handleResize() {
    // モバイル/デスクトップの切り替え処理など
    const isMobile = window.innerWidth <= 768;
    document.body.classList.toggle('is-mobile', isMobile);
}

// ===================================
// アクセシビリティ機能
// ===================================
function initAccessibility() {
    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        // Escキーでモーダルを閉じる
        if (e.key === 'Escape') {
            closeAllModals();
        }
        
        // Tabキーでのフォーカス管理
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    // マウス使用時はフォーカスリングを非表示
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
}

function closeAllModals() {
    // モーダルを閉じる処理（将来の実装用）
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
}

// ===================================
// プリローダーの追加制御
// ===================================
function preloadAssets() {
    const assets = [
        // 重要な画像のURLを追加
    ];

    assets.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = url;
        document.head.appendChild(link);
    });
}

// ===================================
// 初回訪問者への特別な処理
// ===================================
function handleFirstVisit() {
    if (!getCookie('visited')) {
        // 初回訪問者向けの処理
        setCookie('visited', 'true', 365);
        
        // ウェルカムメッセージなどを表示
        setTimeout(() => {
            console.log('初めてのご訪問ありがとうございます！');
        }, 2000);
    }
}

// ===================================
// 最終初期化
// ===================================
window.addEventListener('load', function() {
    // ブラウザサポートチェック
    checkBrowserSupport();
    
    // アクセシビリティ機能
    initAccessibility();
    
    // 画像の遅延読み込み
    lazyLoadImages();
    
    // アセットのプリロード
    preloadAssets();
    
    // 初回訪問処理
    handleFirstVisit();
    
    // リサイズ処理の初期実行
    handleResize();
});

// ===================================
// エクスポート（モジュール化する場合）
// ===================================

// export { init, animateValue, typeWriter };
