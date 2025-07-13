import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Member } from '@/lib/services/membersService';

interface VolunteerModalProps {
  volunteer: Member | null;
  isOpen: boolean;
  onClose: () => void;
}

const VolunteerModal: React.FC<VolunteerModalProps> = ({ volunteer, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup când componenta se unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !volunteer) {
    return null;
  }

  const modalContent = (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-backdrop {
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          animation: slideIn 0.3s ease;
        }
      `}</style>
      
      <div
        className="modal-backdrop fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4"
        onClick={handleBackdropClick}
      >
        <div className="modal-content bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
              aria-label="Închide modalul"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="overflow-hidden rounded-t-2xl">
              <img
                src={volunteer.imageUrl}
                alt={volunteer.name}
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                {volunteer.name}
              </h2>
              <p className="text-xl text-[#09a252] font-medium mb-6">
                {volunteer.position}
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#09a252] mb-2">Despre</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {volunteer.description}
                  </p>
                </div>

                {volunteer.specializations && volunteer.specializations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#09a252] mb-3">Specializări</h3>
                    <div className="flex flex-wrap gap-2">
                      {volunteer.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {volunteer.education && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#09a252] mb-2">Educație</h3>
                    <p className="text-gray-700">{volunteer.education}</p>
                  </div>
                )}

                {volunteer.experience && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#09a252] mb-2">Experiență</h3>
                    <p className="text-gray-700">{volunteer.experience}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Folosim portal pentru a randa modalul la nivelul document.body
  return typeof window !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
};

export default VolunteerModal;