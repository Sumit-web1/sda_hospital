import React, { useState, useEffect } from 'react';
import type {
  BlogData,
  BlogCategory
} from '../firebase/config';
import {
  subscribeToBlogs,
  subscribeToBlogCategories
} from '../firebase/config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import './BlogListPage.css';

const BlogListPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  // Subscribe to blogs and categories
  useEffect(() => {
    const unsubscribeBlogs = subscribeToBlogs((blogsData) => {
      const publishedBlogs = blogsData
        .filter(blog => blog.status === 'published')
        .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
      setBlogs(publishedBlogs);
      setLoading(false);
    }, 'published');

    const unsubscribeCategories = subscribeToBlogCategories((categoriesData) => {
      setCategories(categoriesData);
    });

    return () => {
      unsubscribeBlogs();
      unsubscribeCategories();
    };
  }, []);

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.metaDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const handleBlogClick = (blog: BlogData) => {
    window.location.href = `/blog/${blog.slug}`;
  };

  const getCategoryColor = (categoryName: string): string => {
    const category = categories.find(c => c.name === categoryName);
    return category?.color || '#6B7280';
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="blog-list-page">
      <Header />

      {/* Page Header */}
      <section className="page-header">
        <div
          className="page-header-background"
          // style={{ backgroundImage: `url(${pageHeaderBg})` }}
        >
          <div className="page-header-overlay"></div>
        </div>
        <div className="page-header-container">
          <div className="page-header-content">
            <h1 className="page-header-title">Health & Wellness Blog</h1>
            <div className="page-header-breadcrumb">
              <span className="breadcrumb-item">Home</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-item active">Blogs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="blog-filters">
        <div className="blog-filters-container">
          <div className="search-filter">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="category-filter">
            <Filter size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="blog-list-content">
        <div className="blog-list-container">
          {loading ? (
            <div className="blog-loading">
              <div className="loading-spinner"></div>
              <p>Loading blogs...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="blog-empty">
              <BookOpen size={64} />
              <h3>No blogs found</h3>
              <p>
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Check back soon for new blog posts!'
                }
              </p>
            </div>
          ) : (
            <>
              <div className="blog-grid">
                {paginatedBlogs.map((blog) => (
                  <article 
                    key={blog.id} 
                    className="blog-card"
                    onClick={() => handleBlogClick(blog)}
                  >
                    {blog.featuredImage && (
                      <div className="blog-card-image">
                        <img src={blog.featuredImage} alt={blog.title} />
                      </div>
                    )}
                    
                    <div className="blog-card-content">
                      <div className="blog-card-category">
                        <span 
                          className="category-badge"
                          style={{ backgroundColor: getCategoryColor(blog.category) }}
                        >
                          {blog.category}
                        </span>
                      </div>
                      
                      <h2 className="blog-card-title">{blog.title}</h2>
                      <p className="blog-card-description">{blog.metaDescription}</p>
                      
                      <div className="blog-card-meta">
                        <div className="blog-card-meta-item">
                          <User size={14} />
                          <span>{blog.author}</span>
                        </div>
                        <div className="blog-card-meta-item">
                          <Calendar size={14} />
                          <span>{formatDate(blog.publishDate)}</span>
                        </div>
                        <div className="blog-card-meta-item">
                          <Eye size={14} />
                          <span>{blog.viewCount || 0} views</span>
                        </div>
                      </div>
                      
                      <div className="blog-card-footer">
                        <span className="read-time">{calculateReadTime(blog.content)} min read</span>
                        <button className="read-more-btn">
                          Read More
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="blog-pagination">
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    className="pagination-btn"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogListPage;
