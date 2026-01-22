import { Search, FileText, Link, BarChart3, Globe, Smartphone } from 'lucide-react'

const services = [
  {
    icon: Search,
    title: 'Keyword Research & Strategy',
    description: 'Comprehensive keyword analysis to identify high-value opportunities and create a winning SEO strategy.',
    features: ['Competitor analysis', 'Search volume research', 'Long-tail keyword discovery', 'Intent mapping']
  },
  {
    icon: FileText,
    title: 'On-Page SEO Optimization',
    description: 'Optimize your website content, structure, and technical elements for maximum search visibility.',
    features: ['Title & meta optimization', 'Content optimization', 'Internal linking', 'Schema markup']
  },
  {
    icon: Link,
    title: 'Link Building & Authority',
    description: 'Build high-quality backlinks and establish domain authority through strategic outreach and content.',
    features: ['Quality link acquisition', 'Content marketing', 'Digital PR', 'Local citations']
  },
  {
    icon: BarChart3,
    title: 'SEO Analytics & Reporting',
    description: 'Track performance, measure ROI, and get actionable insights with comprehensive SEO reporting.',
    features: ['Traffic analysis', 'Ranking reports', 'ROI tracking', 'Monthly insights']
  },
  {
    icon: Globe,
    title: 'Technical SEO Audit',
    description: 'Identify and fix technical issues that prevent your site from ranking higher in search results.',
    features: ['Site speed optimization', 'Mobile optimization', 'Crawl error fixes', 'Core Web Vitals']
  },
  {
    icon: Smartphone,
    title: 'Local SEO Services',
    description: 'Dominate local search results and attract more customers from your geographic area.',
    features: ['Google Business Profile', 'Local citations', 'Review management', 'Local content strategy']
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive SEO Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From technical audits to content strategy, we provide end-to-end SEO solutions 
            that drive sustainable organic growth for your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow card-hover"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Boost Your Search Rankings?
            </h3>
            <p className="text-gray-600 mb-6">
              Get a comprehensive SEO audit and custom strategy for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Get Free SEO Audit
              </a>
              <a
                href="#pricing"
                className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-600 hover:text-white transition-colors font-semibold"
              >
                View Pricing Plans
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}