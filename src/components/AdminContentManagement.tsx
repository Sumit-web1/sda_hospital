import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import RichTextEditor from './RichTextEditor';
import {
  FileText, Edit, Save, Upload, Image, Globe, Users, Stethoscope, Building, MessageSquare, Plus, Search,
  Filter, Eye, EyeOff, Tag, Trash2, BookOpen, Activity
} from 'lucide-react';
import type {
  BlogData,
  BlogCategory,
  LiveUpdatesData
} from '../firebase/config';
import {
  saveBlog, updateBlog, deleteBlog, subscribeToBlogs, subscribeToBlogCategories,
  initializeBlogCategories, generateSlug, saveLiveUpdates, subscribeToLiveUpdates
} from '../firebase/config';
import './AdminContentManagement.css';

const AdminContentManagement: React.FC = () => {
  const { currentAdmin } = useAdminAuth();
  const [activeSection, setActiveSection] = useState('blogs');
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);

  // State for live updates data with the NEW structure
  const [liveUpdatesData, setLiveUpdatesData] = useState<LiveUpdatesData>({
    deliveriesLastDecade: 5000,
    normalDeliveryRate: 90,
    medicalDepartments: 25,
    doctorsAndConsultants: 50,
    emergencyAndPharmacyHours: 24,
  });

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    metaDescription: '',
    category: '',
    featuredImage: '',
    content: '',
    status: 'draft' as 'draft' | 'published',
    publishDate: new Date(),
    tags: [] as string[]
  });

  const contentSections = [
    { id: 'blogs', label: 'Blog Management', icon: BookOpen },
    { id: 'categories', label: 'Blog Categories', icon: Tag },
    { id: 'live-updates', label: 'Live Updates', icon: Activity },
    { id: 'website', label: 'Website Content', icon: Globe },
    { id: 'services', label: 'Services', icon: Stethoscope },
    { id: 'departments', label: 'Departments', icon: Building },
    { id: 'doctors', label: 'Doctor Profiles', icon: Users },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'media', label: 'Media Library', icon: Image }
  ];

  useEffect(() => {
    initializeBlogCategories();

    const unsubscribeBlogs = subscribeToBlogs((blogsData) => {
      setBlogs(blogsData);
      setLoading(false);
    });

    const unsubscribeCategories = subscribeToBlogCategories((categoriesData) => {
      setCategories(categoriesData);
    });

    const unsubscribeLiveUpdates = subscribeToLiveUpdates((data) => {
      if (data) {
        setLiveUpdatesData(data);
      }
    });

    return () => {
      unsubscribeBlogs();
      unsubscribeCategories();
      unsubscribeLiveUpdates();
    };
  }, []);

  const handleSaveBlog = async () => {
    const trimmedForm = {
      ...blogForm,
      title: blogForm.title.trim(),
      metaDescription: blogForm.metaDescription.trim(),
      category: blogForm.category.trim(),
      content: blogForm.content.trim()
    };

    if (!trimmedForm.title || !trimmedForm.metaDescription || !trimmedForm.category || !trimmedForm.content) {
      alert('Please fill in all required fields (Title, Meta Description, Category, and Content)');
      return;
    }

    if (!currentAdmin) {
      alert('Admin authentication required');
      return;
    }

    const slug = generateSlug(trimmedForm.title);
    const blogData = {
      ...trimmedForm,
      slug,
      author: currentAdmin.name,
      authorId: currentAdmin.id.toString(),
      publishDate: trimmedForm.publishDate
    };

    try {
      if (editingBlog) {
        const result = await updateBlog(editingBlog.id!, blogData);
        if (result.success) {
          alert('Blog updated successfully!');
          resetBlogForm();
        } else {
          alert('Failed to update blog');
        }
      } else {
        const result = await saveBlog(blogData);
        if (result.success) {
          alert('Blog saved successfully!');
          resetBlogForm();
        } else {
          alert('Failed to save blog');
        }
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('An error occurred while saving the blog');
    }
  };

  const handleSaveLiveUpdates = async () => {
    try {
      const result = await saveLiveUpdates(liveUpdatesData);
      if (result.success) {
        alert('Live updates saved successfully!');
      } else {
        alert('Failed to save live updates');
      }
    } catch (error) {
      console.error('Error saving live updates:', error);
      alert('An error occurred while saving the live updates');
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      metaDescription: '',
      category: '',
      featuredImage: '',
      content: '',
      status: 'draft',
      publishDate: new Date(),
      tags: []
    });
    setEditingBlog(null);
    setShowBlogEditor(false);
  };

  const handleEditBlog = (blog: BlogData) => {
    setBlogForm({
      title: blog.title,
      metaDescription: blog.metaDescription,
      category: blog.category,
      featuredImage: blog.featuredImage || '',
      content: blog.content,
      status: blog.status,
      publishDate: blog.publishDate,
      tags: blog.tags || []
    });
    setEditingBlog(blog);
    setShowBlogEditor(true);
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const result = await deleteBlog(blogId);
      if (result.success) {
        alert('Blog deleted successfully!');
      } else {
        alert('Failed to delete blog');
      }
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || blog.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || blog.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectAll = () => {
    if (selectedBlogs.length === filteredBlogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(filteredBlogs.map(blog => blog.id!));
    }
  };

  const handleSelectBlog = (blogId: string) => {
    setSelectedBlogs(prev =>
      prev.includes(blogId)
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const handleBulkStatusChange = async (status: 'draft' | 'published') => {
    if (selectedBlogs.length === 0) return;
    try {
      for (const blogId of selectedBlogs) {
        await updateBlog(blogId, { status });
      }
      alert(`${selectedBlogs.length} blogs updated to ${status}`);
      setSelectedBlogs([]);
    } catch (error) {
      console.error('Error updating blogs:', error);
      alert('Failed to update blogs');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedBlogs.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedBlogs.length} blogs?`)) {
      try {
        for (const blogId of selectedBlogs) {
          await deleteBlog(blogId);
        }
        alert(`${selectedBlogs.length} blogs deleted`);
        setSelectedBlogs([]);
      } catch (error) {
        console.error('Error deleting blogs:', error);
        alert('Failed to delete blogs');
      }
    }
  };

  const analytics = {
    totalBlogs: blogs.length,
    publishedBlogs: blogs.filter(b => b.status === 'published').length,
    draftBlogs: blogs.filter(b => b.status === 'draft').length,
    totalViews: blogs.reduce((sum, blog) => sum + (blog.viewCount || 0), 0),
    averageViews: blogs.length > 0 ? Math.round(blogs.reduce((sum, blog) => sum + (blog.viewCount || 0), 0) / blogs.length) : 0,
    topCategory: blogs.length > 0 ? blogs.reduce((acc, blog) => {
      acc[blog.category] = (acc[blog.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) : {}
  };

  const topCategoryName = Object.keys(analytics.topCategory).length > 0
    ? Object.keys(analytics.topCategory).reduce((a, b) =>
      analytics.topCategory[a] > analytics.topCategory[b] ? a : b
    )
    : 'N/A';

  return (
    <div className="admin-content-management">
      <div className="section-header">
        <div className="content-header-content">
          <h1 className="content-header-title">Content Management</h1>
          <p className="content-header-subtitle">Manage website content, blogs, and media</p>
        </div>

        <div className="header-action-area">
          {activeSection === 'blogs' && (
            <button
              className="create-blog-btn"
              onClick={() => setShowBlogEditor(true)}
            >
              <Plus size={18} />
              <span>New Blog Post</span>
            </button>
          )}
        </div>
      </div>

      <div className="content-sections">
        {contentSections.map((section) => {
          const IconComponent = section.icon;
          return (
            <button
              key={section.id}
              className={`section-button ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => {
                setActiveSection(section.id);
                setShowBlogEditor(false);
              }}
            >
              <IconComponent size={20} />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>

      <div className="content-editor">
        {activeSection === 'blogs' && !showBlogEditor ? (
          <div className="blog-list">
            <div className="blog-analytics">
              <div className="analytics-cards">
                <div className="analytics-card">
                  <h3>Total Blogs</h3>
                  <div className="analytics-number">{analytics.totalBlogs}</div>
                </div>
                <div className="analytics-card">
                  <h3>Published</h3>
                  <div className="analytics-number">{analytics.publishedBlogs}</div>
                </div>
                <div className="analytics-card">
                  <h3>Drafts</h3>
                  <div className="analytics-number">{analytics.draftBlogs}</div>
                </div>
                <div className="analytics-card">
                  <h3>Total Views</h3>
                  <div className="analytics-number">{analytics.totalViews.toLocaleString()}</div>
                </div>
                <div className="analytics-card">
                  <h3>Avg Views</h3>
                  <div className="analytics-number">{analytics.averageViews}</div>
                </div>
                <div className="analytics-card">
                  <h3>Top Category</h3>
                  <div className="analytics-text">{topCategoryName || 'N/A'}</div>
                </div>
              </div>
            </div>

            <div className="list-header">
              <h2>Blog Posts ({filteredBlogs.length})</h2>
              <div className="list-filters">
                <div className="blog-search-container">
                  <Search size={16} className="blog-search-icon" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="blog-search-input"
                  />
                </div>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'draft' | 'published')}
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
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

            {selectedBlogs.length > 0 && (
              <div className="bulk-actions">
                <div className="bulk-actions-info">
                  <span>{selectedBlogs.length} blog(s) selected</span>
                </div>
                <div className="bulk-actions-buttons">
                  <button
                    className="btn-bulk"
                    onClick={() => handleBulkStatusChange('published')}
                  >
                    Publish Selected
                  </button>
                  <button
                    className="btn-bulk"
                    onClick={() => handleBulkStatusChange('draft')}
                  >
                    Move to Draft
                  </button>
                  <button
                    className="btn-bulk danger"
                    onClick={handleBulkDelete}
                  >
                    Delete Selected
                  </button>
                  <button
                    className="btn-bulk secondary"
                    onClick={() => setSelectedBlogs([])}
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading blogs...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="empty-state">
                <BookOpen size={48} />
                <h3>No blogs found</h3>
                <p>Create your first blog post to get started.</p>
                <button
                  className="btn-primary"
                  onClick={() => setShowBlogEditor(true)}
                >
                  <Plus size={16} />
                  Create Blog Post
                </button>
              </div>
            ) : (
              <div className="blogs-table">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectedBlogs.length === filteredBlogs.length && filteredBlogs.length > 0}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Author</th>
                      <th>Views</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBlogs.map((blog) => (
                      <tr key={blog.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedBlogs.includes(blog.id!)}
                            onChange={() => handleSelectBlog(blog.id!)}
                          />
                        </td>
                        <td>
                          <div className="blog-title-cell">
                            <strong>{blog.title}</strong>
                            <small>{blog.metaDescription}</small>
                          </div>
                        </td>
                        <td>
                          <span className="category-badge" style={{
                            backgroundColor: categories.find(c => c.name === blog.category)?.color || '#6B7280'
                          }}>
                            {blog.category}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${blog.status}`}>
                            {blog.status === 'published' ? <Eye size={12} /> : <EyeOff size={12} />}
                            {blog.status}
                          </span>
                        </td>
                        <td>{blog.author}</td>
                        <td>{blog.viewCount || 0}</td>
                        <td>{blog.createdAt.toLocaleDateString()}</td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn-icon"
                              onClick={() => handleEditBlog(blog)}
                              title="Edit"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              className="btn-icon danger"
                              onClick={() => handleDeleteBlog(blog.id!)}
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : activeSection === 'live-updates' ? (
          <div className="live-updates-editor">
            <div className="editor-header">
              <h2>Live Website Stats</h2>
              <div className="editor-actions">
                <button className="btn-primary" onClick={handleSaveLiveUpdates}>
                  <Save size={16} />
                  Save Updates
                </button>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="deliveriesLastDecade">Deliveries in Last Decade</label>
                <input
                  type="number"
                  id="deliveriesLastDecade"
                  value={liveUpdatesData.deliveriesLastDecade}
                  onChange={(e) => setLiveUpdatesData({ ...liveUpdatesData, deliveriesLastDecade: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="normalDeliveryRate">Normal Delivery Rate (%)</label>
                <input
                  type="number"
                  id="normalDeliveryRate"
                  value={liveUpdatesData.normalDeliveryRate}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setLiveUpdatesData({ ...liveUpdatesData, normalDeliveryRate: Math.min(100, Math.max(0, value)) });
                  }}
                  min="0"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label htmlFor="medicalDepartments">Medical Departments</label>
                <input
                  type="number"
                  id="medicalDepartments"
                  value={liveUpdatesData.medicalDepartments}
                  onChange={(e) => setLiveUpdatesData({ ...liveUpdatesData, medicalDepartments: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="doctorsAndConsultants">Doctors & Consultants</label>
                <input
                  type="number"
                  id="doctorsAndConsultants"
                  value={liveUpdatesData.doctorsAndConsultants}
                  onChange={(e) => setLiveUpdatesData({ ...liveUpdatesData, doctorsAndConsultants: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="emergencyAndPharmacyHours">Emergency & Pharmacy (Hours)</label>
                <input
                  type="number"
                  id="emergencyAndPharmacyHours"
                  value={liveUpdatesData.emergencyAndPharmacyHours}
                  onChange={(e) => setLiveUpdatesData({ ...liveUpdatesData, emergencyAndPharmacyHours: parseInt(e.target.value) || 0 })}
                  min="0"
                />
              </div>
            </div>
          </div>
        ) : activeSection === 'blogs' ? (
          <div className="blog-editor">
            <div className="editor-header">
              <h2>{editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
              <div className="editor-actions">
                <button
                  className="btn-secondary"
                  onClick={resetBlogForm}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handleSaveBlog}
                >
                  <Save size={16} />
                  {editingBlog ? 'Update Blog' : 'Save Blog'}
                </button>
              </div>
            </div>
            <div className="blog-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Title *</label>
                  <input
                    type="text"
                    id="title"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="Enter blog title (max 100 characters)"
                    maxLength={100}
                    required
                  />
                  <small>{blogForm.title.length}/100 characters</small>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="metaDescription">Meta Description *</label>
                  <textarea
                    id="metaDescription"
                    value={blogForm.metaDescription}
                    onChange={(e) => setBlogForm({ ...blogForm, metaDescription: e.target.value })}
                    placeholder="Enter meta description for SEO (max 160 characters)"
                    maxLength={160}
                    rows={3}
                    required
                  />
                  <small>{blogForm.metaDescription.length}/160 characters</small>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value as 'draft' | 'published' })}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="featuredImage">Featured Image URL</label>
                  <input
                    type="url"
                    id="featuredImage"
                    value={blogForm.featuredImage}
                    onChange={(e) => setBlogForm({ ...blogForm, featuredImage: e.target.value })}
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="publishDate">Publish Date</label>
                  <input
                    type="datetime-local"
                    id="publishDate"
                    value={blogForm.publishDate.toISOString().slice(0, 16)}
                    onChange={(e) => setBlogForm({ ...blogForm, publishDate: new Date(e.target.value) })}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="content">Content *</label>
                  <RichTextEditor
                    value={blogForm.content}
                    onChange={(content) => setBlogForm({ ...blogForm, content })}
                    placeholder="Write your blog content here..."
                    minHeight={400}
                  />
                  <small>Use the toolbar above to format your content with headings, lists, links, and more</small>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="editor-content">
            <div className="coming-soon">
              <FileText size={48} />
              <h3>Content Editor Coming Soon</h3>
              <p>Advanced content management features will be available in the next update.</p>
              <div className="feature-list">
                <div className="feature-item">Rich text editor</div>
                <div className="feature-item">Media management</div>
                <div className="feature-item">SEO optimization</div>
                <div className="feature-item">Content versioning</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContentManagement;