import React from "react";
import { getAllPosts } from "@/app/(roles)/admin/posts/libs/data";

const PostsPage = async () => {
  const posts = await getAllPosts();
  console.log(posts);

  // Post categories
  const categories = [
    {
      id: "NEWS",
      title: "News",
      description: "Latest updates and information",
      icon: () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M15 6l4 4m0 0l-4 4m4-4H9" />
        </svg>
      ),
    },
    {
      id: "ANNOUNCEMENT",
      title: "Announcement",
      description: "Important organizational notices",
      icon: () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
    },
    {
      id: "ARTICLE",
      title: "Article",
      description: "In-depth content and features",
      icon: () => (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">Content Hub</h1>
          <p className="text-gray-400 max-w-xl mx-auto">Explore our diverse collection of content across multiple categories</p>
        </header>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all duration-500 group-hover:scale-150"></div>

              <div className="relative z-10">
                <div className="text-blue-400 mb-4">{category.icon()}</div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-gray-400 mb-4">{category.description}</p>
                <button className="flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  <span>Explore content</span>
                  <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Content */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Content</h2>
            <button className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center">
              <span>View all</span>
              <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group relative overflow-hidden rounded-xl aspect-video">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
              <img src="/api/placeholder/800/450" alt="Featured post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium mb-2">ANNOUNCEMENT</span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-300 transition-colors">Special Event Registration Open</h3>
                <p className="text-gray-300 line-clamp-2">Learn about our upcoming special event and how to register for this exclusive opportunity.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="group bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 hover:border-emerald-500 transition-all duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium mb-2">NEWS</span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-300 transition-colors">Organization Achievement Highlight</h3>
                <p className="text-gray-400 line-clamp-2">Celebrating our recent accomplishments and milestones reached over the past quarter.</p>
              </div>

              <div className="group bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium mb-2">ARTICLE</span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-purple-300 transition-colors">Tech Trends and Future Directions</h3>
                <p className="text-gray-400 line-clamp-2">An analysis of emerging technologies and how they might shape our future initiatives.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>

          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group flex flex-col md:flex-row gap-6 bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300">
                <div className="md:w-1/4 rounded-lg overflow-hidden">
                  <img src={`/api/placeholder/400/${300 + item * 10}`} alt="Post thumbnail" className="w-full h-48 md:h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>

                <div className="md:w-3/4">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-medium">{["NEWS", "ANNOUNCEMENT", "ARTICLE"][item % 3]}</span>
                    <span className="text-gray-400 text-sm">May {10 + item}, 2025</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">{["Latest Organization Update", "Important Community Announcement", "Best Practices Article"][item % 3]}</h3>

                  <p className="text-gray-300 mb-4 line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-xs font-medium">AB</span>
                      </div>
                      <span className="text-sm text-gray-400">Author Name</span>
                    </div>

                    <button className="flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                      <span>Read more</span>
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">Load More</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostsPage;
