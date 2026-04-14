import React, { useState, useEffect } from 'react';
import type { BlogData } from '../firebase/config';
import {
  getBlogBySlug,
  subscribeToBlogs,
  incrementBlogViewCount
} from '../firebase/config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Calendar,
  User,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link,
  ArrowLeft,
  Clock,
  Tag
} from 'lucide-react';
import './BlogPostPage.css';

const BlogPostPage: React.FC = () => {
  // Get slug from URL path
  const slug = window.location.pathname.split('/blog/')[1];
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlog = async () => {
      if (!slug) {
        setError('Blog not found');
        setLoading(false);
        return;
      }

      try {
        const blogData = await getBlogBySlug(slug);
        if (blogData) {
          setBlog(blogData as BlogData);
          // Increment view count
          if (blogData.id) {
            await incrementBlogViewCount(blogData.id);
          }
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        console.error('Error loading blog:', err);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  // Load related blogs
  useEffect(() => {
    if (blog) {
      const unsubscribe = subscribeToBlogs((blogs) => {
        const related = blogs
          .filter(b => 
            b.id !== blog.id && 
            b.status === 'published' && 
            (b.category === blog.category || b.tags?.some(tag => blog.tags?.includes(tag)))
          )
          .slice(0, 3);
        setRelatedBlogs(related);
      }, 'published');

      return () => unsubscribe();
    }
  }, [blog]);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = blog?.title || '';
    const text = blog?.metaDescription || '';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        } catch (err) {
          console.error('Failed to copy link:', err);
        }
        break;
    }
  };

  const formatContent = (content: string) => {
    // Simple content formatting - in a real app, you'd use a proper markdown/rich text renderer
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="blog-paragraph">
        {paragraph}
      </p>
    ));
  };

  const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="blog-post-page">
        <Header />
        <div className="blog-loading">
          <div className="loading-spinner"></div>
          <p>Loading blog post...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-post-page">
        <Header />
        <div className="blog-error">
          <h1>Blog Not Found</h1>
          <p>{error || 'The requested blog post could not be found.'}</p>
          <button
            className="btn-back"
            onClick={() => window.location.href = '/'}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-post-page">
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
            <h1 className="page-header-title">{blog.title}</h1>
            <div className="page-header-breadcrumb">
              <span className="breadcrumb-item">Home</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-item">Blogs</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-item active">{blog.title.length > 30 ? blog.title.substring(0, 30) + '...' : blog.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Container */}
      <div className="blog-main-container">
        <div className="blog-main-content">

          {/* Back Button */}
          <button
            className="btn-back"
            onClick={() => window.location.href = '/blogs'}
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </button>

          {/* Blog Meta Info */}
          <div className="blog-meta-info">
            <div className="blog-meta">
              <div className="blog-meta-item">
                <User size={16} />
                <span>By {blog.author}</span>
              </div>
              <div className="blog-meta-item">
                <Calendar size={16} />
                <span>{new Date(blog.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="blog-meta-item">
                <Clock size={16} />
                <span>{calculateReadTime(blog.content)} min read</span>
              </div>
              <div className="blog-meta-item">
                <Eye size={16} />
                <span>{blog.viewCount || 0} views</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="blog-share">
              <span>Share:</span>
              <div className="share-buttons">
                <button onClick={() => handleShare('facebook')} title="Share on Facebook">
                  <Facebook size={16} />
                </button>
                <button onClick={() => handleShare('twitter')} title="Share on Twitter">
                  <Twitter size={16} />
                </button>
                <button onClick={() => handleShare('linkedin')} title="Share on LinkedIn">
                  <Linkedin size={16} />
                </button>
                <button onClick={() => handleShare('copy')} title="Copy Link">
                  <Link size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Blog Description */}
          <p className="blog-description">{blog.metaDescription}</p>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className="blog-featured-image">
              <img src={blog.featuredImage} alt={blog.title} />
            </div>
          )}

          {/* Blog Content */}
          <article className="blog-content">
            {formatContent(blog.content)}
          </article>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-tags">
              <h3>Tags:</h3>
              <div className="tags-list">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className="related-posts">
              <h3>Related Posts</h3>
              <div className="related-posts-grid">
                {relatedBlogs.map((relatedBlog) => (
                  <div
                    key={relatedBlog.id}
                    className="related-post-card"
                    onClick={() => window.location.href = `/blog/${relatedBlog.slug}`}
                  >
                  <div className="related-post-category">
                    {relatedBlog.category}
                  </div>
                  <h4>{relatedBlog.title}</h4>
                  <p>{relatedBlog.metaDescription}</p>
                  <div className="related-post-meta">
                    <span>{new Date(relatedBlog.publishDate).toLocaleDateString()}</span>
                    <span>{relatedBlog.viewCount || 0} views</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
