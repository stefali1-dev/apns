import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { membersService, Member } from '@/lib/services/membersService';
import VolunteerCard from './VolunteerCard';
import VolunteerModal from './VolunteerModal';

const VolunteerCarousel: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Member[]>([]);
  const [currentVolunteerIndex, setCurrentVolunteerIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Member | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const data = await membersService.getMembers();
        // Afișăm toți membrii în carousel
        setVolunteers(data);
      } catch (error) {
        console.error('Eroare la încărcarea voluntarilor:', error);
      }
    };

    fetchVolunteers();

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const volunteersPerPage = isMobile ? 1 : 4;
  const totalPages = Math.ceil(volunteers.length / volunteersPerPage);
  const maxVolunteerIndex = Math.max(totalPages - 1, 0);

  const nextVolunteer = () => {
    setCurrentVolunteerIndex(Math.min(currentVolunteerIndex + 1, maxVolunteerIndex));
  };

  const prevVolunteer = () => {
    setCurrentVolunteerIndex(Math.max(currentVolunteerIndex - 1, 0));
  };

  const handleCardClick = (volunteer: Member) => {
    setSelectedVolunteer(volunteer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVolunteer(null);
  };

  return (
    <>
      <section className="bg-green-50 py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Echipa Noastră
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center space-x-4">
                <span className="h-px w-12 bg-green-300"></span>
                <span className="text-[#09a252] font-medium">Oamenii din spatele misiunii</span>
                <span className="h-px w-12 bg-green-300"></span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden -mx-3">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentVolunteerIndex * 100}%)`,
                }}
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0 flex">
                    {volunteers
                      .slice(pageIndex * volunteersPerPage, (pageIndex + 1) * volunteersPerPage)
                      .map((volunteer) => (
                        <div
                          key={volunteer.id}
                          className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-1/4 px-2'}`}
                        >
                          <VolunteerCard
                            member={volunteer}
                            onClick={handleCardClick}
                          />
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

              {/* Navigation Arrows */}
              {volunteers.length > volunteersPerPage && (
                <>
                  <button
                    onClick={prevVolunteer}
                    className={`absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-20 ${currentVolunteerIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
                      }`}
                    disabled={currentVolunteerIndex === 0}
                    style={{ marginTop: '-60px' }}
                  >
                    <svg className="w-6 h-6 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={nextVolunteer}
                    className={`absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-20 ${currentVolunteerIndex >= maxVolunteerIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white'
                      }`}
                    disabled={currentVolunteerIndex >= maxVolunteerIndex}
                    style={{ marginTop: '-60px' }}
                  >
                    <svg className="w-6 h-6 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {volunteers.length > volunteersPerPage && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVolunteerIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentVolunteerIndex
                        ? 'bg-[#09a252] w-6'
                        : 'bg-green-200 hover:bg-green-300'
                        }`}
                    />
                  ))}
                </div>
              )}

              {/* View All Team Button */}
              <div className="text-center mt-12">
                <Link
                  href="/team"
                  className="bg-[#09a252] text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-200 inline-flex items-center"
                >
                  Vezi toată echipa
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
        </div>
      </section>

      {/* Volunteer Modal */}
      <VolunteerModal
        volunteer={selectedVolunteer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default VolunteerCarousel;