import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { BlogData } from '../firebase/config';
import { subscribeToBlogs, incrementBlogViewCount } from '../firebase/config';
import './BlogsSection.css';

const BlogsSection: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Sample blog images for Apollo-style design
  const blogImages = [
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  // Subscribe to published blogs
  useEffect(() => {
    const unsubscribe = subscribeToBlogs((blogsData) => {
      // Filter only published blogs and sort by publish date
      const publishedBlogs = blogsData
        .filter(blog => blog.status === 'published')
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

      setBlogs(publishedBlogs);
      setLoading(false);
    }, 'published');

    return () => unsubscribe();
  }, []);

  // Handle blog click
  const handleBlogClick = async (blog: BlogData) => {
    // Increment view count
    if (blog.id) {
      await incrementBlogViewCount(blog.id);
    }

    // Navigate to blog post
    window.location.href = `/blog/${blog.slug}`;
  };

  // Handle view all blogs
  const handleViewAllBlogs = () => {
    window.location.href = '/blogs';
  };

  // Navigation functions
  const nextSlide = () => {
    const maxSlides = Math.max(blogsToDisplay.length - 1, 0);
    setCurrentSlide(prev => (prev >= maxSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxSlides = Math.max(blogsToDisplay.length - 1, 0);
    setCurrentSlide(prev => (prev <= 0 ? maxSlides : prev - 1));
  };

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Fallback static blogs for Apollo-style design
  const fallbackBlogs = [
    {
      id: 'fallback-1',
      title: 'SDA Medical Centre Launches Advanced Cardiac Care Unit',
      category: 'Latest Update',
      metaDescription: 'State-of-the-art cardiac care facility now available',
      content: 'Content coming soon...',
      author: 'SDA Medical Team',
      authorId: '1',
      status: 'published' as const,
      publishDate: new Date(),
      slug: 'advanced-cardiac-care-unit',
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 0,
      featuredImage: blogImages[0]
    },
    {
      id: 'fallback-2',
      title: 'SDA Medical Centre Achieves NABH Accreditation',
      category: 'Latest Update',
      metaDescription: 'Quality healthcare standards recognized nationally',
      content: 'Content coming soon...',
      author: 'SDA Medical Team',
      authorId: '1',
      status: 'published' as const,
      publishDate: new Date(),
      slug: 'nabh-accreditation-achievement',
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 0,
      featuredImage: blogImages[1]
    },
    {
      id: 'fallback-3',
      title: 'New Emergency Department Opens at SDA Medical Centre',
      category: 'Latest Update',
      metaDescription: '24/7 emergency care with advanced life support',
      content: 'Content coming soon...',
      author: 'SDA Medical Team',
      authorId: '1',
      status: 'published' as const,
      publishDate: new Date(),
      slug: 'new-emergency-department',
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 0,
      featuredImage: blogImages[2]
    },
    {
      id: 'fallback-4',
      title: 'SDA Medical Centre Expands to 100-Bed Facility',
      category: 'Latest Update',
      metaDescription: 'Enhanced capacity to serve more patients',
      content: 'Content coming soon...',
      author: 'SDA Medical Team',
      authorId: '1',
      status: 'published' as const,
      publishDate: new Date(),
      slug: 'facility-expansion-100-beds',
      createdAt: new Date(),
      updatedAt: new Date(),
      viewCount: 0,
      featuredImage: blogImages[3]
    }
  ];

  // Use fallback blogs if no real blogs are available
  const blogsToDisplay = blogs.length > 0 ? blogs.slice(0, 4) : fallbackBlogs;

  return (
    <section className="apollo-blogs-section">
      <div className="apollo-blogs-container">
        <div className="apollo-blogs-header">
          <h2 className="apollo-blogs-title">What's New At SDA Medical Centre</h2>
        </div>

        <div className="apollo-blogs-content">
          <div className="apollo-blogs-slider" ref={sliderRef}>
            {loading ? (
              // Loading skeleton
              <div className="apollo-blog-card skeleton active">
                <div className="apollo-card-image skeleton-image"></div>
                <div className="apollo-card-content">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                </div>
              </div>
            ) : (
              blogsToDisplay.map((blog, index) => (
                <div
                  key={blog.id}
                  className={`apollo-blog-card ${index === currentSlide ? 'active visible' : 'hidden'} mobile-visible`}
                >
                  <div className="apollo-card-image">
                    <img
                      src={blog.featuredImage || blogImages[index % blogImages.length]}
                      alt={blog.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = blogImages[index % blogImages.length];
                      }}
                    />
                    <div className="apollo-card-overlay">
                      <span className="apollo-card-category">{blog.category}</span>
                      <h3 className="apollo-card-title">{blog.title}</h3>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Navigation Controls */}
          <div className="apollo-navigation">
            <button
              className="apollo-nav-btn apollo-nav-prev"
              onClick={prevSlide}
              disabled={loading}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="apollo-nav-btn apollo-nav-next"
              onClick={nextSlide}
              disabled={loading}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Dots Navigation for Mobile */}
        <div className="apollo-dots-navigation">
          {blogsToDisplay.map((_, index) => (
            <button
              key={index}
              className={`apollo-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
