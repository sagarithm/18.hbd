"use client";

import React, { useEffect } from "react";

interface EraPageClientProps {
  content: string;
}

export default function EraPageClient({ content }: EraPageClientProps) {
  useEffect(() => {
    // 1. Day / Night Switcher Logic
    const dayBtn = document.querySelector('[data-tab-trigger="day"]');
    const nightBtn = document.querySelector('[data-tab-trigger="night"]');
    const dayContent = document.querySelector('[data-tab-content="day"]');
    const nightContent = document.querySelector('[data-tab-content="night"]');
    const divider = document.querySelector(".hero-s_tabs_divider");

    const setDay = () => {
      dayBtn?.classList.add("is-active");
      nightBtn?.classList.remove("is-active");
      if (divider) {
        divider.classList.remove("is-night");
        divider.classList.add("is-day");
      }
      if (dayContent && nightContent) {
        (dayContent as HTMLElement).style.display = "block";
        (dayContent as HTMLElement).style.opacity = "1";
        (nightContent as HTMLElement).style.opacity = "0";
        setTimeout(() => {
          (nightContent as HTMLElement).style.display = "none";
        }, 500);
      }
    };

    const setNight = () => {
      nightBtn?.classList.add("is-active");
      dayBtn?.classList.remove("is-active");
      if (divider) {
        divider.classList.remove("is-day");
        divider.classList.add("is-night");
      }
      if (dayContent && nightContent) {
        (nightContent as HTMLElement).style.display = "block";
        (nightContent as HTMLElement).style.opacity = "1";
        (dayContent as HTMLElement).style.opacity = "0";
        setTimeout(() => {
          (dayContent as HTMLElement).style.display = "none";
        }, 500);
      }
    };

    dayBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      setDay();
    });

    nightBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      setNight();
    });

    // 2. Book a call modal
    const bookBtns = document.querySelectorAll('[data-modal-cta-btn="book-a-call"]');
    const bookModal = document.querySelector('[data-modal-cta="book-a-call"]') as HTMLElement;
    const modalContainer = bookModal?.querySelector("[data-modal-container]") as HTMLElement;
    const modalOverlay = bookModal?.querySelector("[data-modal-over]") as HTMLElement;
    const closeBtns = bookModal?.querySelectorAll("[data-modal-close]");

    const openModal = () => {
      if (bookModal) {
        bookModal.style.display = "block";
        if (modalOverlay) modalOverlay.style.opacity = "1";
        if (modalContainer) {
          modalContainer.style.transform = "scale(1)";
          modalContainer.style.opacity = "1";
        }
      }
    };

    const closeModal = () => {
      if (bookModal) {
        if (modalOverlay) modalOverlay.style.opacity = "0";
        if (modalContainer) {
          modalContainer.style.transform = "scale(0.95)";
          modalContainer.style.opacity = "0";
        }
        setTimeout(() => {
          bookModal.style.display = "none";
        }, 300);
      }
    };

    bookBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    });

    closeBtns?.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
      });
    });

    modalOverlay?.addEventListener("click", closeModal);

    // Escape key listener for modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);

    // 3. Scroll Progress Indicator (00 - 10)
    const progressBar = document.querySelector("[data-s-bar]") as HTMLElement;
    const progressLabel = document.querySelector("[data-s-bar-label]");

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      const percent = Math.min(100, Math.max(0, Math.round(progress * 100)));
      if (progressBar) {
        progressBar.style.setProperty("--progress", `${percent}%`);
      }
      if (progressLabel) {
        const step = Math.min(10, Math.floor(progress * 11));
        progressLabel.textContent = String(step).padStart(2, "0");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 4. Hotspot Radar Pins Tooltips
    const pinItems = document.querySelectorAll(".pins-cms_list_item");
    pinItems.forEach((pin) => {
      pin.addEventListener("mouseenter", () => {
        const tipId = pin.getAttribute("floating-tip-trigger");
        if (tipId) {
          const tip = document.querySelector(`.floating-tip[data-floating-tip="${tipId}"]`);
          tip?.classList.add("is-active");
        }
      });
      pin.addEventListener("mouseleave", () => {
        const tipId = pin.getAttribute("floating-tip-trigger");
        if (tipId) {
          const tip = document.querySelector(`.floating-tip[data-floating-tip="${tipId}"]`);
          tip?.classList.remove("is-active");
        }
      });
    });

    // 5. Form submission feedback
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('input[type="submit"], button[type="submit"], [data-form-btn]');
        if (submitBtn) {
          submitBtn.textContent = "Thank you! We will reach out shortly.";
        }
        alert("Thank you for your interest in ERA Residence. Our sales concierge will contact you within 24 hours.");
        closeModal();
      });
    });

    // Clean up preloader display if already animated
    setTimeout(() => {
      const masterPreloader = document.querySelector("[data-master-preloader]");
      if (masterPreloader) (masterPreloader as HTMLElement).style.display = "none";
    }, 1500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      data-barba="wrapper"
      className="transition-wrapper"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
