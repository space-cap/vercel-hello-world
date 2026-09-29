document.addEventListener('DOMContentLoaded', () => {
  // Modal Elements
  const modal = document.getElementById('download-modal');
  const modalEmailDesc = document.getElementById('modal-email-desc');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDownloadTrigger = document.getElementById('modal-download-trigger');

  function openModal(email) {
    if (modalEmailDesc) {
      modalEmailDesc.innerHTML = `<strong>${escapeHtml(email)}</strong>(으)로 <strong>[VibeMVP_프롬프트_가이드북.pdf]</strong> 다운로드 링크를 전송했습니다.`;
    }
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function escapeHtml(string) {
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Handle Form 1
  const form1 = document.getElementById('lead-form');
  const emailInput1 = document.getElementById('lead-email');

  if (form1) {
    form1.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput1.value.trim();
      if (!email) return;

      saveLead(email);
      openModal(email);
      emailInput1.value = '';
    });
  }

  // Handle Form 2 (Bottom CTA)
  const form2 = document.getElementById('lead-form-2');
  const emailInput2 = document.getElementById('lead-email-2');

  if (form2) {
    form2.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput2.value.trim();
      if (!email) return;

      saveLead(email);
      openModal(email);
      emailInput2.value = '';
    });
  }

  // Save to LocalStorage for offline/demo testing
  function saveLead(email) {
    try {
      const existing = JSON.parse(localStorage.getItem('vibemvp_leads') || '[]');
      existing.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('vibemvp_leads', JSON.stringify(existing));
      console.log('Lead captured successfully:', email);
    } catch (e) {
      console.warn('Storage error: ', e);
    }
  }

  // Close handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalDownloadTrigger) {
    modalDownloadTrigger.addEventListener('click', () => {
      alert('가이드북 샘플 파일 다운로드가 시작되었습니다!');
      closeModal();
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
