import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('builder')

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
        <h2 className="text-xl font-bold mb-6">AI Website Builder</h2>
        
        <div className="space-y-2">
          <button
            onClick={() => setActiveTab('builder')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === 'builder' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === 'preview' ? 'bg-blue-600' : 'hover:bg-gray-700'
            }`}
          >
            Preview
          </button>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Components</h3>
          <div className="space-y-2">
            <div className="p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
              Hero Section
            </div>
            <div className="p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
              Features
            </div>
            <div className="p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
              Testimonials
            </div>
            <div className="p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">
              Contact Form
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
            Generate with AI
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold">Untitled Website</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              Save
            </button>
            <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
              Export
            </button>
          </div>
        </div>

        {/* Canvas/Preview */}
        <div className="flex-1 overflow-auto bg-gray-900 p-8">
          {activeTab === 'builder' ? (
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl min-h-[600px] p-8">
              <div className="text-center space-y-4 text-gray-800">
                <h1 className="text-4xl font-bold">Welcome to AI Website Builder</h1>
                <p className="text-xl text-gray-600">
                  Drag components from the sidebar or use AI to generate your website
                </p>
                <div className="flex justify-center space-x-4 mt-8">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Start Building
                  </button>
                  <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Generate with AI
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <iframe
                className="w-full h-[800px] bg-white rounded-lg shadow-2xl"
                title="Preview"
                srcDoc={`
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <script src="https://cdn.tailwindcss.com"></script>
                    </head>
                    <body class="bg-gray-50">
                      <div class="container mx-auto px-4 py-16">
                        <div class="text-center">
                          <h1 class="text-5xl font-bold text-gray-900 mb-4">
                            Your Website Preview
                          </h1>
                          <p class="text-xl text-gray-600 mb-8">
                            Build beautiful websites with AI assistance
                          </p>
                          <button class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg">
                            Get Started
                          </button>
                        </div>
                      </div>
                    </body>
                  </html>
                `}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
