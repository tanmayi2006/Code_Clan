import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Youtube, Music, Podcast, Users, Calendar, ExternalLink, Filter } from 'lucide-react';

// Types
interface Show {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: ('music' | 'stories' | 'events' | 'alumni')[];
  links: {
    youtube?: string;
    spotify?: string;
  };
}

const shows: Show[] = [
  {
    id: 1,
    title: "Music Night 2023",
    description: "An unforgettable evening of live performances featuring emerging artists",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200",
    tags: ['music', 'events'],
    links: {
      youtube: "#",
      spotify: "#"
    }
  },
  {
    id: 2,
    title: "Alumni Stories",
    description: "Inspiring journeys and success stories from our distinguished alumni",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1200",
    tags: ['stories', 'alumni'],
    links: {
      youtube: "#",
      spotify: "#"
    }
  },
  {
    id: 3,
    title: "Summer Festival 2023",
    description: "A celebration of music, art, and culture under the summer sky",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200",
    tags: ['music', 'events'],
    links: {
      youtube: "#"
    }
  }
];

const recommendations = [
  {
    id: 1,
    title: "Jazz Night Special",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1200",
    category: "music",
    links: {
      youtube: "#",
      spotify: "#"
    }
  },
  {
    id: 2,
    title: "Tech Talks 2023",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1200",
    category: "events",
    links: {
      youtube: "#"
    }
  },
  {
    id: 3,
    title: "Alumni Podcast",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=1200",
    category: "stories",
    links: {
      spotify: "#"
    }
  }
];

const categories = ['all', 'music', 'stories', 'events', 'alumni'] as const;

const TagIcon = ({ tag }: { tag: string }) => {
  switch (tag) {
    case 'music':
      return <Music className="w-4 h-4" />;
    case 'stories':
      return <Podcast className="w-4 h-4" />;
    case 'events':
      return <Calendar className="w-4 h-4" />;
    case 'alumni':
      return <Users className="w-4 h-4" />;
    default:
      return null;
  }
};

function Past() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('all');

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % shows.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + shows.length) % shows.length);
  };

  const filteredShows = shows.filter(show => 
    selectedCategory === 'all' || show.tags.includes(selectedCategory as any)
  );

  const filteredRecommendations = recommendations.filter(item =>
    selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #0A0A1A, #0D152C)' }}>
      {/* Category Filters */}
      <div className="bg-[#0D152C]/30 backdrop-blur-sm shadow-lg sticky top-0 z-10 border-b border-[#0D1729]/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-[#28D3D1]" />
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-[#28D3D1] text-[#0A0A1A] shadow-md shadow-[#28D3D1]/20'
                      : 'bg-[#0D1729]/50 text-[#28D3D1] hover:bg-[#0D1729]/60 hover:text-[#28D3D1]'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Past Shows Carousel */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-[#28D3D1]">Past Shows</h2>
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {filteredShows.map((show) => (
                <div key={show.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-[#0D152C]/40 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-[#0D1729]/20">
                    <div className="relative h-64">
                      <img 
                        src={show.image} 
                        alt={show.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D152C]/80 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-[#28D3D1]">{show.title}</h3>
                      <p className="text-[#28D3D1] mb-4">{show.description}</p>
                      <div className="flex gap-2 mb-4">
                        {show.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-[#0D1729]/60 text-[#28D3D1]"
                          >
                            <TagIcon tag={tag} />
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {show.links.youtube && (
                          <a 
                            href={show.links.youtube}
                            className="flex items-center gap-2 px-4 py-2 bg-[#28D3D1] text-[#0A0A1A] rounded-lg hover:bg-[#28D3D1]/80 transition-colors shadow-md hover:shadow-lg"
                          >
                            <Youtube className="w-4 h-4" />
                            Watch
                          </a>
                        )}
                        {show.links.spotify && (
                          <a 
                            href={show.links.spotify}
                            className="flex items-center gap-2 px-4 py-2 bg-[#0D1729] text-[#28D3D1] rounded-lg hover:bg-[#0D1729]/80 transition-colors shadow-md hover:shadow-lg"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Listen
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredShows.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#0D1729]/60 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-[#0D1729]/80 transition-colors text-[#28D3D1]"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#0D1729]/60 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-[#0D1729]/80 transition-colors text-[#28D3D1]"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="flex justify-center gap-2 mt-4">
                {filteredShows.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-[#28D3D1]' : 'bg-[#0D1729]/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-[#28D3D1]">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecommendations.map((item) => (
            <div key={item.id} className="bg-[#0D152C]/40 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-[#0D1729]/20 group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D152C]/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#28D3D1]">{item.title}</h3>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-[#0D1729]/60 text-[#28D3D1] mb-4">
                  <TagIcon tag={item.category} />
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </span>
                <div className="flex gap-3">
                  {item.links.youtube && (
                    <a 
                      href={item.links.youtube}
                      className="flex items-center gap-2 px-4 py-2 bg-[#28D3D1] text-[#0A0A1A] rounded-lg hover:bg-[#28D3D1]/80 transition-colors shadow-md hover:shadow-lg"
                    >
                      <Youtube className="w-4 h-4" />
                      Watch
                    </a>
                  )}
                  {item.links.spotify && (
                    <a 
                      href={item.links.spotify}
                      className="flex items-center gap-2 px-4 py-2 bg-[#0D1729] text-[#28D3D1] rounded-lg hover:bg-[#0D1729]/80 transition-colors shadow-md hover:shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Listen
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Past;
